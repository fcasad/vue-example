import * as api from '../api';

const state = {
  users: [],
  currentUser: null,
};

const getters = {
  users(state) {
    return state.users;
  },
  currentUser(state) {
    return state.currentUser;
  },
};

const mutations = {
  setUsers(state, { users }) {
    state.users = users;
  },
  setCurrentUser(state, { user }) {
    state.currentUser = user;
  },
};

const actions = {
  readUsers({ commit }) {
    return api.readUsers()
      .then(users => commit('setUsers', { users }));
  },
  readUser({ commit }, { id }) {
    return api.readUser(id)
      .then(user => commit('setCurrentUser', { user }));
  },
  updateUser({ commit, dispatch }, { id, update }) {
    return api.updateUser(id, update)
      .then(() => dispatch('readUser', { id }));
  },
};

export default {
  state, 
  getters, 
  mutations, 
  actions,
};
