<script lang="ts" setup>
interface Props {
  loading?: boolean;
  message: string;
}

withDefaults(defineProps<Props>(), {
  loading: false,
});

interface Emits {
  (e: "confirm"): void;
  (e: "cancel"): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
  <UModal>
    <UCard :ui="{ footer: { base: 'flex justify-end gap-2' } }">
      <p class="text-red-500 text-lg">{{ message }}</p>

      <template #footer>
        <UButton
          color="red"
          variant="soft"
          label="Cancel"
          @click="emit('cancel')"
        />

        <UButton
          :loading
          color="red"
          label="Confirm"
          @click="emit('confirm')"
        />
      </template>
    </UCard>
  </UModal>
</template>
