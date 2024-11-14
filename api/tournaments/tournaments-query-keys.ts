export const tournamentsQueryKeys = {
  all: ["tournament"],
  tournament: (id: string) => [...tournamentsQueryKeys.all, id],
  tournaments: (page: number) => [
    ...tournamentsQueryKeys.all,
    "pagination",
    page,
  ],
  userTournaments: (userId: string | number) => [
    ...tournamentsQueryKeys.all,
    "user",
    userId,
  ],
};
