import { Anchor } from "@mantine/core";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "About",
  description: "About page description",
};

export default function AboutPage() {
  return (
    <div>
      AboutPage
      <Anchor component={Link} href="/">
        HomePage
      </Anchor>
    </div>
  );
}
