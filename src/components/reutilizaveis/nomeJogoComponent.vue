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
  <span class="mdi mdi-information-outline" @mouseover="isHovered = true" @mouseleave="isHovered = false"></span>
    </div>
  <div class="informacoes" v-if="isHovered">
    <h1>Como Jogar:</h1>
    <p>{{ comoJogar }}</p>
  </div>
  <h1 class="desc">{{ desc }}</h1>
</template>
<style scoped>

div {
    display: flex;
    align-items: center;
    justify-content: center;
}
h1 {
    font-size: 2rem;
    color: white    ;
    font-weight: bold;
    margin: 0 1vw 0 0;
}
span {
    font-size: 2.5rem;
    color: #ffe100;
}
.informacoes {
    background-color: black;
    display: block;
    position: fixed;
    left: 40%;
    width: 20vw;
    box-shadow: rgba(255, 225, 0, 0.4) 0px 3px 8px;
    border-radius: 0.6vw;
}
.informacoes h1 {
    font-size: 1.3rem;
    color: #ffe100;
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
</style>