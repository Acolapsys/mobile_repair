export const actions = {
  async createOrder({ commit, dispatch }, order) {
    const companyId = this.getters['company/companyId']
    try {
      const lastOrderLabel = await dispatch('getLastOrderLabel')
      const newLabel = 'A' + (+lastOrderLabel.match(/\d+/)[0] + 1)
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .add({
          ...order,
          date: new Date().toLocaleDateString(),
          orderLabel: newLabel,
        })
      await dispatch('updateLastOrderLabel', newLabel)
      return newLabel
    } catch (e) {
      console.log('error', e)
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
      commit('setOrders', ordersData)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async updateTotalOrderPrice({ commit }, { orderId, totalOrderPrice }) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .doc(orderId)
        .update({ totalOrderPrice })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async getLastOrderLabel({ commit }) {
    const companyId = this.getters['company/companyId']
    try {
      return await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .get()
        .then((snapshot) => snapshot.data().lastOrderLabel || 'A0')
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async updateLastOrderLabel({ commit }, lastOrderLabel) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .update({ lastOrderLabel })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async fetchOrdersByStatus({ commit }, statusName) {
    const companyId = this.getters['company/companyId']
    const ordersData = []
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .where('statusName', '==', statusName)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            ordersData.push({ ...doc.data(), id: doc.id })
          })
        })
      commit('setOrders', ordersData)
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
  },
  async updateOrderStatus({ commit }, { orderId, statusName }) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .doc(orderId)
        .update({ statusName })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async addWork(
    { commit, dispatch },
    { work, workPrice, orderId, totalOrderPrice }
  ) {
    try {
      const companyId = this.getters['company/companyId']
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .doc(orderId)
        .collection('worksAndParts')
        .add({ work, workPrice })
      await dispatch('updateTotalOrderPrice', {
        orderId,
        totalOrderPrice: +totalOrderPrice + +workPrice,
      })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async deleteWork({ commit }, { workId, orderId }) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .doc(orderId)
        .collection('worksAndParts')
        .doc(workId)
        .delete()
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async getOrder({ commit }, orderId) {
    const companyId = this.getters['company/companyId']
    try {
      return await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .doc(orderId)
        .get()
        .then((snapshot) => snapshot.data())
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async fetchWorks({ commit }, orderId) {
    try {
      const companyId = this.getters['company/companyId']
      const worksData = []
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .doc(orderId)
        .collection('worksAndParts')
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            worksData.push({ ...doc.data(), id: doc.id })
          })
        })
      return worksData
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
}

export const state = () => ({
  orders: [],
})

export const mutations = {
  setOrders(state, ordersData) {
    state.orders = ordersData
  },
  editOrderStatus(state, { orderId, statusName }) {
    state.orders = [
      ...state.orders.map((el) =>
        el.id === orderId ? { ...el, statusName } : el
      ),
    ]
  },
}
export const getters = {
  orders: (state) => state.orders,
}
