import { shallowMount } from '@vue/test-utils';
import PgPaginaInicialIndex from '../../pages/paginaInicial/index.vue';

describe('PgPaginaInicialIndex', () => {
  /*it('deve redirecionar corretamente para o site da Agetic', () => {
    const wrapper = shallowMount(PgPaginaInicialIndex);

    window.open = jest.fn(); // Cria um spy para simular window.open

    wrapper.vm.redirecionarAgetic();

    expect(window.open).toHaveBeenCalledWith('https://agetic.ufms.br/', '_blank');
  });
  */

  it('deve renderizar os componentes corretamente', () => {
    const wrapper = shallowMount(PgPaginaInicialIndex);

    // Verificar se os componentes estão presentes no DOM
    expect(wrapper.find('.pgPaginaInicial').exists()).toBe(true);
    expect(wrapper.find('.v-card').exists()).toBe(true);
    expect(wrapper.find('.v-card-title').exists()).toBe(true);
    expect(wrapper.find('.v-card-text').exists()).toBe(true);

    // Verificar se os ícones e títulos são renderizados corretamente
    const vIconWrappers = wrapper.findAll('.v-icon');
    expect(vIconWrappers.length).toBe(3);
    expect(vIconWrappers.at(0).text()).toBe('mdi-school-outline');
    expect(vIconWrappers.at(1).text()).toBe('mdi-magnify');
    expect(vIconWrappers.at(2).text()).toBe('mdi-book-arrow-right-outline');

    const spanWrappers = wrapper.findAll('span');
    expect(spanWrappers.length).toBe(3);
    expect(spanWrappers.at(0).text()).toBe('Ensino');
    expect(spanWrappers.at(1).text()).toBe('Pesquisa');
    expect(spanWrappers.at(2).text()).toBe('Extensão');
   
  });

  it('deve ter estilos corretos aplicados', () => {
    const wrapper = shallowMount(PgPaginaInicialIndex);

    // Verificar se a cor de fundo está correta
    //expect(wrapper.attributes('style')).toContain('background-image: url("../../assets/background-login.jpg");');

    // Verificar se a classe está presente no elemento
    expect(wrapper.find('#pgPaginaInicial').exists()).toBe(true);

  });

});
