<template lang="pug">
  v-text-field(
    v-bind="$attrs",
    v-on="$listeners",
    :type="passwordFieldType",
    :append-icon="passwordIcon",
    @click:append="togglePassword")
</template>

<script lang="ts" src="./password-field.ts"></script>
