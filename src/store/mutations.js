export const mutations = {
  SET_USER: (state, payload) => {
    return state.user = payload
  },

  SET_STATUS: (state, payload) => {
    return state.status = payload
  },

  SET_ERROR: (state, payload) => {
    return state.error = payload
  },

  SET_TODOS: (state, payload) => {
    return state.todos = payload
  },

}
