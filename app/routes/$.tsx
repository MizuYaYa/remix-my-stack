import type { MetaFunction } from "@remix-run/node";
import { type LoaderFunction, data } from "@remix-run/node";
import { Link as RouteLink } from "@remix-run/react";
import { Center, Heading, Link as StyleLink } from "@yamada-ui/react";
import { names } from "~/utils/names";

export const loader: LoaderFunction = () => {
  return data(null, { status: 404 });
};

export const meta: MetaFunction = () => {
  return [
    { title: `404 Not Found | ${names.siteName}` },
    { name: "description", content: "404 Not Found" },
    { name: "robots", content: "noindex" },
  ];
};

export default function NotFound() {
  return (
    <Center flexDirection="column">
      <Heading>404 Not Found</Heading>
      <StyleLink to="/" as={RouteLink} mt="xl">
        ホームに戻る
      </StyleLink>
    </Center>
  );
}
