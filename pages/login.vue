<template>
  <v-card class="mt-15" style="width: 500px">
    <v-card-title> <span class="headline">Войти в аккаунт</span> </v-card-title>

    <v-form class="pa-7 text-center" @submit.prevent="submitHandler">
      <v-text-field
        v-model="email"
        :error-messages="emailError"
        label="Почта"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        :error-messages="passwordErrors"
        label="Пароль"
        required
      ></v-text-field>

      <v-card-actions>
        <v-btn class="mr-4" type="submit" large> Войти </v-btn>
      </v-card-actions>
    </v-form>
    <v-snackbar v-model="snackbar">{{ alertMessage }}</v-snackbar>
  </v-card>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/plugins/messages'
export default {
  layout: 'login',
  name: 'Login',
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  data() {
    return {
      email: '',
      password: '',
      snackbar: false,
      alertMessage: '',
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    },

    emailError() {
      if (this.$v.email.$dirty && !this.$v.email.required) {
        return 'Введите E-mail'
      }
      if (this.$v.email.$dirty && !this.$v.email.email) {
        return 'Введите верный E-mail'
      }
      return ''
    },
    passwordErrors() {
      if (
        (this.$v.password.$dirty && !this.$v.password.minLength) ||
        (this.$v.password.$dirty && !this.$v.password.required)
      ) {
        return (
          'Минимальная длина пароля ' + this.$v.password.$params.minLength.min
        )
      }
      return ''
    },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.alertMessage = messages[this.$route.query.message]
      this.snackbar = true
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()

        return
      }
      const formData = {
        email: this.email,
        password: this.password,
      }

      try {
        await this.$store.dispatch('auth/login', formData)
        this.$router.push('/orders')
      } catch (e) {
        this.alertMessage = messages[this.error.code] || 'Что-то пошло не так'
        this.snackbar = true
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
