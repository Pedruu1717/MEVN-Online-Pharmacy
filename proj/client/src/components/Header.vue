<template>
  <div>
    <b-navbar class="fixed-top" toggleable="lg" type="dark" variant="primary">
      <div class="container">
        <b-navbar-brand href="#presentation">ServFarm</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#presentation">Página Inicial</b-nav-item>
            <b-nav-item href="#about">Sobre Nós</b-nav-item>
            <b-nav-item href="#services">Serviços</b-nav-item>
            <b-nav-item href="#products">Produtos</b-nav-item>
            <b-nav-item href="#footer">Contactos</b-nav-item>
            <b-nav-item>|</b-nav-item>
            <!-- Login pelo backend-->
            <b-nav-item href="http://localhost:8082/admin"><i class="fas fa-sign-in-alt"></i></b-nav-item>

          </b-navbar-nav>
          <!-- Login front end
          <b-dropdown id="dropdown-form" text="Login" variant="primary" ref="dropdown" class="m-1">
            <b-dropdown-form id="login-form" @submit.prevent ="$emit('loginSubmetido', username, passwordLogin)">

              <b-form-group label="Email:" label-for="dropdown-form-email">
                <b-form-input
                    id="username"
                    v-model="username"
                    name="username"
                    size="sm"
                    placeholder="email@example.com"
                    required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Password:" label-for="dropdown-form-password">
                <b-form-input
                    id="passwordLogin"
                    v-model="passwordLogin"
                    name="passwordLogin"
                    type="password"
                    size="sm"
                    placeholder="Password"
                ></b-form-input>
              </b-form-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-button type="submit" variant="primary" size="sm">Login</b-button>
            </b-dropdown-form>

          </b-dropdown>
          -->

          <!-- Registo -->
          <b-dropdown id="dropdown-form" text="Registar" variant="primary" ref="dropdown" class="m-1">
            <b-dropdown-form id="registo-form" @submit.prevent ="$emit('registoSubmetido', nome, email, password)">
              <b-form-group label="Nome:" label-for="dropdown-form-email">
                <b-form-input
                    id="nome"
                    v-model="nome"
                    name="nome"
                    size="sm"
                    required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Email:" label-for="dropdown-form-email">
                <b-form-input
                    id="email"
                    v-model="email"
                    name="email"
                    size="sm"
                    placeholder="email@example.com"
                    required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Password:" label-for="dropdown-form-password">
                <b-form-input
                    id="password"
                    v-model="password"
                    name="password"
                    type="password"
                    size="sm"
                    placeholder="Password"
                ></b-form-input>
              </b-form-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-button type="submit" variant="primary" size="sm">Registar</b-button>
            </b-dropdown-form>
          </b-dropdown>
          <!-- End Registo -->
        </b-collapse>
      </div>

    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ['loginApproval', 'loggedIn'],
  data(){
    return{
      //Dados registo
      nome: null,
      password: null,
      email: null,
      //Dados login
      username: null,
      passwordLogin: null
    }
  }
}
</script>

<style>
#dropdown-form{
  width: 20%;
}
</style>
