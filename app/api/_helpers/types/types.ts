export type useFetchOptions = {
  url: string;
  method: Method;
  body?: object;
};

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
  createdAt: Date;
};

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
