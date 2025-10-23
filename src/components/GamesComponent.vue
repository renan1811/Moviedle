<script setup>
import { ref } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
const jogos = ref([
  { titulo: 'Decifre o filme', numero: 1, subtitulo: 'Decifre através de carácteristicas do filme' },
  { titulo: 'Descubra o filme', numero: 2, subtitulo: 'Descubra o filme através de dicas'},
  { titulo: 'Descubra pela imagem', numero: 3, subtitulo: 'Descubra o filme pela imagem'},
  { titulo: 'Quem é mais famoso', numero: 4, subtitulo: 'Adivinhe qual ator é mais famoso' },
  { titulo: 'Acerte pelo elenco', numero: 5, subtitulo: 'Acerte o filme pelo elenco' },
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
            <h1>{{ jogo.titulo }}</h1>
          </div>
        </li>
      </ul>
      <div class="info">
        <h1>Moviedle: {{ jogos[2].titulo }}</h1>
        <h2>{{ jogos[2].subtitulo }}</h2>
        <a>Jogar</a>
      </div>
    
</template>
<style scoped>
ul {
  display: flex;
  justify-content: center;
  gap: 10px;
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
}

div.card::before {
  content: "";
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