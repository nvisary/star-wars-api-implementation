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

function Section({
  dataUrls,
  header,
  content,
}: {
  dataUrls?: string[];
  header: string;
  content: React.ReactNode;
}) {
  if (!dataUrls?.length) {
    return null;
  }

  return (
    <div className={styles.section}>
      <Heading size="lg" as="h2">
        {header}
      </Heading>
      <div className={styles.list}>{content}</div>
    </div>
  );
}

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
      <Section
        header="Films"
        dataUrls={people?.films}
        content={
          <>
            {people?.films.map((url) => (
              <FilmCard url={url} key={url} />
            ))}
          </>
        }
      />

      <Section
        header="Starships"
        dataUrls={people?.starships}
        content={
          <>
            {people?.starships.map((url) => (
              <StarshipCard key={url} url={url} />
            ))}
          </>
        }
      />
      <Section
        header="Vehicles"
        dataUrls={people?.vehicles}
        content={
          <>
            {people?.vehicles.map((url) => (
              <VehicleCard key={url} url={url} />
            ))}
          </>
        }
      />
    </div>
  );
}
