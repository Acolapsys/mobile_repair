<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    :search="search"
    class="pt-5"
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
    orders1: [
      {
        orderId: 'A6153',
        willDoneAt: '12.01.2021',
        statusName: 'Готов',
        created: { name: 'Тимур Шакиров', date: '12.12.2020' },
        kindof_good: 'Смартфон',
        modelOfGood: 'BQ 5518',
        malfunction: 'Вода',
        clientName: 'Рычкова Ирина',
        totalSum: '0 руб',
      },
    ],
  }),
  methods: {
    getName(item) {
      const parsedobj = JSON.parse(JSON.stringify(item.created))
      console.log(parsedobj)
      return item
    },
  },
}
</script>
