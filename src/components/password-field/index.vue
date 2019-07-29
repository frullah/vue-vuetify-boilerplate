<template lang="pug">
  v-text-field(
    v-bind="$attrs",
    v-on="$listeners",
    :value="value",
    :outline="outline",
    :name="$attrs.name",
    :autocomplete="browserAutocomplete"
    :type="passwordFieldType",
    :error-messages="errorMessages",
    :success-messages="successMessages",
    :hide-details="hideDetails",
    :append-icon="passwordIcon",
    @click:append="togglePassword"
    :label="label")
</template>

<script lang="ts" src="./password-field.ts"></script>
