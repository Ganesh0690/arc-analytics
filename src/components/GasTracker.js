import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard, { Skeleton, SectionLabel } from './StatCard';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl p-4">
        <p className="text-white/60 text-xs mb-2">Block #{label}</p>
        <p className="text-white font-semibold">{payload[0].value.toFixed(4)} gwei</p>
      </div>
    );
  }
  return null;
};

export default function GasTracker({ stats, gasHistory, loading }) {
  const avgGas = gasHistory.length > 0 
    ? (gasHistory.reduce((a, b) => a + b.gasPrice, 0) / gasHistory.length).toFixed(4)
    : '0';
  
  const minGas = gasHistory.length > 0 ? Math.min(...gasHistory.map(g => g.gasPrice)).toFixed(4) : '0';
  const maxGas = gasHistory.length > 0 ? Math.max(...gasHistory.map(g => g.gasPrice)).toFixed(4) : '0';

  const estimateCost = (gasLimit) => {
    if (!stats?.gasPrice) return '0.000000';
    return (parseFloat(stats.gasPrice) * gasLimit / 1e9).toFixed(6);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <SectionLabel>Gas Tracker</SectionLabel>
        <h2 className="arc-heading text-3xl mt-2">Real-time fee analytics</h2>
        <p className="text-white/70 mt-3 text-lg">Monitor gas prices and estimate transaction costs on Arc testnet</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Current Gas Price" value={parseFloat(stats?.gasPrice || 0).toFixed(4)} unit="gwei" loading={loading} highlighted />
        <StatCard label="Average (10 blocks)" value={avgGas} unit="gwei" loading={loading} />
        <StatCard label="Minimum" value={minGas} unit="gwei" loading={loading} />
        <StatCard label="Maximum" value={maxGas} unit="gwei" loading={loading} />
      </div>

      <div className="arc-card p-8">
        <SectionLabel>Price History</SectionLabel>
        <div className="h-80 mt-6">
          {loading ? (
            <div className="h-full flex items-end gap-3 px-8">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="flex-1 rounded-t-lg" style={{ height: `${Math.random() * 50 + 30}%` }} />
              ))}
            </div>
          ) : gasHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gasHistory} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gasGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.5)" stopOpacity={0.5}/>
                    <stop offset="100%" stopColor="rgba(255,255,255,0.1)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="block" 
                  stroke="rgba(255,255,255,0.4)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                  dy={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.4)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => v.toFixed(2)}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="gasPrice" 
                  stroke="rgba(255,255,255,0.8)" 
                  strokeWidth={2}
                  fill="url(#gasGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-white/50">No data available</div>
          )}
        </div>
      </div>

      <div className="arc-card p-8">
        <SectionLabel>Fee Estimator</SectionLabel>
        <p className="text-white/60 text-base mt-2 mb-6">Estimated costs based on current gas prices</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="arc-card-inner p-6 text-center">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-4">Simple Transfer</p>
            <p className="text-3xl font-light text-white">{estimateCost(21000)}</p>
            <p className="text-white/40 text-sm mt-2">USDC · 21,000 gas</p>
          </div>
          <div className="arc-card-inner p-6 text-center">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-4">Token Transfer</p>
            <p className="text-3xl font-light text-white">{estimateCost(65000)}</p>
            <p className="text-white/40 text-sm mt-2">USDC · 65,000 gas</p>
          </div>
          <div className="arc-card-inner p-6 text-center">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-4">Contract Call</p>
            <p className="text-3xl font-light text-white">{estimateCost(150000)}</p>
            <p className="text-white/40 text-sm mt-2">USDC · 150,000 gas</p>
          </div>
        </div>
      </div>
    </div>
  );
}