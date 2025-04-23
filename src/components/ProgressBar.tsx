interface ProgressBarProps {
  progress: number;
  label: string;
  emoji?: string;
  color?: string;
}

export default function ProgressBar({
  progress,
  label,
  emoji,
  color = "#006FB9",
}: ProgressBarProps) {
  return (
    <div className="mb-4">
      <div className="flex flex-row justify-between mb-1">
        <span className="text-sm text-gray-500">
          {emoji} {label}
        </span>
        <span className="text-sm font-medium text-gray-500">
          {Math.round(progress * 100)}%
        </span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full">
        <div
          className="h-2.5 rounded-full"
          style={{ width: `${progress * 100}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
