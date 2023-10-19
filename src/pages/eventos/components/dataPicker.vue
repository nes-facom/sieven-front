<template>
  <div id="pgDataPicker">
    <v-menu v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="data
        "
                      :label="label"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined>
        </v-text-field>
      </template>
      <v-date-picker v-model="data"
                     @input="fecharMenu">
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: "pgDataPickerIndex",
  data() {
    return {
      menu: false,
      data: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }
  },
  methods:{
    emitirValor() {
      this.$emit('dataSelecionada', this.campo, this.data)
    },
    fecharMenu() {
      this.emitirValor()
      this.menu = false
    }
  },
  created() {

  },
  props: {
    label: {
      required: true
    },
    campo: {
      required: true
    }
  }
}
</script>

<style>

</style>