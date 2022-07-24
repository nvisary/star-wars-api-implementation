import { SkeletonText, Heading, Divider, Text } from "@chakra-ui/react";
import { Card } from "../Card";

import styles from "./DataCard.module.css";

export function DataCard({
  isFetching,
  title,
  content,
  created,
  edited,
}: {
  title: string;
  isFetching?: boolean;
  content?: React.ReactNode;
  created?: string;
  edited?: string;
}) {
  return (
    <Card className={styles.card}>
      {isFetching ? (
        <SkeletonText mt="4" noOfLines={9} spacing="4" />
      ) : (
        <>
          <div style={{ marginBottom: "8px" }}>
            <Heading as="h2" size="md" style={{ marginBottom: "4px" }}>
              {title}
            </Heading>
            <Divider />
          </div>

          {content}
          {(created || edited) && (
            <div className={styles.dates}>
              {created ? (
                <Text color="gray" fontSize="14px">
                  Created: {new Date(created).toLocaleDateString()}
                </Text>
              ) : null}
              {edited ? (
                <Text color="gray" fontSize="14px">
                  Edited: {new Date(edited).toLocaleDateString()}
                </Text>
              ) : null}
            </div>
          )}
        </>
      )}
    </Card>
  );
}
