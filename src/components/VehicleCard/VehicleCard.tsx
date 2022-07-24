import { useVehicle } from "../../api";
import { DataCard } from "../../common/DataCard";

export function VehicleCard({ url }: { url: string }) {
  const { data: vehicle, isFetching } = useVehicle({ url });

  return (
    <DataCard
      title={vehicle?.name ?? ""}
      isFetching={isFetching}
      created={vehicle?.created}
      edited={vehicle?.edited}
      content={
        <>
          <div>Cargo capacity: {vehicle?.cargo_capacity}</div>
          <div>Consumables: {vehicle?.consumables}</div>
          <div>Cost in credits: {vehicle?.cost_in_credits}</div>
          <div>Crew: {vehicle?.crew}</div>
          <div>Length: {vehicle?.length}</div>
          <div>Manufacturer: {vehicle?.manufacturer}</div>
          <div>Max atmosphering speed: {vehicle?.max_atmosphering_speed}</div>
          <div>Model: {vehicle?.model}</div>
          <div>Passengers: {vehicle?.passengers}</div>
          <div>Vehicle class: {vehicle?.vehicle_class}</div>
        </>
      }
    />
  );
}
