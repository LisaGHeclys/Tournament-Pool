export type teamBody = {
  name: string;
  color: string;
  points?: number[];
};

export type tournamentBody = {
  id?: number;
  name: string;
  teams: teamBody[];
  createdBy: string;
};
