<template>
  <h1 style="text-align: center; margin-top: 10px;">Cadastro de Vôo</h1>
  <div class="form-container">
    <a-form
      :layout="formState"
      :model="formState"
      name="flight-form"
      :validate-messages="validateMessages"
      @finish="onPost"
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
        <a-button type="primary" html-type="submit">Cadastrar Vôo</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { message } from 'ant-design-vue';

    interface FlightForm {
      flight: {
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
    const router = useRouter();

    const onPost = async () => {
      try {
        await store.dispatch('addFlight', formState.flight);
        message.success('Vôo cadastrado com sucesso!');
        setTimeout(() => {
            router.push('/');
          }, 2000);
      } catch (error) {
        message.error(error.message || 'Erro ao cadastrar o voo!');
        console.error('Erro ao cadastrar o voo:', error);
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
