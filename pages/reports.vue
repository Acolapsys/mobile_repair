<template>
  <div><Reception :order-id="orderId" /></div>
</template>

<script>
import Reception from '@/components/PrintDocs/Reception'
export default {
  components: {
    Reception,
  },
  data: () => ({
    orderId: 'A1',
  }),
}
</script>
