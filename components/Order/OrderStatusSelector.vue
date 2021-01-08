<template>
  <v-select
    outlined
    dense
    :items="statuses"
    :value="statusName"
    style="font-size: 12px"
    hide-details
    @change="changeStatus"
  ></v-select>
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
  computed: {
    ...mapGetters('options', ['statuses']),
  },
  methods: {
    async changeStatus(statusName) {
      await this.$store.dispatch('orders/updateOrderStatus', {
        orderId: this.orderId,
        statusName,
      })
    },
  },
}
</script>
