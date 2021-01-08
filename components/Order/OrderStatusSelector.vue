<template>
  <div>
    <v-select
      outlined
      dense
      :items="statuses"
      :value="statusName"
      style="font-size: 12px"
      hide-details
      @change="changeStatus"
    ></v-select>
    <div v-if="isOpenedPayment" class="payment_overlay">
      <div class="payment_modal px-3">
        <NewPayment
          payment-type="income"
          :amount-prop="order.totalOrderPrice - order.prepayment"
          :comment-prop="`Оплата по заказу #${order.orderId}`"
          payment-article-prop="Оплата покупателя за товар/услугу"
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'OrderStatusSelector',
  props: {
    orderId: {
      type: String,
    },
    statusName: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isOpenedPayment: false,
    order: null,
  }),
  computed: {
    ...mapGetters('options', ['statuses']),
  },
  async beforeMount() {
    this.order = await this.$store.dispatch('orders/getOrder', this.orderId)
  },
  methods: {
    async changeStatus(statusName) {
      await this.$store.dispatch('orders/updateOrderStatus', {
        orderId: this.orderId,
        statusName,
      })
      this.$store.commit('orders/editOrder', {
        orderId: this.orderId,
        statusName,
      })
      if (statusName === 'Закрыт') {
        this.isOpenedPayment = true
      }
    },
    closeModal() {
      this.isOpenedPayment = false
    },
  },
}
</script>
<style lang="scss" scoped>
.payment_overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.46);
  z-index: 7;
}
.payment_modal {
  position: absolute;
  right: 0;
  left: auto;
  top: 0;
  overflow-y: hidden;
  background-color: #fff;
  width: 500px;
  min-height: 100vh;
}
</style>
