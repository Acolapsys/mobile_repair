<template>
  <v-sheet class="px-2 my-2" outlined>
    <v-data-table
      :headers="headers"
      :items="payments"
      class="pt-5"
      hide-default-footer
    >
      <template v-slot:item.comment="{ item }">
        <span>{{ item.comment }}</span>
        <br />
        <span class="grey--text lighten-3--text">{{
          item.paymentArticle
        }}</span>
      </template>
      <template v-slot:item.created="{ item }">
        <span>{{ item.managerName }}</span>
        <br />
        <span>{{ item.date }}</span>
      </template>
      <template v-slot:item.income="{ item }">
        <span :class="{ 'green--text': item.type === 'income' }">{{
          item.type === 'income' ? item.amount : 0
        }}</span>
      </template>
      <template v-slot:item.outcome="{ item }">
        <span :class="{ 'red--text': item.type === 'outcome' }">{{
          item.type === 'outcome' ? item.amount : 0
        }}</span>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script>
export default {
  async fetch({ store }) {
    this.payments = await store.dispatch('payments/fetchPayments')
  },
  data: () => ({
    headers: [
      {
        text: 'Создана',
        align: 'start',
        value: 'created',
        width: '150',
      },
      { text: 'Комментарий', value: 'comment', width: '250' },
      { text: 'Приход, руб', align: 'right', value: 'income', width: '50' },
      { text: 'Расход, руб', align: 'right', value: 'outcome', width: '50' },
      { text: 'Остаток, руб', align: 'right', value: 'bill', width: '50' },
    ],
    payments: [],
  }),
  async beforeMount() {
    this.payments = await this.$store.dispatch('payments/fetchPayments')
  },
}
</script>

<style lang="scss" scoped></style>
