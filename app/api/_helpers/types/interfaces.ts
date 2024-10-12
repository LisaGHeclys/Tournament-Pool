export type teamBody = {
  name: string;
  color: string;
  points?: number[];
};

export type tournamentBody = {
  id?: string;
  name: string;
  teams: teamBody[];
  createdBy: string;
};
