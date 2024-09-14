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
  },
});

export default store;
