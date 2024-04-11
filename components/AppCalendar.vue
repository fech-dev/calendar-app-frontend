<script setup lang="ts">
import type { CalendarOptions } from "@fullcalendar/core";
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
}

const props = withDefaults(defineProps<Props>(), {
  view: CalendarViewType.month,
});

const date = defineModel<Date | undefined>("date", {
  default: new Date(),
});

const calendar = ref<FullCalendarInstance | null>(null);
const calendarAPI = computed(() => calendar.value?.getApi());

const stopWatchView = watch(
  () => props.view,
  (value) => calendarAPI.value?.changeView(CALENDAR_VIEW_TYPES_MAP[value])
);
onBeforeUnmount(stopWatchView);

const stopWatchDate = watch(
  date,
  (value) => value && calendarAPI.value?.gotoDate(value),
  { immediate: true }
);
onBeforeUnmount(stopWatchDate);

const options: CalendarOptions = {
  plugins: [dayGridPlugin],
  initialView: CALENDAR_VIEW_TYPES_MAP[props.view],
  initialDate: date.value,
  headerToolbar: false,
};

const prev = () => {
  calendarAPI.value?.prev();
  date.value = calendarAPI.value?.getDate();
};

const next = () => {
  calendarAPI.value?.next();
  date.value = calendarAPI.value?.getDate();
};

const today = () => {
  calendarAPI.value?.today();
  date.value = calendarAPI.value?.getDate();
};

defineExpose({
  prev,
  next,
  today,
});
</script>

<template>
  <FullCalendar ref="calendar" :options />
</template>
