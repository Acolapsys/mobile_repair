export const actions = {
  async createOrder({ commit }, order) {
    const user = this.getters['auth/user']

    await this.$fire.firestore
      .collection('users')
      .doc(user.uid)
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
  },
  async fetchOrders({ commit }) {
    const uid = this.getters['auth/uid']
    const ordersData = []
    await this.$fire.firestore
      .collection('users')
      .doc(uid)
      .collection('orders')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          ordersData.push({ ...doc.data(), id: doc.id })
        })
      })
    return ordersData
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
