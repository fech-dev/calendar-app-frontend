<script lang="ts" setup>
import type { Event } from "~/composables/useEventClient";

import dayjs from "~/utils/date";

interface Props {
  event: Event;
}
defineProps<Props>();

interface Emits {
  (e: "update", event: Event): void;
  (e: "delete", event: Event): void;
}

const emit = defineEmits<Emits>();

const formatDate = (date: string | Date) =>
  dayjs(date).format("YYYY-MM-DD HH:mm:ss");
</script>

<template>
  <UCard :ui="{ header: { base: 'flex justify-between items-start' } }">
    <template #header>
      <h1 class="text-3xl uppercase font-semibold">
        {{ event.name }}
      </h1>

      <UButtonGroup size="sm">
        <UButton
          color="amber"
          icon="i-heroicons-pencil-square-solid"
          label="Edit"
          @click="() => emit('update', event)"
        />
        <UButton
          color="red"
          icon="i-heroicons-trash-solid"
          label="Delete"
          @click="() => emit('delete', event)"
        />
      </UButtonGroup>
    </template>

    <div class="flex flex-col gap-4">
      <div>
        <strong>Starts at: </strong>
        <UBadge :label="formatDate(event.start)" />
      </div>

      <div>
        <strong>Ends at: </strong>
        <UBadge :label="formatDate(event.end)" />
      </div>
    </div>
  </UCard>
</template>
