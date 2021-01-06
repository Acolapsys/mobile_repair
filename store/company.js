export const actions = {
  async createCompany({ commit }, companyName) {
    let companyId = ''
    const uid = this.getters['auth/uid']
    try {
      await this.$fire.firestore
        .collection('companies')
        .add({ companyName })
        .then((ref) => {
          companyId = ref.id
        })
      await this.$fire.firestore
        .collection('users')
        .doc(uid)
        .update({ companyId })
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .update({ users: [uid], bill: 0 })
        .then(() => {
          commit('setCompanyId', companyId)
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async getCompanyId({ commit }) {
    const uid = this.getters['auth/uid']
    try {
      await this.$fire.firestore
        .collection('users')
        .doc(uid)
        .get()
        .then((res) => {
          console.log(res.data())
          commit('setCompanyId', res.data().companyId)
        })
    } catch (e) {
      console.log(e)
      commit('setError', e)
      throw e
    }
  },
}
export const state = () => ({
  company: null,
})
export const mutations = {
  setCompanyId(state, id) {
    state.company = { ...state.company, id }
  },
}
export const getters = {
  isCompanyExist: (state) => {
    return !!state.company.id
  },
  companyId: (state) => {
    return state.company.id
  },
}
