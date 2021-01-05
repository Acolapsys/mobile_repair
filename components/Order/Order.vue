<template>
  <v-row justify="center">
    <NewOrder v-if="!order" />
    <OrderEdit v-else :order="order" />
  </v-row>
</template>
<script>
import NewOrder from '@/components/Order/NewOrder'
import OrderEdit from '@/components/Order/OrderEdit'
export default {
  name: 'Order',
  components: {
    NewOrder,
    OrderEdit,
  },
  transition: 'order',

  props: {
    order: {
      type: Object,
      default: null,
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
.order-enter-active {
  transition: all 1s ease;
}
.order-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.order-enter, .order-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
</style>
