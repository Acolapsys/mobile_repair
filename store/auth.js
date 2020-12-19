export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await this.$fire.auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log('Successful')
            commit('SET_PROCESSING', false)
          })
      } catch (e) {
        console.log('Failure')
        commit('setError', e)
        throw e
      }
    },
    async logout({ commit }) {
      await this.$fire.auth.signOut()
      commit('CLEAR_USER')
    },
  },
  state: {
    processing: false, // процесс загрузки
    user: {},
    isAuth: false,
  },
  mutations: {
    SET_PROCESSING(state, payload) {
      state.processing = payload
    },
    CLEAR_USER(state) {
      state.user = {}
      state.isAuth = false
    },
    ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
      // you can request additional fields if they are optional (e.g. photoURL)
      if (!authUser) {
        state.user = {}
        state.isAuth = false
        return
      }
      const { uid, email, displayName } = authUser
      state.isAuth = true

      state.user = {
        uid,
        displayName,
        email,
        isAdmin: claims.custom_claim,
      }
    },
  },
  getters: {
    getProcessing: (state) => {
      return state.processing
    },
    user: (state) => {
      return state.user
    },
    uid: (state) => {
      return state.user.uid
    },
    isAuth: (state) => {
      return state.isAuth
    },
  },
}
