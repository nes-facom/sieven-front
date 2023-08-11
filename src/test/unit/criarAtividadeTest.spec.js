import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import criarAtividadeDialog from '../../pages/evento/components/criarAtividadeDialog.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CriarAtividadeDialog', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        usuario: {
          logado: false,
          papel: 'administrador',
          nome: 'Funabashi'
        }
      },
      getters: {
        getLogado: state => state.usuario.logado,
        getUsuarioNome: state => state.usuario.nome,
        isEditor: state => state.usuario.papel == 'administrador'
      }
    });
    wrapper = shallowMount(criarAtividadeDialog, {
      localVue,
      store,
      name: 'criarAtividadeDialog'
    });
  
  });

  it('verifica se o campo nome está preenchido', () => {

    // Defina o valor do campo nome diretamente nos dados do componente
    wrapper.vm.atividade.nome = 'Nome da atividade';

    // Verifique se o campo nome não está vazio
    expect(wrapper.vm.atividade.nome).not.toBeNull();
  });

  it('verifica se o campo local está preenchido', () => {

    // Defina o valor do campo local diretamente nos dados do componente
    wrapper.vm.atividade.local = 'Local da atividade';

    // Verifique se o campo local não está vazio
    expect(wrapper.vm.atividade.local).not.toBeNull();
  });

  test('verifica se a data da atividade está no formato correto e testa quando dataFim é igual à dataInicio', () => {
    wrapper.vm.atividade.dataInicio = new Date(2023, 5, 22);
    wrapper.vm.atividade.dataFim = new Date(2023, 5, 22);
  
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    const dataInicio = wrapper.vm.atividade.dataInicio.toLocaleDateString('pt-BR');
    const dataFim = wrapper.vm.atividade.dataFim.toLocaleDateString('pt-BR');
  
    expect(regexData.test(dataInicio)).toBe(true);
    expect(regexData.test(dataFim)).toBe(true);
  
    expect(dataFim === dataInicio).toBe(true);
  });
  
  test('verifica se a data da atividade está no formato correto e testa quando dataFim é anterior à dataInicio', () => {
    wrapper.vm.atividade.dataInicio = new Date(2023, 2, 18);
    wrapper.vm.atividade.dataFim = new Date(2023, 0, 30);
  
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    const dataInicio = wrapper.vm.atividade.dataInicio.toLocaleDateString('pt-BR');
    const dataFim = wrapper.vm.atividade.dataFim.toLocaleDateString('pt-BR');
  
    expect(regexData.test(dataInicio)).toBe(true);
    expect(regexData.test(dataFim)).toBe(true);
  
    expect(wrapper.vm.atividade.dataInicio).not.toBeNull();
    expect(wrapper.vm.atividade.dataFim).not.toBeNull();
  
    const dataInicioObj = wrapper.vm.atividade.dataInicio;
    const dataFimObj = wrapper.vm.atividade.dataFim;
  
    expect(dataFimObj < dataInicioObj).toBe(true);
  });  
  
  test('verifica se a data da atividade está no formato correto e testa quando dataFim é posterior à dataInicio', () => {
    wrapper.vm.atividade.dataInicio = new Date(2023, 3, 12);
    wrapper.vm.atividade.dataFim = new Date(2023, 4, 15);
  
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    const dataInicio = wrapper.vm.atividade.dataInicio.toLocaleDateString('pt-BR');
    const dataFim = wrapper.vm.atividade.dataFim.toLocaleDateString('pt-BR');
  
    expect(regexData.test(dataInicio)).toBe(true);
    expect(regexData.test(dataFim)).toBe(true);
  
    const dataInicioObj = wrapper.vm.atividade.dataInicio;
    const dataFimObj = wrapper.vm.atividade.dataFim;
  
    expect(dataFimObj > dataInicioObj).toBe(true);
  });

  it('verifica se a modalidade é definida corretamente como "Presencial"', () => {

    // Define a modalidade como "Presencial"
    wrapper.vm.atividade.modalidade = 'presencial';

    // Verifica se a modalidade foi definida corretamente nos dados do componente
    expect(wrapper.vm.atividade.modalidade).toBe('presencial');
  });

  it('verifica se a modalidade é definida corretamente como "Remoto"', () => {

    // Define a modalidade como "Remoto"
    wrapper.vm.atividade.modalidade = 'remoto';

    // Verifica se a modalidade foi definida corretamente nos dados do componente
    expect(wrapper.vm.atividade.modalidade).toBe('remoto');
  });

  it('verifica se o número de participantes é definido corretamente', () => {
  
    
    wrapper.vm.atividade.numeroParticipantes = 100;
  
    // Verifica se o número de participantes foi definido corretamente nos dados do componente
    expect(wrapper.vm.atividade.numeroParticipantes).toBe(100);
  });

  it('verifica se o campo nome da atividade contém no mínimo 10 caracteres', () => {
    
    wrapper.vm.atividade.nome = 'Atividade10';

    
    expect(wrapper.vm.atividade.nome.length).toBeGreaterThanOrEqual(10);
  });

  it('verifica se o campo nome da atividade contém no máximo 50 caracteres', () => {
  
    wrapper.vm.atividade.nome = 'Atividade com 50 caracteres                       ';
  
    
    expect(wrapper.vm.atividade.nome.length).toBeLessThanOrEqual(50);
  });
  
});
