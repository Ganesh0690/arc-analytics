import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import StatCard, { Skeleton, SectionLabel } from './StatCard';
import { formatAddress } from '../lib/data';
import { ARC_CONFIG } from '../lib/config';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-arc-card border border-arc-border rounded-xl p-4 shadow-xl">
        <p className="text-arc-muted text-xs mb-2">Block #{label}</p>
        <p className="text-arc-text font-mono font-semibold">{payload[0].value} transactions</p>
      </div>
    );
  }
  return null;
};

export default function NetworkHealth({ stats, blocks, tpsHistory, loading }) {
  const avgBlockTime = blocks.length > 1
    ? ((blocks[0]?.timestamp - blocks[blocks.length - 1]?.timestamp) / (blocks.length - 1)).toFixed(2)
    : '0';

  const avgTps = tpsHistory.length > 0
    ? (tpsHistory.reduce((a, b) => a + b.tps, 0) / tpsHistory.length).toFixed(2)
    : '0';

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <SectionLabel>Network Health</SectionLabel>
          <h2 className="arc-heading text-3xl mt-3">Arc Testnet Status</h2>
          <p className="text-arc-secondary mt-3 text-lg">Real-time network metrics and block production</p>
        </div>
        {!loading && (
          <div className="flex items-center gap-2 px-4 py-2 bg-arc-teal/10 border border-arc-teal/25 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-arc-teal" />
            <span className="text-sm font-medium text-arc-teal">Operational</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Block Height" value={stats?.blockNumber?.toLocaleString() || '—'} loading={loading} highlighted />
        <StatCard label="Block Time" value={avgBlockTime} unit="seconds" loading={loading} />
        <StatCard label="TPS" value={avgTps} unit="tx/s" loading={loading} />
        <StatCard label="Chain ID" value={stats?.chainId?.toString() || '—'} loading={loading} />
      </div>

      <div className="arc-card p-8">
        <SectionLabel>Transactions per Block</SectionLabel>
        <div className="h-72 mt-6">
          {loading ? (
            <div className="h-full flex items-end gap-2 px-8">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="flex-1 rounded-t-lg" style={{ height: `${Math.random() * 50 + 30}%` }} />
              ))}
            </div>
          ) : blocks.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...blocks].reverse()} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <XAxis 
                  dataKey="number" 
                  stroke="#6b8299" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#1e3a5f' }}
                  dy={10}
                />
                <YAxis 
                  stroke="#6b8299" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(74, 158, 151, 0.08)' }} />
                <Bar 
                  dataKey="txCount" 
                  fill="#4a9e97" 
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-arc-muted">No data available</div>
          )}
        </div>
      </div>

      <div className="arc-card overflow-hidden">
        <div className="p-6 border-b border-arc-border">
          <SectionLabel>Recent Blocks</SectionLabel>
        </div>
        
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-6">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 flex-1 max-w-xs" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-arc-bg-light">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-arc-muted uppercase tracking-wider">Block</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-arc-muted uppercase tracking-wider">Hash</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-arc-muted uppercase tracking-wider">Txns</th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-arc-muted uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-arc-border">
                {blocks.slice(0, 6).map((block) => (
                  <tr key={block.number} className="hover:bg-arc-bg-light/50 transition-colors">
                    <td className="py-4 px-6">
                      <a 
                        href={`${ARC_CONFIG.explorerUrl}/block/${block.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-sm text-arc-teal hover:text-arc-teal-light transition-colors"
                      >
                        #{block.number}
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm text-arc-secondary">{formatAddress(block.hash)}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-1 rounded-md bg-arc-bg-light text-arc-secondary text-xs font-medium">
                        {block.txCount}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-sm text-arc-muted">
                      {new Date(block.timestamp * 1000).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
