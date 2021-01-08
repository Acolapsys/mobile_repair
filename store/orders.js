export const actions = {
  async createOrder({ commit, dispatch }, order) {
    const companyId = this.getters['company/companyId']
    try {
      const lastOrderId = await dispatch('getLastOrderId')
      const newId = 'A' + (+lastOrderId.match(/\d+/)[0] + 1)
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .add({
          ...order,
          date: new Date().toLocaleDateString(),
          orderId: newId,
        })
      await dispatch('updateLastOrderId', newId)
      return newId
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
  async getLastOrderId({ commit }) {
    const companyId = this.getters['company/companyId']
    try {
      return await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .get()
        .then((snapshot) => snapshot.data().lastOrderId || 'A0')
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async updateLastOrderId({ commit }, lastOrderId) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .update({ lastOrderId })
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
    let orderData = {}
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .where('orderId', '==', orderId)
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length) {
            orderData = { ...snapshot.docs[0].data() }
          }
        })
      return orderData
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
  isOpenedOrder: false,
  orders: [],
})

export const mutations = {
  setOpenedOrder(state, modal) {
    state.isOpenedOrder = modal
  },
  setOrders(state, ordersData) {
    state.orders = ordersData
  },
  editOrder(state, { orderId, statusName }) {
    state.orders = [
      ...state.orders.map((el) =>
        el.id === orderId ? { ...el, statusName } : el
      ),
    ]
  },
}

export const getters = {
  isOpenedOrder: (state) => state.isOpenedOrder,
  orders: (state) => state.orders,
}
