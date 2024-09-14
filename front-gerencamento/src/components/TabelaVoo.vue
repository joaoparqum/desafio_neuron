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
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    
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

    
    // Criando um ref para armazenar os dados da tabela
    const data = ref([]);
    
    // Função para buscar os dados
    const fetchData = async () => {
        try {
        const response = await axios.get('http://localhost:3000/voos');
        data.value = response.data; // Atualizando o valor do ref 'data'
        } catch (error) {
        console.error('Erro ao buscar dados:', error);
        }
    };
    
    // Usando o onMounted para buscar os dados quando o componente for montado
    onMounted(() => {
        fetchData();
    });
  </script>