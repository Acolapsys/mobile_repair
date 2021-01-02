export const actions = {
  async createPayment({ commit }, payment) {
    const user = this.getters['auth/user']

    await this.$fire.firestore
      .collection('users')
      .doc(user.uid)
      .collection('payments')
      .add({
        ...payment,
        date: new Date().toLocaleDateString(),
      })
      .then((ref) => {
        console.log(ref)
      })
  },
  async fetchPayments({ commit }) {
    const uid = this.getters['auth/uid']
    const paymentsData = []
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
    return paymentsData
  },
}
