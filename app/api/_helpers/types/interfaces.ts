type teamBody = {
  name: string;
  color: string;
  points?: number[];
};

export type addTournamentBody = {
  id?: string;
  name: string;
  teams: teamBody[];
  createdBy: string;
};
