import { useStarship } from "../../api";
import { DataCard } from "../../common/DataCard";

export function StarshipCard({ url }: { url: string }) {
  const { data: starship, isFetching } = useStarship({ url });

  return (
    <DataCard
      title={starship?.name ?? ""}
      isFetching={isFetching}
      created={starship?.created}
      edited={starship?.edited}
      content={
        <>
          <div>MGLT: {starship?.MGLT}</div>
          <div>Cargo capacity: {starship?.cargo_capacity}</div>
          <div>Consumables: {starship?.consumables}</div>
          <div>Cost in credits: {starship?.cost_in_credits}</div>
          <div>Crew: {starship?.crew}</div>
          <div>Hyperdrive rating: {starship?.hyperdrive_rating}</div>
          <div>Length: {starship?.length}</div>
          <div>Manufacturer: {starship?.manufacturer}</div>
          <div>Max atmosphering speed: {starship?.max_atmosphering_speed}</div>
          <div>Model: {starship?.model}</div>
          <div>Passengers: {starship?.passengers}</div>
          <div>Starship class: {starship?.starship_class}</div>
        </>
      }
    />
  );
}
