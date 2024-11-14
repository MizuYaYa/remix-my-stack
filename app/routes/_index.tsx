import type { MetaFunction } from "@remix-run/node";
import { Center, Heading } from "@yamada-ui/react";
import { names } from "~/utils/names";

export const meta: MetaFunction = () => {
  return [{ title: names.siteName }, { name: "description", content: `${names.siteName}` }];
};

export default function Index() {
  return (
    <>
      <Center as="main" flexDir="column">
        <Heading>welcome to {names.siteName} site.</Heading>
      </Center>
    </>
  );
}
