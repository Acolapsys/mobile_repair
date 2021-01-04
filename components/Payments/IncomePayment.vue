<template>
  <v-container class="pa-5">
    <v-form @submit.prevent="createIncome">
      <v-row class="my-2">
        <span class="display-1">Приход денег</span>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-5">
        <v-spacer></v-spacer>
        <span class="label-title mr-1">Сумма, руб:</span>
      </v-row>
      <v-row class="my-3 d-flex align-center">
        <span class="label-title">Внесение денег в кассу</span
        ><span class="red--text">*</span>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="amount"
          outlined
          hide-details
          dense
          class="amount_input"
          required
        ></v-text-field>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-5">
        <span class="label-title">Комментарий</span
        ><span class="red--text">*</span>
      </v-row>
      <v-row>
        <v-textarea
          v-model="comment"
          required
          height="100"
          outlined
          class="ma-1"
        ></v-textarea>
      </v-row>
      <v-row>
        <span class="label-title">Статья</span><span class="red--text">*</span>
      </v-row>
      <v-row>
        <v-col cols="10">
          <v-select
            v-model="paymentType"
            :items="types"
            value="Оплата покупателя за товар/услугу"
            outlined
            dense
            required
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <span class="label-title">Кассир</span><span class="red--text">*</span>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="manager"
            :items="managers"
            value="Тимур Шакиров"
            outlined
            dense
            required
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row align="center" style="font-size: 0.7rem">
        <v-btn depressed color="primary" class="mr-5" small type="submit">
          Сохранить
        </v-btn>
        <v-btn depressed small class="mr-2" @click="closeModal">
          Закрыть
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'NewPayment',
  data: () => ({
    types: ['Оплата покупателя за товар/услугу', 'Прочий приход денег'],
    managers: ['Тимур Шакиров', 'Оператор'],
    amount: null,
    comment: null,
    paymentType: null, // статья доходов
    manager: null,
    bill: null,
  }),
  validations: {
    amount: { required },
    comment: { required },
    paymentType: { required },
    manager: { required },
  },
  computed: {},
  methods: {
    closeModal() {
      this.$emit('close')
    },
    createIncome() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      const paymentData = {
        type: 'income',
        amount: this.amount,
        comment: this.comment,
        paymentType: this.paymentType,
        manager: this.manager,
      }
      console.log(paymentData)
      // this.$store.dispatch('payments/createPayment', paymentData)
      this.$store.dispatch('payments/getBill').then((s) => (this.bill = s))
      console.log(this.bill)
    },
  },
}
</script>
<style lang="scss" scoped>
.amount_input {
  width: 100px;
}
.label-title {
  font-weight: bold;
  font-size: 13px;
}
</style>
