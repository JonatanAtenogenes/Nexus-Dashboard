import { useState } from "react";
import { User } from "../interfaces/user";
import ReferralsCard from "./ReferralsCard";

export default function CollaboratorCard({
  user,
  index,
  currentPage,
  usersPerPage,
}: {
  user: User;
  index: number;
  currentPage: number;
  usersPerPage: number;
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-background-office flex items-center justify-center text-brand-afore font-bold text-lg">
            {user.name.substring(0, 1).toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold text-text">{user.name}</h4>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <div className="w-6 h-6 rounded-full bg-brand-coppel flex items-center justify-center text-text text-sm">
              {index + 1 + (currentPage - 1) * usersPerPage}
            </div>
            <span className="font-bold text-brand-afore text-h4">
              {user.points * 7}
            </span>
          </div>
          <p className="text-text-soft text-small">Llaves acumuladas</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border-neutral flex justify-between">
        <div>
          <span className="text-text-soft text-small">Puntos:</span>
          <span className="ml-2 font-medium">{user.points}</span>
        </div>
        <button
          className="text-brand-afore hover:underline text-small"
          onClick={() => setShowDetails(!showDetails)}
        >
          Ver detalles
        </button>
      </div>

      {showDetails && <ReferralsCard />}
    </>
  );
}
