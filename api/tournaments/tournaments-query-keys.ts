export const tournamentsQueryKeys = {
  all: ["tournament"],
  tournaments: () => [...tournamentsQueryKeys.all, "tournament"],
  tournament: (id: string) => [...tournamentsQueryKeys.tournaments(), id],
  pagination: (page: number) => [...tournamentsQueryKeys.tournaments(), page],
  userTournaments: (userId: string | number) => [
    ...tournamentsQueryKeys.tournaments(),
    "user",
    userId,
  ],
};
