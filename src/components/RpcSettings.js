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
    setTimeout(() => setSaved(false), 2000);
    if (onRpcChange) onRpcChange(rpcUrl);
  };

  const handleReset = () => {
    setRpcUrlState(DEFAULT_RPC);
    setRpcUrl(DEFAULT_RPC);
    if (onRpcChange) onRpcChange(DEFAULT_RPC);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-arc-card border border-arc-border hover:border-arc-border-light transition-colors"
        title="RPC Settings"
      >
        <Settings className="w-4 h-4 text-arc-muted" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg arc-card p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-arc-muted hover:text-arc-text"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-arc-text mb-2">RPC Settings</h2>
            <p className="text-arc-muted text-sm mb-6">
              Configure a custom RPC endpoint to avoid rate limits
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-arc-muted uppercase tracking-wide mb-2">
                  RPC URL
                </label>
                <input
                  type="text"
                  value={rpcUrl}
                  onChange={(e) => setRpcUrlState(e.target.value)}
                  placeholder="https://rpc.testnet.arc.network"
                  className="w-full px-4 py-3 bg-arc-bg-light border border-arc-border rounded-lg text-arc-text font-mono text-sm focus:outline-none focus:border-arc-teal"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 bg-arc-teal text-arc-bg font-medium rounded-lg hover:bg-arc-teal-light transition-colors"
                >
                  {saved ? <Check className="w-4 h-4" /> : null}
                  {saved ? 'Saved!' : 'Save & Reload'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 text-arc-muted hover:text-arc-text transition-colors"
                >
                  Reset to Default
                </button>
              </div>

              <div className="mt-6 p-4 bg-arc-bg-light rounded-lg border border-arc-border">
                <p className="text-xs text-arc-muted">
                  <strong className="text-arc-secondary">Tip:</strong> You can get a free RPC endpoint from{' '}
                  <a href="https://www.quicknode.com" target="_blank" rel="noopener noreferrer" className="text-arc-teal hover:underline">QuickNode</a>,{' '}
                  <a href="https://www.alchemy.com" target="_blank" rel="noopener noreferrer" className="text-arc-teal hover:underline">Alchemy</a>, or{' '}
                  <a href="https://www.infura.io" target="_blank" rel="noopener noreferrer" className="text-arc-teal hover:underline">Infura</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}