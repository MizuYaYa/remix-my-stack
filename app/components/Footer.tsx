import { Flex, Heading } from "@yamada-ui/react";
import { names } from "~/utils/names";

export const Footer = () => {
  return (
    <Flex as="footer" pos="absolute" bottom="0" h="30vh" w="100%" bgColor="gray.200" p="md">
      <Flex direction="column" justifyContent="space-between">
        <Heading fontSize="2xl">{names.siteName}</Heading>
      </Flex>
    </Flex>
  );
};
