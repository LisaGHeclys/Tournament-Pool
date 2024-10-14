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

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
