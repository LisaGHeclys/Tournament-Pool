import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PUBLIC_URL,
});

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
