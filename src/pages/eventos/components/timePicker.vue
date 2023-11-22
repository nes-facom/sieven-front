<template>
  <div id="pgTimePicker">
    <v-menu ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="hora"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="hora"
                      :label="label"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined>
        </v-text-field>
      </template>
      <v-time-picker v-if="menu"
                     v-model="hora"
                     full-width
                     @click:minute="fecharMenu">
      </v-time-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "pgTimePickerIndex",
  data() {
    return {
      menu: false,
      hora: null,
    }
  },
  methods: {
    emitirValor() {
      this.$emit('horaSelecionada', this.campo, this.hora)
    },
    fecharMenu() {
      this.$refs.menu.save(this.hora)
      this.emitirValor()
      this.menu = false
    }
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