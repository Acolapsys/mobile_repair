<template>
  <v-app>
    <Sidebar />

    <v-main>
      <v-container class="pa-6">
        <v-row>
          <span class="text-h4">Заказы</span>
          <v-spacer />
        </v-row>
        <v-divider />
        <v-row align="center" class="mt-5" style="font-size: 0.7rem">
          <v-btn
            depressed
            color="success"
            class="mr-5"
            small
            @click.stop="newOrder"
          >
            <v-icon left> mdi-plus </v-icon>
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
          <v-spacer />
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
          />
        </v-row>
        <OrdersTable
          @dblClickOrder="openOrder"
          @changeOrderStatus="updateOrders"
        />
        <nuxt />
      </v-container>
    </v-main>
    <NewOrder v-if="String(currentModalName) === 'newOrder'" @close="close" />
    <!-- <OrderEdit v-if="String(currentModalName) === 'orderEdit'" @close="close" /> -->
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import NewOrder from '@/components/Order/NewOrder'
// import OrderEdit from '@/components/Order/OrderEdit'
import OrdersTable from '@/components/OrdersTable'
import { mapGetters } from 'vuex'
export default {
  middleware({ store, redirect }) {
    if (!store.getters['auth/isAuth']) {
      return redirect('/login')
    }
  },
  components: { NewOrder, OrdersTable, Sidebar },

  data() {
    return {
      search: '',
      currentOrder: null,
      orderStatusFilter: null,
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuth']),
    ...mapGetters('orders', ['orders']),
    currentModalName: {
      get() {
        return this.$store.getters['ui/currentModalName']
      },
      set(value) {
        this.$store.dispatch('ui/setCurrentModalName', value)
      },
    },
  },
  watch: {
    async orderStatusFilter(value) {
      await this.$store.dispatch('orders/fetchOrdersByStatus', value)
    },
  },
  async beforeMount() {
    this.$store.dispatch('ui/setModal', false)
    await this.$store.dispatch('orders/fetchOrders')
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
    close() {
      this.$store.dispatch('ui/setModal', false)
      this.currentModalName = ''
    },
    openOrder(id) {
      this.currentOrder = this.orders.find((order) => order.id === id)
      this.$store.commit('orders/setOpenedOrder', true)
    },
    newOrder() {
      this.$store.dispatch('ui/setCurrentModalName', 'newOrder')
      this.$store.dispatch('ui/setModal', true)
    },
    async updateOrders() {
      this.orderStatusFilter
        ? await this.$store.dispatch(
            'orders/fetchOrdersByStatus',
            this.orderStatusFilter
          )
        : await this.$store.dispatch('orders/fetchOrders')
    },
  },
}
</script>
<style lang="scss" scoped>
*::-webkit-scrollbar {
  width: 7px;
}
.v-btn {
  font-size: 0.6rem;
}
.v-btn--outlined {
  border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>
