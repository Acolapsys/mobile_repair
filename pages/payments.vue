<template>
  <v-container>
    <v-row>
      <span class="text-h4">Платежи</span>
    </v-row>
    <v-divider />
    <v-row>
      <v-col cols="4">
        <v-sheet
          class="d-flex flex-column justify-center align-center grey lighten-4 pa-6 rounded-lg mt-6"
          height="200"
          elevation="5"
        >
          <h3 class="mb-3 body-1">Касса</h3>
          <div class="mb-3 display-1">
            <span>{{ bill }}</span>
            <span> руб</span>
          </div>
          <div class="buttons">
            <v-btn color="success" class="mr-5" @click.stop="createIncome">
              <v-icon left> mdi-plus </v-icon>
              Приход
            </v-btn>
            <v-btn color="red lighten-2" dark @click.stop="createOutcome">
              <v-icon left> mdi-minus </v-icon>
              Расход
            </v-btn>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="8">
        <h5 class="title">Движение средств</h5>
        <!-- <PaymentsTable :key="counter" /> -->
      </v-col>
    </v-row>
    <div v-if="isOpenedPayment" class="payment_overlay">
      <div class="payment_modal px-3">
        <NewPayment :payment-type="paymentType" @close="closeModal" />
      </div>
    </div>
  </v-container>
</template>
<script lang="ts">
// import PaymentsTable from '@/components/Payments/PaymentsTable.vue'
import NewPayment from '@/components/Payments/NewPayment.vue'

import { Vue, Component } from 'nuxt-property-decorator'

import { paymentsStore } from '~/store'
@Component({
  components: {
    // PaymentsTable,
    NewPayment,
  },
})
export default class Payments extends Vue {
  isOpenedPayment: boolean = false
  paymentType: string = ''
  counter: number = 0

  get bill(): number {
    return paymentsStore.bill
  }

  beforeMount() {
    this.isOpenedPayment = false
  }

  async mounted() {
    await paymentsStore.getBill()
  }

  createPayment(type: string) {
    this.paymentType = type
    this.isOpenedPayment = true
  }

  createIncome() {
    this.createPayment('income')
  }

  createOutcome() {
    this.createPayment('outcome')
  }

  closeModal() {
    this.paymentType = ''
    this.isOpenedPayment = false
    this.counter++
  }
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
