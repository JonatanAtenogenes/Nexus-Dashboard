import { microentrepreneur } from "../interfaces/microentrepreneur";

interface ProgressData {
  keysCollected: number;
  progress: number; // from 0 to 1
  lastActivity: string;
}

interface MicroempresarioCardProps {
  referral: microentrepreneur;
  progressData: ProgressData;
  onPress: () => void;
  isSelected: boolean;
}

function MicroempresarioCard({
  referral,
  progressData,
  onPress,
  isSelected,
}: MicroempresarioCardProps) {
  const progressColor =
    progressData.progress > 0.7
      ? "#4CAF50"
      : progressData.progress > 0.3
      ? "#FF9800"
      : "#F44336";

  return (
    <button
      onClick={onPress}
      className={`w-full text-left bg-white rounded-xl p-4 mb-3 shadow-sm ${
        isSelected ? "border-2 border-primary" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="text-xl mr-2">👤</span>
          <div>
            <div className="font-bold">
              {referral.name} {referral.last_name}
            </div>
            <div className="text-gray-500 text-xs">{referral.email}</div>
          </div>
        </div>
        <div className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
          {progressData.keysCollected} 🔑
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between mb-1 text-xs text-gray-500">
          <span>Progreso General</span>
          <span>{Math.round(progressData.progress * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${progressData.progress * 100}%`,
              backgroundColor: progressColor,
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>🕒 Última actividad: {progressData.lastActivity}</span>
        <span className="text-primary font-medium">Ver detalles ⌄</span>
      </div>
    </button>
  );
}

export default MicroempresarioCard;
