import { useState, useMemo, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { People, usePeopleInfinite } from "../../api";
import { FetchMore } from "../../common/FetchMore";
import { PeopleCard } from "../PeopleCard/PeopleCard";
import { Search } from "../../common/Search";

export function PeopleList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, fetchNextPage, hasNextPage, isFetching, refetch, isFetched } =
    usePeopleInfinite({
      search,
    });

  useEffect(() => {
    if (isFetched) {
      refetch();
    }
  }, [search]);

  const people = useMemo(
    () => data?.pages.flatMap(({ results }) => results),
    [data]
  );

  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      <Search
        value={search}
        onChange={setSearch}
        placeholder="Find a character"
      />
      <div style={{ display: "grid", gap: "8px" }}>
        {people?.map((people: People) => (
          <PeopleCard
            name={people.name}
            key={people.name}
            onClick={() => {
              navigate({
                pathname: `/people/${people.name}`,
                search: `${createSearchParams({ url: people.url })}`,
              });
            }}
          />
        ))}
        {isFetching && "Loading..."}
      </div>
      {hasNextPage && (
        <FetchMore
          hasData={Boolean(people)}
          isFetching={isFetching}
          onFetchMore={fetchNextPage}
        />
      )}
    </div>
  );
}
