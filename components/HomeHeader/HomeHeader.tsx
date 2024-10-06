"use client";

import { useState } from "react";
import {
  Container,
  Group,
  Burger,
  Menu,
  UnstyledButton,
  Avatar,
  Text,
  rem,
  Anchor,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./style.module.css";
import { IconChevronDown, IconHeart, IconPower } from "@tabler/icons-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const links = [
  { link: "/dashboard", label: "Dashboard" },
  { link: "/manager", label: "Manager" },
  { link: "/todo", label: "Todo" },
  { link: "/about", label: "About" },
];

export default function HomeHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const session = useSession();
  const router = useRouter();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        // event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  const handleLogout = () => {
    signOut({ redirect: false });
    router.push("/");
  };
  const menuUser = () => {
    return (
      <Menu shadow="md" width={260}>
        <Menu.Target>
          <UnstyledButton>
            <Group>
              <Avatar
                src={"https://github.com/creativetimofficial.png"}
                size={20}
              />
              <Text>{session.data?.user?.name}</Text>
              <IconChevronDown
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={handleLogout}
            leftSection={<IconPower style={{ width: rem(16) }} />}
          >
            Log out
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconHeart
                style={{ width: rem(16), height: rem(16) }}
                color={"red"}
                stroke={1.5}
              />
            }
          >
            Liked posts
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  };
  console.log(session);

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <MantineLogo size={28} />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        {session.status === "authenticated" ? (
          menuUser()
        ) : (
          <Button onClick={() => router.push("/login")}>Sign in</Button>
        )}
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
