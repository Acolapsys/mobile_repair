<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    :search="search"
    class="pt-5"
    @dblclick:row="openOrder"
  >
    <template v-slot:item.created="{ item }">
      <span>{{ item.managerName }}</span>
      <br />

      <span>{{ item.date }}</span>
    </template>
    <template v-slot:item.client="{ item }">
      <span>{{ item.clientName }}</span>
      <br />

      <span>{{ item.phoneNumber }}</span>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Заказ №',
        align: 'start',
        value: 'orderId',
      },
      { text: 'Статус', value: 'statusName' },
      { text: 'Создан', value: 'created' },
      { text: 'Тип устройства', value: 'kindofgood' },
      { text: 'Изделие', value: 'modelOfGood' },
      { text: 'Неисправность', value: 'malfunction' },
      { text: 'Клиент', value: 'client' },
      { text: 'Цена', value: 'totalSum' },
    ],
  }),
  methods: {
    openOrder(e, row) {
      this.$emit('dblClickOrder', row.item.id)
    },
  },
}
</script>
