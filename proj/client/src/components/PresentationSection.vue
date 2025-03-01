<template>
  <div>
    <section id="presentation" class="d-flex align-items-center">
      <div class="container">
        <h1>{{ welcomeMessage }}</h1>
        <h2>{{ description }}</h2>
        <a href="#services" class="btn-get-started scrollto">Começar</a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "PresentationSection",
  props: ['welcomeMessage','description']
}
</script>

<style>
#presentation {
  width: 100%;
  height: 90vh;
  background: url('../assets/img/hero-bg.jpg') top center;
  background-size: cover;
}

#presentation .container {
  position: relative;
}

#presentation h1 {
  margin: 0;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  text-transform: uppercase;
  color: #2c4964;
}

#presentation h2 {
  color: #2c4964;
  margin: 10px 0 0 0;
  font-size: 24px;
}

#presentation .btn-get-started {
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 12px 35px;
  margin-top: 30px;
  border-radius: 50px;
  transition: 0.5s;
  color: #fff;
  background: #1977cc;
}

#presentation .btn-get-started:hover {
  background: #3291e6;
}

@media (min-width: 1024px) {
  #presentation {
    background-attachment: fixed;
  }
}

@media (max-width: 992px) {
  #presentation {
    margin-bottom: 0;
    height: 100vh;
  }
  #presentation .container {
    padding-bottom: 63px;
  }
  #presentation h1 {
    font-size: 28px;
    line-height: 36px;
  }
  #presentation h2 {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 30px;
  }
}

@media (max-height: 600px) {
  #presentation {
    height: auto;
  }
}
</style>
