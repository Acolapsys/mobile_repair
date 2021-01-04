export const actions = {
  async createPayment({ commit }, payment) {
    const uid = this.getters['auth/uid']
    try {
      await this.$fire.firestore
        .collection('users')
        .doc(uid)
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
    const uid = this.getters['auth/uid']
    const paymentsData = []
    try {
      await this.$fire.firestore
        .collection('users')
        .doc(uid)
        .collection('payments')
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            paymentsData.push({ ...doc.data(), id: doc.id })
          })
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
    return paymentsData
  },
  async getBill({ commit }) {
    const uid = this.getters['auth/uid']
    try {
      return await this.$fire.firestore
        .collection('users')
        .doc(uid)
        .get()
        .then((s) => s.data())
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
