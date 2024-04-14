<script lang="ts" setup>
import type { EventSchema } from "~/components/EventForm.vue";
import { FetchError } from "ofetch";
import dayjs from "~/utils/date";

const router = useRouter();
const toast = useToast();
const { createEvent } = useEventClient();

const saving = ref(false);

const onSubmit = async (event: EventSchema) => {
  try {
    saving.value = true;
    await createEvent({
      ...event,
      start: dayjs(event.start).toISOString(),
      end: dayjs(event.end).toISOString(),
    });

    toast.add({
      title: "Event created",
      color: "green",
    });

    router.back();
  } catch (error) {
    let title = (error as Error).message;

    if (error instanceof FetchError) {
      title = error.data.message;
    }

    toast.add({
      title,
      color: "red",
    });
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <UCard class="w-full max-w-xl shadow-lg">
      <template #header>
        <h2 class="uppercase font-semibold text-2xl">Create event</h2>
      </template>

      <EventForm :saving @submit="onSubmit" @cancel="() => router.back()" />
    </UCard>
  </div>
</template>
