<template>
  <q-card class="shadow-18" style="width: 350px; height: 550px">
    <q-card-section class="bg-blue-4">
      <h4 class="text-h5 text-white q-my-xs text-center text-weight-bold">
        Register
      </h4>
    </q-card-section>
    <q-form @submit.prevent.stop="signUp">
      <q-card-section>
        <q-form class="q-px-sm q-pt-sm">
          <q-input
            square
            clearable
            v-model="name"
            type="text"
            label="Name"
            :rules="[this.isRequired]"
            ref="nameRef"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon name="face" />
            </template>
          </q-input>
          <q-input
            square
            clearable
            v-model="email"
            type="email"
            label="Email"
            :rules="[this.isRequired, this.validEmail]"
            ref="emailRef"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            square
            clearable
            v-model="password"
            type="password"
            label="Password"
            :rules="[this.isRequired, this.requiredLength]"
            ref="passwordRef"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <q-input
            square
            clearable
            v-model="password_confirmation"
            type="password"
            label="Confirm password"
            :rules="[
              this.isRequired,
              (val) => this.passwordConfirmed(val, this.password),
            ]"
            ref="passwordConfirmationRef"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>

      <q-card-actions class="q-px-lg">
        <q-btn
          unelevated
          type="submit"
          size="lg"
          color="blue-6"
          class="full-width text-white"
          label="Sign Up"
          :loading="loading"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </q-card-actions>
    </q-form>
    <q-card-section class="text-center q-pa-xs">
      <span>Already have an account? </span>
      <router-link :to="{ name: 'login' }">Please login.</router-link>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "PageRegister",
  mixins: [require("../mixins/forms/validationRules.vue")],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      loading: false,
      message: "",
    };
  },
  methods: {
    ...mapActions("user", ["register"]),
    signUp() {
      this.$refs.nameRef.validate();
      this.$refs.emailRef.validate();
      this.$refs.passwordRef.validate();
      this.$refs.passwordConfirmationRef.validate();

      if (
        this.$refs.nameRef.hasError ||
        this.$refs.emailRef.hasError ||
        this.$refs.passwordRef.hasError ||
        this.$refs.passwordConfirmationRef.hasError
      ) {
        return false;
      }

      this.loading = true;
      this.register({
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      })
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
          this.message =
            typeof error.response.data.message !== "undefined"
              ? error.response.data.message
              : "";
        });
    },
  },
});
</script>