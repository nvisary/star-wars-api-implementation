import { usePlanet } from "../../api";
import { DataCard } from "../../common/DataCard";

export function PlanetCard({ url }: { url: string }) {
  const { data: planet, isFetching } = usePlanet({ url });

  return (
    <DataCard
      title={planet?.name ?? ""}
      isFetching={isFetching}
      content={
        <>
          <div>Gravity: {planet?.gravity}</div>
          <div>Climate: {planet?.climate}</div>
          <div>Diameter: {planet?.diameter}</div>
          <div>Orbital period: {planet?.orbital_period}</div>
          <div>Population: {planet?.population}</div>
          <div>Rotation period: {planet?.rotation_period}</div>
          <div>Surface water: {planet?.surface_water}</div>
          <div>Terrain: {planet?.terrain}</div>
        </>
      }
    />
  );
}
