import { useState, useEffect } from 'react';
import { Settings, X, Check } from 'lucide-react';

const DEFAULT_RPC = 'https://rpc.testnet.arc.network';

export function getRpcUrl() {
  if (typeof window === 'undefined') return DEFAULT_RPC;
  return localStorage.getItem('arc-rpc-url') || DEFAULT_RPC;
}

export function setRpcUrl(url) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('arc-rpc-url', url);
}

export default function RpcSettings({ onRpcChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rpcUrl, setRpcUrlState] = useState(DEFAULT_RPC);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setRpcUrlState(getRpcUrl());
  }, []);

  const handleSave = () => {
    setRpcUrl(rpcUrl);
    setSaved(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleReset = () => {
    setRpcUrlState(DEFAULT_RPC);
    setRpcUrl(DEFAULT_RPC);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
        title="RPC Settings"
      >
        <Settings className="w-4 h-4 text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#5a8a7a] border border-white/20 rounded-2xl p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-white mb-2">RPC Settings</h2>
            <p className="text-white/60 text-sm mb-6">
              Configure a custom RPC endpoint to avoid rate limits
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wide mb-2">
                  RPC URL
                </label>
                <input
                  type="text"
                  value={rpcUrl}
                  onChange={(e) => setRpcUrlState(e.target.value)}
                  placeholder="https://rpc.testnet.arc.network"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors"
                >
                  {saved ? <Check className="w-4 h-4" /> : null}
                  {saved ? 'Saved!' : 'Save & Reload'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 text-white/60 hover:text-white transition-colors"
                >
                  Reset to Default
                </button>
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-xs text-white/50">
                  <strong className="text-white/70">Tip:</strong> You can get a free RPC endpoint from{' '}
                  <a href="https://www.quicknode.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:underline">QuickNode</a>,{' '}
                  <a href="https://www.alchemy.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:underline">Alchemy</a>, or{' '}
                  <a href="https://www.infura.io" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:underline">Infura</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}