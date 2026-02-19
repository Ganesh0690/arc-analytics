import { RefreshCw, Settings } from 'lucide-react';
import RpcSettings from './RpcSettings';

export default function Header({ onRefresh, loading, onRpcChange }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/15">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-white/50 rounded-full"></div>
            <span className="text-2xl font-semibold text-white tracking-wide">Arc Analytics</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-9">
            <a href="https://docs.arc.network" target="_blank" rel="noopener noreferrer" className="arc-link">
              Build
            </a>
            <a href="https://arc.network/ecosystem" target="_blank" rel="noopener noreferrer" className="arc-link">
              Ecosystem
            </a>
            <a href="https://arc.network/litepaper" target="_blank" rel="noopener noreferrer" className="arc-link">
              Litepaper
            </a>
            <a href="https://arc.network/blog" target="_blank" rel="noopener noreferrer" className="arc-link">
              Blog
            </a>
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="arc-badge">
              <span className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400 animate-pulse-dot' : 'bg-green-300'}`}></span>
              <span>{loading ? 'Syncing' : 'Testnet'}</span>
            </div>
            
            <RpcSettings onRpcChange={onRpcChange} />
            
            <button
              onClick={onRefresh}
              disabled={loading}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/20 border border-white/20 hover:bg-black/30 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-white ${loading ? 'animate-spin' : ''}`} />
            </button>
            
            <a 
              href="https://docs.arc.network" 
              target="_blank" 
              rel="noopener noreferrer"
              className="arc-btn-primary hidden sm:flex"
            >
              Start building
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}