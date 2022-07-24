import { Text } from "@chakra-ui/react";
import { useFilm } from "../../api";
import { DataCard } from "../../common/DataCard";

import styles from "./FilmCard.module.css";

export function FilmCard({ url }: { url: string }) {
  const { data: film, isFetching } = useFilm({ url });

  return (
    <DataCard
      title={film?.title ?? ""}
      isFetching={isFetching}
      created={film?.created}
      edited={film?.edited}
      content={
        <>
          <div>Director: {film?.director}</div>
          <div>Producer: {film?.producer}</div>
          <div>Episode num: {film?.episode_id}</div>
          <div>Release date: {film?.release_date}</div>
          <div style={{ marginTop: "8px" }}>
            Crawl: <Text as="i">{film?.opening_crawl}</Text>
          </div>
        </>
      }
    />
  );
}
