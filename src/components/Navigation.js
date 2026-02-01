const tabs = [
  { id: 'gas', label: 'Gas Tracker' },
  { id: 'network', label: 'Network Health' },
  { id: 'whales', label: 'Whale Activity' },
  { id: 'contracts', label: 'Contracts' }
];

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="flex items-center gap-1 p-1.5 bg-arc-card border border-arc-border rounded-xl w-fit">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-arc-bg-light text-arc-text border border-arc-border'
              : 'text-arc-muted hover:text-arc-secondary border border-transparent'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
