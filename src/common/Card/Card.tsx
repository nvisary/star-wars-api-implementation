import cn from "classnames";
import styles from "./Card.module.css";

export function Card({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.pointer]: Boolean(onClick),
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
