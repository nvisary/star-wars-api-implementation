import { useEffect, useRef, useState } from "react";
import { InputGroup, InputLeftAddon, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useDebouncedState } from "../useDebouncedState";

export function Search({
  value,
  onChange,
  placeholder,
}: {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState(value ?? "");

  const debouncedValue = useDebouncedState(inputValue, 300);
  const prevDebouncedValue = useRef(debouncedValue);

  useEffect(() => {
    if (prevDebouncedValue.current !== debouncedValue) {
      prevDebouncedValue.current = debouncedValue;
      onChange(debouncedValue);
    }
  }, [onChange, debouncedValue]);

  return (
    <InputGroup style={{ marginBottom: "8px" }}>
      <InputLeftAddon pointerEvents="none">
        <Search2Icon color="gray.300" />
      </InputLeftAddon>
      <Input
        type="search"
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </InputGroup>
  );
}
