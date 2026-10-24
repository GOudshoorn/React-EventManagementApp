import { createContext, useContext, useEffect, useState } from "react";

const EventsContext = createContext(null);

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const json = await response.json();
      setEvents(json);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const json = await response.json();
      setCategories(json);
    };
    fetchCategories();
  }, []);

  const addEvent = (newEvent) => setEvents((prev) => [...prev, newEvent]);
  const updateEvent = (updated) =>
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  const deleteEvent = (id) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  return (
    <EventsContext.Provider
      value={{
        events,
        categories,
        setCategories,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
