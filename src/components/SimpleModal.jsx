import {
  Button,
  Dialog,
  Portal,
  Field,
  Input,
  Textarea,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toaster } from "./ui/toaster";
import { useEvents } from "../context/eventscontext.jsx";

const GREEN = "#6B7A4A";
const ORANGE = "#dd592d";
const FONT = "Montserrat, sans-serif";

const inputStyles = {
  borderColor: GREEN,
  _focus: { borderColor: ORANGE },
};

export default function EventFormModal({ open, onClose, event, onSaved }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addEvent, updateEvent, categories } = useEvents();

  useEffect(() => {
    if (open) {
      reset(
        event
          ? { ...event, categoryIds: (event.categoryIds ?? {}).map(String) }
          : { categoryIds: {} },
      );
    }
  }, [open, event, reset]);

  useEffect(() => {
    if (open) reset(event ?? {});
  }, [open, event, reset]);

  const onSubmit = async (data) => {
    const categoryIds = (data.categoryIds || {}).map(Number);
    const url = event
      ? `http://localhost:3000/events/${event.id}`
      : "http://localhost:3000/events";
    const method = event ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, categoryIds }),
      });

      if (!response.ok) throw new Error("Opslaan Mislukt");

      toaster.create({
        //Dit heb ik met behulp van A.I gemaakt, omdat het concept wat nieuw was
        title: event ? "Event bijgewerkt" : "Event toegevoegd",
        type: "success",
      });

      const result = await response.json();
      if (event) {
        updateEvent(result);
      } else {
        addEvent(result);
      }

      if (onSaved) onSaved(result);
      if (onClose) onClose();
    } catch (error) {
      console.error("error:", error);
      toaster.create({ title: "Opslaan mislukt", type: "error" });
    }
  };

  return (
    //Hier heb ik wat hulp gehad van zowel de debugger in VSC als in Claude. Ik heb de code wel zelf geschreven, maar wel met wat tips van A.I om de boel wat netjes te houden.
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open && onClose) onClose();
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content fontFamily={FONT} rounded="xl" bg="white">
            <Dialog.Header>
              <Dialog.Title color={GREEN} fontWeight="bold">
                {event ? "Edit event" : "Add event"}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <form id="event-form" onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={4}>
                  <Field.Root invalid={!!errors.title}>
                    <Field.Label>Title</Field.Label>
                    <Input
                      {...inputStyles}
                      {...register("title", { required: "Titel is verplicht" })}
                    />
                    <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.description}>
                    <Field.Label>Description</Field.Label>
                    <Textarea
                      {...inputStyles}
                      rows={4}
                      {...register("description", {
                        required: "Beschrijving is verplicht",
                      })}
                    />
                    <Field.ErrorText>
                      {errors.description?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.startTime}>
                    <Field.Label>Start time</Field.Label>
                    <Input
                      type="datetime-local"
                      {...inputStyles}
                      {...register("startTime", {
                        required: "Je evenement moet een begintijd hebben",
                      })}
                    />
                    <Field.ErrorText>
                      {errors.startTime?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.endTime}>
                    <Field.Label>End time</Field.Label>
                    <Input
                      type="datetime-local"
                      {...inputStyles}
                      {...register("endTime", {
                        required: "Je evenement moet een eindtijd hebben",
                      })}
                    />
                    <Field.ErrorText>{errors.endTime?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.image}>
                    <Field.Label>Image URL</Field.Label>
                    <Input
                      {...inputStyles}
                      {...register("image", {
                        required: "Het evenement moet een afbeelding bevatten",
                      })}
                    />
                    <Field.ErrorText>{errors.image?.message}</Field.ErrorText>

                    <Field.Root>
                      <Field.Label>Categories</Field.Label>
                      <Flex wrap="wrap" gap={2}>
                        {categories.map((category) => (
                          <label key={category.id}>
                            <input
                              type="checkbox"
                              value={category.id}
                              {...register("categoryIds")}
                              style={{ accentCOlor: GREEN }}
                            />
                            {""}
                            {category.name}
                          </label>
                        ))}
                      </Flex>
                    </Field.Root>
                  </Field.Root>
                </Stack>
              </form>
            </Dialog.Body>

            <Dialog.Footer>
              <Button
                variant="outline"
                borderColor={ORANGE}
                color={ORANGE}
                _hover={{ bg: ORANGE, color: "white" }}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                type="submit"
                form="event-form"
                bg={GREEN}
                color="white"
                _hover={{ opacity: 0.85 }}
              >
                Submit
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
