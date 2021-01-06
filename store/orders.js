export const actions = {
  async createOrder({ commit }, order) {
    const companyId = this.getters['company/companyId']

    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .add({
          ...order,
          date: new Date().toLocaleDateString(),
          statusName: 'Новый',
          price: 0,
        })
        .then((ref) => {
          console.log(ref)
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async fetchOrders({ commit }) {
    const companyId = this.getters['company/companyId']
    const ordersData = []
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            ordersData.push({ ...doc.data(), id: doc.id })
          })
        })
      return ordersData
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async updateOrder({ commit }, order) {
    const companyId = this.getters['company/companyId']
    await setTimeout(() => {
      console.log(companyId, order)
    }, 1000)

    // await this.$fire.firestore
    //   .collection('users')
    //   .doc(user.uid)
    //   .collection('orders')
    //   .add({
    //     ...order,
    //     date: new Date().toLocaleDateString(),
    //     price: 0,
    //   })
    //   .then((ref) => {
    //     console.log(ref)
    //   })
  },
}

export const state = () => ({
  isOpenedOrder: false,
})

export const mutations = {
  setOpenedOrder(state, modal) {
    state.isOpenedOrder = modal
  },
}

export const getters = {
  isOpenedOrder: (state) => state.isOpenedOrder,
}
