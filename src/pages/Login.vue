<template>
  <q-card class="shadow-18" style="width: 350px; height: 450px">
    <q-card-section class="bg-blue-4">
      <h4 class="text-h5 text-white q-my-xs text-center text-weight-bold">
        Login
      </h4>
    </q-card-section>
    <q-form @submit.prevent.stop="signIn">
      <div v-if="registration_message" class="text-overline text-center text-green-13">
        {{ registration_message }}
      </div>
      <q-card-section>
        <q-form class="q-px-sm q-pt-sm">
          <q-input
            square
            clearable
            v-model="email"
            type="email"
            label="Email"
            :rules="[this.isRequired]"
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
            :rules="[this.isRequired]"
            ref="passwordRef"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-form>
        <div v-if="message" class="text-overline text-center text-red-13">
          {{ message }}
        </div>
      </q-card-section>
      <q-card-actions class="q-px-lg">
        <q-btn
          unelevated
          type="submit"
          size="lg"
          color="blue-6"
          class="full-width text-white"
          label="Sign In"
          :loading="loading"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </q-card-actions>
    </q-form>
    <q-card-section class="text-center q-pa-xs">
      <span class="text-grey-6">Forgot your password?</span>
    </q-card-section>
    <q-card-section class="text-center q-pa-xs">
      <router-link :to="{ name: 'register' }">Create account</router-link>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapActions, useStore } from "vuex";

export default defineComponent({
  name: "PageLogin",
  mixins: [require("../mixins/forms/validationRules.vue")],
  data() {
    return {
      password: "",
      loading: false,
      message: "",
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    signIn: function () {
      this.$refs.emailRef.validate();
      this.$refs.passwordRef.validate();

      if (this.$refs.emailRef.hasError || this.$refs.passwordRef.hasError) {
        return false;
      }

      this.message = "";
      this.loading = true;

      this.login({ email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: "dashboard" });
        })
        .catch((error) => {
          this.loading = false;
          this.message =
            typeof error.response.data.message !== "undefined"
              ? error.response.data.message
              : "";
          console.log(error);
        });
    },
  },
  setup() {
    const store = useStore();
    let email = ref(store.state.user.registration_email);
    let registration_message = ref(store.state.user.registration_message);
    return {
      email,
      registration_message
    };
  }
});
</script>