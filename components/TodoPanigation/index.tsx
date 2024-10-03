"use client";
import useUrlParams from "@/hooks/useUrlParams";
import { Group, Pagination, Select } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

const TodoPagination = ({ total }: any) => {
  //   console.log("total", total);
  const router = useRouter();
  const path = usePathname();
  const params = useUrlParams();
  console.log(params);
  const onChange = (page: number) => {
    const newParams = new URLSearchParams({ ...params, page: page.toString() });
    router.push(`${path}?${newParams.toString()}`);
    // console.log(newParams.toString());
  };

  const onFirstPage = () => {
    const newParams = new URLSearchParams({ ...params, page: "1" });
    router.push(`${path}?${newParams.toString()}`);
  };

  const onLastPage = () => {
    const newParams = new URLSearchParams({
      ...params,
      page: total?.toString(),
    });
    router.push(`${path}?${newParams.toString()}`);
  };

  const onSelectChange = (value: any) => {
    const newParams = new URLSearchParams({ ...params, limit: value });
    router.push(`${path}?${newParams.toString()}`);
  };

  return (
    <Group>
      <Pagination.Root
        total={Number(total)}
        onChange={onChange}
        onFirstPage={onFirstPage}
        onLastPage={onLastPage}
      >
        <Group gap={5} justify="center">
          <Pagination.First />
          <Pagination.Items />
          <Pagination.Last />
        </Group>
      </Pagination.Root>

      <Select
        placeholder="Select value"
        data={["3", "5"]}
        onChange={onSelectChange}
        defaultSearchValue="3"
        w={80}
      />
    </Group>
  );
};

export default TodoPagination;
