<template>
  <div id="pgEvento">
    <v-row class="mt-4"
           justify="center">
      <v-col class="mr-8">
        <v-row id="containerBase">
          <div id="cardSobreposto">
            <v-icon>
              mdi-plus
            </v-icon>
          </div>
          <v-img :src="evento.imagem"
                 id="cardBase"
                 class="mx-auto"
                 height="200px">
          </v-img>
        </v-row>
      </v-col>

      <v-row class="mt-6 mb-4"
            justify="center">
        <h1 style="color: #097FA8; font-size: 40px">
          {{ evento.nome }}
        </h1>
      </v-row>

      <v-row>
        <v-col cols="9"
               class="text-justify pr-10">
          {{ evento.descricao }}
        </v-col>

        <v-divider vertical></v-divider>

        <v-col cols="3"
               class="pr-11">
          <dados-evento class="mt-2"
                        :hora-fim="evento.horaFim"
                        :hora-inicio="evento.horaInicio"
                        :data-fim="evento.dataFim"
                        :data-inicio="evento.dataInicio"
                        :local="evento.local"
                        :tipo = "evento.tipo"
                        :categoria = "evento.categoria">
          </dados-evento>
        </v-col>
      </v-row>

      <v-row class="mt-10 mr-4 mb-10">
        <v-dialog v-for="atividade in atividades"
                  :key="atividade.id"
                  v-model="atividade.dialog"
                  width="722">
          <template v-slot:activator="{ on, attrs }">
            <v-card class="mx-auto my-2"
                    width="280"
                    height="280px"
                    outlined>
              <v-card-title class="py-2 justify-center"
                            style="color: #097FA8">
                {{ atividade.nome }}
              </v-card-title>
              <v-divider class="mx-6"></v-divider>
              <v-card-subtitle class="py-2 justify-center text-justify"
                               style="color: #8B8B8B">
                {{ formatarDescricao(atividade.descricao) }}
              </v-card-subtitle>
              <v-card-subtitle class="py-0 font-weight-bold"
                               style="color: #AEAEAE">
                {{ atividade.local }}
              </v-card-subtitle>
              <v-row>
                <v-col>
                  <v-card-subtitle class="py-0 font-weight-bold"
                                   style="color: #AEAEAE">
                    {{ atividade.data }}
                  </v-card-subtitle>
                </v-col>
                <v-col>
                  <v-card-subtitle class="py-0 font-weight-bold"
                                   style="color: #AEAEAE">
                    {{ atividade.horaInicio }} - {{ atividade.horaFim }}
                  </v-card-subtitle>
                </v-col>
              </v-row>
              <v-row class="mx-4">
                <v-col v-if="!ehEditor()"
                       class="pa-0">
                  <v-btn style="color: white"
                         depressed
                         height="30"
                         width="130"
                         color="#097FA8">
                    Inscrever-se
                  </v-btn>
                </v-col>
                <div v-else>
                  <v-col class="pa-0">
                    <v-dialog v-model="atividade.editarDialog"
                              width="1000">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn style="color: white"
                               depressed
                               fab
                               width="32"
                               height="32"
                               v-bind="attrs"
                               v-on="on"
                               color="#097FA8">
                          <v-icon size="20">
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                      </template>
<!--                      Adicionar caso de exceção para edição-->
                      <criar-atividade-dialog :editar="true"
                                              :id="atividade.id"
                                              @adicionarAtividade="adicionarAtividade"
                                              @cancelarAtividade="cancelarAtividade"
                                              @cancelarEditarAtividade="cancelarEditarAtividade">
                      </criar-atividade-dialog>
                    </v-dialog>
                    <v-dialog v-model="atividade.excluirDialog"
                              width="512">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-2"
                               style="color: white"
                               depressed
                               fab
                               width="32"
                               height="32"
                               v-bind="attrs"
                               v-on="on"
                               color="#097FA8">
                          <v-icon size="20">
                            mdi-delete
                          </v-icon>
                        </v-btn>
                      </template>
                      <excluir-atividade-dialog :id="atividade.id"
                                                @excluirAtividade="excluirAtividade"
                                                @cancelarExcluir="cancelarExcluirAtividade">
                      </excluir-atividade-dialog>
                    </v-dialog>
                  </v-col>
                </div>

                <v-col class="pa-0 d-flex justify-end">
                  <v-btn color="097FA8"
                         height="30"
                         width="90"
                         v-bind="attrs"
                         v-on="on"
                         outlined>
                    Ver mais
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </template>

          <atividade-dialog :id="atividade.id"
                            :hora-fim="atividade.horaFim"
                            :hora-inicio="atividade.horaInicio"
                            :data="atividade.data"
                            :local="atividade.local"
                            :acessibilidade="atividade.acessibilidade"
                            :descricao="atividade.descricao"
                            :nome="atividade.nome"
                            @fecharAtividadeDialog="fecharAtividadeDialog">
          </atividade-dialog>
        </v-dialog>
      </v-row>

      <v-dialog v-if="this.$store.getters.isEditor"
                v-model="criarAtividadeDialog"
                width="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary"
                 large
                 fixed
                 right
                 bottom
                 v-bind="attrs"
                 v-on="on">
            <v-icon class="mr-2"
                    size="30">
              mdi-plus
            </v-icon>
            Criar Atividade
          </v-btn>
        </template>

        <criar-atividade-dialog @adicionarAtividade="adicionarAtividade"
                                @cancelarAtividade="cancelarAtividade">
        </criar-atividade-dialog>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

