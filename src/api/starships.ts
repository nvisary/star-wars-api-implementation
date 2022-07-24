import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./apiFetch";

export type Starship = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

type UseStarshipParams = { url: string };

export function useStarship(params: UseStarshipParams) {
  const url = params.url;

  return useQuery(
    [url],
    () => {
      return apiFetch(
        new Request(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        { 200: async (r) => (await r.json()) as Starship }
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
