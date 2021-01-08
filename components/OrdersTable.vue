<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    :search="search"
    class="pt-5"
    @dblclick:row="openOrder"
    @click:row="clickRow"
  >
    <template v-slot:item.statusName="{ item, value }">
      <OrderStatusSelector :status-name="value" :order-id="item.id" />
    </template>
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
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Заказ №',
        align: 'start',
        value: 'orderId',
      },
      { text: 'Статус', value: 'statusName', width: '100' },
      { text: 'Создан', value: 'created' },
      { text: 'Тип устройства', value: 'kindofgood' },
      { text: 'Изделие', value: 'modelOfGood' },
      { text: 'Неисправность', value: 'malfunction' },
      { text: 'Клиент', value: 'client' },
      { text: 'Цена', value: 'totalOrderPrice' },
    ],
    selectedOrderId: null,
  }),
  methods: {
    openOrder(e, row) {
      this.$emit('dblClickOrder', row.item.id)
    },
    async changeStatus(statusName) {
      await this.$store.dispatch('orders/updateOrderStatus', {
        orderId: this.selectedOrderId,
        statusName,
      })
      this.$emit('changeOrderStatus')
    },
    // нужен для получения orderID при смене статуса заказа в таблице, отрабатывает до селекта
    clickRow(item) {
      this.selectedOrderId = item.id
    },
  },
  computed: {
    ...mapGetters('options', ['statuses']),
    ...mapGetters('orders', ['orders']),
  },
}
</script>
