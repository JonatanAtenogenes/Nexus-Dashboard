import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartData } from "../interfaces/chartData";

export default function Chart({
  preparedData,
}: {
  preparedData: Array<ChartData>;
}) {
  return (
    <div className="bg-background-box border border-border-neutral rounded-md shadow-default h-80">
      <h2 className="text-h4 font-semibold p-unit-2 text-brand-afore border-b border-border-neutral">
        Métricas por Colaborador (Top 3)
      </h2>
      <div className="p-unit-2">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={preparedData}
            margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#717171" }}
              axisLine={{ stroke: "#D9E3F2" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#717171" }}
              axisLine={{ stroke: "#D9E3F2" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D9E3F2",
                borderRadius: "8px",
                boxShadow: "0px 6px 24px 0px rgba(25, 75, 123, 0.12)",
              }}
            />
            <Legend />
            <Bar
              dataKey="llaves"
              fill="#006FB9"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
              name="Llaves"
            />
            <Bar
              dataKey="puntos"
              fill="#FFDD35"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
              name="Puntos"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
