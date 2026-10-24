import {
  Heading,
  Text,
  Image,
  Button,
  Center,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import EventFormModal from "../components/SimpleModal.jsx";
import { toaster } from "../components/ui/toaster";
import { useEvents } from "../context/eventscontext.jsx";

const GREEN = "#6B7A4a";
const ORANGE = "#dd592d";
const FONT = "Montserrat, sans-serif";

const formatDateTime = (value) =>
  new Date(value).toLocaleString("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();
  const { deleteEvent, categories } = useEvents();

  const handleDelete = async () => {
    if (!window.confirm("Weet je het zeker?")) return;

    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        deleteEvent(event.id);
        toaster.create({ title: "Event verwijderd", type: "success" });
        navigate("/");
      } else {
        toaster.create({ title: "Verwijderen mislukt", type: "error" });
      }
    } catch {
      toaster.create({ title: "Geen verbinding met de server", type: "error" });
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const json = await response.json();
      setEvent(json);
    };
    fetchEvent();
  }, [eventId]);

  if (!event) return <Text p={4}> Loading...</Text>;

  const categoryNames = (event.categoryIds ?? []).map(
    (id) => categories.find((c) => c.id === id)?.name ?? "onbekend",
  );

  return (                         //Hier ook gebruikt van A.I voor het netter maken, de ChakraUI cheatsheet en het her en der opruimen van losse haakjes, semicolons en puntkomma's
    <Center
      p={4}
      bg="#F5F0EA"
      _dark={{ bg: "#1A120B" }}
      minH="100vh"
      alignItems="flex-start"
    >
      <Flex direction="column" gap={4} maxW="900px" w="100%" fontFamily={FONT}>
        <Link to="/">
          <Text color={GREEN} fontWeight="semibold" _hover={{ color: ORANGE }}>
            terug naar alle events
          </Text>
        </Link>

        <Flex
          direction="column"
          bg="white"
          _dark={{ bg: "#2A1F16" }}
          rounded="xl"
          overflow="hidden"
          shadow="md"
        >
          {event.image && (
            <Image
              src={event.image}
              alt={event.title}
              w="100%"
              aspectRatio={16 / 9}
              objectFit="cover"
            />
          )}
          <Flex direction="column" gap={3} p={{ base: 4, md: 8 }}>
            <Heading size="3xl" color="#333" _dark={{ color: "#F5F0EA" }}>
              {event.title}
            </Heading>

            <Text fontWeight="semibold" color={ORANGE}>
              {formatDateTime(event.startTime)} –{" "}
              {formatDateTime(event.endTime)}
            </Text>

            <Flex wrap="wrap" gap={2}>
              {categoryNames.map((name) => (
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

            <Text color="#333" _dark={{ color: "#F5F0EA" }} lineHeight="tall">
              {event.description}
            </Text>

            <Flex gap={3} mt={4} wrap="wrap">
              <Button
                bg={GREEN}
                color="white"
                _hover={{ opacity: 0.85 }}
                onClick={() => setEditOpen(true)}
              >
                Edit
              </Button>

              <Button
                variant="outline"
                borderColor={ORANGE}
                color={ORANGE}
                _hover={{ bg: ORANGE, color: "white" }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <EventFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        event={event}
        onSaved={setEvent}
      />
    </Center>
  );
};
