import { Anchor } from "@mantine/core";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Manager",
  description: "Page description",
};

function ManagerPage() {
  return (
    <div>
      ManagerPage
      <Anchor component={Link} href="/">
        HomePage
      </Anchor>
    </div>
  );
}

export default ManagerPage;
