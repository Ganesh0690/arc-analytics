import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { formatAddress } from '../lib/data';
import { ARC_CONFIG, WHALE_THRESHOLD } from '../lib/config';
import StatCard, { Skeleton, SectionLabel } from './StatCard';

export default function WhaleWatcher({ whales, loading }) {
  const totalVolume = whales.reduce((a, b) => a + b.value, 0);
  const uniqueAddresses = new Set([...whales.map(w => w.from), ...whales.map(w => w.to)]).size;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <SectionLabel>Whale Activity</SectionLabel>
        <h2 className="arc-heading text-3xl mt-2">Large token transfers</h2>
        <p className="text-white/70 mt-3 text-lg">Monitoring transfers ≥ {WHALE_THRESHOLD} USDC in recent blocks</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <StatCard label="Transfers Found" value={whales.length.toString()} loading={loading} highlighted />
        <StatCard label="Total Volume" value={`$${totalVolume.toLocaleString()}`} loading={loading} />
        <StatCard label="Unique Wallets" value={uniqueAddresses.toString()} loading={loading} />
      </div>

      <div className="arc-card overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <SectionLabel>Transfer History</SectionLabel>
        </div>
        
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="arc-card-inner p-5">
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="flex gap-4">
                  <Skeleton className="h-16 flex-1" />
                  <Skeleton className="h-16 flex-1" />
                </div>
              </div>
            ))}
          </div>
        ) : whales.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🐋</span>
            </div>
            <p className="text-white font-medium text-lg">No whale activity detected</p>
            <p className="text-white/50 mt-2 max-w-sm mx-auto">
              Large transfers (≥ {WHALE_THRESHOLD} USDC) will appear here when detected in recent blocks
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {whales.map((whale, i) => (
              <div key={`${whale.hash}-${i}`} className="p-6 hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                      whale.value >= 10000 
                        ? 'bg-red-400/15 text-red-300 border border-red-400/25'
                        : whale.value >= 1000
                        ? 'bg-yellow-400/15 text-yellow-300 border border-yellow-400/25'
                        : 'bg-white/10 text-white/80 border border-white/20'
                    }`}>
                      ${whale.value.toLocaleString()}
                    </span>
                    <span className="text-sm text-white/50">Block #{whale.block}</span>
                  </div>
                  <a 
                    href={`${ARC_CONFIG.explorerUrl}/tx/${whale.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    View on Explorer
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1 arc-card-inner p-4">
                    <p className="text-xs text-white/40 uppercase tracking-wide mb-2">From</p>
                    <p className="text-sm text-white/90">{formatAddress(whale.from)}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-4 h-4 text-white/50" />
                  </div>
                  <div className="flex-1 arc-card-inner p-4">
                    <p className="text-xs text-white/40 uppercase tracking-wide mb-2">To</p>
                    <p className="text-sm text-white/90">{formatAddress(whale.to)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}