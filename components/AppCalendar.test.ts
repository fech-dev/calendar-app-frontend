import { mount } from "~/test/utils";
import { faker } from "@faker-js/faker";
import { CalendarViewType } from "~/enums";
import AppCalendar from "./AppCalendar.vue";
import FullCalendarComponent from "@fullcalendar/vue3";

describe("<AppCalendar />", () => {
  describe("Calendar view", () => {
    it("should display the calendar view month by default", () => {
      const wrapper = mount(AppCalendar);

      const calendarView = wrapper
        .findComponent(FullCalendarComponent)
        .find(".fc-view");

      expect(calendarView.classes()).contain("fc-dayGridMonth-view");
    });

    it('should change the view to "week"', () => {
      const wrapper = mount(AppCalendar, {
        props: {
          view: CalendarViewType.week,
        },
      });

      const calendarView = wrapper
        .findComponent(FullCalendarComponent)
        .find(".fc-view");

      expect(calendarView.classes()).contain("fc-dayGridWeek-view");
    });

    it('should change the view to "day"', () => {
      const wrapper = mount(AppCalendar, {
        props: {
          view: CalendarViewType.day,
        },
      });

      const calendarView = wrapper
        .findComponent(FullCalendarComponent)
        .find(".fc-view");

      expect(calendarView.classes()).contain("fc-dayGridDay-view");
    });
  });

  describe("v-model:date", () => {
    let wrapper: ReturnType<typeof mount<typeof AppCalendar>>;
    const startDate = faker.date.anytime();

    beforeEach(() => {
      wrapper = mount(AppCalendar, {
        props: { date: startDate },
      });
    });

    it('should emit "update:date" event if "next()" method is called', () => {
      wrapper.vm.next();

      const updateDateEvent = wrapper.emitted<Date>("update:date");

      expect(updateDateEvent).toBeDefined();
      expect(updateDateEvent).toHaveLength(1);
      expect(updateDateEvent![0]).not.toEqual(startDate);
    });

    it('should emit "update:date" event if "prev()" method is called', () => {
      wrapper.vm.prev();

      const updateDateEvent = wrapper.emitted<Date>("update:date");

      expect(updateDateEvent).toBeDefined();
      expect(updateDateEvent).toHaveLength(1);
      expect(updateDateEvent![0]).not.toEqual(startDate);
    });

    it('should emit "update:date" event if "today()" method is called', () => {
      wrapper.vm.today();

      const updateDateEvent = wrapper.emitted<Date>("update:date");

      expect(updateDateEvent).toBeDefined();
      expect(updateDateEvent).toHaveLength(1);
      expect(updateDateEvent![0]).not.toEqual(startDate);
    });
  });
});
