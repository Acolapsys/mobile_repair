<template>
  <v-row justify="center">
    <NewOrder v-if="!order" />
    <OrderEdit v-else />
  </v-row>
</template>
<script>
export default {
  name: 'Order',
  props: {
    order: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      clientName: '',
      phoneNumber: null,
      kindofgood: '',
      brandName: '',
      modelOfGood: '',
      malfunction: '',
      appearance: '',
      notes: '',
      estimatedPrice: 0,
      prepayment: 0,
      managerName: '',
    }
  },
  methods: {
    async createOrder() {
      const orderData = {
        clientName: this.clientName,
        phoneNumber: this.phoneNumber,
        kindofgood: this.kindofgood,
        brandName: this.brandName,
        modelOfGood: this.modelOfGood,
        malfunction: this.malfunction,
        appearance: this.appearance,
        notes: this.notes,
        estimatedPrice: this.estimatedPrice,
        prepayment: this.prepayment,
        managerName: this.managerName,
      }
      await this.$store.dispatch('orders/createOrder', orderData)
      this.$emit('close')
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>
<style scoped>
.v-btn {
  font-size: 0.6rem;
}
.col-left {
  text-align: right;
}
</style>
