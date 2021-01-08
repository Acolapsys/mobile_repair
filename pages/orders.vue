<template>
  <v-container>
    <v-row>
      <span class="text-h4">Заказы</span>
      <v-spacer></v-spacer>
    </v-row>
    <v-divider></v-divider>
    <v-row align="center" class="mt-5" style="font-size: 0.7rem">
      <v-btn
        depressed
        color="success"
        class="mr-5"
        small
        @click.stop="openOrder"
      >
        <v-icon left>mdi-plus</v-icon>
        Заказ
      </v-btn>
      <v-btn
        depressed
        small
        outlined
        class="mr-2"
        @click="orderStatusFilter = 'Готов'"
      >
        Готов
      </v-btn>
      <v-btn
        depressed
        small
        outlined
        class="mr-2"
        @click="orderStatusFilter = 'Новый'"
      >
        Новый
      </v-btn>
      <v-btn
        depressed
        small
        outlined
        class="mr-2"
        @click="orderStatusFilter = 'Ждет запчасть'"
      >
        Ждет запчасть
      </v-btn>
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
    <OrdersTable :orders="orders" @dblClickOrder="openOrder" />
    <div v-if="isOpenedOrder" class="order_overlay">
      <div class="order_modal px-3">
        <Order :order="currentOrder" />
      </div>
    </div>
  </v-container>
</template>
<script>
import Order from '@/components/Order/Order'
import OrdersTable from '@/components/OrdersTable'
import { mapGetters } from 'vuex'
export default {
  name: 'Orders',
  components: {
    Order,
    OrdersTable,
  },
  async asyncData({ store }) {
    await store.commit('orders/setOpenedOrder', false)
    const orders = await store.dispatch('orders/fetchOrders')
    return { orders }
  },
  data: () => ({
    search: '',
    currentOrder: null,
    orderStatusFilter: null,
  }),
  computed: {
    ...mapGetters({
      isOpenedOrder: 'orders/isOpenedOrder',
    }),
  },
  watch: {
    async isOpenedOrder(value) {
      if (!value) {
        this.orders = await this.$store.dispatch('orders/fetchOrders')
      }
    },
    async orderStatusFilter(value) {
      this.orders = await this.$store.dispatch(
        'orders/fetchOrdersByStatus',
        value
      )
    },
  },
  methods: {
    openOrder(id = null) {
      this.currentOrder = this.orders.find((order) => order.id === id)
      this.$store.commit('orders/setOpenedOrder', true)
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
.order_overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.46);
  z-index: 7;
}
.order_modal {
  position: absolute;
  right: 0;
  left: auto;
  top: 0;
  overflow-y: hidden;
  background-color: #fff;
  width: 1000px;
}
</style>
