export type useFetchOptions = {
  url: string;
  method: Method;
  body?: object;
};

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
  points: pointsBody[];
};

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
