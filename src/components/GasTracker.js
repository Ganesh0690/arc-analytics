import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard, { Skeleton, SectionLabel } from './StatCard';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-arc-card border border-arc-border rounded-xl p-4 shadow-xl">
        <p className="text-arc-muted text-xs mb-2">Block #{label}</p>
        <p className="text-arc-teal-light font-mono font-semibold">{payload[0].value.toFixed(4)} gwei</p>
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
        <h2 className="arc-heading text-3xl mt-3">Real-time fee analytics</h2>
        <p className="text-arc-secondary mt-3 text-lg">Monitor gas prices and estimate transaction costs on Arc testnet</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Current Gas Price" value={parseFloat(stats?.gasPrice || 0).toFixed(4)} unit="gwei" loading={loading} highlighted />
        <StatCard label="Average (10 blocks)" value={avgGas} unit="gwei" loading={loading} />
        <StatCard label="Minimum" value={minGas} unit="gwei" loading={loading} />
        <StatCard label="Maximum" value={maxGas} unit="gwei" loading={loading} />
      </div>

      <div className="arc-card p-8">
        <SectionLabel>Price History</SectionLabel>
        <div className="h-80 mt-6">
          {loading ? (
            <div className="h-full flex items-end gap-2 px-8">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="flex-1 rounded-t-lg" style={{ height: `${Math.random() * 50 + 30}%` }} />
              ))}
            </div>
          ) : gasHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gasHistory} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gasGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4a9e97" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#4a9e97" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="block" 
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
                  tickFormatter={(v) => v.toFixed(2)}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="gasPrice" 
                  stroke="#5cb8b0" 
                  strokeWidth={2}
                  fill="url(#gasGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-arc-muted">No data available</div>
          )}
        </div>
      </div>

      <div className="arc-card p-8">
        <SectionLabel>Fee Estimator</SectionLabel>
        <p className="text-arc-secondary text-sm mt-2 mb-6">Estimated costs based on current gas prices</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="arc-card-inner p-5">
            <p className="text-arc-muted text-xs font-medium uppercase tracking-wide mb-3">Simple Transfer</p>
            <p className="text-3xl font-light text-arc-teal-light">{estimateCost(21000)}</p>
            <p className="text-arc-muted text-sm mt-2">USDC · 21,000 gas</p>
          </div>
          <div className="arc-card-inner p-5">
            <p className="text-arc-muted text-xs font-medium uppercase tracking-wide mb-3">Token Transfer</p>
            <p className="text-3xl font-light text-arc-text">{estimateCost(65000)}</p>
            <p className="text-arc-muted text-sm mt-2">USDC · 65,000 gas</p>
          </div>
          <div className="arc-card-inner p-5">
            <p className="text-arc-muted text-xs font-medium uppercase tracking-wide mb-3">Contract Call</p>
            <p className="text-3xl font-light text-arc-text">{estimateCost(150000)}</p>
            <p className="text-arc-muted text-sm mt-2">USDC · 150,000 gas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
