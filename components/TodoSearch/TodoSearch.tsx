"use client";

import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { TextInput, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import useUrlParams from "@/hooks/useUrlParams";
import { useDebouncedCallback } from "@mantine/hooks";

const TodoSearch = () => {
  const router = useRouter();

  const pathname = usePathname();

  const params = useUrlParams();

  const [value, setValue] = useState("");

  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

  const handleSearch = useDebouncedCallback(() => {
    const newParams = new URLSearchParams({
      ...params,
      page: "1",
      search: value,
    });
    router.push(`${pathname}?${newParams.toString()}`);
  }, 300);

  const onChange = (event: any) => {
    setValue(event.currentTarget.value);
    handleSearch();
  };

  return (
    <>
      <TextInput
        label="Search"
        mb={10}
        size="sm"
        rightSection={icon}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default TodoSearch;
