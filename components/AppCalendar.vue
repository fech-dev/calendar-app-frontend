<script setup lang="ts">
import type {
  CalendarOptions,
  EventInput,
  EventClickArg,
} from "@fullcalendar/core";
import type { FullCalendarInstance } from "~/components/instances";

import { CalendarViewType } from "~/enums";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/vue3";

const CALENDAR_VIEW_TYPES_MAP = {
  month: "dayGridMonth",
  week: "dayGridWeek",
  day: "dayGridDay",
};

export interface Props {
  view?: CalendarViewType;
  events?: EventInput[];
}

const props = withDefaults(defineProps<Props>(), {
  view: CalendarViewType.month,
  events: () => [],
});

interface Emits {
  (e: "eventClick", event: EventClickArg): void;
}
const emit = defineEmits<Emits>();

const calendar = ref<FullCalendarInstance | null>(null);
const calendarAPI = computed(() => calendar.value?.getApi());

const visibleDatesRange = ref<[Date, Date]>([new Date(), new Date()]);

const updateVisibleDatesRange = () => {
  const calendarView = calendarAPI.value!.view;

  visibleDatesRange.value = [calendarView.activeStart, calendarView.activeEnd];
};

const stopWatchView = watch(
  () => props.view,
  (value) => {
    calendarAPI.value?.changeView(CALENDAR_VIEW_TYPES_MAP[value]);
    updateVisibleDatesRange();
  }
);
onBeforeUnmount(stopWatchView);
onMounted(updateVisibleDatesRange);

const options = computed<CalendarOptions>(() => ({
  plugins: [dayGridPlugin],
  initialView: CALENDAR_VIEW_TYPES_MAP[props.view],
  events: props.events,
  headerToolbar: false,
  eventTimeFormat: {
    hour: "2-digit",
    minute: "2-digit",
    meridiem: false,
    hour12: false,
  },
  eventClick: (event) => {
    emit("eventClick", event);
  },
}));

const viewTitle = ref<string>();

onMounted(() => {
  viewTitle.value = calendarAPI.value?.view.title;
});

const prev = () => {
  calendarAPI.value?.prev();
  viewTitle.value = calendarAPI.value?.view.title;
  updateVisibleDatesRange();
};

const next = () => {
  calendarAPI.value?.next();
  viewTitle.value = calendarAPI.value?.view.title;
  updateVisibleDatesRange();
};

const today = () => {
  calendarAPI.value?.today();
  viewTitle.value = calendarAPI.value?.view.title;
};

defineExpose({
  prev,
  next,
  today,
  viewTitle: readonly(viewTitle),
  visibleDatesRange: readonly(visibleDatesRange),
});
</script>

<template>
  <FullCalendar ref="calendar" :options />
</template>
