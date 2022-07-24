import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiFetch } from "./apiFetch";
import { BASE_URL } from "./base";

export type People = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  films: string[];
  gender: string;
  homeworld: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
};

export type PeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: People[];
};

type UsePeopleParams = { url?: string };

export function usePeople(params?: UsePeopleParams) {
  const url = params?.url ?? "";

  return useQuery(
    [url],
    () => {
      return apiFetch(
        new Request(url.toString(), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        { 200: async (r) => (await r.json()) as People }
      );
    },
    {
      enabled: Boolean(params?.url),
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
}

type UsePeopleInfiniteParams = { search?: string };

export function usePeopleInfinite(params?: UsePeopleInfiniteParams) {
  const initialURl = new URL("api/people", BASE_URL);

  return useInfiniteQuery(
    [],
    ({ pageParam: next }: { pageParam?: string }) => {
      const url = new URL(next ?? initialURl);

      if (params?.search) {
        url.searchParams.set("search", params.search);
      }

      return apiFetch(
        new Request(url.toString(), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        { 200: async (r) => (await r.json()) as PeopleResponse }
      );
    },
    {
      getNextPageParam: ({ next }) => next ?? undefined,
    }
  );
}
