export const actions = {
  async createPayment({ commit }, payment) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('payments')
        .add(payment)
        .then((ref) => {
          console.log(ref)
        })
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
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            paymentsData.push({ ...doc.data(), id: doc.id })
          })
        })
      console.log('store', paymentsData)
      return paymentsData
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async getBill({ commit }) {
    const companyId = this.getters['company/companyId']
    try {
      return await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .get()
        .then((res) => {
          console.log('res', res.data())
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
}

export const state = () => ({
  bill: null,
})

export const mutations = {
  setBill(state, bill) {
    state.bill = bill
  },
}

export const getters = {
  bill: (s) => s.bill,
}
