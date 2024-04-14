<script lang="ts" setup>
import { ConfirmModal } from "#components";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const modal = useModal();

const { getEvent, deleteEvent } = useEventClient();

const {
  data: event,
  status,
  error,
} = await useAsyncData(() => getEvent(route.params.id as string), {
  immediate: true,
});

if (status.value === "error" && error.value?.statusCode === 404) {
  toast.add({
    title: "Event not found",
    color: "red",
  });

  router.replace("/calendar");
}

const onUpdateEvent = () => {
  router.push(`/events/${event.value!._id}/edit`);
};

const deletingEvent = ref(false);
const onDeleteEvent = async () => {
  modal.open(ConfirmModal, {
    message: "Are you sure you want to delete this event?",
    loading: deletingEvent.value,
    onConfirm: async () => {
      try {
        deletingEvent.value = true;
        await deleteEvent(event.value!._id);

        toast.add({
          title: "Event deleted",
          color: "green",
        });

        modal.close();
        router.replace("/calendar");
      } catch (error) {
        toast.add({
          title: "Cannot delete event",
          color: "red",
        });
      } finally {
        deletingEvent.value = false;
      }
    },
    onCancel: () => modal.close(),
  });
};
</script>

<template>
  <div v-if="event" class="container py-10">
    <div class="mb-10">
      <UButton
        variant="soft"
        color="gray"
        icon="i-heroicons-chevron-left"
        label="Calendar"
        @click="() => router.back()"
      />
    </div>

    <EventCard
      class="max-w-3xl"
      :event
      @update="onUpdateEvent"
      @delete="onDeleteEvent"
    />
  </div>
</template>
