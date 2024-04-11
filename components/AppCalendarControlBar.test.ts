// @vitest-environment nuxt

import { mount } from "~/test/utils";
import dayjs from "dayjs";
import { CalendarViewType } from "~/enums";
import AppCalendarControlBar from "./AppCalendarControlBar.vue";

describe("<AppCalendarControlBar />", () => {
  it("should display the current month", () => {
    const wrapper = mount(AppCalendarControlBar, {
      props: {
        view: CalendarViewType.month,
        date: dayjs("2024-04-10").toDate(),
      },
    });

    expect(wrapper.findByText("April 2024").exists()).toBe(true);
  });

  it("should display the current week", () => {
    const wrapper = mount(AppCalendarControlBar, {
      props: {
        view: CalendarViewType.week,
        date: dayjs("2024-04-10").toDate(),
      },
    });

    expect(wrapper.findByText("April 2024").exists()).toBe(true);
  });

  it("should display the current day", () => {
    const wrapper = mount(AppCalendarControlBar, {
      props: {
        view: CalendarViewType.day,
        date: dayjs("2024-04-10").toDate(),
      },
    });

    expect(wrapper.findByText("10 April 2024").exists()).toBe(true);
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
  });
});
