import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpRight } from 'lucide-react';
import { formatAddress } from '../lib/data';
import { ARC_CONFIG } from '../lib/config';
import StatCard, { Skeleton, SectionLabel } from './StatCard';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl p-4">
        <p className="text-white/60 text-xs mb-2">{payload[0].payload.fullAddress}</p>
        <p className="text-white font-semibold">{payload[0].value} calls</p>
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
        <h2 className="arc-heading text-3xl mt-2">Smart contract interactions</h2>
        <p className="text-white/70 mt-3 text-lg">Most active contracts in the last 10 blocks</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
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
                  stroke="rgba(255,255,255,0.4)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.4)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={90}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="calls" radius={[0, 6, 6, 0]}>
                  {chartData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`rgba(255,255,255,${0.7 - index * 0.07})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-white/50">No contract activity</div>
          )}
        </div>
      </div>

      <div className="arc-card overflow-hidden">
        <div className="p-6 border-b border-white/10">
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
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📄</span>
            </div>
            <p className="text-white font-medium text-lg">No contract activity</p>
            <p className="text-white/50 mt-2">Contract interactions will appear here when detected</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {contracts.map((contract, i) => (
              <div key={contract.address} className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm ${
                    i === 0 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'bg-white/10 text-white/70 border border-white/15'
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <a 
                      href={`${ARC_CONFIG.explorerUrl}/address/${contract.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors"
                    >
                      {formatAddress(contract.address)}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <p className="text-xs text-white/40 mt-1">Last active: Block #{contract.lastBlock}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${i === 0 ? 'text-white' : 'text-white/80'}`}>
                      {contract.calls}
                    </p>
                    <p className="text-xs text-white/40">calls</p>
                  </div>
                  <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white/50 rounded-full transition-all duration-500"
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