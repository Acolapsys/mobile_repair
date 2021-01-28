<template>
  <v-container class="pa-5">
    <v-form @submit.prevent="createIncome">
      <v-row class="my-2">
        <span class="display-1">{{
          paymentType === 'income' ? 'Приход денег' : 'Расход денег'
        }}</span>
        <v-spacer />
        <v-btn icon @click.stop="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-divider />
      <v-row class="mt-5">
        <v-spacer />
        <span class="label-title mr-1">Сумма, руб:</span>
      </v-row>
      <v-row class="my-3 d-flex align-center">
        <span class="label-title">{{
          paymentType === 'income'
            ? 'Внесение денег в кассу'
            : 'Списание денег из кассы'
        }}</span>
        <span class="red--text">*</span>
        <v-spacer />

        <v-text-field
          v-model="amount"
          outlined
          hide-details
          dense
          class="amount_input"
          required
        />
      </v-row>
      <v-divider />
      <v-row class="mt-5">
        <span class="label-title">Комментарий</span
        ><span class="red--text">*</span>
      </v-row>
      <v-row>
        <v-textarea
          v-model="comment"
          required
          height="100"
          outlined
          class="ma-1"
        />
      </v-row>
      <v-row>
        <span class="label-title">Статья</span><span class="red--text">*</span>
      </v-row>
      <v-row>
        <v-col cols="10">
          <v-select
            v-model="paymentArticle"
            :items="types"
            outlined
            dense
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <span class="label-title">Кассир</span><span class="red--text">*</span>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="managerName"
            :items="managers"
            outlined
            dense
            required
          />
        </v-col>
      </v-row>
      <v-row align="center" style="font-size: 0.7rem">
        <v-btn depressed color="primary" class="mr-5" small type="submit">
          Сохранить
        </v-btn>
        <v-btn depressed small class="mr-2" @click="closeModal">
          Закрыть
        </v-btn>
        <v-spacer />
      </v-row>
    </v-form>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
// import { required } from 'vuelidate/lib/validators'
import { paymentsStore } from '~/store'
import { Article, incomeArticle, outcomeArticle } from '~/store/payments'
@Component
export default class NewPayment extends Vue {
  managers: Array<string> = ['Тимур Шакиров', 'Оператор']
  amount: number = 0
  comment: string = ''
  paymentArticle: unknown = ''
  managerName: string = ''
  @Prop({ type: String, required: true, default: 'income' })
  paymentType!: string

  @Prop({ type: Number }) amountProp!: number
  @Prop({ type: String }) commentProp!: string
  @Prop({ type: String }) paymentArticleProp!: Article
  bill: number = paymentsStore.bill

  incomeArticles(): incomeArticle[] {
    return paymentsStore.incomeArticles
  }

  outcomeArticles(): outcomeArticle[] {
    return paymentsStore.outcomeArticles
  }

  get types() {
    if (this.paymentType === 'income') {
      return this.incomeArticles
    } else {
      return this.outcomeArticles
    }
  }

  // validations: {
  //   amount: { required },
  //   comment: { required },
  //   paymentArticle: { required },
  //   managerName: { required },
  // }
  beforeMount() {
    this.managerName = this.$store.getters['auth/userName']
    this.amount = this.amountProp
    this.comment = this.commentProp
    this.paymentArticle = this.paymentArticleProp
  }

  @Emit('close')
  closeModal() {}

  async createIncome() {
    // if (this.$v.$invalid) {
    //   this.$v.$touch()
    // }
    const newBill: number =
      this.paymentType === 'income'
        ? this.bill + this.amount
        : this.bill - this.amount
    const paymentData = {
      type: this.paymentType,
      date: new Date(),
      amount: this.amount,
      comment: this.comment,
      paymentArticle: this.paymentArticle as Article,
      managerName: this.managerName,
      bill: newBill,
    }
    await paymentsStore.createPayment(paymentData)
    this.closeModal()
  }
}
</script>
<style lang="scss" scoped>
.amount_input {
  width: 100px;
}
.label-title {
  font-weight: bold;
  font-size: 13px;
}
</style>
