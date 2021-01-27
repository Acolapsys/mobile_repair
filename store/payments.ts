import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ActionContext } from 'vuex'
import { $fire } from '~/utils/api'

enum incomeArticle {
  'Оплата покупателя за товар/услугу',
  'Прочий приход денег',
}
enum outcomeArticle {
  'Выплата зарплаты',
  'Прочий расход денег',
  'Оплата поставщикам товаров/запчастей',
  'Выплата прибыли',
  'Оплата аренды',
  'Оплата коммунальных расходов',
  'Оплата рекламы',
  'Выплата налогов',
}

interface Payment {
  type: string
  date: Date
  amount: number
  comment: string
  paymentArticle: incomeArticle | outcomeArticle
  managerName: string
  bill: number
  id: string
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
  public async createPayment(
    payment: Payment,
    { dispatch, commit, getters }: ActionContext<any, any>
  ) {
    const companyId: string = getters['company/companyId']
    try {
      await $fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('payments')
        .add(payment)
      await dispatch('payments/updateBill', payment.bill)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  }

  @Action
  public async fetchPayments({ commit, getters }: ActionContext<any, any>) {
    const companyId = getters['company/companyId']
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
      commit('setError', e)
      throw e
    }
  }

  @Action
  public async getBill({ commit, getters }: ActionContext<any, any>) {
    const companyId = getters['company/companyId']
    try {
      await $fire.firestore
        .collection('companies')
        .doc(companyId)
        .get()
        .then((res) => {
          if (res.exists) {
            commit('setBill', res?.data().bill)
          }
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  }

  @Action
  public async updateBill(
    newBill: number,
    { commit, getters }: ActionContext<any, any>
  ) {
    const companyId = getters['company/companyId']
    try {
      await $fire.firestore
        .collection('companies')
        .doc(companyId)
        .update({ bill: newBill })
      commit('setBill', newBill)
    } catch (e) {
      commit('setError', e)
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
