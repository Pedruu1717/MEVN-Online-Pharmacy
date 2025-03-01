<template>
  <div id="app">
    <Header
        @registoSubmetido="submitRegisto"
        @loginSubmetido="login"
        @logoutSubmetido="logout"
        :loggedIn = "loggedIn"
    ></Header>

    <PresentationSection
      :welcomeMessage="welcomeMessage"
      :description="description"
    ></PresentationSection>

    <AboutUsSection
      :titleAboutUs="titleAboutUs"
      :descriptionAboutUs="descriptionAboutUs"
      :details="details"
    ></AboutUsSection>

    <ServicesSection
      :titleServices="titleServices"
      :servicos="servicos"
    ></ServicesSection>

    <ProductsSection
      :titleProducts="titleProducts"
      :products="products"
    ></ProductsSection>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import PresentationSection from "./components/PresentationSection";
import AboutUsSection from "./components/AboutUsSection";
import ServicesSection from "./components/ServicesSection";
import Footer from "./components/Footer";
import ProductsSection from "./components/ProductsSection";
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return{
      //Presentation Section
      welcomeMessage: 'Bem vindo ao ServFarm',
      description: 'Todas as farmácias mais perto de si',

      //About Us Section
      titleAboutUs: 'Sobre Nós',
      descriptionAboutUs: 'ServFarm é uma aplicação web que permite o agendamento de serviços' +
        ' e vende produtos de todas as farmácias conceituadas.',
      details: [
        {
          nome: 'Serviços',
          imagem: "servicos.png"
        },
        {
          nome: 'Farmácias',
          imagem: "pharmacy.jpg"
        },
        {
          nome: 'Acordos de saúde',
          imagem: "handshake.png"
        }
      ],

      //Services Section
      titleServices: 'Serviços',
      servicos: null,

      //Products Section
      titleProducts: 'Produtos',
      products: null,

      //Authentication data
      loggedIn: false
    }
  },
  components: {
    ProductsSection,
    Footer,
    ServicesSection,
    Header,
    PresentationSection,
    AboutUsSection
  },

  mounted() {
    axios.get('http://localhost:8082/admin/services')
        .then((response) => {
          this.servicos = response.data.servicos
        })
    axios.get('http://localhost:8082/admin/products')
        .then((response) => {
          this.products = response.data.products
          console.log(this.products)
        })
  },

  methods: {
    submitRegisto(nome, email, password){
      axios.post('http://localhost:8082/admin/user/store',{
        nome, email, password
        }).then(response => {
        console.log(response)
        }).catch((error) => {
        console.log(error)
        })
    },
    login(username, password){
      let user = {
        email: username,
        password: password
      }
      axios.post('http://localhost:8082/admin/login',user)
        .then(res => {
          if(res.status === 200){

            localStorage.setItem('token', res.data.token)
            console.log(res)

            //Data
            this.loggedIn = true
          }
        }, err => {
         console.log(err.response)
         this.error = err.response.data.error
        })
    },
    logout(){
      localStorage.clear()
      this.loggedIn = false
    },
  }
}
</script>


<style>

body {
  font-family: "Open Sans", sans-serif;
  color: #444444;
}

a {
  color: #1977cc;
  text-decoration: none;
}

a:hover {
  color: #3291e6;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
}

h2 {
  font-weight: 700;
  color: #2c4964;
  margin-bottom: 15px;
}

</style>
