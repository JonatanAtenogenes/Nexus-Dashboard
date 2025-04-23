import { User } from "../interfaces/user";

export default function ListOfBestColabs({ users }: { users: Array<User> }) {
  return (
    <div className="bg-background-box shadow-default rounded-md p-unit-2 border border-border-neutral h-fit">
      <h2 className="text-h4 font-semibold text-brand-afore mb-unit-2 border-b border-border-neutral pb-2">
        Top 10 Colaboradores
      </h2>
      <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {users.map((user, index) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-2 rounded-sm hover:bg-background-soft transition-all duration-200 border-b border-border-neutral last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-caption font-medium ${
                  index === 0
                    ? "bg-brand-coppel"
                    : index === 1
                    ? "bg-background-office"
                    : index === 2
                    ? "bg-brand-coppel-max"
                    : "bg-text-soft"
                }`}
              >
                {index + 1}
              </span>
              <span className="text-text font-medium truncate max-w-36">
                {user.name}
              </span>
            </div>
            <span className="font-bold text-brand-afore">
              {user.points * 7}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
