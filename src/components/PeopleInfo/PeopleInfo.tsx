import { Heading, Divider, SkeletonText } from "@chakra-ui/react";
import { People } from "../../api";
import { Card } from "../../common/Card";
import styles from "./PeopleInfo.module.css";

export function PeopleInfo({
  people,
  isFetching,
}: {
  people?: People;
  isFetching?: boolean;
}) {
  if (!people && !isFetching) {
    return <>Failed to load info</>;
  }

  return (
    <Card className={styles.container}>
      {isFetching ? (
        <SkeletonText mt="4" noOfLines={9} spacing="4" />
      ) : (
        <>
          <div style={{ marginBottom: "8px" }}>
            <Heading as="h2" size="md" style={{ marginBottom: "4px" }}>
              Info
            </Heading>
            <Divider />
          </div>

          <div>Birth year: {people?.birth_year}</div>
          <div>Gender: {people?.gender}</div>
          <div>Height: {people?.height}</div>
          <div>Mass: {people?.mass}</div>
          <div>Skin color: {people?.skin_color}</div>
          <div>Hair color: {people?.hair_color}</div>
          <div>Eye color: {people?.eye_color}</div>
          <div>
            Created:{" "}
            {people?.created
              ? new Date(people.created).toLocaleDateString()
              : ""}
          </div>
          <div>
            Edited:{" "}
            {people?.edited ? new Date(people.edited).toLocaleDateString() : ""}
          </div>
        </>
      )}
    </Card>
  );
}
