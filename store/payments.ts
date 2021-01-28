import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ActionContext } from 'vuex'
import { $fire } from '~/utils/api'

export const enum incomeArticle {
  'Оплата покупателя за товар/услугу',
  'Прочий приход денег',
}
export const enum outcomeArticle {
  'Выплата зарплаты',
  'Прочий расход денег',
  'Оплата поставщикам товаров/запчастей',
  'Выплата прибыли',
  'Оплата аренды',
  'Оплата коммунальных расходов',
  'Оплата рекламы',
  'Выплата налогов',
}
export type Article = incomeArticle | outcomeArticle

interface Payment {
  type: string
  date: Date
  amount: number
  comment: string
  paymentArticle: incomeArticle | outcomeArticle
  managerName: string
  bill: number
  id?: string
}
@Module({
  name: 'payments',
  stateFactory: true,
  namespaced: true,
})
export default class Payments extends VuexModule {
  public bill: number = 0
  public incomeArticles: Array<incomeArticle> = []
  public outcomeArticles: Array<outcomeArticle> = []

  @Action
  public async createPayment(payment: Payment) {
    const companyId: string = this.context.getters['company/companyId']
    try {
      await $fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('payments')
        .add(payment)
      await this.context.dispatch('payments/updateBill', payment.bill)
    } catch (e) {
      this.context.commit('setError', e)
      throw e
    }
  }

  @Action
  public async fetchPayments() {
    const companyId = this.context.getters['company/companyId']
    const paymentsData: Array<Payment> = []
    try {
      await $fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('payments')
        .orderBy('date', 'desc')
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            return paymentsData.push({ ...doc.data(), id: doc.id })
          })
        })
      return paymentsData
    } catch (e) {
      this.context.commit('setError', e)
      throw e
    }
  }

  @Action
  public async getBill() {
    console.log('getBill')
    const companyId = this.context.getters['company/companyId']
    try {
      await $fire.firestore
        .collection('companies')
        .doc(companyId)
        .get()
        .then((res) => {
          console.log('bill')
          if (res.exists) {
            console.log('store-bill')
            this.context.commit('setBill', res?.data().bill)
          }
        })
    } catch (e) {
      this.context.commit('setError', e)
      throw e
    }
  }

  @Action
  public async updateBill(newBill: number) {
    const companyId = this.context.getters['company/companyId']
    try {
      await $fire.firestore
        .collection('companies')
        .doc(companyId)
        .update({ bill: newBill })
      this.context.commit('setBill', newBill)
    } catch (e) {
      this.context.commit('setError', e)
      throw e
    }
  }

  @Action
  public async fetchIncomeArticles({
    commit,
    getters,
  }: ActionContext<any, any>) {
    const companyId = getters['company/companyId']
    try {
      await $fire.firestore
        .collection('companies')
        .doc(companyId)
        .get()
        .then((res) => {
          if (res.exists) {
            commit('setIncomeArticles', res?.data().incomeArticles)
          }
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  }

  @Action
  public async fetchOutcomeArticles({
    commit,
    getters,
  }: ActionContext<any, any>) {
    const companyId = getters['company/companyId']
    try {
      await $fire.firestore
        .collection('companies')
        .doc(companyId)
        .get()
        .then((res) => {
          if (res.exists) {
            commit('setOutcomeArticles', res?.data().outcomeArticles)
          }
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  }

  @Mutation
  public setBill(bill: number) {
    this.bill = bill
  }

  @Mutation
  public setIncomeArticles(incomeArticles: Array<incomeArticle>) {
    this.incomeArticles = incomeArticles
  }

  @Mutation
  public setOutcomeArticles(outcomeArticles: Array<outcomeArticle>) {
    this.outcomeArticles = outcomeArticles
  }
}
