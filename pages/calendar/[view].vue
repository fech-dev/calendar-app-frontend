<script lang="ts" setup>
import type { AppCalendarInstance } from "~/components/instances";

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
const date = ref<Date | undefined>();
</script>

<template>
  <div class="grid grid-cols-12">
    <AppCalendarControlBar
      class="col-span-full h-16"
      v-model:view="view"
      :date
      @prev="() => calendar!.prev()"
      @today="() => calendar!.today()"
      @next="() => calendar!.next()"
    />

    <div class="bg-primary-100 col-start-1 col-end-3 h-full">
      <!-- todo -->
    </div>

    <AppCalendar
      ref="calendar"
      class="col-start-3 col-end-13 m-4"
      :view
      v-model:date="date"
    />
  </div>
</template>
