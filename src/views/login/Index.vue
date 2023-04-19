<template>
  <div
    class="d-flex justify-content-center align-items-center flex-column"
    style="height: 100vh"
  >
    <b-card
      border-variant="primary"
      header="Faça o Login:"
      header-bg-variant="primary"
      header-text-variant="white"
      align="center"
    >
      <label>Usuário</label>
      <b-input v-model="model.usuario"></b-input>
      <label>Senha</label>
      <b-input type="password" v-model="model.senha"></b-input>

      <b-button @click="login()" class="w-100 mt-3" variant="primary"
        >Entrar</b-button
      >
    </b-card>
    <b-alert variant="danger" class="mt-3" :show="error"
      >Usuário ou senha incorreto.</b-alert
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        usuario: "",
        senha: "",
      },
      error: false,
    };
  },
  methods: {
    async login() {
      const response = await this.$store.dispatch("http_post", {
        url: "/usuarios",
        data: this.model,
      });
      console.log(response)
      if (response.data.error) {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
      if (response.data.status == 200) {
        localStorage.setItem("logged", true);
        this.$router.push("/veiculos");
      }
    },
  },
};
</script>

<style>
</style>