<template>
  <v-container>
    <v-row>
      <span class="display-2">Заказы</span>
      <v-spacer></v-spacer>
    </v-row>
    <v-divider></v-divider>
    <v-row align="center" class="mt-5" style="font-size: 0.7rem">
      <v-btn
        depressed
        color="success"
        class="mr-5"
        small
        @click.stop="openNewOrder = true"
      >
        <v-icon left>mdi-plus</v-icon>
        Заказ
      </v-btn>
      <v-btn depressed small outlined class="mr-2"> Готовые </v-btn>
      <v-btn depressed small outlined class="mr-2"> В работе </v-btn>
      <v-btn depressed small outlined class="mr-2"> Ждет запчасть </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
        append-icon="mdi-close"
        outlined
        dense
        style="max-width: 300px"
        single-line
        hide-details
      ></v-text-field>
    </v-row>
    <OrdersTable :orders="orders" />

    <NewOrder v-if="openNewOrder" @close="closeDialog" />
  </v-container>
</template>
<script>
import NewOrder from '@/components/NewOrder'
import OrdersTable from '@/components/OrdersTable'
export default {
  components: {
    NewOrder,
    OrdersTable,
  },
  async asyncData({ store }) {
    const orders = await store.dispatch('orders/fetchOrders')
    return { orders }
  },
  data: () => ({
    search: '',
    openNewOrder: false,
  }),
  methods: {
    closeDialog() {
      this.openNewOrder = false
    },
  },
}
</script>

<style scoped>
.v-btn {
  font-size: 0.6rem;
}
.v-btn--outlined {
  border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>
