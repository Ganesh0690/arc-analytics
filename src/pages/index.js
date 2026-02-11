import { useState, useCallback } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import GasTracker from '../components/GasTracker';
import NetworkHealth from '../components/NetworkHealth';
import WhaleWatcher from '../components/WhaleWatcher';
import ContractActivity from '../components/ContractActivity';
import Footer from '../components/Footer';
import { useArcData } from '../hooks/useArcData';
import { SectionLabel } from '../components/StatCard';
import { resetProvider } from '../lib/data';

export default function Home() {
  const [activeTab, setActiveTab] = useState('gas');
  const { stats, blocks, gasHistory, tpsHistory, whales, contracts, loading, refresh } = useArcData();

  const handleRpcChange = useCallback(() => {
    resetProvider();
    refresh();
  }, [refresh]);

  return (
    <>
      <Head>
        <title>Arc Analytics | Testnet Monitor</title>
        <meta name="description" content="Real-time analytics dashboard for Arc Network - The Economic OS for the internet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
      </Head>

      <div className="min-h-screen bg-arc-bg relative">
        <div className="arc-curve-container">
          <div className="arc-curve"></div>
        </div>
        
        <Header onRefresh={refresh} loading={loading} onRpcChange={handleRpcChange} />
        
        <main className="pt-28 pb-16 relative z-10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="mb-14">
              <SectionLabel>ARC</SectionLabel>
              <h1 className="arc-heading text-5xl md:text-6xl mt-4 max-w-3xl uppercase">
                Testnet Analytics
              </h1>
              <p className="text-arc-secondary text-lg mt-6 max-w-2xl leading-relaxed">
                Real-time monitoring and analytics for Arc Network testnet. Track gas prices, network health, large transfers, and smart contract activity.
              </p>
            </div>

            <div className="mb-10">
              <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div className="min-h-[700px]">
              {activeTab === 'gas' && (
                <GasTracker stats={stats} gasHistory={gasHistory} loading={loading} />
              )}
              
              {activeTab === 'network' && (
                <NetworkHealth stats={stats} blocks={blocks} tpsHistory={tpsHistory} loading={loading} />
              )}
              
              {activeTab === 'whales' && (
                <WhaleWatcher whales={whales} loading={loading} />
              )}
              
              {activeTab === 'contracts' && (
                <ContractActivity contracts={contracts} loading={loading} />
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}