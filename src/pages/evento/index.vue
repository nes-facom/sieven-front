<template>
  <div id="pgEvento">
    <v-row class="mt-4"
           justify="center">
      <v-col class="mr-8">
        <v-row id="containerBase">
          <div id="imageConteiner">
          <v-img :src="evento.imagem"
                 id="cardBase"
                 class="mx-auto">      
          </v-img>
          <v-btn class="excluir-evento-button"
          color="white"
          outlined
          @click="exibirExcluirConfirmacao">
            Excluir
          </v-btn>
          <v-dialog v-model="excluirDialogConfirmacao" max-width="750"  
            >
            <v-card class="excluirDialog">
              <v-card-title class="text-h4 font-weight-bold" style="color: #097FA8; text-align: center; margin-left:37%;">
                Atenção!
              </v-card-title>
              <v-card-text>
                <p style="color: #50525F; text-align: justify; font-size: 22px; font-weight: 400; font-style: normal; margin-top:3%">
                  Tem certeza que deseja remover esse evento? Todas as suas informações e atividades serão excluídas em definitivo.
                </p>
              </v-card-text>
              <v-card-actions>
                    <v-btn color="#097FA8" text @click="cancelarEventoExclusao" style="margin-left:72%;">Cancelar</v-btn>
                    <v-btn color="red" text @click="confirmarEventoExclusao">Remover</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-if="this.$store.getters.isAdmin"
                          v-model="editarEventoDialog"
                          width="700">
          <template v-slot:activator="{on, attrs}">
            <v-btn
              class="editar-evento-button"
              color="#0088B7"
              dark
              v-bind="attrs"
              v-on="on">
              Editar
            </v-btn>
          </template>
          <editar-evento-dialog @fecharEditarEventoDialog="fecharEditarEventoDialog">
          </editar-evento-dialog>
          </v-dialog>
        </div>
       
      </v-row>
      <div id="eventNameConteiner">
          {{ evento.nome }}
      </div>
      <div class="dados-eventos-container">
      <dados-evento
                        :hora-fim="evento.horaFim"
                        :hora-inicio="evento.horaInicio"
                        :data-fim="evento.dataFim"
                        :data-inicio="evento.dataInicio"
                        :local="evento.local">
          </dados-evento>
        </div>
          <h2 class="mt-4 responsivo-h2">Sobre o Evento</h2>          
          <div class="descricao-evento-container">
          <div class="mt-2 responsivo-mt-2">
              {{ evento.descricao }}
          </div>
        </div>
      </v-col>
    </v-row>

      <v-row class="mt-10 mr-4 mb-10" >
        <v-dialog v-for="atividade in atividades"
                  :key="atividade.id"
                  v-model="atividade.dialog"
                  width="722">
          <template v-slot:activator="{ on, attrs }">
            <v-card style="margin-left: 5%"
                    class=" my-2"
                    width="80%"
                    height="200px"
                    outlined>
              <v-card-title class="py-2 justify-left"
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
                <v-col v-if="!isAdmin()"
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

          <atividade-dialog 
                            :id="atividade.id"
                            :hora-fim="atividade.horaFim"
                            :hora-inicio="atividade.horaInicio"
                            :data="atividade.data"
                            :local="atividade.local"
                            :quantidade_vagas="atividade.quantidade_vagas"
                            :id_modalidade="atividade.id_modalidade"
                            :descricao="atividade.descricao"
                            :nome="atividade.nome"
                            @fecharAtividadeDialog="fecharAtividadeDialog">
          </atividade-dialog>
        </v-dialog>
      </v-row>

      <v-dialog v-if="this.$store.getters.isAdmin"
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
  </div>
</template>

<script>
//import moment from 'moment'

import editarEventoDialog from './components/editarEventoDialog.vue'
import atividadeDialog from '@/pages/evento/components/atividadeDialog.vue'
import criarAtividadeDialog from '@/pages/evento/components/criarAtividadeDialog.vue' 
import dadosEvento from '@/pages/evento/components/dadosEvento.vue'
import apiEvento from '../../api/resources/evento.js'
import apiAtividade from '../../api/resources/atividade.js'
import excluirAtividadeDialog from '@/pages/evento/components/excluirAtividadeDialog.vue'
//import store from '@/store';


