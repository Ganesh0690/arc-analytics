export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}

export function SectionLabel({ children }) {
  return (
    <p className="arc-label">
      <span className="text-arc-accent">{'{'}</span>
      <span className="arc-label-text">{children}</span>
      <span className="text-arc-accent">{'}'}</span>
    </p>
  );
}

export default function StatCard({ label, value, unit, loading, highlighted }) {
  if (loading) {
    return (
      <div className="arc-card p-6">
        <Skeleton className="h-3 w-24 mb-5" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  return (
    <div className={`arc-card p-6 ${highlighted ? 'border-arc-teal/30' : ''}`}>
      <p className="arc-stat-label mb-4">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className={`arc-stat-value ${highlighted ? 'text-arc-teal-light' : ''}`}>
          {value}
        </span>
        {unit && <span className="text-sm text-arc-muted font-medium">{unit}</span>}
      </div>
    </div>
  );
}
