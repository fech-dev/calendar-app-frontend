<template>
  <NuxtLoadingIndicator />

  <NuxtPage />

  <UNotifications />
  <UModals />
</template>

<style lang="postcss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
  @apply transition-all duration-300;
}
.page-enter-from,
.page-leave-to {
  @apply opacity-0 blur-sm;
}
</style>
