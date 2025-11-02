<script setup>
import NomeJogoComponent from '@/components/reutilizaveis/nomeJogoComponent.vue';
import HeaderComponent from '@/components/reutilizaveis/HeaderComponent.vue';
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios'
const filmes = ref(null)
const numAleatorio = Math.floor(Math.random() * 20)
let filmeEscolhido = ref(null)
console.log(numAleatorio)
onMounted(async () => {
    const response = await api.get('https://api.themoviedb.org/3/discover/movie?language=pt-BR&page=1')
    filmes.value = response.data.results
    filmeEscolhido.value = filmes[numAleatorio].title 
})
</script>
<template>
    <HeaderComponent />
    <NomeJogoComponent nome="Decifrar o filme" comoJogar="Você vai receber um filme com o nome embaralhado, e tera que advinhar que filme é esse. A cada tentativa uma letra fica na posição correta." desc="Tente advinhar o filme com essa palavra: "/>
    <h1> {{ filmeEscolhido}}</h1>
</template>

<style scoped>
</style>