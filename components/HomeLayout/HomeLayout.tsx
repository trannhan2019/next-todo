"use client";

import { AppShell, Burger, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";

import HomeHeader from "../HomeHeader/HomeHeader";

const HomeLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HomeHeader />
      </AppShell.Header>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
};

export default HomeLayout;
