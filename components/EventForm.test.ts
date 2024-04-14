// @vitest-environment nuxt

import { mount, setupIntercept } from "~/test/utils";
import { faker } from "@faker-js/faker";
//@ts-ignore
import UForm from "#ui/components/forms/Form.vue";
import EventForm from "./EventForm.vue";
import AppDatePicker from "./AppDatePicker.vue";
import { HttpResponse } from "msw";

describe("events", () => {
  const eventMock = {
    _id: faker.database.mongodbObjectId(),
    name: "Event #1",
    start: "2024-04-13 09:00:00",
    end: "2024-04-13 10:00:00",
    allDay: false,
  };

  setupIntercept({
    baseURL: "http://127.0.0.1:3000",
    handlers: {
      "POST /events": () => HttpResponse.json(eventMock),
    },
  });

  it.skip('should emit "created" event if event is created successfully', async () => {
    const wrapper = mount(EventForm);

    wrapper.find("input[name=name]").setValue(eventMock.name);
    wrapper.find("input[name=allDay]").setValue(eventMock.allDay);
    const datepickers = wrapper.findAllComponents(AppDatePicker);
    datepickers.at(0)?.setValue(eventMock.start);
    datepickers.at(1)?.setValue(eventMock.end);

    await wrapper.find("form").trigger("submit");

    const createdEvents = wrapper.emitted<Event>("created");
    expect(createdEvents).toHaveLength(1);
    expect(createdEvents?.at(0)).toEqual([eventMock]);
  });

  it.todo(
    'should emit "error" event if some error happens when creating event'
  );

  it('should emit "cancel" event if cancel button is clicked', async () => {
    const wrapper = mount(EventForm);

    await wrapper.findByText("Cancel").trigger("click");

    const cancelEvents = wrapper.emitted("cancel");
    expect(cancelEvents).toBeDefined();
    expect(cancelEvents).toHaveLength(1);
  });
});

describe("validations", () => {
  it.skip("should show error message if title field is empty", async () => {
    const wrapper = mount(EventForm);

    await wrapper.findComponent(UForm).trigger("submit");

    expect(wrapper.findByText("Please insert an event name").exists()).toBe(
      true
    );
  });
});
