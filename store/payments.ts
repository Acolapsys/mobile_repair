import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'



enum incomeArticle {

}
enum outcomeArticle {
  
}

interface Payment {
  type: string
  date: Date
  amount: number
  comment: string
  paymentArticle: incomeArticle | outcomeArticle
  managerName: string
  bill: number
}





@Module({
  name: 'payments',
  stateFactory: true,
  namespaced: true
})

export default class Payments extends VuexModule {
 
    public bill: number = 0
    public incomeArticles: Array<string> = []
    public outcomeArticles: Array<string> = []

  @Action
  public async createPayment( payment: Object) {
    const companyId = this.context.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('payments')
        .add(payment)
      await this.context.dispatch('payments/updateBill', payment.bill, { root: true })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async fetchPayments({ commit }) {
    const companyId = this.getters['company/companyId']
    const paymentsData = []
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('payments')
        .orderBy('date', 'desc')
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            paymentsData.push({ ...doc.data(), id: doc.id })
          })
        })
      return paymentsData
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async getBill({ commit }) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .get()
        .then((res) => {
          commit('setBill', res.data().bill)
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async updateBill({ commit }, newBill) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .update({ bill: newBill })
      commit('setBill', newBill)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async fetchIncomeArticles({ commit }) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .get()
        .then((res) => {
          commit('setIncomeArticles', res.data().incomeArticles)
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async fetchOutcomeArticles({ commit }) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .get()
        .then((res) => {
          commit('setOutcomeArticles', res.data().outcomeArticles)
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
}



export const mutations = {
  setBill(state, bill) {
    state.bill = bill
  },
  setIncomeArticles(state, incomeArticles) {
    state.incomeArticles = incomeArticles
  },
  setOutcomeArticles(state, outcomeArticles) {
    state.outcomeArticles = outcomeArticles
  },
}

export const getters = {
  bill: (s) => s.bill,
}
}