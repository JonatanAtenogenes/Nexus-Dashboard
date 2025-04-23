import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { User } from "../interfaces/user";
import ColaboratorCard from "../components/ColaboratorCard";
import Loading from "../components/LoadingComponent";
import HeaderCard from "../components/HeaderCard";
import ListOfBestColabs from "../components/ListOfBestColabs";
import Chart from "../components/Chart";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minKeys, setMinKeys] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) &&
      u.points * 7 >= minKeys
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const prepareChartData = (users: Array<User>) => {
    return users.slice(0, 3).map((user: User) => ({
      name:
        user.name.length > 8 ? `${user.name.substring(0, 8)}...` : user.name,
      llaves: user.points * 7,
      puntos: user.points,
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-background min-h-screen p-unit-3">
      <div className="max-w-7xl mx-auto">
        <HeaderCard />
        <div className="flex flex-col md:flex-row gap-unit-4">
          {/* Left: Top 10 Collaborators + Chart */}
          <aside className="w-full md:w-80 flex flex-col gap-unit-4">
            {/* Top 10 Colaboradores */}
            <ListOfBestColabs users={users.slice(0, 10)} />
            {/* Chart */}
            <Chart preparedData={prepareChartData(users)} />
          </aside>

          {/* Center: Search, Filter and Paginated List */}
          <main className="flex-1 flex flex-col gap-unit-4">
            {/* Search & Filter */}
            <section className="bg-background-box p-unit-2 rounded-md shadow-default border border-border-neutral">
              <h3 className="text-h4 font-medium text-text mb-4">
                Buscar y Filtrar
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Buscar colaborador..."
                    className="p-2 pl-10 border border-border-neutral rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-brand-afore focus:border-transparent"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <svg
                    className="absolute left-3 top-2.5 text-text-soft"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="relative w-full sm:w-40">
                  <input
                    type="number"
                    min={0}
                    placeholder="Llaves mínimas"
                    className="p-2 pl-10 border border-border-neutral rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-brand-afore focus:border-transparent"
                    value={minKeys === 0 ? "" : minKeys}
                    onChange={(e) => {
                      setMinKeys(e.target.value ? parseInt(e.target.value) : 0);
                      setCurrentPage(1);
                    }}
                  />
                  <svg
                    className="absolute left-3 top-2.5 text-text-soft"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 7H3M15 12H3M9 17H3M14 7L17.5 10.5M17.5 10.5L21 7M17.5 10.5V20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center border-t border-border-neutral pt-3">
                <p className="text-text-soft text-small">
                  {filteredUsers.length} colaboradores encontrados
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-h4 font-semibold text-text mb-4">
                Colaboradores
              </h3>

              <div className="space-y-unit-2">
                {paginatedUsers.length === 0 ? (
                  <div className="bg-background-box border border-border-neutral rounded-md p-unit-3 text-center shadow-default">
                    <svg
                      className="w-16 h-16 mx-auto text-text-neutral mb-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 10C11.6569 10 13 8.65685 13 7C13 5.34315 11.6569 4 10 4C8.34315 4 7 5.34315 7 7C7 8.65685 8.34315 10 10 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 21V19C3 17.9391 3.42143 16.9217 4.17157 16.1716C4.92172 15.4214 5.93913 15 7 15H13C14.0609 15 15.0783 15.4214 15.8284 16.1716C16.5786 16.9217 17 17.9391 17 19V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 4C16.8604 4.2528 17.623 4.75 18.1676 5.43L18.1686 5.431C18.7142 6.112 19.0115 6.941 19.0115 7.795C19.0115 8.649 18.7142 9.478 18.1686 10.159"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 21V19C20.9966 18.1622 20.7038 17.3506 20.1666 16.693C19.6293 16.0354 18.8809 15.5705 18.06 15.37"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-text-soft mb-4">
                      No se encontraron colaboradores con los filtros actuales.
                    </p>
                    <button
                      className="px-4 py-2 bg-background-soft text-brand-afore border border-brand-afore rounded-sm hover:bg-brand-afore hover:text-white transition-colors"
                      onClick={() => {
                        setSearch("");
                        setMinKeys(0);
                      }}
                    >
                      Limpiar filtros
                    </button>
                  </div>
                ) : (
                  paginatedUsers.map((user, index) => (
                    <div
                      key={user.id}
                      className="bg-background-box border border-border-neutral rounded-md p-4 shadow-default hover:shadow-hover transition-shadow"
                    >
                      <ColaboratorCard
                        user={user}
                        index={index}
                        currentPage={currentPage}
                        usersPerPage={usersPerPage}
                      />
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Pagination controls */}
            {filteredUsers.length > 0 && (
              <nav className="flex justify-between items-center bg-background-box p-4 rounded-md shadow-default border border-border-neutral">
                <button
                  className="px-3 py-2 bg-background-soft border border-border-neutral rounded-sm hover:bg-brand-afore hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-background-soft disabled:hover:text-text flex items-center gap-1"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Anterior
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Calculate page numbers to show (centered around current page)
                    let pageToShow;
                    if (totalPages <= 5) {
                      pageToShow = i + 1;
                    } else if (currentPage <= 3) {
                      pageToShow = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageToShow = totalPages - 4 + i;
                    } else {
                      pageToShow = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={i}
                        className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                          currentPage === pageToShow
                            ? "bg-brand-afore text-white"
                            : "bg-background-soft text-text-soft hover:bg-background-office"
                        }`}
                        onClick={() => goToPage(pageToShow)}
                      >
                        {pageToShow}
                      </button>
                    );
                  })}
                </div>

                <button
                  className="px-3 py-2 bg-background-soft border border-border-neutral rounded-sm hover:bg-brand-afore hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-background-soft disabled:hover:text-text flex items-center gap-1"
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                >
                  Siguiente
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </nav>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
