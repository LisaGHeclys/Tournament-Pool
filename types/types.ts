export type pointsBody = {
  reason: string;
  points: number;
  team: teamBody;
  createdBy: string;
  createdAt: Date;
};

export type teamBody = {
  name: string;
  color: string;
};

export type tournamentBody = {
  id?: string;
  name: string;
  teams: teamBody[];
  createdBy: string;
  createdAt: Date;
  points?: pointsBody[];
};

export type TournamentsByMonth = {
  [month: string]: number;
};
