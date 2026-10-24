import {
  Center,
  Heading,
  Text,
  Flex,
  Input,
  Button,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/eventscontext";

const GREEN = "#6B7A4a";
const ORANGE = "#dd592d";
const FONT = "Montserrat, sans-serif";

const formatDateTime = (value) =>
  new Date(value).toLocaleString("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export const EventsPage = () => {
  const { events, categories } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const getCategoryNames = (categoryIds = []) => {
    return categoryIds.map(
      (id) =>
        categories.find((category) => category.id === id)?.name ?? "onbekend",
    );
  };

  const filteredEvents = events.filter((event) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      (event.title ?? "").toLowerCase().includes(query) ||
      (event.description ?? "").toLowerCase().includes(query);
    const matchesCategory =
      selectedCategories.length === 0 ||
      (event.categoryIds ?? []).some((id) => selectedCategories.includes(id));

    return matchesSearch && matchesCategory;
  });

  return (                         //Hier ook gebruikt van A.I voor het netter maken, de ChakraUI cheatsheet en het her en der opruimen van losse haakjes, semicolons en puntkomma's
    <Center p={4} bg="#F5F0EA" _dark={{ bg: "#1A120b" }} minH="100vh">
      <Flex
        flexDirection="column"
        gap={6}
        maxW="1280px"
        w="100%"
        fontFamily={FONT}
      >
        <Heading
          size="4xl"
          textAlign="center"
          color="#333"
          _dark={{ color: "#F5F0EA" }}
        >
          List of Events
        </Heading>

        <Flex direction="column" align="center" gap={4}>
          <Input
            maxW="500px"
            bg="white"
            _dark={{ bg: "#2A1F16" }}
            borderColor={GREEN}
            _focus={{ borderColor: ORANGE }}
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Flex wrap="wrap" justify="center" gap={2}>
            {categories.map((category) => {
              const active = selectedCategories.includes(category.id);
              return (
                <Button
                  key={category.id}
                  size="sm"
                  rounded="full"
                  bg={active ? GREEN : "transparent"}
                  color={active ? "white" : GREEN}
                  borderWidth="2px"
                  borderColor={GREEN}
                  _hover={{ borderColor: ORANGE }}
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.name}
                </Button>
              );
            })}
          </Flex>
        </Flex>

        <SimpleGrid
          as="ul"
          listStyleType="none"
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={6}
        >
          {filteredEvents.map((event) => {
            return (
              <li key={event.id}>
              <Link to={`/event/${event.id}`}>
                <Flex
                  direction="column"
                  h="100%"
                  bg="white"
                  _dark={{ bg: "#2A1F16" }}
                  rounded="xl"
                  overflow="hidden"
                  shadow="md"
                  transition="all 0.2s"
                  _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
                >
                  {event.image && (
                    <Box
                      as="img"
                      src={event.image}
                      alt={event.title}
                      w="100%"
                      aspectRatio={16 / 9}
                      objectFit="cover"
                    />
                  )}

                  <Flex direction="column" gap={2} p={4} flex="1">
                    <Heading
                      size="lg"
                      color="#333"
                      _dark={{ color: "#F5F0EA" }}
                    >
                      {event.title}
                    </Heading>
                    <Text fontSize="sm" fontWeight="semibold" color={ORANGE}>
                      {formatDateTime(event.startTime)} -{" "}
                      {formatDateTime(event.endTime)}
                    </Text>
                    <Text
                      color="#333"
                      _dark={{ color: "#F5F0EA" }}
                      lineClamp={3}
                    >
                      {event.description}
                    </Text>
                    <Flex wrap="wrap" gap={2} mt="auto" pt={2}>
                      {getCategoryNames(event.categoryIds).map((name) => (
                        <Box
                          key={name}
                          px={3}
                          py={1}
                          rounded="full"
                          bg={GREEN}
                          color="white"
                          fontSize="xs"
                          fontWeight="bold"
                        >
                          {name}
                        </Box>
                      ))}
                    </Flex>
                  </Flex>
                </Flex>
              </Link>
              </li>
            );
          })}
        </SimpleGrid>
      </Flex>
    </Center>
  );
};
