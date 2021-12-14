import axios from "axios";
import useSWR from "swr";

export const fetcher = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const useAPI = <T>(path: string) =>
  useSWR(path, (url) => fetcher.get<T>(url).then((res) => res.data));

export default fetcher;
