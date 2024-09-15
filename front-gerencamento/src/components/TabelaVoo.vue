<template>
  <a-button type="primary" @click="navigateToAddFlight">Adicionar Vôo</a-button>
  <br><br>
    <a-input-search
      v-model:value="value"
      placeholder="Procurar vôo pelo código"
      enter-button
      @search="onSearch"
    />
  <br><br>
  <a-table :columns="columns" :data-source="data">
    
    <template #headerCell="{ column }">
      <template v-if="column.key === 'codigoVoo'">
        <span>Código do Vôo</span>
      </template>
      <template v-if="column.key === 'actions'">
        <span>Ações</span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'codigoVoo'">
        {{ record.codigoVoo }}
      </template>
      <template v-else-if="column.key === 'origemCEP'">
        {{ record.origemCEP }}
      </template>
      <template v-else-if="column.key === 'origemPais'">
        {{ record.origemPais }}
      </template>
      <template v-else-if="column.key === 'origemCidade'">
        {{ record.origemCidade }}
      </template>
      <template v-else-if="column.key === 'origemEstado'">
        {{ record.origemEstado }}
      </template>
      <template v-else-if="column.key === 'destinoCEP'">
        {{ record.destinoCEP }}
      </template>
      <template v-else-if="column.key === 'destinoPais'">
        {{ record.destinoPais }}
      </template>
      <template v-else-if="column.key === 'destinoCidade'">
        {{ record.destinoCidade }}
      </template>
      <template v-else-if="column.key === 'destinoEstado'">
        {{ record.destinoEstado }}
      </template>
      <template v-else-if="column.key === 'date'">
        {{ record.date }}
      </template>
      <template v-else-if="column.key === 'actions'">
        <a-button
          type="link"
          @click="onEdit(record)"
        >
          Editar
        </a-button>
        <a-button
          type="link"
          @click="onDelete(record)"
        >
          Excluir
        </a-button>
      </template>
    </template>
  </a-table>
</template>

  <script setup>
    import { computed, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
    import { Button } from 'ant-design-vue';
    import { message } from 'ant-design-vue';

    import { useRouter } from 'vue-router';

    const router = useRouter();

    const navigateToAddFlight = () => {
      router.push('/adicionar-voo');
    };
    
    const columns = [
        { title: 'Código do Vôo', dataIndex: 'codigoVoo', key: 'codigoVoo' },
        { title: 'Origem CEP', dataIndex: 'origemCEP', key: 'origemCEP' },
        { title: 'Origem País', dataIndex: 'origemPais', key: 'origemPais' },
        { title: 'Origem Cidade', dataIndex: 'origemCidade', key: 'origemCidade' },
        { title: 'Origem Estado', dataIndex: 'origemEstado', key: 'origemEstado' },
        { title: 'Destino CEP', dataIndex: 'destinoCEP', key: 'destinoCEP' },
        { title: 'Destino País', dataIndex: 'destinoPais', key: 'destinoPais' },
        { title: 'Destino Cidade', dataIndex: 'destinoCidade', key: 'destinoCidade' },
        { title: 'Destino Estado', dataIndex: 'destinoEstado', key: 'destinoEstado' },
        { title: 'Data do Vôo', dataIndex: 'date', key: 'date' },
        {
          title: 'Ações',
          key: 'actions',
          scopedSlots: { customRender: 'actions' },
        },
    ];

    const handleButtonClick = (record) => {
      console.log('Button clicked for record:', record);
    };


    const store = useStore();
    const data = computed(() => store.state.data);

    onMounted(() => {
        store.dispatch('fetchData');
    });

    const onSearch = (flightCode) => {
      if (flightCode) {
        store.dispatch('searchFlightByCode', flightCode);
      } else {
        store.dispatch('fetchData');
      }
    };

    const onEdit = (record) => {
      console.log('Editar voo', record);
      router.push({ path: '/editar-voo', query: { id: record.id } });
    };

    const onDelete = async (record) => {
      try {
        await store.dispatch('deleteData', record.id);
        message.success('Vôo excluído com sucesso!');
      } catch (error) {
        message.error('Erro ao excluir o voo!');
        console.error(error);
      }
    };

  </script>