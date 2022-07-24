import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./apiFetch";

export type Vehicle = {
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
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

type UseVehicleParams = { url: string };

export function useVehicle(params: UseVehicleParams) {
  const url = params.url;

  return useQuery(
    [url],
    () => {
      return apiFetch(
        new Request(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        { 200: async (r) => (await r.json()) as Vehicle }
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
