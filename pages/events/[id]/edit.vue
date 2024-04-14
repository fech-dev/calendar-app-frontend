<script lang="ts" setup>
import type { EventSchema } from "~/components/EventForm.vue";
import { FetchError } from "ofetch";
import dayjs from "~/utils/date";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const { getEvent, updateEvent } = useEventClient();

const saving = ref(false);
const { data: event } = await useAsyncData(
  () => getEvent(route.params.id as string),
  { immediate: true }
);

const initialState = computed<EventSchema | undefined>(() => {
  if (!event.value) return undefined;

  return {
    name: event.value.name,
    allDay: event.value.allDay,
    start: dayjs(event.value.start).toDate(),
    end: dayjs(event.value.end).toDate(),
  };
});

const onSubmit = async (data: EventSchema) => {
  try {
    saving.value = true;
    await updateEvent(route.params.id as string, {
      ...data,
      start: dayjs(data.start).toISOString(),
      end: dayjs(data.end).toISOString(),
    });

    toast.add({
      title: "Event updated",
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
        <h2 class="uppercase font-semibold text-2xl">Update event</h2>
      </template>

      <EventForm
        :saving
        :initial-state
        @submit="onSubmit"
        @cancel="() => router.back()"
      />
    </UCard>
  </div>
</template>
