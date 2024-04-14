<script lang="ts" setup>
import type { AppCalendarInstance } from "~/components/instances";
import type { Event, LoadEventsOptions } from "~/composables/useEventClient";
import type { EventClickArg } from "@fullcalendar/core/index.js";

import dayjs from "~/utils/date";
import { CalendarViewType } from "~/enums";

definePageMeta({
  validate: async (route) => {
    return Object.values(CalendarViewType).includes(
      route.params.view as CalendarViewType
    );
  },
});

const router = useRouter();
const route = useRoute();

const view = ref<CalendarViewType>(route.params.view as CalendarViewType);

const stopViewWatcher = watch(view, (value) => {
  router.push({ path: `/calendar/${value}` });
});
onBeforeUnmount(stopViewWatcher);

const calendar = ref<AppCalendarInstance | null>(null);

const title = computed(() => calendar.value?.viewTitle);

const datesRangeFilter = computed<LoadEventsOptions["datesRange"]>(() => {
  const dates = calendar.value
    ? calendar.value.visibleDatesRange.map((date) =>
        dayjs(date).format("YYYY-MM-DDTHH:mm:ss")
      )
    : [dayjs().startOf(view.value), dayjs().endOf(view.value)].map((date) =>
        date.format("YYYY-MM-DDTHH:mm:ss")
      );

  return { from: dates[0], to: dates[1] };
});

const eventClient = useEventClient();
const events = useAsyncData<Event[]>(
  () => eventClient.getEvents({ datesRange: datesRangeFilter.value }),
  {
    immediate: false,
    default: () => [],
  }
);

onMounted(events.execute);

const onPrev = async () => {
  calendar.value?.prev();
  await events.refresh();
};

const onNext = async () => {
  calendar.value?.next();
  await events.refresh();
};

const onToday = async () => {
  calendar.value?.today();
};

const onCreateEvent = () => {
  router.push("/events/create");
};

const onEventClick = ({ event }: EventClickArg) => {
  router.push(`/events/${event.id}`);
};
</script>

<template>
  <div class="grid grid-cols-12">
    <AppCalendarControlBar
      class="col-span-full h-16"
      :title
      v-model:view="view"
      @prev="onPrev"
      @today="onToday"
      @next="onNext"
      @create-event="onCreateEvent"
    />

    <div class="bg-primary-100 col-start-1 col-end-3 h-full">
      <!-- todo -->
    </div>

    <AppCalendar
      ref="calendar"
      class="col-start-3 col-end-13 m-4"
      :view
      :events="events.data.value"
      @event-click="onEventClick"
    />
  </div>
</template>