import atividadeDialog from '@/pages/evento/components/atividadeDialog.vue'
import criarAtividadeDialog from '@/pages/evento/components/criarAtividadeDialog.vue'
import dadosEvento from '@/pages/evento/components/dadosEvento.vue'
import excluirAtividadeDialog from '@/pages/evento/components/excluirAtividadeDialog.vue'

export default {
  name: "pgEventoIndex",
  components: { atividadeDialog, criarAtividadeDialog, dadosEvento, excluirAtividadeDialog },
  data() {
    return {
      evento: {
        imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
        nome: 'Festival Latino-Americano de Software Livre',
        descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano.\n' +
            'Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.\n' +
            'O evento é direcionado para todo tipo de público: estudantes de todos os tipos e níveis, empresários, trabalhadores, funcionários públicos, empreendedores, entusiastas e ainda pessoas que não possuem muito conhecimento em informática.',
        local: 'Campo Grande - MS',
        dataInicio: '21/05',
        horaInicio: '13:00',
        dataFim: '25/05',
        horaFim: '17:00',
        categoria: 'Acadêmico'
      },
      atividades: [
        { id: 1, nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', data: '21/05/2023', horaInicio: '13:00', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false, editarDialog: false, excluirDialog: false },
        { id: 2, nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', data: '21/05/2023', horaInicio: '13:00', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false, editarDialog: false, excluirDialog: false },
        { id: 3, nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', data: '21/05/2023', horaInicio: '13:00', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false, editarDialog: false, excluirDialog: false },
        { id: 4, nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', data: '21/05/2023', horaInicio: '13:00', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false, editarDialog: false, excluirDialog: false },
        { id: 5, nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', data: '21/05/2023', horaInicio: '13:00', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false, editarDialog: false, excluirDialog: false },
        { id: 6, nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', data: '21/05/2023', horaInicio: '13:00', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false, editarDialog: false, excluirDialog: false },
        { id: 7, nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', data: '21/05/2023', horaInicio: '13:00', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false, editarDialog: false, excluirDialog: false },
        { id: 8, nome: 'Palestra sobre DevOps', descricao: 'O Festival Latino-americano de Instalação de Software Livre (FLISOL) é o maior evento da América Latina de divulgação de Software Livre. Ele é realizado desde o ano de 2005, e desde 2008 sua realização acontece no 4o. sábado de abril de cada ano. Seu principal objetivo é promover o uso de Software Livre, mostrando ao público em geral sua filosofia, abrangência, avanços e desenvolvimento.', local: 'Auditório 1 - Facom', data: '21/05/2023', horaInicio: '13:00', horaFim: '17:00', palestrante: 'Dr.Awdren Fontão', acessibilidade: 'O auditório conta com piso tátil e a palestra possui intrérprete de Libras', dialog: false, editarDialog: false, excluirDialog: false }
      ],
      criarAtividadeDialog: false
    }
  },
  methods: {
    ehEditor() {
      return this.$store.getters.isEditor
    },
    formatarDescricao(descricao) {
      if (descricao.length > 170) {
        return descricao.substring(0, 170) + '...'
      } else {
       return descricao
      }
    },
    fecharAtividadeDialog(atividadeId) {
      this.atividades[atividadeId - 1].dialog = false
    },
    carregarEvento(eventoId) {
      axios.get(`http://127.0.0.1/eventos/${eventoId}`)
          .then(response => {
            const eventoResponse = response.data;

            const dataInicial = new Date(eventoResponse.data_inicial);
            const horaInicial = dataInicial.toLocaleTimeString();
            const dataInicialFormatada = dataInicial.toLocaleDateString();

            const dataFinal = new Date(eventoResponse.data_final);
            const horaFinal = dataFinal.toLocaleTimeString();
            const dataFinalFormatada = dataFinal.toLocaleDateString();

            this.evento = {
              imagem: eventoResponse.imagem || 'https://img2.gratispng.com/20180510/sxq/kisspng-boulder-theater-computer-icons-ticket-cinema-5af509b9cdcea8.635574511526008249843.jpg',
              nome: eventoResponse.nome,
              descricao: eventoResponse.descricao,
              local: eventoResponse.local,
              dataInicio: dataInicialFormatada,
              horaInicio: horaInicial,
              dataFim: dataFinalFormatada,
              horaFim : horaFinal,
              modalidade: eventoResponse.modalidade,
              created_at: new Date().toISOString(),
              dialog: false
            };

          })
          .catch(error => {
            console.log(eventoId, error);
          });
    },
    carregarAtividade(eventoId) {
      axios.get(`http://127.0.0.1/atividades/evento/${eventoId}`)
          .then(response => {
            const responseData = response.data;
            const dataInicial = moment(responseData.horario_inicio).format('DD/MM/YYYY');

            this.atividades = responseData.map(atividade => ({
              id: atividade.id,
              nome: atividade.nome,
              descricao: atividade.descricao,
              local: atividade.local,
              data: dataInicial,
              horaInicio: moment(atividade.horaInicio).format('HH:mm'),
              horaFim: moment(atividade.horaFim).format('HH:mm'),
              palestrante: atividade.palestrante,
              acessibilidade: atividade.acessibilidade,
              dialog: false
            }));


          })
          .catch(error => {
            console.error(error);
          });
    },
    adicionarAtividade(atividade) {
      // Disparar AXIOS
      console.log(atividade)
      this.criarAtividadeDialog = false
    },
    cancelarAtividade() {
      this.criarAtividadeDialog = false
    },
    cancelarEditarAtividade(atividadeId) {
      this.atividades[atividadeId - 1].editarDialog = false
    },
    excluirAtividade(atividadeId) {
      this.atividades[atividadeId - 1].excluirDialog = false
      // Disparar AXIOS
      console.log(atividadeId)
    },
    cancelarExcluirAtividade(atividadeId) {
      this.atividades[atividadeId - 1].excluirDialog = false
    }
  },
  created() {
    const eventoId = this.$route.params.eventoId
    this.carregarAtividade(eventoId)
    this.carregarEvento(eventoId)
  }
}
</script>

<style scoped>
#containerBase {
  position: relative;
}
#cardBase {
  position: relative;
  z-index: 1;
}
#cardSobreposto {
  position: absolute;
  z-index: 2;
  bottom: 0;
  right: 0;
}
</style>