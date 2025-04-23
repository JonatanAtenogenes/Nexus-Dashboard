import { useEffect, useState } from "react";
import { microentrepreneurs } from "../data/Microentrepreneurs";
import { microentrepreneur } from "../interfaces/microentrepreneur";
import { generateMockData } from "../utils/MockData";

export default function ReferralsCard() {
  const [referrals, setReferrals] = useState<microentrepreneur[]>([]);
  const [loading, setLoading] = useState(true);
  const [referralProgressData, setReferralProgressData] = useState({});
  const [userProgress, setUserProgress] = useState({
    totalRegistros: 0,
    metaSemanal: 15,
    registrosSemana: 0,
    nivel: 1,
  });

  useEffect(() => {
    loadReferrals();
  }, []);

  const loadReferrals = async () => {
    try {
      const referralData = microentrepreneurs;

      const progressDataMap = {};
      referralData.forEach((referral) => {
        progressDataMap[Number(referral.id)] = generateMockData(
          Number(referral.id)
        );
      });

      setReferrals(referralData);
      setReferralProgressData(progressDataMap);

      setUserProgress({
        totalRegistros: referralData.length,
        metaSemanal: 15,
        registrosSemana: Math.min(referralData.length, 8),
        nivel: referralData.length > 20 ? 3 : referralData.length > 10 ? 2 : 1,
      });
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Mis Registros</h2>

        {/* Progreso */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-lg font-semibold">Tu Progreso</p>
            <p className="text-gray-500">Nivel actual: {userProgress.nivel}</p>
          </div>
          <div className="bg-primary-light text-primary font-medium text-sm px-3 py-1 rounded-full">
            {userProgress.totalRegistros} Registros
          </div>
        </div>

        {/* Meta semanal */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1 text-gray-500">
            <span>
              🎯 Meta semanal ({userProgress.registrosSemana}/
              {userProgress.metaSemanal})
            </span>
            <span className="font-medium">
              {Math.round(
                (userProgress.registrosSemana / userProgress.metaSemanal) * 100
              )}
              %
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (userProgress.registrosSemana / userProgress.metaSemanal) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Esta semana</p>
            <p className="text-2xl font-bold text-primary">
              {userProgress.registrosSemana}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-purple-600">
              {userProgress.totalRegistros}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
