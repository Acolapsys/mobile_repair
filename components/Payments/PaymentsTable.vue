<template>
  <v-sheet height="200" class="px-2 my-2" outlined>
    <v-data-table
      :headers="headers"
      :items="payments"
      class="pt-5"
      hide-default-footer
    >
    </v-data-table>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: 'Создана',
        align: 'start',
        value: 'created',
      },
      { text: 'Комментарий', value: 'comment' },
      { text: 'Приход, руб', value: 'income' },
      { text: 'Расход, руб', value: 'outcome' },
      { text: 'Остаток, руб', value: 'bill' },
    ],
  }),
  payments: [],
}
</script>

<style lang="scss" scoped></style>
