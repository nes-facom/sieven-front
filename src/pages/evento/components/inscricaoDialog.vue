  <template>
    <v-card class="pa-10" width="700">
      <v-row
        class="text-h4 font-roboto d-flex justify-center"
        style="color: #097fa8"
      >
        Realizar Inscriçao
      </v-row>
      <v-row class="mt-12 d-flex justify-center">
        Para realizar a inscrição na atividade {{ atividade.nome }}, informe seus
        dados abaixo.
      </v-row>
      <v-form ref="form" lazy-validation>
        <v-row class="mt-12">
          <v-col cols="12">
            <label class="label-style" for="nome">Nome Completo</label>
            <v-text-field
              class="campo-style"
              id="nome"
              v-model="inscricao.nome"
              placeholder="Nome Completo"
              outlined
              :rules="requiredRule('Nome')"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-2">
          <v-col cols="12">
            <label class="label-style" for="cpf">CPF</label>
            <v-text-field
              class="campo-style"
              id="cpf"
              v-model="inscricao.cpf"
              placeholder="Digite seu CPF"
              outlined
              :rules="requiredRule('CPF')"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-2">
          <v-col cols="12">
            <label class="label-style" for="email">E-mail</label>
            <v-text-field
              class="campo-style"
              id="cpf"
              v-model="inscricao.email"
              placeholder="Digite seu email"
              outlined
              :rules="requiredRule('Email')"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-2">
          <v-col cols="12">
            <label class="label-style" for="telefone">Telefone</label>
            <v-text-field
              class="campo-style"
              id="telefone"
              v-model="inscricao.telefone"
              placeholder="Digite seu telefone"
              outlined
              :rules="requiredRule('Telefone')"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-row class="mt-2">
        <v-col cols="12">
          <v-card-actions>
            <v-btn style="color: white" color="red" @click="fecharInscricaoDialog"
              >Cancelar</v-btn
            >
            <v-btn
              style="color: white"
              color="#097FA8"
              @click="exibirInscricaoConfirmacao"
              >Inscrever</v-btn
            >
            <v-snackbar v-model="snackbar" color="error" top>
              {{ mensagemErro }}
              <v-btn text @click="snackbar = false">Fechar</v-btn>
            </v-snackbar>
            <v-dialog v-model="inscricaoDialogConfirmacao" max-width="600">
              <v-card>
                <v-card-title
                  class="text-h5 font-roboto d-flex justify-center"
                  style="color: #097fa8"
                >
                  Confirmar Inscrição
                </v-card-title>
                <v-card-text>
                  <div class="mt-2">
                    Confirmar inscrição de {{ inscricao.nome }} na atividade
                    {{ atividade.nome }} em
                    {{ formatarData(atividade.horario_inicio) }} das
                    {{ formatarHora(atividade.horario_inicio) }} às
                    {{ formatarHora(atividade.horario_encerramento) }}?
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="fecharInscricaoConfirmacao">Cancelar</v-btn>
                  <v-btn @click="realizarInscricao">Confirmar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    
  </template>

  <script>
  import apiInscricao from "../../../api/resources/inscricao.js";

  export default {
    name: "inscricaoDialog",
    props: {
      dialog: Boolean,
      atividade: Object,
    },
    data() {
      return {
        inscricao: {
          nome: "",
          cpf: "",
          email: "",
          telefone: "",
          checkin: false,
        },
        inscricaoDialogConfirmacao: false,
        mensagemErro: "",
        snackbar: false,
      };
    },

    methods: {
      fecharInscricaoConfirmacao() {
        this.inscricaoDialogConfirmacao = false;
      },

      exibirInscricaoConfirmacao() {
        if (
          this.inscricao.nome &&
          this.inscricao.cpf &&
          this.inscricao.email &&
          this.inscricao.telefone
        ) {
        
          this.inscricaoDialogConfirmacao = true;
        } else {
          this.mensagemErro = "Por favor, preencha todos os campos antes de confirmar a inscrição.";
          this.exibirMensagemErro();
        
        }
      },

      exibirMensagemErro() {
        this.snackbar = true;
        setTimeout(() => {
          this.snackbar = false;
        }, 5000); 
      },

      fecharInscricaoDialog() {
        this.$emit("fecharInscricaoDialog");
      },
      realizarInscricao() {
        
        if (this.$refs.form.validate()) {
          const inscricao = {
            atividade_id: this.$route.params.id,
            nome: this.inscricao.nome,
            cpf: this.inscricao.cpf,
            email: this.inscricao.email,
            telefone: this.inscricao.telefone,
            checkin: this.inscricao.checkin,
          };
          apiInscricao.realizarInscricao(inscricao).then((response) => {
            console.log(response);
          });
          this.fecharInscricaoDialog();
        }
      },
      formatarHora(hora) {
        const data = new Date(hora);
        const horaFormatada = data.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return horaFormatada;
      },
      formatarData(data) {
        const dataFormatada = new Date(data).toLocaleDateString("pt-BR");
        return dataFormatada;
      },
      requiredRule(fieldName) {
        return [(v) => !!v || `${fieldName} é obrigatório.`];
      },
    },
  };
  </script>

  <style scoped>
  .label-style {
    font-family: "Roboto", sans-serif;
    font-weight: bold;
    color: #888;
  }

  .campo-style {
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    color: black;
  }
  </style>
