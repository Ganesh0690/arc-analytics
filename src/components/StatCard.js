export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}

export function SectionLabel({ children }) {
  return (
    <p className="text-sm tracking-[0.2em] uppercase text-white/50 font-semibold mb-2">
      {children}
    </p>
  );
}

export default function StatCard({ label, value, unit, loading, highlighted }) {
  if (loading) {
    return (
      <div className="arc-card p-7">
        <Skeleton className="h-3 w-24 mb-5" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  return (
    <div className={`arc-card p-7 ${highlighted ? 'border-white/30' : ''}`}>
      <p className="arc-stat-label mb-5">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className={`arc-stat-value ${highlighted ? 'text-shadow-glow' : ''}`}>
          {value}
        </span>
        {unit && <span className="text-base text-white/50 font-medium">{unit}</span>}
      </div>
    </div>
  );
}