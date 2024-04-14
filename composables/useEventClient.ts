export interface Event {
  _id: string;
  name: string;
  allDay: boolean;
  start: string;
  end: string;
}

export interface LoadEventsOptions {
  datesRange?: {
    from: string;
    to: string;
  };
}

export interface CreateEventInput {
  name: string;
  allDay: boolean;
  start: string;
  end: string;
}

export const useEventClient = () => {
  const config = useRuntimeConfig();

  const eventsClient = $fetch.create({
    baseURL: config.public.apiBaseUrl,
  });

  const createEvent = async (input: CreateEventInput) => {
    const event = await eventsClient<Event>("/events", {
      method: "POST",
      body: input,
    });

    return event;
  };

  const getEvents = async (options: LoadEventsOptions = {}) => {
    const events = await eventsClient<Event[]>("/events", {
      method: "GET",
      query: {
        datesRange: options.datesRange
          ? JSON.stringify([options.datesRange.from, options.datesRange.to])
          : undefined,
      },
    });

    return events.map((event) => ({
      ...event,
      id: event._id,
      title: event.name,
    }));
  };

  const getEvent = async (id: string) => {
    const event = await eventsClient<Event>(`/events/${id}`, { method: "GET" });

    return event;
  };

  const updateEvent = async (id: string, input: Partial<CreateEventInput>) => {
    const event = await eventsClient<Event>(`/events/${id}`, {
      method: "PATCH",
      body: input,
    });

    return event;
  };

  const deleteEvent = async (id: string) => {
    await eventsClient<Event>(`/events/${id}`, {
      method: "DELETE",
    });
  };

  return {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
  };
};
