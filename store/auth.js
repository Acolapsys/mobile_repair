export const actions = {
  async login({ commit }, { email, password }) {
    try {
      await this.$fire.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          commit('setToken', true)
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async logout({ commit }) {
    await this.$fire.auth.signOut()
    commit('clearToken')
  },
  async getUserName({ commit }) {
    const uid = this.getters['auth/uid']
    try {
      await this.$fire.firestore
        .collection('users')
        .doc(uid)
        .get()
        .then((res) => {
          commit('setUserName', res.data().userName)
        })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async updateName({ commit }, name) {
    const uid = this.getters['auth/uid']
    try {
      await this.$fire.firestore
        .collection('users')
        .doc(uid)
        .update({ userName: name })
        .then(() => commit('setUserName', name))
    } catch (e) {
      console.log(e)
      commit('setError', e)
      throw e
    }
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
    const { uid, email } = authUser

    state.user = { ...state.user, uid, email, isAdmin: claims.custom_claim }
  },
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
  setUserName(state, name) {
    state.user = { ...state.user, name }
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
  userName: (state) => {
    return state.user.name
  },
}
