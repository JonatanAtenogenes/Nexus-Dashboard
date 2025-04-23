interface StatCardProps {
  title: string;
  value: number;
  total: number;
  emoji: string;
}

function StatCard({ title, value, total, emoji }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex-1 mx-1 text-center">
      <div className="text-lg font-bold mb-1">{emoji}</div>
      <div className="font-medium">{title}</div>
      <div className="text-primary text-xl font-bold">
        {value}/{total}
      </div>
    </div>
  );
}

export default StatCard;
