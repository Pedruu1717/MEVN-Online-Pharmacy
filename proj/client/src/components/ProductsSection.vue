<template>
  <div>
    <section id="products" class="services">
      <div class="container">

        <div class="section-title">
          <h2 style="font-size: 2.5rem">{{ titleProducts }}</h2>
        </div>


        <div class="row">

          <div v-for="product in products" class="col-lg-4 col-md-6 d-flex align-items-stretch pb-3">
            <div class="icon-box">
              <div>
                <img id="img-servico" :src="`http://localhost:8082/uploads/imgs/${product.imagem}`" alt="img"/>
              </div>
              <h4 style="font-weight: 600"><a href="">{{product.nome}}</a></h4>
              <h4 style="font-weight: 500; font-size: 1rem"><a href="">Preço: {{product.preco}}€</a></h4>
              <button id="adquirir" class="btn">
                <a :href="`http://localhost:8082/admin/user/addproduct/${product._id}`">ADQUIRIR</a>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ProductsSection",
  props: ['titleProducts','products']
}
</script>

<style>
#products{
  margin-bottom: 100px;
}

#adquirir {
  border-radius: 5px;
  border-width: 2px;
  border-color: #0285cb;
  color: #0285cb;
  width: 150px;
  font-weight: 700;
  font-size:  13px;
  transition-duration: 0.2s;
  letter-spacing: 1px;
}

#adquirir:hover{
  border-color: #0015ac;
  background-color: #0346ef;
  color: white;
}

</style>
