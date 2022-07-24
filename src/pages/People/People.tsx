import { useMemo } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { Button, Heading } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { usePeople } from "../../api";
import { PeopleInfo } from "../../components/PeopleInfo";

import styles from "./People.module.css";
import { FilmCard } from "../../components/FilmCard";
import { PlanetCard } from "../../components/PlanetCard";
import { StarshipCard } from "../../components/StarshipCard";
import { VehicleCard } from "../../components/VehicleCard";

export function People() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const search = useMemo(
    () => ({ url: searchParams.get("url") ?? undefined }),
    [searchParams]
  );

  const { data: people, isFetching } = usePeople({ url: search.url });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button leftIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
          Back
        </Button>
        <Heading className={styles.headline} size="2xl">
          {name}
        </Heading>
      </div>
      <div className={styles.section}>
        <PeopleInfo people={people} isFetching={isFetching} />
      </div>

      {people?.homeworld && (
        <div className={styles.section}>
          <Heading size="lg" as="h2">
            Homeworld
          </Heading>
          <PlanetCard url={people.homeworld} />
        </div>
      )}
      {people?.films && people.films.length > 0 && (
        <div className={styles.section}>
          <Heading size="lg" as="h2">
            Films
          </Heading>
          <div className={styles.list}>
            {people.films.map((url) => (
              <FilmCard key={url} url={url} />
            ))}
          </div>
        </div>
      )}
      {people?.starships && people.starships.length > 0 && (
        <div className={styles.section}>
          <Heading size="lg" as="h2">
            Starships
          </Heading>
          <div className={styles.list}>
            {people.starships.map((url) => (
              <StarshipCard key={url} url={url} />
            ))}
          </div>
        </div>
      )}
      {people?.vehicles && people.vehicles.length > 0 && (
        <div className={styles.section}>
          <Heading size="lg" as="h2">
            Vehicles
          </Heading>
          <div className={styles.list}>
            {people.vehicles.map((url) => (
              <VehicleCard key={url} url={url} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
