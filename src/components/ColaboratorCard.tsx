import KeyIcon from "../assets/key.svg";
import { User } from "../interfaces/user";

export default function ColaboratorCard({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-between bg-background-box border border-border-neutral rounded-lg p-4 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-text">👤 {user.name}</h3>
        <p className="text-sm text-text-soft">ID: {user.id}</p>
      </div>
      <div className="flex items-center gap-2">
        <img src={KeyIcon} alt="Key Icon" className="w-[32px]" />
        <p className="text-xl font-bold text-brand-afore">{user.points * 7}</p>
      </div>
    </div>
  );
}
