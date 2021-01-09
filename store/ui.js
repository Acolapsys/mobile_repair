export const state = () => ({
  currentModalName: '',
  isModalVisible: false,
  overlay: false,
  notification: {
    type: '',
    title: '',
    description: '',
  },
})

export const mutations = {
  setOverlay(state, flag) {
    state.overlay = flag
  },
  setCurrentModalName(state, name) {
    state.currentModalName = name
  },
  setModal(state, visibility) {
    state.isModalVisible = visibility
  },
  setNotification(state, notification) {
    state.notification = notification
  },
}

export const actions = {
  setModal({ commit }, flag = true) {
    commit('setModal', flag)
  },
  setCurrentModalName({ commit }, name) {
    commit('setCurrentModalName', name)
  },
  setOverlay({ commit }, flag = true) {
    commit('setOverlay', flag)
  },
  setNotification(
    { commit },
    { type = 'success', title = 'Операция прошла успешно', description = '' }
  ) {
    type = ['success', 'error'].includes(type) ? type : 'success'
    commit('setNotification', { type, title, description })
  },
}

export const getters = {
  currentModalName: (state) => state.currentModalName,
  isModalVisible: (state) => state.isModalVisible,
  overlay: (state) => state.overlay,
  notification: (state) => state.notification,
}
