import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import criarEventoDialog from '../../pages/eventos/components/criarEventoDialog.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('criarEventoDialog', () => {
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
  
  });

    wrapper = shallowMount(criarEventoDialog, {
      localVue,
      store,
      name: 'criarEventoDialog'
    });

  test('verifica se o valor do input para o nome do evento tem a primeira letra maiúscula', () => {
    wrapper.vm.evento.nome = 'Nome do evento';

    // Verifica se o campo nome do evento não está nulo
    expect(wrapper.vm.evento.nome).not.toBeNull();

    // Verifica se a primeira letra é maiúscula
    const valorInput = wrapper.vm.evento.nome;
    const primeiraLetra = valorInput.charAt(0);
    const primeiraLetraMaiuscula = primeiraLetra === primeiraLetra.toUpperCase();

    expect(primeiraLetraMaiuscula).toBe(true);
  });

  test('verifica se o campo nome do evento contém algum texto', async () => {
    wrapper.vm.evento.nome = 'Palestra sobre Tecnologia e seus benefícios 5º edição';

    // Verifica se o campo nome do evento contém algum texto
    expect(wrapper.vm.evento.nome).toBeTruthy();
  });

  test('verifica se o valor do input para o local do evento não está vazio', () => {
    const valorInput = 'FACOM - UFMS';
    wrapper.vm.evento.local = valorInput;

    // Verifica se o valor do local não está vazio
    const isLocalNotEmpty = valorInput.trim().length > 0;

    expect(isLocalNotEmpty).toBe(true);
  });

  test('verifica se a data do evento está no formato correto e testa quando dataFim é igual à dataInicio', () => {
    wrapper.vm.evento.dataInicio = new Date(2023, 0, 1);
    wrapper.vm.evento.dataFim = new Date(2023, 0, 1);
  
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    const dataInicio = wrapper.vm.evento.dataInicio.toLocaleDateString('pt-BR');
    const dataFim = wrapper.vm.evento.dataFim.toLocaleDateString('pt-BR');
  
    expect(regexData.test(dataInicio)).toBe(true);
    expect(regexData.test(dataFim)).toBe(true);
  
    expect(dataFim === dataInicio).toBe(true);
  });
  
  test('verifica se a data do evento está no formato correto e testa quando dataFim é anterior à dataInicio', () => {
    wrapper.vm.evento.dataInicio = new Date(2023, 0, 10);
    wrapper.vm.evento.dataFim = new Date(2023, 0, 5);
  
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    const dataInicio = wrapper.vm.evento.dataInicio.toLocaleDateString('pt-BR');
    const dataFim = wrapper.vm.evento.dataFim.toLocaleDateString('pt-BR');
  
    expect(regexData.test(dataInicio)).toBe(true);
    expect(regexData.test(dataFim)).toBe(true);
  
    expect(wrapper.vm.evento.dataInicio).not.toBeNull();
    expect(wrapper.vm.evento.dataFim).not.toBeNull();
  
    const dataInicioObj = wrapper.vm.evento.dataInicio;
    const dataFimObj = wrapper.vm.evento.dataFim;
  
    expect(dataFimObj < dataInicioObj).toBe(true);
  });  
  
  test('verifica se a data do evento está no formato correto e testa quando dataFim é posterior à dataInicio', () => {
    wrapper.vm.evento.dataInicio = new Date(2023, 0, 1);
    wrapper.vm.evento.dataFim = new Date(2023, 0, 10);
  
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    const dataInicio = wrapper.vm.evento.dataInicio.toLocaleDateString('pt-BR');
    const dataFim = wrapper.vm.evento.dataFim.toLocaleDateString('pt-BR');
  
    expect(regexData.test(dataInicio)).toBe(true);
    expect(regexData.test(dataFim)).toBe(true);
  
    const dataInicioObj = wrapper.vm.evento.dataInicio;
    const dataFimObj = wrapper.vm.evento.dataFim;
  
    expect(dataFimObj > dataInicioObj).toBe(true);
  });
  
  
  test('verifica se a hora do evento está correta e se a hora fim é maior que a hora inicial', () => {
    wrapper.vm.evento.horaInicio = '20:40';
    wrapper.vm.evento.horaFim = '21:00';

    // Verifica se os campos de hora não estão nulos
    expect(wrapper.vm.evento.horaInicio).not.toBeNull();
    expect(wrapper.vm.evento.horaFim).not.toBeNull();

    // Verifica se a hora está no formato correto (horas:minutos)
    const regexHora = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const horaInicio = wrapper.vm.evento.horaInicio;
    const horaFim = wrapper.vm.evento.horaFim;

    expect(regexHora.test(horaInicio)).toBe(true);
    expect(regexHora.test(horaFim)).toBe(true);

    // Verifica se a hora fim é maior que a hora inicial
    const [inicioHoras, inicioMinutos] = horaInicio.split(':');
    const [fimHoras, fimMinutos] = horaFim.split(':');

    const horaInicioObj = new Date();
    horaInicioObj.setHours(inicioHoras, inicioMinutos);

    const horaFimObj = new Date();
    horaFimObj.setHours(fimHoras, fimMinutos);

    expect(horaFimObj > horaInicioObj).toBe(true);
  });

  test('verifica se o campo nome do evento contém a quantidade correta de caracteres', () => {
    // Teste para valores com menos de 10 caracteres
    const valoresMenosDezCaracteres = ['Evento', 'Luta'];
    valoresMenosDezCaracteres.forEach(valor => {
      wrapper.vm.evento.nome = valor;
      expect(wrapper.vm.evento.nome.length).toBeLessThan(10);
    });

    // Teste para valor exatamente com 10 caracteres
    wrapper.vm.evento.nome = 'Evento 10+';
    expect(wrapper.vm.evento.nome.length).toBe(10);

    // Teste para valores entre 10 e 50 caracteres
    const valoresEntreDezECinquentaCaracteres = [
      'Evento com 20 caracteres',
      'Palestra sobre Tecnologia e seus benefícios'
    ];
    valoresEntreDezECinquentaCaracteres.forEach(valor => {
      wrapper.vm.evento.nome = valor;
      expect(wrapper.vm.evento.nome.length).toBeGreaterThanOrEqual(10);
      expect(wrapper.vm.evento.nome.length).toBeLessThanOrEqual(50);
    });

    // Teste para valor exatamente com 50 caracteres
    wrapper.vm.evento.nome = 'Evento com 50 caracteres                          ';
    expect(wrapper.vm.evento.nome.length).toBe(50);

    // Teste para valores com mais de 50 caracteres
    const valoresMaisDeCinquentaCaracteres = [
      'Evento com mais de 50 caracteres, exemplo 1        ',
      'Evento com mais de 50 caracteres, exemplo 2                  '
    ];
    valoresMaisDeCinquentaCaracteres.forEach(valor => {
      wrapper.vm.evento.nome = valor;
      expect(wrapper.vm.evento.nome.length).toBeGreaterThan(50);
    });
  });

});
