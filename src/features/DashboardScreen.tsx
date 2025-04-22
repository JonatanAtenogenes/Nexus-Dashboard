import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { User } from "../interfaces/user";
import ColaboratorCard from "../components/ColaboratorCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function syncAllUsers() {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(query(collection(db, "users")));
      const userList: Array<User> = [];
      querySnapshot.forEach((doc) => {
        userList.push({ ...doc.data(), id: doc.id } as User);
      });

      const sorted = userList.sort((a, b) => b.points - a.points);
      setUsers(sorted);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    syncAllUsers();
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold text-text">Loading...</h1>
    </div>
  ) : (
    <div className="bg-background-default min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-text">Panel de Colaboradores</h1>
      </header>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar colaborador..."
          className="border border-border-neutral rounded-lg p-2 w-64 bg-background-box text-text"
        />
        <select className="border border-border-neutral rounded-lg p-2 bg-background-box text-text">
          <option value="">Todos los tipos</option>
          <option value="admin">Administrador</option>
          <option value="editor">Editor</option>
          <option value="viewer">Lector</option>
        </select>
      </div>

      <div className="flex gap-6">
        {/* Left: User Cards and Chart */}
        <div className="flex-1 space-y-6">
          {/* Graph */}
          <div className="bg-background-box border border-border-neutral rounded-xl p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-text">
              Llaves por Colaborador
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={users.map((u) => ({ name: u.name, keys: u.points * 7 }))}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="keys" fill="#006FB9" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Cards */}
          <div className="space-y-4">
            {users.map((user) => (
              <ColaboratorCard key={user.id} user={user} />
            ))}
          </div>
        </div>

        {/* Right: Stats */}
        <aside className="w-80 bg-background-box shadow-md rounded-xl p-4 border border-border-neutral h-fit">
          <h2 className="text-xl font-semibold text-text">Resumen</h2>
          <div className="mt-4 space-y-4 text-text-soft">
            <StatItem label="Total de Webinars" value={12} />
            <StatItem label="Cursos Activos" value={5} />
            <StatItem label="Colaboradores Totales" value={users.length} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between border-b border-border-soft pb-2">
      <span>{label}</span>
      <span className="font-semibold text-text">{value}</span>
    </div>
  );
}
