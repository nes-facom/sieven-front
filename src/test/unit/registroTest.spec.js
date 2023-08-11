import { mount} from '@vue/test-utils';
import pgRegistroIndex from '../../pages/registro/index.vue';


describe('pgRegistroIndex ', () => {
  it('redireciona para a página de login ao clicar no link "Já possui uma conta?"', () => {
    const wrapper = mount(pgRegistroIndex )
    const link = wrapper.find('a')
    link.trigger('click')

    expect(wrapper.vm.$route.path).toBe('/')
  })

  it('redireciona para a página de login ao clicar no botão "Voltar"', () => {
    const wrapper = mount(pgRegistroIndex )
    const voltarButton = wrapper.find('.text-white.ml-6')
    voltarButton.trigger('click')
    expect(wrapper.vm.$route.path).toBe('/')
  })

  it('chama o método newMethodAlert ao clicar no botão "Criar Conta"', () => {
    const wrapper = mount(pgRegistroIndex )
    const criarContaButton = wrapper.find('.text-white.mr-6')
    const spy = jest.spyOn(wrapper.vm, 'newMethodAlert')
    criarContaButton.trigger('click')
    expect(spy).toHaveBeenCalled()
  })

  it('chama o método redirectToLogin dentro do método newMethodAlert', () => {
    const wrapper = mount(pgRegistroIndex )
    const spy = jest.spyOn(wrapper.vm, 'redirectToLogin')
    wrapper.vm.newMethodAlert()
    expect(spy).toHaveBeenCalled()
  })

  it('atualiza a propriedade formulario.termos ao marcar ou desmarcar o checkbox', async () => {
    const wrapper = mount(pgRegistroIndex )
    const checkbox = wrapper.findComponent({ name: 'v-checkbox' })
    expect(wrapper.vm.formulario.termos).toBe(false)
    await checkbox.setChecked(true)
    expect(wrapper.vm.formulario.termos).toBe(true)
    await checkbox.setChecked(false)
    expect(wrapper.vm.formulario.termos).toBe(false)
  })
})