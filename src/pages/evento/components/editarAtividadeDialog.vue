<script src="../../../store/index.js"></script>
<template>
    <div id="pgEditarAtividadeDialogIndex">
        <v-card class="pa-10" width="700">
            <v-row class="text-h4 font-roboto" style="color: #097FA8">
                Editar Atividade
            </v-row>

            <v-row class="mt-4">
                <v-col cols="12">
                    <label class="label-style" for="nome"></label>
                    <v-text-field class="campo-style" id="nome" v-model="atividadeAtual.nome" placeholder="Titulo do evento"
                        :rules="requiredRule('Nome')" outlined>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <label class="label-style" for="desricao">Descrição</label>
                    <v-textarea class="campo-style" id="descricao" v-model="atividadeAtual.descricao"
                        placeholder="Descrição sobre a atividade" auto-grow :rules="requiredRule('Descrição')" outlined>
                    </v-textarea>
                    <span class="char-count">
                        ({{ atividadeAtual.descricao ? 255 - atividadeAtual.descricao.length : 255 }} caracteres restantes)
                    </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <label class="label-style" for="capacidade">Capacidade</label>
                    <v-text-field class="mb-0 pa-0" id="numeroParticipantes" label="Capacidade" type="number"
                        v-model="atividadeAtual.quantidade_vagas" placeholder="Numero de Participantes"
                        :rules="requiredRule('Capacidade')" outlined>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <label class="label-style" for="cateogria">Modalidade</label>
                <v-select v-model="selectedModalidade" :items="modalidades" item-value="id" item-text="nome_modalidade"
                          :rules="requiredRule('Modalidade')" outlined></v-select>
              </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field id="data" v-model="data" placeholder="Data (DD/MM/AAAA)" outlined v-mask="'##/##/####'"
                        :rules="requiredRule('Data')" @blur="validateData()"></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field v-model="hora_inicio" placeholder="Hora Inicio" @horaSelecionada="selecaoHora"
                        v-mask="'##:##'" outlined @blur="validateHora('horaInicio')"></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field v-model="hora_fim" placeholder="Hora Final" @horaSelecionada="selecaoHora" v-mask="'##:##'"
                        outlined @blur="validateHora('horaFim')"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <label class="label-style" for="local">Local</label>
                    <v-text-field class="campo-style" id="local" v-model="atividadeAtual.local" :rules="requiredRule('Local')"
                        placeholder="Local do Evento" outlined>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <label class="label-style" for="cateogria">Categoria</label>
                    <v-select v-model="selectedCategoria" :items="categorias" item-value="id" item-text="nome_categoria"
                      :rules="requiredRule('Categoria')" outlined></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <label class="label-style" for="tipo">Tipo</label>
                    <v-select v-model="selectedTipo" :items="tipos" item-value="id" item-text="nome_tipo"
                        :rules="requiredRule('Tipo')" outlined></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn class="mr-4" color="black" width="150" outlined @click="cancelarAtividade">
                        Cancelar
                    </v-btn>
                    <v-btn style="color: white;" color="#097FA8" width="150" @click="editarAtividade">
                        {{ this.mensagemConfirmacao() }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import apiAtividade from '../../../api/resources/atividade.js'
import apiTipo from '../../../api/resources/tipo.js'
import apiCategoria from '../../../api/resources/categoria.js'
import apiModalidade from '../../../api/resources/modalidade.js'
import middleware from '../../../middleware/localStorage.js'

export default {
    name:"pgEditarAtividadeDialogIndex",
    data() {
        return {
            atividadeAtual: this.atividade,

            tipos: [],
            selectedTipo: '',

            categorias: [],
            selectedCategoria: '',
            
            selectedModalidade: this.atividade.id_modalidade,
            modalidades: [],

            data: '',
            hora_inicio: '',
            hora_fim: ''
        }
  },
    created(){
        console.log(this.atividade.id_modalidade)
        this.selectedCategoria = this.atividade.id_categoria
        this.selectedTipo = this.atividade.id_tipo
        this.selectedModalidade = this.atividade.id_modalidade
        this.carregaModalidade()
        this.carregaTipos()
        this.carregaCategorias()
        this.data = this.formatarData(this.atividadeAtual.horario_inicio)
        this.hora_inicio = this.formatarHora(this.atividadeAtual.horario_inicio)
        this.hora_fim = this.formatarHora(this.atividadeAtual.horario_encerramento)
    },
    methods: {
      formatarHora(hora) {
        const data = new Date(hora);
        const horaFormatada = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        return horaFormatada;
      },
      formatarData(data) {
        const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
        return dataFormatada;
      },
      validateData() {
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (dateRegex.test(this.data)) {
          const parts = this.data.split('/');
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1; // Os meses em JavaScript começam em 0 (janeiro é 0)
          const year = parseInt(parts[2], 10);
          const currentDate = new Date();
          const inputDate = new Date(year, month, day);
        if (inputDate < currentDate) {
          this.data = ''; // Limpa o campo se a data for inválida
        }
      } else {
          this.data = ''; // Limpa o campo se a data estiver em um formato inválido
      }
    },
    handleRadioChange() {
      // Ao selecionar "Presencial", atribua 1 a id_modalidade
      // Ao selecionar "Remoto", atribua 3 a id_modalidade
      if (this.atividadeAtual.id_modalidade === 'presencial') {
        this.atividadeAtual.id_modalidade = 1;
      } else if (this.atividadeAtual.id_modalidade === 'remoto') {
        this.atividadeAtual.id_modalidade = 3;
      }
    },
    validateHora(field) {
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

      if (timeRegex.test(this[field])) {
        //const formattedTime = `${this.getCurrentDate()} ${this.evento[field]}:00`;
        return this[field]
      } else {
        // Clear the input if the format is not valid when losing focus
        this[field] = '';
      }
    },
    getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
    carregaTipos() {
      apiTipo.listarTipos().then(
        (respostaTipo) => {
          this.tipos = respostaTipo
        }
      )
    },
    carregaCategorias(){
      apiCategoria.listarCategorias().then(
        (respostaCategoria) => {
          this.categorias = respostaCategoria
        }
      )
    },
    carregaModalidade(){
      apiModalidade.listarModalidades().then(
        (respostaModalidade) => {
          this.modalidades = respostaModalidade
        }
      )
    },  
    mensagemConfirmacao() {
      if (this.editar) {
        return "Editar Atividade"
      } else {
        return "Criar Atividade"
      }
    },
    requiredRule(fieldName) {
      return [(v) => !!v || `${fieldName} é obrigatório.`];
    },
    selecaoData(campo, valor) {
      if (campo == 'dataInicio') {
        this.dataInicio = valor
      } else if (campo == 'dataFim') {
        this.dataFim = valor
      }
    },
    selecaoHora(campo, valor) {
      if (campo == 'horaInicio') {
        this.horaInicio = valor
      } else if (campo == 'horaFim') {
        this.horaFim = valor
      }
    },
    adicionarRequisito() {
      if (this.requisitoTexto.length > 0) {
        this.requisitos.push(this.requisitoTexto)
        this.requisitoTexto = null
      }
    },
    cancelarAtividade() {
      if (this.editar){
        this.$emit('cancelarEditarAtividade', this.id)
      } else {
        this.$emit('cancelarAtividade')
      }
    },
    adicionarAtividade() {
      if (this.atividadeAtual.descricao.length > 250) {
        alert('A descrição não pode ter mais de 250 caracteres.');
      } else {
        this.$emit('adicionarAtividade', this.atividade);
  }
    },
    editarAtividade() {
      this.atividadeAtual.horario_inicio = `${this.data} ${this.hora_inicio}`;
      this.atividadeAtual.horario_encerramento = `${this.data} ${this.hora_fim}`;
      this.atividadeAtual.id_categoria = this.selectedCategoria
      this.atividadeAtual.id_tipo = this.selectedTipo
      this.atividadeAtual.id_modalidade = this.selectedModalidade
      apiAtividade.editarAtividades(middleware.recuperarToken('token').access_token, this.id, this.atividadeAtual)
        .then( (response) => {
          location.reload()
      }).catch(error => {
        console.error(error);
      });
    },
    limitarDescricao() {
      if (descricao && descricao.length > 255) {
        descricao = descricao.slice(0, 255);
      }
    },
  },

    props: {
      id: {
        required: true
      },
      atividade: {
        required: true
      }
    }
}


</script>

<style></style>