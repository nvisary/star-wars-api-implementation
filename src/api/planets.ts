import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./apiFetch";

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
};

type UsePlanetParams = { url: string };

export function usePlanet(params: UsePlanetParams) {
  const url = params.url;

  return useQuery(
    [url],
    () => {
      return apiFetch(
        new Request(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        { 200: async (r) => (await r.json()) as Planet }
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
