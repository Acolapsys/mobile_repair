<template>
  <v-card class="mt-15" style="width: 500px">
    <v-card-title> <span class="headline">Войти в аккаунт</span> </v-card-title>

    <v-form class="pa-7 text-center" @submit.prevent="submitHandler">
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        label="Имя"
        required
        width="100%"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        label="Пароль"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>

      <v-btn class="mr-4" type="submit" large> Войти </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  layout: 'login',
  data: () => ({
    name: '',
    password: '',
  }),
  methods: {
    submitHandler() {
      console.log('submitForm')
    },
  },
}
</script>

<style lang="scss" scoped></style>
