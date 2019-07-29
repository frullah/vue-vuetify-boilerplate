<template lang="pug">
v-container(fill-height, align-center, justify-center)
  v-card(width="480px")
    v-card-title.title.justify-center
      | Reset password
    //- v-slide-y-reverse-transition(mode="out-in")
    transition(name="slide-y-reverse", mode="out-in")
      v-card-text(v-if="!sent", key="1")
        v-alert(
          :value="hasError",
          type="error",
          transition="slide-y-reverse-transition",
          dismissible,)
          | {{ error }}
        form(data-test="form", ref="form", @submit.prevent="resetPassword")
          v-text-field(
            data-test="email-input",
            v-model="email",
            autofocus,
            outline,
            :readonly="processing",
            name="email",
            v-validate="'required|min:5'",
            label="Username or email")
          v-layout(row, reverse)
            v-flex.text-xs-right(xs6)
              v-btn.ma-0.ma-0.text-none(
                type="submit",
                color="primary"
                :disabled="resetDisabled",
                :loading="processing")
                | Reset password
            v-flex(xs6)
              v-btn.ma-0.text-none(
                data-test="login-link",
                to="/login",
                text,
                color="primary")
                | Back to login
      v-card-text(v-else, key="2")
        | Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.
        v-btn.mt-3.ma-0.text-none(
          data-test="login-link",
          to="/login",
          block,
          color="primary")
          | Back to login
</template>
<script lang="ts" src="./reset-password.ts"></script>
