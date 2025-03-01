<template>
  <div>
    <footer id="footer">

      <div class="footer-top">
        <div class="container">
          <div class="row">

            <div class="col-lg-3 col-md-6 footer-contact">
              <h3>ServFarm</h3>
              <p>
                <strong>Telefone:</strong> +351 92345678<br>
                <strong>Email:</strong> exemplo@gmail.com<br>
              </p>
            </div>

            <div class="col-lg-2 col-md-6 footer-links">
              <h4>Links</h4>
              <ul>
                <li><i class="bx bx-chevron-right"></i> <a href="#presentation">Página Inicial</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#about">Sobre nós</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#services">Serviços</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#products">Produtos</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

    </footer>
  </div>

</template>

<script>
export default {
name: "Footer"
}
</script>

<style>
#footer {
  color: #373737;
  font-size: 14px;
  background: #ffffff;
}

#footer .footer-top {
  padding: 60px 0 30px 0;
  background: #ececec;
  box-shadow: 0px 2px 20px rgba(25, 100, 100, 0.1);
}

#footer .footer-top .footer-contact {
  margin-bottom: 30px;
}

#footer .footer-top .footer-contact h4 {
  font-size: 22px;
  margin: 0 0 30px 0;
  padding: 2px 0 2px 0;
  line-height: 1;
  font-weight: 700;
}

#footer .footer-top .footer-contact p {
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 0;
  font-family: "Raleway", sans-serif;
  color: #777777;
}

#footer .footer-top h4 {
  font-size: 16px;
  font-weight: bold;
  color: #444444;
  position: relative;
  padding-bottom: 12px;
}

#footer .footer-top .footer-links {
  margin-bottom: 30px;
}

#footer .footer-top .footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

#footer .footer-top .footer-links ul i {
  padding-right: 2px;
  color: #1c84e3;
  font-size: 18px;
  line-height: 1;
}

#footer .footer-top .footer-links ul li {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

#footer .footer-top .footer-links ul li:first-child {
  padding-top: 0;
}

#footer .footer-top .footer-links ul a {
  color: #777777;
  transition: 0.3s;
  display: inline-block;
  line-height: 1;
}

#footer .footer-top .footer-links ul a:hover {
  text-decoration: none;
  color: #1977cc;
}

</style>
