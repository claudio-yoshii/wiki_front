<template>
  <div>
    <b-row style="height: 100vh">
      <b-col md="3" style="height: 100vh">
        <b-card
          header="Lista de veiculos"
          border-variant="primary"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center"
        >
          <b-table :items="veiculos" :fields="fields">
            <template #cell(descricao)="data">
              {{ pegar_veiculo(data) }}
            </template>
          </b-table>
        </b-card>       
      </b-col>
      <b-col>
        <Gmap />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      fields: [
        {
          key: "placa",
          label: "Placa",
          thStyle: {
            width: "20%",
          },
          thClass: "text-muted small",
          tdClass: "align-middle",
        },
        {
          key: "descricao",
          label: "Veiculo",
          thStyle: {
            width: "80%",
          },
          thClass: "text-muted small",
          tdClass: "align-middle",
        },
      ],
    };
  },
  computed: {
    veiculos() {
      return this.$store.state.veiculos.veiculos;
    },
  },
  methods: {
    pegar_veiculo(data) {
      const veiculo = data.item.descricao.split("-")[0];
      console.log(veiculo);
      return veiculo;
    },
  },
  mounted() {
    this.$store.dispatch("http_get", {
      url: "/veiculos",
      vuex: "veiculos/veiculos",
    });
  },
  components: {
    Gmap: () => import("./components/Gmap.vue"),
  },
};
</script>

<style>
</style>