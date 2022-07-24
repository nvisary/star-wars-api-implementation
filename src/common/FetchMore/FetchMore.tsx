import { InView } from "react-intersection-observer";

export function FetchMore({
  hasData,
  isFetching,
  onFetchMore,
}: {
  hasData?: boolean;
  isFetching?: boolean;
  onFetchMore?: () => void;
}) {
  return (
    <InView
      as="div"
      skip={!hasData || isFetching}
      onChange={(inView: boolean) => {
        console.log("onChange, inView", inView);
        if (inView) {
          onFetchMore?.();
        }
      }}
    />
  );
}
