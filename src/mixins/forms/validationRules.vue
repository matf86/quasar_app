<script>
module.exports = {
  methods: {
    validEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Invalid email address";
    },
    isRequired(val) {
      return (val && val.length > 0) || "Field is required";
    },
    requiredLength(val) {
      return (val && val.length >= 8) || "Password must have min. 8 chars";
    },
    passwordConfirmed(val, password) {
      return val === password || "Confirmation does not match password";
    },
  },
};
</script>