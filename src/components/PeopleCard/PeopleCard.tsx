import { Avatar, Text } from "@chakra-ui/react";
import { Card } from "../../common/Card";

import styles from "./PeopleCard.module.css";

export function PeopleCard({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <Card onClick={onClick}>
      <div className={styles.container}>
        <Avatar name={name} size="sm" bg="teal.500" color="white" />
        <Text>{name}</Text>
      </div>
    </Card>
  );
}
