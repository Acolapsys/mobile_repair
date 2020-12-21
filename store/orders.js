export const actions = {
  async createOrder({ commit }, order) {
    const uid = this.getters['auth/uid']

    console.log(order)

    await this.$fire.firestore
      .collection('users')
      .doc(uid)
      .collection('orders')
      .add(order)
      .then((ref) => {
        console.log(ref)
      })
  },
}
