export const actions = {
  async addStatus({ commit }, status) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .update({
          statuses: this.$fireModule.firestore.FieldValue.arrayUnion(status),
        })
        .then((ref) => {
          console.log(ref)
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async fetchStatuses({ commit }) {
    const companyId = this.getters['company/companyId']
    try {
      await this.$fire.firestore
        .collection('companies')
        .doc(companyId)
        .get()
        .then((res) => {
          commit('setStatuses', res.data().statuses)
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
}

export const state = () => ({
  statuses: [],
})

export const mutations = {
  setStatuses(state, array) {
    state.statuses = array
  },
}

export const getters = {
  statuses: (s) => s.statuses,
}
