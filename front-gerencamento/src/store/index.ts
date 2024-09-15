// store/index.ts
import { createStore, Store } from 'vuex';
import axios from 'axios';

// Defina uma interface para o estado
interface State {
  data: any[];
}

// Crie a store Vuex
const store = createStore<State>({
  state() {
    return {
      data: [],
    };
  },
  mutations: {
    setData(state, data: any[]) {
      state.data = data;
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/voos');
        commit('setData', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    },
    async searchFlightByCode({ commit }, flightCode) {
      try {
        const response = await axios.get(`http://localhost:3000/voos/code/${flightCode}`);
        commit('setData', [response.data]);
      } catch (error) {
        console.error('Erro ao buscar voo por código:', error);
      }
    },
    async deleteData({ dispatch }, id) {
      try {
        await axios.delete(`http://localhost:3000/voos/${id}`);
        dispatch('fetchData');
      } catch (error) {
        console.error('Erro ao excluir o voo:', error);
      }
    },
    async addFlight({ dispatch }, flightData) {
      try {
        await axios.post('http://localhost:3000/voos', flightData);
        dispatch('fetchData');
      } catch (error) {
        console.error('Erro ao adicionar voo:', error);
      }
    }
  },
  getters: {
    flightData: (state) => state.data,
  },
});

export default store;