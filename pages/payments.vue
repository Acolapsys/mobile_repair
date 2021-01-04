<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-sheet
          class="d-flex flex-column justify-center align-center grey lighten-4 pa-6 rounded-lg mt-6"
          height="200"
          elevation="5"
        >
          <h3 class="mb-3 body-1">Касса</h3>
          <div class="mb-3 display-1">
            <span>{{ bill }}3</span>
            <span> руб</span>
          </div>
          <div class="buttons">
            <v-btn color="success" class="mr-5" @click.stop="createIncome">
              <v-icon left>mdi-plus</v-icon>
              Приход
            </v-btn>
            <v-btn color="red lighten-2" dark @click.stop="createOutcome">
              <v-icon left>mdi-minus</v-icon>
              Расход
            </v-btn>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="8">
        <h5 class="title">Движение средств</h5>
        <PaymentsTable />
      </v-col>
    </v-row>
    <div v-if="isOpenedPayment" class="payment_overlay">
      <div class="payment_modal px-3">
        <IncomePayment v-if="paymentType === 'income'" @close="closeModal" />
        <OutcomePayment
          v-else-if="paymentType === 'outcome'"
          @close="closeModal"
        />
      </div>
    </div>
  </v-container>
</template>
<script>
import PaymentsTable from '@/components/Payments/PaymentsTable'
import IncomePayment from '@/components/Payments/IncomePayment'
export default {
  components: {
    PaymentsTable,
    IncomePayment,
  },
  data: () => ({
    isOpenedPayment: false,
    paymentType: null,
  }),
  beforeMount() {
    this.isOpenedPayment = false
  },
  methods: {
    createIncome() {
      this.paymentType = 'income'
      this.isOpenedPayment = true
    },
    createOutcome() {
      this.paymentType = 'outcome'
      this.isOpenedPayment = true
    },
    closeModal() {
      this.paymentType = ''
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
