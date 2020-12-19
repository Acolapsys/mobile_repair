import firebase from 'firebase/app'

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            commit('SET_PROCESSING', false)
          })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name,
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
  },
  state: {
    processing: false, // процесс загрузки
  },
  mutations: {
    SET_PROCESSING(state, payload) {
      state.processing = payload
    },
  },
  getters: {
    getProcessing: (state) => {
      return state.processing
    },
  },
}
