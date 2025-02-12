export const tournamentsQueryKeys = {
  all: ["tournament"],
  tournaments: () => [...tournamentsQueryKeys.all, "tournament"],
  year: () => [...tournamentsQueryKeys.all, "year"],
  tournament: (id: string) => [...tournamentsQueryKeys.tournaments(), id],
  pagination: (page: number) => [...tournamentsQueryKeys.tournaments(), page],
  userTournaments: () => [...tournamentsQueryKeys.tournaments(), "user"],
};
