import { RefreshCw, ChevronDown } from 'lucide-react';
import RpcSettings from './RpcSettings';

export default function Header({ onRefresh, loading, onRpcChange }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-arc-bg/90 backdrop-blur-xl border-b border-arc-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-arc-text">
              <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6z" fill="currentColor" fillOpacity="0.3"/>
              <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="currentColor" fillOpacity="0.1"/>
            </svg>
            <span className="text-xl font-medium text-arc-text tracking-tight">Arc</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="https://docs.arc.network" target="_blank" rel="noopener noreferrer" className="arc-link flex items-center gap-1">
              Build <ChevronDown className="w-4 h-4" />
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
              <span className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse-dot' : 'bg-arc-teal'}`}></span>
              <span>{loading ? 'Syncing' : 'Testnet'}</span>
            </div>
            
            <RpcSettings onRpcChange={onRpcChange} />
            
            <button
              onClick={onRefresh}
              disabled={loading}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-arc-card border border-arc-border hover:border-arc-border-light transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-arc-muted ${loading ? 'animate-spin' : ''}`} />
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