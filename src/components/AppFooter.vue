<template>
  <v-footer height="40" app>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        :icon="item.icon"
        :size="item.icon === '$vuetify' ? 24 : 16"
      />
    </a>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
    <span class="d-none d-sm-inline-block">Courtside</span> 2025
    </div>
  </v-footer>
</template>

<script setup>
  const items = [
    {
      title: 'Brian Wolf Github',
      icon: `mdi-github`,
      href: 'https://github.com/Windrunner25',
    },
    {
      title: 'Brian Wolf LinkedIn',
      icon: `mdi-linkedin`,
      href: 'https://www.linkedin.com/in/brian-wolf-44072021b/',
    },
  ]
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
