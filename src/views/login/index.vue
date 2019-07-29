<template lang="pug">

v-container(fill-height, align-center, justify-center)
  v-card(width="480px")
    v-card-title.title.justify-center
      | Login
    v-card-text
      v-alert(
        dismissible,
        color="red",
        transition="slide-y-reverse-transition",
        :value="error")
          | {{ error }}
      form(data-test="form", ref="form", @submit.prevent="login")
        v-text-field(
          data-test="username-input"
          ref="username",
          v-model="username",
          :readonly="processing",
          autofocus,
          outline,
          autocomplete="on",
          name="username",
          label="Username or email",
          maxlength="32",
          v-validate.disable="'required'",
          :error-messages="errors.first('username')")
        password-field(
          data-test="password-input",
          v-model="password",
          :readonly="processing",
          outline,
          autocomplete="current-password",
          label="Password",
          name="password",
          v-validate.disable="'required'",
          :error-messages="errors.first('password')")
        v-layout(align-center)
          v-flex(xs6)
            v-checkbox.mt-0(label="Remember me", v-model="remember", hide-details)
          v-flex.text-xs-right(xs6)
            v-btn.ma-0.text-none(
              type="submit",
              color="primary"
              :loading="processing")
              | Login
    v-card-actions
      v-spacer
      v-btn.ma-0.text-none(
        data-test="reset-password-link",
        text,
        color="primary",
        :disabled="processing",
        to="/reset-password")
          | Forgot password
      v-divider(vertical)
      v-btn.ma-0.text-none(
        data-test="signup-link",
        text,
        color="primary",
        to="/signup")
        | Create account
      v-spacer

</template>

<script lang="ts" src="./login.ts"></script>
