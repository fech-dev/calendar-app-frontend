// @vitest-environment nuxt

import { flushPromises, mount } from "~/test/utils";
import dayjs from "~/utils/date";
import { CalendarViewType } from "~/enums";
import AppCalendarControlBar from "./AppCalendarControlBar.vue";

describe("<AppCalendarControlBar />", () => {
  it("shows the title prop", () => {
    const wrapper = mount(AppCalendarControlBar, {
      props: { title: "April 2024" },
    });

    expect(wrapper.findByText("April 2024").exists()).toBe(true);
  });

  describe("events", () => {
    let wrapper: ReturnType<typeof mount<typeof AppCalendarControlBar>>;

    const eventsMocks = {
      onPrev: vi.fn(),
      onNext: vi.fn(),
      onToday: vi.fn(),
    };

    beforeEach(() => {
      wrapper = mount(AppCalendarControlBar, {
        props: {
          view: CalendarViewType.month,
          date: dayjs("2024-04-10").toDate(),
          ...eventsMocks,
        },
      });
    });

    it('should emit "next" event when next button is clicked', async () => {
      await wrapper.find('[title="Next month"]').trigger("click");

      expect(eventsMocks.onNext).toHaveBeenCalledOnce();
    });

    it('should emit "prev" event when prev button is clicked', async () => {
      await wrapper.find('[title="Previous month"]').trigger("click");

      expect(eventsMocks.onPrev).toHaveBeenCalledOnce();
    });

    it('should emit "today" event when today button is clicked', async () => {
      await wrapper.findByText("Today").trigger("click");

      expect(eventsMocks.onToday).toHaveBeenCalledOnce();
    });

    it('should emit "update:view" event when view select changes value', async () => {
      await wrapper
        .find("select[name=calendar-views]")
        .setValue(CalendarViewType.day);

      const updateViewEvents = wrapper.emitted("update:view");

      expect(updateViewEvents).toBeDefined();
      expect(updateViewEvents).toHaveLength(1);
      expect(updateViewEvents![0][0]).toBe(CalendarViewType.day);
    });

    it('should emit "createEvent" event when "Create event" button is clicked', async () => {
      await wrapper.findByText("Create event").trigger("click");

      const createEvents = wrapper.emitted("createEvent");

      expect(createEvents).toBeDefined();
      expect(createEvents).toHaveLength(1);
    });
  });
});
