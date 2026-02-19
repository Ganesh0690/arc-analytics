const tabs = [
  { id: 'gas', label: 'Gas Tracker' },
  { id: 'network', label: 'Network Health' },
  { id: 'whales', label: 'Whale Activity' },
  { id: 'contracts', label: 'Contracts' }
];

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="flex items-center gap-2 p-1.5 bg-black/15 border border-white/15 rounded-2xl w-fit">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-black/25 text-white border border-white/25'
              : 'text-white/70 hover:text-white border border-transparent'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}