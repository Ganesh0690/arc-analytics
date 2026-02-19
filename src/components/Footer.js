export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 border-2 border-white/50 rounded-full"></div>
              <span className="text-lg font-semibold text-white">Arc Analytics</span>
            </div>
            <p className="text-white/50 text-base leading-relaxed">
              The Economic OS for the internet. Purpose-built for stablecoin finance.
            </p>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em] mb-5">Build</p>
            <ul className="space-y-3">
              <li><a href="https://docs.arc.network" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-base transition-colors">Documentation</a></li>
              <li><a href="https://testnet.arcscan.app" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-base transition-colors">Explorer</a></li>
              <li><a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-base transition-colors">Faucet</a></li>
            </ul>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em] mb-5">Explore</p>
            <ul className="space-y-3">
              <li><a href="https://arc.network/blog" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-base transition-colors">Blog</a></li>
              <li><a href="https://arc.network/ecosystem" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-base transition-colors">Ecosystem</a></li>
              <li><a href="https://arc.network/litepaper" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-base transition-colors">Litepaper</a></li>
            </ul>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em] mb-5">Connect</p>
            <ul className="space-y-3">
              <li><a href="https://discord.com/invite/buildonarc" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-base transition-colors">Discord</a></li>
              <li><a href="https://x.com/arc" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-base transition-colors">X (Twitter)</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © 2026 Arc Analytics. Built for Arc Network Testnet.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://arc.network" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors">
              arc.network
            </a>
            <a href="https://docs.arc.network/terms" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors">
              Terms
            </a>
            <a href="https://circle.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}