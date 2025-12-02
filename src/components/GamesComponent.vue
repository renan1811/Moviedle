<script setup>
import { ref } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
const jogos = ref([
  { titulo: 'Decifre o filme', numero: 1, subtitulo: 'Decifre através de carácteristicas do filme', router: "decifrar" },
  { titulo: 'Descubra pela imagem', numero: 2, subtitulo: 'Descubra o filme pela imagem', router: "imagem" },
  { titulo: 'Quem é mais caro ', numero: 3, subtitulo: 'Adivinhe qual filme custou mais', router: "qual" },
  { titulo: 'Acerte pelo elenco', numero: 4, subtitulo: 'Acerte o filme pelo elenco', router: "adivinharElenco" },
])


</script>

<template>
  <ul>
    <li v-for="(jogo, index) in jogos" :key="index">
      <div class="card">
        <div class="card-details">
          <p class="text-title">{{ jogo.numero }}</p>
          <p class="text-body">{{ jogo.titulo }}</p>
        </div>
        <RouterLink :to="jogo.router">
        <button class="card-button">Jogar</button>
        </RouterLink>
      </div>


    </li>
  </ul>
</template>
<style scoped>
ul {
  display: flex;
  justify-content: center;
  gap: 2vw;
  margin: 4vw 0 0 0;
}


.card {
  width: 12vw;
  height: 30vh;
  border-radius: 0.5vw;
  background: #f5f5f5;
  position: relative;
  padding: 1.8rem;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
}

.card-details {
  color: black;
  height: 100%;
  gap: .5em;
  display: grid;
  place-content: center;
}

.card-button {
  transform: translate(-50%, 125%);
  width: 9vw;
  border-radius: 0.3vw;
  border: none;
  background-color: #004583;
  font-weight: bold;
  color: #fff;
  font-size: 1rem;
  padding: .5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

.text-body {
  color: #004583;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
}

/*Text*/
.text-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10rem;
  font-weight: bold;
  opacity: 10%;
  color: #004583;
  pointer-events: none; 
}

/*Hover*/
.card:hover {
  border-color: #004583;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}
.card:hover .card-button {
  transform: translate(-50%, 50%);
  opacity: 1;
}
</style>
