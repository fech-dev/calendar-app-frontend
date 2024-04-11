<script lang="ts" setup>
import dayjs from "dayjs";
import { capitalize } from "lodash-es";
import { CalendarViewType } from "~/enums";

interface Props {
  date?: Date;
}

const props = withDefaults(defineProps<Props>(), {
  date: () => dayjs().toDate(),
});

interface Emits {
  (e: "prev"): void;
  (e: "next"): void;
  (e: "today"): void;
}

const emit = defineEmits<Emits>();

const view = defineModel<CalendarViewType>("view", {
  default: CalendarViewType.month,
});

const calendarViewOptions = Object.values(CalendarViewType).map((value) => ({
  label: capitalize(value),
  value,
}));

const dateDisplay = computed(() => {
  switch (view.value) {
    case CalendarViewType.month:
    case CalendarViewType.week:
      return dayjs(props.date).format("MMMM YYYY");

    case CalendarViewType.day:
      return dayjs(props.date).format("DD MMMM YYYY");
  }
});
</script>

<template>
  <div class="flex justify-between items-center px-8 border-b border-gray-300">
    <div class="flex gap-4 items-center">
      <div class="text-2xl font-semibold">
        {{ dateDisplay }}
      </div>

      <!-- <UButton label="Create Event" /> -->
    </div>

    <div class="flex gap-3">
      <UButton
        variant="outline"
        title="Go to today"
        label="Today"
        @click="emit('today')"
      />

      <div class="flex gap-1">
        <UButton
          sqaure
          color="gray"
          variant="ghost"
          icon="i-heroicons-chevron-left"
          :title="`Previous ${view}`"
          @click="emit('prev')"
        />
        <UButton
          square
          color="gray"
          variant="ghost"
          icon="i-heroicons-chevron-right"
          :title="`Next ${view}`"
          @click="emit('next')"
        />
      </div>

      <USelect
        v-model="view"
        option-attribute="label"
        :options="calendarViewOptions"
      />
    </div>
  </div>
</template>
