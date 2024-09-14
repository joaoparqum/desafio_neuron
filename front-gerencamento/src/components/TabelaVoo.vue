<template>
    <router-link to="./CreaVoo.vue">
        <a-button type="primary">Adicionar Voo</a-button>
    </router-link>
    <br><br>
    <a-input-search
      v-model:value="value"
      placeholder="Procurar voo"
      enter-button
      @search="onSearch"
    />
    <br><br>
      <a-table :columns="columns" :data-source="data"></a-table>
  </template>

  <script setup>
    import { computed, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { Store } from 'vuex';
    
    // Definindo colunas
    const columns = [
        { title: 'Código do Voo', dataIndex: 'codigoVoo', key: 'codigoVoo' },
        { title: 'Origem CEP', dataIndex: 'origemCEP', key: 'origemCEP' },
        { title: 'Origem País', dataIndex: 'origemPais', key: 'origemPais' },
        { title: 'Origem Cidade', dataIndex: 'origemCidade', key: 'origemCidade' },
        { title: 'Origem Estado', dataIndex: 'origemEstado', key: 'origemEstado' },
        { title: 'Destino CEP', dataIndex: 'destinoCEP', key: 'destinoCEP' },
        { title: 'Destino País', dataIndex: 'destinoPais', key: 'destinoPais' },
        { title: 'Destino Cidade', dataIndex: 'destinoCidade', key: 'destinoCidade' },
        { title: 'Destino Estado', dataIndex: 'destinoEstado', key: 'destinoEstado' },
        { title: 'Data do Voo', dataIndex: 'date', key: 'date' },
    ];

    
        // Acessando a store Vuex
    const store = useStore();
    const data = computed(() => store.state.data);

    // Buscando os dados quando o componente é montado
    onMounted(() => {
        store.dispatch('fetchData');
    });

  </script>