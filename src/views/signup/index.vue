<template lang="pug">

v-container(fill-height, align-center, justify-center)
  v-card(width="480px")
    form(data-test="form", ref="form", @submit.prevent="signup")
      v-card-title.justify-center
        | Sign up
      v-card-text
        v-text-field(
          data-test="email-input",
          v-model="email",
          v-validate="'required|email|user-availability:email,false'",
          data-vv-delay="350",
          autofocus,
          outlined,
          name="email",
          :error-messages="errors.first('email')",
          label="Email",
          autocomplete="email",
          maxlength="192")
        v-text-field(
          data-test="username-input",
          v-model="username",
          v-validate="'required|min:5|max:32|user-availability:username,false'",
          data-vv-delay="350",
          outlined,
          name="username",
          :error-messages="errors.first('username')",
          label="Username",
          autocomplete="username",
          maxlength="32")
        password-field(
          data-test="password-input",
          v-model="password",
          v-validate="'required|min:5|max:32'",
          outlined,
          name="password",
          :error-messages="errors.first('password')",
          label="Password",
          autocomplete="new-password",
          maxlength="32",
          counter)
        v-text-field(
          data-test="fullname-input",
          v-model="fullname",
          v-validate="'required'",
          outlined,
          name="fullname",
          :error-messages="errors.first('fullname')",
          label="Full Name",
          autocomplete="name")
      v-card-actions
        v-layout.mx-0(row, reverse)
          v-flex(shrink)
            v-btn.ma-0.text-none(
              data-test="submit-btn",
              type="submit",
              color="primary"
              :loading="processing",
              @click="signup")
              | Sign up
          v-spacer
          v-flex(shrink)
            v-btn.ma-0.text-none(
              data-test="login-link",
              text,
              color="primary",
              :disabled="processing",
              :to="{ name: 'sign in' }")
                | Just login

</template>
<script lang="ts" src="./signup.ts">
</script>
