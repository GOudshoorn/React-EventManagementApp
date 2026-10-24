import { Heading, Text, Center, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const GREEN = "#6B7A4A";
const ORANGE = "#dd592d";
const FONT = "Montserrat, sans-serif";

export const AboutUs = () => {
  return (
    <Center
      p={4}
      bg="#F5F0EA"
      _dark={{ bg: "#1A120B" }}
      minH="100vh"
      alignItems="flex-start"
    >
      <Flex direction="column" gap={6} maxW="1280px" w="100%" fontFamily={FONT}>
        <Heading
          size="6xl"
          textAlign="center"
          color="#333"
          _dark={{ color: "#F5F0EA" }}
        >
          About Us
        </Heading>

        <Text color="#333" _dark={{ color: "#F5F0EA" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>

        <Link
          asChild
          alignSelf="center"
          color={GREEN}
          fontWeight="semibold"
          _hover={{ color: ORANGE }}
        >
          <RouterLink to="/">Terug naar alle events</RouterLink>
        </Link>
      </Flex>
    </Center>
  );
};