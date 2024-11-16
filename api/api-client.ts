import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
});

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