export default {
  name: "pgEventoIndex",
  components: { atividadeDialog, criarAtividadeDialog, dadosEvento, excluirAtividadeDialog, editarEventoDialog},
  data() {
    return {
      evento: {},
      atividades: [
    ],
      criarAtividadeDialog: false,
      editarEventoDialog:false,
      excluirDialogConfirmacao: false,
      excluirAtividadeDialog: false,
    }
  },
  methods: {
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    formatarDescricao(descricao) {
      if (descricao.length > 170) {
        return descricao.substring(0, 170) + '...'
      } else {
       return descricao
      }
    },
    exibirExcluirConfirmacao() {
      this.excluirDialogConfirmacao = true;
    },
    cancelarEventoExclusao(){
      this.excluirDialogConfirmacao = false;
    },
    //abrirAtividadeDialog(atividadeId){
      //this.atividades[atividadeId].dialog = true
    //},
    fecharAtividadeDialog(atividadeId) {
      this.atividades[atividadeId - 1].dialog = false
    },
    fecharEditarEventoDialog(){
      this.editarEventoDialog = false
    },
    carregarEvento(eventoId) {
      apiEvento.visualizarEventos(eventoId)
          .then(response => {
            const eventoResponse = response

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
              tipo: eventoResponse.nome_tipo,
              categoria: eventoResponse.nome_categoria,
              created_at: new Date().toISOString(),
              dialog: false
            };

          })
          .catch(error => {
            console.log(eventoId, error);
          });
    },
    confirmarEventoExclusao(){
      const eventoId = this.$route.params.eventoId;

      apiEvento.deletarEventos(eventoId)
      .then(response =>{
        console.log('Evento excluído com sucesso', response)
        this.excluirDialogConfirmacao = false
        this.$router.push({ name: 'eventos' })
      })
      .catch(error => {
        console.error('Erro ao excluir evento', error)
        this.excluirDialogConfirmacao = false
      })
      
    },
    carregarAtividade(eventoId) {
      apiAtividade.listarAtividades(eventoId)
          .then(response => {
          this.atividades = response
          // const responseData = response
          // const dataInicial = moment(responseData.horario_inicio).format('DD/MM/YYYY');

          // this.atividades = {
          //   nome: responseData.nome,
          //   descricao: responseData.descricao,
          //   local: responseData.local,
          //   data: dataInicial,
          //   horaInicio: moment(responseData.horaInicio).format('HH:mm'),
          //   horaFim: moment(responseData.horaFim).format('HH:mm'),
          //   palestrante: responseData.palestrante,
          //   modalidade: responseData.modalidade,
          //   dialog: false
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
      
      // Disparar AXIOS
      apiAtividade.deletarAtividade(atividadeId)
      .then(response =>{
        console.log('Atividade excluída com sucesso', response)
        this.atividades[atividadeId - 1].excluirAtividadeDialog = false;
    })
    .catch(error => {
        console.error('Erro ao excluir evento', error)
        this.atividades[atividadeId - 1].excluirAtividadeDialog = false;
        
      })
    },
    cancelarExcluirAtividade(atividadeId) {
      this.atividades[atividadeId - 1].excluirAtividadeDialog = false
    }
  },
  created() {
    const eventoId = this.$route.params.id
    this.carregarEvento(eventoId)
    this.carregarAtividade(eventoId)
  }
}
</script>

<style scoped>
#containerBase {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#imageConteiner{
 position:relative;
 width: 750px;
 height: 394.037px;
 margin-bottom: 100px;
 margin-right: 15%;
}
#excluirDialog{
  width: 600px;
}
#cardBase {
  width: 100%;
  height: 100%;
  object-fit: none;
}
#eventNameConteiner{
  position: relative;
  color: #1E1E1E;
  margin-bottom: 20px;
  margin-left:5%;
  font-size: 25px;
  font-weight: bold;
}


.editar-evento-button {
  display: inline-flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #0088B7;
  background: #0088B7;
  color: white;
  margin-left: 77%;
  margin-top: -8.3%; 
}
.excluir-evento-button{
  display: inline-flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid white;
  background: #AC220FE0;
  color: white;
  margin-top:60px;
  margin-left:60%;
}
.responsivo-h2 {
  font-size: 20px;
  color: #1E1E1E;
  font-style: italic;
  margin-bottom: 20px;
  margin-left: 5%;
}

