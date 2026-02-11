import { ethers } from 'ethers';
import { ARC_CONFIG, BLOCKS_TO_FETCH, WHALE_THRESHOLD } from './config';

let provider = null;
let currentRpcUrl = null;

function getRpcUrl() {
  if (typeof window === 'undefined') return ARC_CONFIG.rpcUrl;
  return localStorage.getItem('arc-rpc-url') || ARC_CONFIG.rpcUrl;
}

function getProvider() {
  const rpcUrl = getRpcUrl();
  
  if (currentRpcUrl !== rpcUrl) {
    provider = null;
    currentRpcUrl = rpcUrl;
  }
  
  if (!provider) {
    provider = new ethers.JsonRpcProvider(rpcUrl);
  }
  return provider;
}

export function resetProvider() {
  provider = null;
  currentRpcUrl = null;
}

export function formatAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

async function fetchWithThrottle(promises, batchSize = 3) {
  const results = [];
  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(p => p().catch(() => null)));
    results.push(...batchResults);
    if (i + batchSize < promises.length) {
      await new Promise(r => setTimeout(r, 200));
    }
  }
  return results;
}

export async function fetchAllData() {
  const p = getProvider();
  
  const [blockNumber, feeData, network] = await Promise.all([
    p.getBlockNumber(),
    p.getFeeData(),
    p.getNetwork()
  ]);

  await new Promise(r => setTimeout(r, 150));

  const blocksToFetch = Math.min(BLOCKS_TO_FETCH, 5);
  const blockFetchers = [];
  for (let i = 0; i < blocksToFetch; i++) {
    blockFetchers.push(() => p.getBlock(blockNumber - i, true));
  }
  
  const blocks = await fetchWithThrottle(blockFetchers, 2);
  const validBlocks = blocks.filter(b => b !== null);

  await new Promise(r => setTimeout(r, 150));

  let logs = [];
  try {
    const transferTopic = ethers.id('Transfer(address,address,uint256)');
    logs = await p.getLogs({
      fromBlock: blockNumber - blocksToFetch,
      toBlock: blockNumber,
      topics: [transferTopic]
    });
  } catch (e) {
    console.log('Logs fetch skipped due to rate limit');
  }

  const stats = {
    blockNumber,
    chainId: Number(network.chainId),
    gasPrice: feeData.gasPrice ? ethers.formatUnits(feeData.gasPrice, 'gwei') : '0',
    maxFeePerGas: feeData.maxFeePerGas ? ethers.formatUnits(feeData.maxFeePerGas, 'gwei') : '0',
    blockTime: validBlocks.length > 1 ? validBlocks[0].timestamp - validBlocks[1].timestamp : 0,
    txCount: validBlocks[0]?.transactions?.length || 0
  };

  const recentBlocks = validBlocks.map(block => ({
    number: block.number,
    timestamp: block.timestamp,
    txCount: block.transactions?.length || 0,
    gasUsed: block.gasUsed ? ethers.formatUnits(block.gasUsed, 'gwei') : '0',
    hash: block.hash
  }));

  const gasHistory = validBlocks
    .filter(b => b.baseFeePerGas)
    .map(b => ({
      block: b.number,
      gasPrice: parseFloat(ethers.formatUnits(b.baseFeePerGas, 'gwei')),
      timestamp: b.timestamp
    }))
    .reverse();

  const tpsHistory = [];
  for (let i = 0; i < validBlocks.length - 1; i++) {
    const block = validBlocks[i];
    const prevBlock = validBlocks[i + 1];
    const blockTime = block.timestamp - prevBlock.timestamp || 1;
    tpsHistory.push({
      block: block.number,
      tps: parseFloat((block.transactions.length / blockTime).toFixed(2)),
      txCount: block.transactions.length
    });
  }

  const whales = [];
  for (const log of logs) {
    try {
      if (log.data && log.data !== '0x' && log.topics.length >= 3) {
        const value = BigInt(log.data);
        const usdcValue = parseFloat(ethers.formatUnits(value, 18));
        
        if (usdcValue >= WHALE_THRESHOLD) {
          whales.push({
            hash: log.transactionHash,
            from: '0x' + log.topics[1].slice(26),
            to: '0x' + log.topics[2].slice(26),
            value: usdcValue,
            block: log.blockNumber,
            contract: log.address
          });
        }
      }
    } catch (e) {
      continue;
    }
  }
  whales.sort((a, b) => b.value - a.value);

  const contractCalls = {};
  for (const block of validBlocks) {
    const txs = block.prefetchedTransactions || [];
    for (const tx of txs) {
      if (tx && tx.to) {
        const addr = tx.to.toLowerCase();
        if (!contractCalls[addr]) {
          contractCalls[addr] = {
            address: tx.to,
            calls: 0,
            gasUsed: BigInt(0),
            lastBlock: block.number
          };
        }
        contractCalls[addr].calls++;
        if (tx.gasLimit) {
          contractCalls[addr].gasUsed += tx.gasLimit;
        }
      }
    }
  }
  
  const contracts = Object.values(contractCalls)
    .sort((a, b) => b.calls - a.calls)
    .slice(0, 15)
    .map(c => ({
      address: c.address,
      calls: c.calls,
      gasUsed: ethers.formatUnits(c.gasUsed, 'gwei'),
      lastBlock: c.lastBlock
    }));

  return {
    stats,
    blocks: recentBlocks,
    gasHistory,
    tpsHistory: tpsHistory.reverse(),
    whales: whales.slice(0, 20),
    contracts
  };
}