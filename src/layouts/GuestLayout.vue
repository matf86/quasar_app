<template>
  <q-layout view="hHh lpR fFf">
    <q-page
      class="window-height window-width row justify-center items-center"
      style="background: linear-gradient(#ffffff, #1976d2)"
    >
    <router-view />
    </q-page>
    <q-footer class="bg-grey-10 text-white text-center">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle2">
          <div>&#169; {{ getYear }} ACME Inc. All rights reserved</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "GuestLayout",
  computed: {
    getYear: function () {
      return new Date().getFullYear();
    },
  }
});
</script>