.responsivo-mt-2 {
color: #1E1E1E;
font-size: medium;
margin-left: 5%;
margin-right: 28%;
text-align: justify;
}


@media (max-width: 1024px) {
  #imageConteiner {
    position: center;
    width: 750px;
    height: 394.037px;
  }
  #eventNameConteiner {
    position: relative;
    margin-bottom: 20px;
    margin-left:0.5%;
    font-size: 25px;
  }
  .responsivo-h2{
    margin-left: -0.5rem;
  }
  .responsivo-mt-2{
    margin-left: -0.5rem;
  }

}
@media (max-width: 915px) {
  #imageConteiner {
    position: center;
    width: 600px;
    height: 350px;
    margin-bottom: 100px;
    margin-right: 30%;
  }
  #eventNameConteiner {
    position: relative;
    margin-bottom: 20px;
    margin-left: -5px;
    font-size: 25px;
  }

}

@media (max-width: 768px){
  #imageConteiner {
    position: center;
    width: 600px;
    height: 350px;
    margin-bottom: 100px;
    margin-right: 15%;

}
  .editar-evento-button{
    text-align: center;
    margin-left: 40%;
  }
  .responsivo-h2{
    margin-left: -0.5rem;
  }
  .responsivo-mt-2{
    margin-left: -0.5rem;
  }
}

@media (max-width: 734px){
  #imageConteiner {
    position: center;
    width: 600px;
    height: 350px;
    margin-bottom: 100px;
    margin-left: 18%;

}
  .editar-evento-button{
    text-align: center;
    margin-left: 35%;
  }
  #eventNameConteiner {
    position: relative;
    margin-bottom: 20px;
    margin-left: 18%;
    font-size: 15px;
  }
  .dados-eventos-container {
    margin-bottom: 20px;
    margin-left: 17%;
    font-size: 10px;
    white-space: nowrap;
  }
  .responsivo-h2{
    margin-left: 17%;
  }
  .responsivo-mt-2{
    margin-left: 17%;
  }
}

@media (max-width: 425px){
  #imageConteiner {
    position: center;
    width: 300px;
    height: 150px;
    margin-bottom: 100px;
    margin-right: 25%;
    margin-left: 12%;
  }
 .editar-evento-button{
  text-align: center;
  margin-left: 20%;
}
  #eventNameConteiner {
    position: relative;
    margin-bottom: 20px;
    margin-left: 13%;
    font-size: 15px;
  }
  .dados-eventos-container {
    margin-bottom: 20px;
    margin-left: 25%;
    font-size: 10px;
    white-space: nowrap;
  }
  .responsivo-h2{
    margin-left: 13%;
    font-size: 15px;
  }
  .responsivo-mt-2{
    margin-left: 13%;
    font-size: 10px;
  }
}

@media (max-width: 375px){
  #imageConteiner {
    position: center;
    width: 270px;
    height: 130px;
    margin-bottom: 100px;
    margin-right: 8%;
    margin-left: 14%;
  }
  .editar-evento-button{
    text-align: center;
    margin-left: 18%;
  }

  #eventNameConteiner {
    position: relative;
    margin-bottom: 20px;
    margin-left: 10%;
    font-size: 15px;
}
  .responsivo-h2{
    margin-left: 10%;
    font-size: 15px;
  }
  .responsivo-mt-2{
    margin-left: 10%;
    font-size: 10px;
  }
}


@media (max-width: 320px){
  #imageConteiner {
    position: center;
    width: 220px;
    height: 120px;
    margin-bottom: 100px;
    margin-left: 20%;
  }
  .editar-evento-button{
    text-align: center;
    margin-right: 50%;
  }

  #eventNameConteiner {
    position: relative;
    margin-bottom: 20px;
    margin-left: 20%;
    font-size: 15px;
  }
  .dados-eventos-container {
    margin-bottom: 50px;
    margin-left: 40%;
    font-size: 10px;
    white-space: nowrap;
  }
  .editar-evento-button{
    text-align: center;
    margin-left: 15%;
  }
  .responsivo-h2{
    margin-left: 15%;
    font-size: 15px;
  }
  .responsivo-mt-2{
    margin-left: 15%;
    font-size: 10px;
  }
}

</style>