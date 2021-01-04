<template>
  <v-container class="pa-5">
    <v-form @submit.prevent="createOutcome">
      <v-row class="my-2">
        <span class="display-1">Расход денег</span>
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
        <span class="label-title"> Списание денег из кассы</span>
        <v-spacer></v-spacer>
        <v-text-field
          outlined
          hide-details
          dense
          required
          class="amount_input"
        ></v-text-field>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-5">
        <span class="label-title">Комментарий</span
        ><span class="red--text">*</span>
      </v-row>
      <v-row>
        <v-textarea height="100" outlined class="ma-1" required></v-textarea>
      </v-row>
      <v-row>
        <span class="label-title">Статья</span><span class="red--text">*</span>
      </v-row>
      <v-row>
        <v-col cols="10">
          <v-select :items="items" outlined dense required> </v-select>
        </v-col>
      </v-row>
      <v-row>
        <span class="label-title">Кассир</span><span class="red--text">*</span>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-select
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
export default {
  name: 'OutcomePayment',
  data: () => ({
    items: [
      'Возврат денег покупателю',
      'Выплата зарплаты',
      'Выплата налогов',
      'Выплата прибыли',
      'Оплата аренды',
      'Оплата коммунальных расходов',
      'Оплата поставщикам товаров/запчастей',
      'Оплата рекламы',
      'Прочий расход денег',
    ],
    managers: ['Тимур Шакиров', 'Оператор'],
  }),
  methods: {
    closeModal() {
      this.$emit('close')
    },
    createOutcome() {},
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
