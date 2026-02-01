import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpRight } from 'lucide-react';
import { formatAddress } from '../lib/data';
import { ARC_CONFIG } from '../lib/config';
import StatCard, { Skeleton, SectionLabel } from './StatCard';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-arc-card border border-arc-border rounded-xl p-4 shadow-xl">
        <p className="text-arc-muted text-xs mb-2 font-mono">{payload[0].payload.fullAddress}</p>
        <p className="text-arc-text font-mono font-semibold">{payload[0].value} calls</p>
      </div>
    );
  }
  return null;
};

export default function ContractActivity({ contracts, loading }) {
  const totalCalls = contracts.reduce((a, b) => a + b.calls, 0);
  const chartData = contracts.slice(0, 8).map((c) => ({
    name: formatAddress(c.address),
    calls: c.calls,
    fullAddress: c.address
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <SectionLabel>Contract Activity</SectionLabel>
        <h2 className="arc-heading text-3xl mt-3">Smart contract interactions</h2>
        <p className="text-arc-secondary mt-3 text-lg">Most active contracts in the last 10 blocks</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Active Contracts" value={contracts.length.toString()} loading={loading} highlighted />
        <StatCard label="Total Calls" value={totalCalls.toString()} loading={loading} />
        <StatCard label="Top Contract" value={`${contracts[0]?.calls || 0}`} unit="calls" loading={loading} />
      </div>

      <div className="arc-card p-8">
        <SectionLabel>Call Distribution</SectionLabel>
        <div className="h-80 mt-6">
          {loading ? (
            <div className="h-full flex flex-col justify-center gap-4 px-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="h-8 rounded-md" style={{ width: `${90 - i * 12}%` }} />
                </div>
              ))}
            </div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <XAxis 
                  type="number" 
                  stroke="#6b8299" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#1e3a5f' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#6b8299" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={90}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(74, 158, 151, 0.05)' }} />
                <Bar dataKey="calls" radius={[0, 6, 6, 0]}>
                  {chartData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? '#5cb8b0' : `rgba(74, 158, 151, ${0.8 - index * 0.08})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-arc-muted">No contract activity</div>
          )}
        </div>
      </div>

      <div className="arc-card overflow-hidden">
        <div className="p-6 border-b border-arc-border">
          <SectionLabel>Contract Rankings</SectionLabel>
        </div>
        
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 arc-card-inner">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="h-5 flex-1 max-w-xs" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        ) : contracts.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-arc-bg-light flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📄</span>
            </div>
            <p className="text-arc-text font-medium text-lg">No contract activity</p>
            <p className="text-arc-muted mt-2">Contract interactions will appear here when detected</p>
          </div>
        ) : (
          <div className="divide-y divide-arc-border">
            {contracts.map((contract, i) => (
              <div key={contract.address} className="flex items-center justify-between p-5 hover:bg-arc-bg-light/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm ${
                    i === 0 
                      ? 'bg-arc-teal/20 text-arc-teal border border-arc-teal/30' 
                      : 'bg-arc-bg-light text-arc-secondary border border-arc-border'
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <a 
                      href={`${ARC_CONFIG.explorerUrl}/address/${contract.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-sm text-arc-text hover:text-arc-teal transition-colors"
                    >
                      {formatAddress(contract.address)}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <p className="text-xs text-arc-muted mt-1">Last active: Block #{contract.lastBlock}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className={`font-mono text-sm font-semibold ${i === 0 ? 'text-arc-teal-light' : 'text-arc-text'}`}>
                      {contract.calls}
                    </p>
                    <p className="text-xs text-arc-muted">calls</p>
                  </div>
                  <div className="w-32 h-2 bg-arc-bg-light rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-arc-teal rounded-full transition-all duration-500"
                      style={{ width: `${(contract.calls / (contracts[0]?.calls || 1)) * 100}%` }}
                    />
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
