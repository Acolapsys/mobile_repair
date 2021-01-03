export const state = () => ({
  error: null,
  managers: ['Тимур Шакиров'],
})
export const mutations = {
  setError(state, error) {
    state.error = error
  },
  clearError(state) {
    state.error = null
  },
}
export const getters = {
  error: (s) => s.error,
  managers: (s) => {
    console.log('managers')
    return s.managers
  },
}
export const actions = {}
