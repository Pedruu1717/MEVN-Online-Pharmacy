import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import AboutUsSection from "./components/AboutUsSection";
import ServicesSection from "./components/ServicesSection";
import ProductsSection from "./components/ProductsSection";
import Footer from "./components/Footer";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: App
    },
    {
      path: "/about",
      name:"about",
      component: AboutUsSection
    },
    {
      path:"/services",
      name:"services",
      component: ServicesSection
    },
    {
      path:"/products",
      name:"products",
      component: ProductsSection
    },
    {
      path:"/contacts",
      name:"contacts",
      component: Footer
    }
  ]

});

