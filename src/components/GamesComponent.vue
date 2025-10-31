<script setup>
import { ref } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
const jogos = ref([
  { titulo: 'Decifre o filme', numero: 1, subtitulo: 'Decifre através de carácteristicas do filme', router: "decifrar" },
  { titulo: 'Descubra o filme', numero: 2, subtitulo: 'Descubra o filme através de dicas', router: "decifrar"},
  { titulo: 'Descubra pela imagem', numero: 3, subtitulo: 'Descubra o filme pela imagem', router: "decifrar"},
  { titulo: 'Quem é mais famoso', numero: 4, subtitulo: 'Adivinhe qual ator é mais famoso', router: "decifrar" },
  { titulo: 'Acerte pelo elenco', numero: 5, subtitulo: 'Acerte o filme pelo elenco', router: "decifrar" },
]) 

function rotacionarArray(array, indexClicado) {
  const meio = Math.floor(array.length / 2);
  const deslocamento = indexClicado - meio; 
  jogos.value = array.slice(deslocamento).concat(array.slice(0, deslocamento));
}
</script>

<template>
      <ul>
        <li v-for="(jogo, index) in jogos" :key="index" v-on:click="rotacionarArray(jogos, index)" :style="index === 2 ? 'transform: scale(1.3); margin: 0px 40px' : ''">
          
          <div class="card">
            <h2>{{ jogo.numero }}</h2>
            <div v-if="index == 2">
              <router-link :to="jogo.router" class="router">
              <span class="mdi mdi-play"></span>
              </router-link>
            </div>
            <h1 v-else>{{ jogo.titulo }}</h1>
          </div>
        
        </li>
      </ul>
      <div class="info">
        <h1>Moviedle: {{ jogos[2].titulo }}</h1>
        <h2>{{ jogos[2].subtitulo }}</h2>
        <router-link :to="jogos[2].router">Jogar</router-link>
      </div>
    
</template>
<style scoped>
ul {
  display: flex;
  justify-content: center;
  gap: 2vw;
  margin: 4vw 0 0 0;
}


div.card {
    color: white;
    background-color: black;
    box-shadow: rgba(255, 225, 0, 0.4) 0px 3px 8px;
    border-radius: 1vw;
    width: 16vw;
    height: 35vh;
    padding: 0.2vw;
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -2;
      transition: 0.2s ease;
}
.card:hover {
    transform: translateY(-5px);
}
li:hover {
  transform: translateY(-5px);
}
.router {
  box-shadow: none;
  background: transparent;
  font-size: 5rem;
}
div.card span {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid grey;
  height: 11vh;
  width: 6vw;
  border-radius: 100%;
}
div.card h1 {
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  
}
div.card h2 {
  position: absolute;
  font-size: 11rem;
  font-weight: bold;
  z-index: -1;
  opacity: 30%;
  color: #ffe100;
}
div.info {
  margin: 4vw 0 0 0; 
  color: white;
}

div.info h1 {
  display: flex;
  justify-content: center;
  font-weight: bold;
}

div.info h2 {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  font-weight: bold;
}
a {
  padding: 10px 80px;
  background-color: black;
  color: aliceblue;
  box-shadow: rgba(255, 225, 0, 0.4) 0px 3px 8px;
  display: flex;
  justify-content: center;
  width: 50px;
  margin: auto;
  border-radius: 8px;
  transition: 0.2s ease;
  font-weight: bold;
}

a:hover {
  transform: translateY(-5px);
}
</style>