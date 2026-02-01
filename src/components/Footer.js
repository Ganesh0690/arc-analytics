export default function Footer() {
  return (
    <footer className="border-t border-arc-border mt-20 bg-arc-bg">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-arc-text">
                <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6z" fill="currentColor" fillOpacity="0.3"/>
                <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="currentColor" fillOpacity="0.1"/>
              </svg>
              <span className="text-lg font-medium text-arc-text">Arc</span>
            </div>
            <p className="text-arc-muted text-sm leading-relaxed">
              The Economic OS for the internet. Purpose-built for stablecoin finance.
            </p>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-arc-secondary uppercase tracking-wider mb-4">//Build</p>
            <ul className="space-y-3">
              <li><a href="https://docs.arc.network" target="_blank" rel="noopener noreferrer" className="text-arc-muted hover:text-arc-text text-sm transition-colors">Documentation</a></li>
              <li><a href="https://testnet.arcscan.app" target="_blank" rel="noopener noreferrer" className="text-arc-muted hover:text-arc-text text-sm transition-colors">Explorer</a></li>
              <li><a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer" className="text-arc-muted hover:text-arc-text text-sm transition-colors">Faucet</a></li>
            </ul>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-arc-secondary uppercase tracking-wider mb-4">//Explore</p>
            <ul className="space-y-3">
              <li><a href="https://arc.network/blog" target="_blank" rel="noopener noreferrer" className="text-arc-muted hover:text-arc-text text-sm transition-colors">Blog</a></li>
              <li><a href="https://arc.network/ecosystem" target="_blank" rel="noopener noreferrer" className="text-arc-muted hover:text-arc-text text-sm transition-colors">Ecosystem</a></li>
              <li><a href="https://arc.network/litepaper" target="_blank" rel="noopener noreferrer" className="text-arc-muted hover:text-arc-text text-sm transition-colors">Litepaper</a></li>
            </ul>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-arc-secondary uppercase tracking-wider mb-4">//Connect</p>
            <ul className="space-y-3">
              <li><a href="https://discord.com/invite/buildonarc" target="_blank" rel="noopener noreferrer" className="text-arc-muted hover:text-arc-text text-sm transition-colors">Discord</a></li>
              <li><a href="https://x.com/arc" target="_blank" rel="noopener noreferrer" className="text-arc-muted hover:text-arc-text text-sm transition-colors">X (Twitter)</a></li>
            </ul>
          </div>
        </div>
        
        <div className="arc-divider mt-10"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <p className="text-sm text-arc-muted">
            © 2026 Arc Analytics. Built for Arc Network Testnet.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://arc.network" target="_blank" rel="noopener noreferrer" className="text-sm text-arc-muted hover:text-arc-text transition-colors">
              arc.network
            </a>
            <a href="https://docs.arc.network/terms" target="_blank" rel="noopener noreferrer" className="text-sm text-arc-muted hover:text-arc-text transition-colors">
              Terms
            </a>
            <a href="https://circle.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-sm text-arc-muted hover:text-arc-text transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
