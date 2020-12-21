<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    :search="search"
    class="pt-5"
  ></v-data-table>
</template>

<script>
export default {
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Заказ №',
        align: 'start',
        value: 'orderId',
      },
      { text: 'Срок заказа', value: 'willDoneAt' },
      { text: 'Статус', value: 'statusName' },
      { text: 'Создан', value: 'created' },
      { text: 'Тип устройства', value: 'kindofgood' },
      { text: 'Изделие', value: 'model' },
      { text: 'Неисправность', value: 'malfunction' },
      { text: 'Клиент', value: 'clientName' },
      { text: 'Цена', value: 'totalSum' },
    ],
    orders: [
      {
        orderId: 'A6153',
        willDoneAt: '12.01.2021',
        statusName: 'Готов',
        created: { name: 'Тимур Шакиров', date: '12.12.2020' },
        kindof_good: 'Смартфон',
        model: 'BQ 5518',
        malfunction: 'Вода',
        clientName: 'Рычкова Ирина',
        totalSum: '0 руб',
      },
    ],
  }),
}
</script>
