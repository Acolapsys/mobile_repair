export const actions = {
  async login({ commit }, { email, password }) {
    try {
      await this.$fire.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Successful')
          commit('setToken', true)
        })
    } catch (e) {
      console.log('Failure')
      commit('setError', e)
      throw e
    }
  },
  async logout({ commit }) {
    await this.$fire.auth.signOut()
    commit('clearToken')
  },
}
export const state = () => ({
  user: {},
  token: null,
})
export const mutations = {
  CLEAR_USER(state) {
    state.user = {}
  },
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    // you can request additional fields if they are optional (e.g. photoURL)
    if (!authUser) {
      state.user = {}
      state.token = null
      return
    }
    const { uid, email, displayName } = authUser

    state.user = {
      uid,
      displayName,
      email,
      isAdmin: claims.custom_claim,
    }
  },
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
}
export const getters = {
  user: (state) => {
    return state.user
  },
  uid: (state) => {
    return state.user.uid
  },
  isAuth: (state) => {
    return !!state.token
  },
}
