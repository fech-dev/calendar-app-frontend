<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";

import dayjs from "~/utils/date";
import { z } from "zod";

interface Props {
  saving?: boolean;
  initialState?: EventSchema;
}

const props = withDefaults(defineProps<Props>(), {
  saving: false,
  initialState: () => ({
    name: "",
    allDay: false,
    start: dayjs().toDate(),
    end: dayjs().add(30, "minutes").toDate(),
  }),
});

interface Emits {
  (e: "submit", event: EventSchema): void;
  (e: "cancel"): void;
}

const emit = defineEmits<Emits>();

const schema = z
  .object({
    name: z.string().min(1, "Please insert an event name"),
    allDay: z.boolean().optional().default(false),
    start: z.date({ coerce: true }),
    end: z.date({ coerce: true }),
  })
  .refine((schema) => dayjs(schema.start).diff(schema.end) < 0, {
    message: "Date must be after start date.",
    path: ["end"],
  });

export type EventSchema = z.output<typeof schema>;

const state = reactive<EventSchema>(props.initialState);

const stopAllDayWatcher = watch(
  () => state.allDay,
  (value) => {
    if (value) {
      const date = state.start;
      state.start = dayjs(date).startOf("day").toDate();
      state.end = dayjs(date).endOf("day").toDate();
    } else {
      state.start = dayjs().toDate();
      state.end = dayjs(state.start).add(30, "minutes").toDate();
    }
  }
);
onBeforeUnmount(stopAllDayWatcher);

const stopStartWatcher = watch(
  () => state.start,
  (value) => {
    state.end = dayjs(value).add(30, "minutes").toDate();
  }
);
onBeforeUnmount(stopStartWatcher);

const onSubmit = ({ data }: FormSubmitEvent<EventSchema>) => {
  emit("submit", data);
};
</script>

<template>
  <UForm class="flex flex-col gap-5" :state :schema @submit="onSubmit">
    <UFormGroup name="name" label="Name">
      <UInput v-model="state.name" placeholder="Insert event name" />
    </UFormGroup>

    <UCheckbox name="allDay" label="All Day" v-model="state.allDay" />

    <div class="flex gap-4">
      <UFormGroup class="flex-1" name="start" label="Start">
        <AppDatePicker datetime v-model="state.start" />
      </UFormGroup>

      <UFormGroup class="flex-1" name="end" label="End">
        <AppDatePicker
          datetime
          :disabled="state.allDay"
          :min-date="state.start"
          v-model="state.end"
        />
      </UFormGroup>
    </div>

    <div class="flex justify-end gap-2">
      <UButton
        tabindex="1"
        variant="soft"
        color="gray"
        icon="i-heroicons-x-mark"
        label="Cancel"
        @click="emit('cancel')"
      />

      <UButton
        type="submit"
        :loading="saving"
        icon="i-heroicons-plus"
        label="Save"
      />
    </div>
  </UForm>
</template>
