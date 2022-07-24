import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./apiFetch";

export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

type UseFilmParams = { url?: string };

export function useFilm(params?: UseFilmParams) {
  const url = params?.url ?? "";

  return useQuery(
    [url],
    () => {
      return apiFetch(
        new Request(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        { 200: async (r) => (await r.json()) as Film }
      );
    },
    {
      enabled: Boolean(params?.url),
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
}
