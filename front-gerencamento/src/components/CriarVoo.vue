<template>
  <div class="form-container">
    <a-form
    :model="formState"
    v-bind="layout"
    name="flight-form"
    :validate-messages="validateMessages"
    @finish="onPost"
  >
    <a-form-item :name="['flight', 'origemCEP']" label="Origem CEP" :rules="[{ required: true }]">
      <a-input style="margin-left: 10px;" v-model:value="formState.flight.origemCEP" />
    </a-form-item>

    <a-form-item :name="['flight', 'origemPais']" label="Origem País" :rules="[{ required: true }]">
      <a-input style="margin-left: 10px;" v-model:value="formState.flight.origemPais" />
    </a-form-item>

    <a-form-item :name="['flight', 'origemCidade']" label="Origem Cidade" :rules="[{ required: true }]">
      <a-input style="margin-left: 10px;" v-model:value="formState.flight.origemCidade" />
    </a-form-item>

    <a-form-item :name="['flight', 'origemEstado']" label="Origem Estado" :rules="[{ required: true }]">
      <a-input style="margin-left: 10px;" v-model:value="formState.flight.origemEstado" />
    </a-form-item>

    <a-form-item :name="['flight', 'destinoCEP']" label="Destino CEP" :rules="[{ required: true }]">
      <a-input style="margin-left: 10px;" v-model:value="formState.flight.destinoCEP" />
    </a-form-item>

    <a-form-item :name="['flight', 'destinoPais']" label="Destino País" :rules="[{ required: true }]">
      <a-input style="margin-left: 10px;" v-model:value="formState.flight.destinoPais" />
    </a-form-item>

    <a-form-item :name="['flight', 'destinoCidade']" label="Destino Cidade" :rules="[{ required: true }]">
      <a-input style="margin-left: 12px;" v-model:value="formState.flight.destinoCidade" />
    </a-form-item>

    <a-form-item :name="['flight', 'destinoEstado']" label="Destino Estado" :rules="[{ required: true }]">
      <a-input style="margin-left: 10px;" v-model:value="formState.flight.destinoEstado" />
    </a-form-item>

    <a-form-item :name="['flight', 'date']" label="Data do Vôo" :rules="[{ required: true }]">
      <a-date-picker style="margin-left: 10px;" v-model:value="formState.flight.date" />
    </a-form-item>

    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
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

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const validateMessages = {
      required: '${label} é obrigatório!',
    };

    const formState = reactive({
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

    const store = useStore();
    const router = useRouter();

    const onFinish = (values: any) => {
      console.log('Dados do voo:', values);
    };

    const onPost = async () => {
      try {
          await store.dispatch('addFlight', formState);

          message.success('Vôo cadastrado com sucesso!');

          router.push('/');
        } catch (error) {
          message.error('Erro ao cadastrar o voo!');
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
