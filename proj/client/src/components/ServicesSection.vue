<template>
  <div>
    <section id="services" class="services">
      <div class="container">

        <div class="section-title">
          <h2 style="font-size: 2.5rem">{{ titleServices }}</h2>
        </div>

        <div class="row">

          <div v-for="servico in servicos" class="col-lg-4 col-md-6 d-flex align-items-stretch pb-3">
            <div class="icon-box">
              <div style="padding-bottom: 50px">
                <img id="img-servico" :src="`http://localhost:8082/uploads/imgs/${servico.imagem}`" alt="img"/>
              </div>
              <h4 style="font-weight: 600"><a href="">{{servico.nome}}</a></h4>
              <h4 style="font-weight: 500; font-size: 1rem"><a href="">Preço: {{servico.preco}}€</a></h4>
              <button id="adquirir" class="btn">
                <a :href="`http://localhost:8082/admin/user/addservice/${servico._id}`">ADQUIRIR</a>
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
  name: "ServicesSection",
  props: ['titleServices', 'servicos']
}
</script>


<style>

#img-servico{
  width: 270px;
  border-radius: 5px;
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

#adquirir:hover a{
  color: white;
}

#services{
  margin-top: 100px;
  margin-bottom: 100px;
}

.section-title{
  text-align: center;
  margin-bottom: 100px;
}

.services .icon-box {
  width: 200%;
  text-align: center;
  border: 1px solid #d5e1ed;
  border-radius: 20px;
  padding: 80px 20px;
  transition: all ease-in-out 0.2s;
}

.services .icon-box .icon i {
  color: #fff;
  font-size: 28px;
}

.services .icon-box .icon::before {
  position: absolute;
  content: '';
  left: -8px;
  top: -8px;
  height: 100%;
  width: 100%;
  background: #badaf7;
  border-radius: 5px;
  transition: all .3s ease-out 0s;
  transform: translateZ(-1px);
}

.services .icon-box h4 {
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 24px;
}

.services .icon-box h4 a {
  color: #2c4964;
}

.services .icon-box p {
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}

.services .icon-box:hover {
  background: #1977cc;
  border-color: #1977cc;
}

.services .icon-box:hover .icon {
  background: #fff;
}

.services .icon-box:hover .icon i {
  color: #1977cc;
}

.services .icon-box:hover .icon::before {
  background: #3291e6;
}

.services .icon-box:hover h4 a, .services .icon-box:hover p {
  color: #fff;
}
</style>
