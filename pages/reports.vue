<template>
  <div>
    <Reception id="printEl" :order-id="orderId" />
    <v-btn @click="print">Print</v-btn>
  </div>
</template>

<script>
import Reception from '@/components/PrintDocs/Reception'
export default {
  components: {
    Reception,
  },
  data: () => ({
    orderId: 'A1',
    cssText: `p { 
      margin-bottom: 1px !important; 
      margin-top: 1px !important; 
      font-size: 11px;
      font-family: Verdana;
      }`,
  }),
  methods: {
    print() {
      this.$Printd.print(document.querySelector('#printEl'), [this.cssText])
    },
  },
}
</script>
<style scoped></style>
