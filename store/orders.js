export const actions = {
  async createOrder({ commit, dispatch }, order) {
    const companyId = this.getters['company/companyId']
    try {
      const lastId = await dispatch('getLastId')
      const newId = 'A' + (+lastId.match(/\d+/)[0] + 1)
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .add({
          ...order,
          date: new Date().toLocaleDateString(),
          orderId: newId,
        })
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
      return ordersData
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
        .then(() => {
          console.log('total', totalOrderPrice)
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async getLastId({ commit }) {
    const companyId = this.getters['company/companyId']
    let lastId = ''
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .collection('orders')
        .orderBy('orderId', 'desc')
        .limit(1)
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length) {
            lastId = snapshot.docs[0].data().orderId
          } else {
            lastId = 'A0'
          }
        })
      return lastId
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
})

export const mutations = {
  setOpenedOrder(state, modal) {
    state.isOpenedOrder = modal
  },
}

export const getters = {
  isOpenedOrder: (state) => state.isOpenedOrder,
}
