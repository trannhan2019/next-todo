"use client";
import useUrlParams from "@/hooks/useUrlParams";
import { Group, Pagination, NativeSelect } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

const TodoPagination = ({ total }: any) => {
  //   console.log("total", total);
  const router = useRouter();
  const path = usePathname();
  const params = useUrlParams();
  // console.log(params);
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

  const onSelectChange = (event: any) => {
    const newParams = new URLSearchParams({
      ...params,
      limit: event.currentTarget.value,
    });
    router.push(`${path}?${newParams.toString()}`);
  };

  return (
    <Group>
      <Pagination
        withEdges
        withControls={false}
        total={Number(total)}
        value={Number(params?.page || 1)}
        onChange={onChange}
        onFirstPage={onFirstPage}
        onLastPage={onLastPage}
      />

      <NativeSelect
        data={["3", "5"]}
        value={params?.limit || "5"}
        onChange={(event) => onSelectChange(event)}
        w={80}
      />
    </Group>
  );
};

export default TodoPagination;
