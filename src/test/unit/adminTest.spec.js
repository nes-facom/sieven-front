import { shallowMount } from '@vue/test-utils';
import PgAdminIndex from '../../pages/admin/index.vue';

describe('PgAdminIndex', () => {
  it('deve salvar o resultado corretamente', () => {
    const wrapper = shallowMount(PgAdminIndex);
    const resultado = '12345';

    wrapper.vm.salvar(resultado);

    expect(wrapper.vm.valor).toBe(resultado);
  });

  it('deve lidar com o método inicializar corretamente', async () => {
    const wrapper = shallowMount(PgAdminIndex);

    // Simulando uma promise bem-sucedida
    const promise = Promise.resolve({ capabilities: 'dummyCapabilities' });

    await wrapper.vm.inicializar(promise);

    // Verificar se não houve chamada de alerta
    expect(alert).not.toHaveBeenCalled();

    // Simulando uma promise rejeitada
    const error = { name: 'NotAllowedError' };
    const rejectedPromise = Promise.reject(error);

    await wrapper.vm.inicializar(rejectedPromise);

    // Verificar se o alerta correto foi chamado
    expect(alert).toHaveBeenCalledWith('Você precisa autorizar o uso da câmera');
  });
});
