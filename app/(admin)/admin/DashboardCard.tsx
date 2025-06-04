// components/admin/DashboardCard.tsx
const DashboardCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className={`p-4 ${color}`}>{icon}</div>
      <div className="p-4">
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
