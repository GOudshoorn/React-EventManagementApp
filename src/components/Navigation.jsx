import { Flex, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import EventFormModal from "./SimpleModal.jsx";

const GREEN = "#6B7A4A";
const ORANGE = "#dd592d";
const FONT = "Montserrat, sans-serif";

export const Navigation = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Flex
        as="nav"
        align="center"
        gap={3}
        px={{ base: 4, md: 8 }}
        py={3}
        bg="white"
        _dark={{ bg: "#2A1F16" }}
        borderBottomWidth="3px"
        borderBottomColor={GREEN}
        shadow="sm"
        fontFamily={FONT}
      >
        <Button
          asChild
          variant="outline"
          rounded="full"
          borderColor={GREEN}
          color={GREEN}
          _hover={{ bg: GREEN, color: "white" }}
        >
          <RouterLink to="/">Events</RouterLink>
        </Button>

        <Button
          rounded="full"
          bg={ORANGE}
          color="white"
          _hover={{ opacity: 0.85 }}
          onClick={() => setModalOpen(true)}
        >
          + Add Event
        </Button>

        <Button
          asChild
          variant="outline"
          rounded="full"
          borderColor={GREEN}
          color={GREEN}
          _hover={{ bg: GREEN, color: "white" }}
        >
          <RouterLink to="/AboutUs">About Us</RouterLink>
        </Button>
      </Flex>

      <EventFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
