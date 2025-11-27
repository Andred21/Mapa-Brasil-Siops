// DataMenuSection.tsx
interface DataMenuSectionProps {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function DataMenuSection({
  label,
  expanded,
  onToggle,
  children,
}: DataMenuSectionProps) {
  return (
    <div className="mb-3 rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div
        className="flex cursor-pointer select-none items-center justify-between px-4 py-3 hover:bg-gray-50 hover:rounded-2xl"
        onClick={onToggle}
      >
        <h2 className="text-lg font-bold text-gray-800">{label}</h2>
        <i className={`pi ${expanded ? "pi-chevron-up" : "pi-chevron-down"} text-gray-600`} />
      </div>

      {expanded && <div className="px-4 py-3">{children}</div>}
    </div>
  );
}
