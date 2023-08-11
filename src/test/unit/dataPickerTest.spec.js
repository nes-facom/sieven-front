import { shallowMount} from '@vue/test-utils';
import DataPicker from '../../pages/eventos/components/dataPicker.vue';

describe('DataPicker', () => {
    it('emite o evento dataSelecionada ao fechar o menu', () => {
      const label = 'Data de Início';
      const campo = 'dataInicio';
      const wrapper = shallowMount(DataPicker, {
        propsData: {
          label,
          campo,
        },
      });
  
      // Simular a ação de fechar o menu
      wrapper.vm.fecharMenu();
  
      // Verificar se o evento foi emitido corretamente
      expect(wrapper.emitted().dataSelecionada).toBeTruthy();
      expect(wrapper.emitted().dataSelecionada[0]).toEqual([campo, wrapper.vm.data]);
    });
  
    it('atualiza corretamente as propriedades menu e data', () => {
      const label = 'Data de Início';
      const campo = 'dataInicio';
      const wrapper = shallowMount(DataPicker, {
        propsData: {
          label,
          campo,
        },
      });
  
      // Verificar o valor inicial das propriedades
      expect(wrapper.vm.menu).toBe(false);
      expect(wrapper.vm.data).toBe((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10));
  
      // Simular a ação de fechar o menu
      wrapper.vm.fecharMenu();
  
      // Verificar se as propriedades foram atualizadas corretamente
      expect(wrapper.vm.menu).toBe(false);
      expect(wrapper.vm.data).toBe((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10));
    });
  });