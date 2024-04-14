import { mount } from "~/test/utils";
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

  describe("Events", () => {
    it('should emit "eventClick" event', () => {});
  });
});
