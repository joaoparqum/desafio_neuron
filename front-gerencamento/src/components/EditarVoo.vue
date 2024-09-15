<template>
  <h1 style="text-align: center; margin-top: 10px;">Editar Vôo</h1>
  <div class="form-container">
    <a-form
      :layout="formState"
      :model="formState"
      name="flight-form"
      :validate-messages="validateMessages"
      @finish="onEdit"
    >

      <a-form-item label="Origem CEP" :rules="[{ required: true }]">
        <a-input v-model:value="formState.flight.origemCEP" placeholder="Digite o CEP de origem" />
      </a-form-item>

      <a-form-item label="Origem País" :rules="[{ required: true }]">
        <a-input v-model:value="formState.flight.origemPais" placeholder="Digite o País de origem" />
      </a-form-item>

      <a-form-item label="Origem Cidade" :rules="[{ required: true }]">
        <a-input v-model:value="formState.flight.origemCidade" placeholder="Digite a Cidade de origem" />
      </a-form-item>

      <a-form-item label="Origem Estado" :rules="[{ required: true }]">
        <a-input v-model:value="formState.flight.origemEstado" placeholder="Digite o Estado de origem" />
      </a-form-item>

      <a-form-item label="Destino CEP" :rules="[{ required: true }]">
        <a-input v-model:value="formState.flight.destinoCEP" placeholder="Digite o CEP de destino" />
      </a-form-item>

      <a-form-item label="Destino País" :rules="[{ required: true }]">
        <a-input v-model:value="formState.flight.destinoPais" placeholder="Digite o País de destino" />
      </a-form-item>

      <a-form-item label="Destino Cidade" :rules="[{ required: true }]">
        <a-input v-model:value="formState.flight.destinoCidade" placeholder="Digite a Cidade de destino" />
      </a-form-item>

      <a-form-item label="Destino Estado" :rules="[{ required: true }]">
        <a-input v-model:value="formState.flight.destinoEstado" placeholder="Digite o Estado de destino" />
      </a-form-item>

      <a-form-item label="Data do Vôo" :rules="[{ required: true }]">
        <a-date-picker v-model:value="formState.flight.date" style="width: 100%;" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit">Editar Vôo</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
    import { reactive, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import { message } from 'ant-design-vue';
    import axios from 'axios';

    interface FlightForm {
      flight: {
        id?: string;
        origemCEP: string;
        origemPais: string;
        origemCidade: string;
        origemEstado: string;
        destinoCEP: string;
        destinoPais: string;
        destinoCidade: string;
        destinoEstado: string;
        date: string;
      };
    }

    const formState = reactive<FlightForm>({
      flight: {
        id: '',
        origemCEP: '',
        origemPais: '',
        origemCidade: '',
        origemEstado: '',
        destinoCEP: '',
        destinoPais: '',
        destinoCidade: '',
        destinoEstado: '',
        date: '',
      },
    });


    const validateMessages = {
      required: '${label} é obrigatório!',
    };

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const loadFlightData = async (id: string) => {
      try {
        const response = await axios.get(`http://localhost:3000/voos/${id}`);
        formState.flight = response.data;
      } catch (error) {
        console.error('Erro ao carregar dados do voo:', error);
      }
    };

    onMounted(() => {
      const flightId = route.params.id as string;
      if (flightId) {
        loadFlightData(flightId);
      }
    });

    const onEdit = async () => {
      try {
        // Acesse o ID diretamente do formState
        const id = formState.flight.id;
        
        if (id) {
          // Construa os dados atualizados excluindo o ID
          const updatedData = {
            origemCEP: formState.flight.origemCEP,
            origemPais: formState.flight.origemPais,
            origemCidade: formState.flight.origemCidade,
            origemEstado: formState.flight.origemEstado,
            destinoCEP: formState.flight.destinoCEP,
            destinoPais: formState.flight.destinoPais,
            destinoCidade: formState.flight.destinoCidade,
            destinoEstado: formState.flight.destinoEstado,
            date: formState.flight.date,
          };

          // Envie a ação de atualização ao store
          await store.dispatch('updateFlight', { id, updatedData });
          message.success('Vôo editado com sucesso!');

          // Navegue para a página principal após o sucesso
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          message.error('ID do vôo não encontrado!');
        }
      } catch (error) {
        message.error('Erro ao editar o voo!');
        console.error(error);
      }
    };


</script>

<style scoped>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
