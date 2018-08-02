import * as api from '../../api';

const state = {
  teams: [],
};

const getters = {
  teams(state) {
    return state.teams;
  },
};

const mutations = {
  setTeams(state, teams) {
    state.teams = teams;
  },
};

const actions = {
  readTeams({ commit }) {
    return api.readTeams()
      .then(teams => commit('setTeams', teams));
  },
};

export default {
  state, 
  getters, 
  mutations, 
  actions,
};