<template>
  <div>
    <section id="about" class="about">

      <div id="container">

            <div class="aboutTitle">
              <h2>{{titleAboutUs}}</h2><br><br>
              <h5>{{descriptionAboutUs}}</h5><br><br>
            </div>

            <div class="icon-box">
              <div class=""  v-for="detail in details">
                <h4 class="title"><a style="color: #111111">{{detail.nome}}</a></h4>
                <img class="image" :src="require(`../assets/img/${detail.imagem}`)">
              </div>
            </div>

      </div>

    </section>
  </div>
</template>

<script>
export default {
  name: "AboutUsSection",
  props: ['titleAboutUs','descriptionAboutUs','details']
}
</script>

<style>

.aboutTitle{
  text-align: center;
  padding-top: 150px;
  padding-bottom: 50px;
  background-color: #047bfd;
}

.title{
  padding-bottom: 40px;
  font-weight: 600;
}

.image{
  border-radius: 5px;
  width: 240px;
}

#about .icon-box{
  width: 70%;
  padding-top: 100px;
  margin:auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 100px;
  text-align: center;
}

.aboutTitle h5{
  color: #ffffff;
}

.aboutTitle h2{
  font-size: 2.5rem;
  font-weight: 600;
  color:#ffffff;
}

</style>
