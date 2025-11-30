<script setup>
import FooterComponent from '@/components/FooterComponent.vue';
import GamesComponent from '@/components/GamesComponent.vue';
import HeaderComponent from '@/components/reutilizaveis/HeaderComponent.vue';
</script>
<template>
  <div>
    <HeaderComponent />
  <h2>
    Teste seu conhecimento
  </h2>

  <GamesComponent />

  <FooterComponent />
  </div>
  
</template>

<style scoped>
div {
 position: relative;           /* relativo à própria div */
  width: 100%;
  height: 90vh;                 /* altura fixa inicial */
  background-image: url('/images/home fundo.png'); 
  background-repeat: no-repeat;
  background-size: contain;     /* mantém proporção da imagem */
  background-position: top center; /* fixa no topo da div */
}
h2 {
  margin: 2vw;
  font-size: 3rem;
  font-weight: bold;
  color: black;
  text-align: center;
}
p {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>