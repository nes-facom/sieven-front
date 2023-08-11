<template>
  <div id="pgExcluiurAtividadeDialog">
    <v-card width="500"
            height="200">
      <v-row class="d-flex justify-center">
        <v-card-title class="mt-5"
                      style="font-size: 40px; color: #097FA8">
          Cuidado
        </v-card-title>
      </v-row>
      <v-card-subtitle class="text-justify"
                       style="font-size: 18px;">
        Você está prestes a remover esta atividade e todas as suas informações, tem certeza que deseja fazer isso?
      </v-card-subtitle>
      <v-row class="mt-1">
        <v-col class="pa-0">
          <v-btn class="ml-6"
                 outlined
                 @click="cancelarExcluir">
            Cancelar
          </v-btn>
        </v-col>
        <v-col class="pa-0 d-flex justify-end">
          <v-btn class="mr-7"
                 style="color: white"
                 color="#B81212"
                 @click="excluirAtividade">
            Excluir
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "excluirAtividadeDialog",
  methods: {
    excluirAtividade() {
      this.$emit("excluirAtividade", this.id)
    },
    cancelarExcluir() {
      this.$emit("cancelarExcluir", this.id)
    }
  },
  props: {
    id: {
      required: true
    }
  }
}
</script>

<style>

</style>