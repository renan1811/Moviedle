<script setup>
import { ref } from 'vue';
import '@mdi/font/css/materialdesignicons.min.css'
const isHovered = ref(false);

defineProps({
    nome: String,
    comoJogar: String,
    desc: String,
})
</script>
<template>
  <div class="jogo">
    <h1>{{ nome }}</h1>
    <span class="mdi mdi-information-outline"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false">
    </span>
  </div>
  <div class="informacoes" v-show="isHovered">
    <h1>Como Jogar:</h1>
    <p>{{ comoJogar }}</p>
  </div>
  <h1 class="desc" :class="{ 'hidden-but-present': isHovered }">
    {{ desc }}
  </h1>
</template>
<style scoped>

.jogo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

h1 {
    font-size: 2rem;
    color: black;
    font-weight: bold;
    margin: 0 1vw 0 0;
    text-align: left;
}


span {
  font-size: 2.5rem;
  color: #004583;
  font-weight: bold;
}

.informacoes {
  position: fixed;
  top: 19%;
  left: 40%;
  width: 20vw;
  background-color: #002D53;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  border-radius: 0.6vw;
  z-index: 999;
}
.informacoes h1 {
    font-size: 1.3rem;
    color: #7DBBF3;
    margin: 0.3vw 0.8vw;
}

.informacoes p {
    margin: 0.3vw 0.8vw;
    color: white;
}

h1.desc {
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
}

/* Adição da classe para manter o espaço do elemento */
.hidden-but-present {
    visibility: hidden;
}
</style>
