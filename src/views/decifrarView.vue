<script setup>
import { ref, provide } from 'vue'
import NomeJogoComponent from '@/components/reutilizaveis/nomeJogoComponent.vue';
import HeaderComponent from '@/components/reutilizaveis/HeaderComponent.vue';
import GeradorCifraComponent from '@/components/geradorCifraComponent.vue';
import SearchBarComponent from '@/components/reutilizaveis/searchBarComponent.vue';
import VitoriaComponent from '@/components/reutilizaveis/vitoriaComponent.vue';

const selecionados = ref([])
provide('selecionados', selecionados)

const filmeEscolhido = ref("")
provide('filmeEscolhido', filmeEscolhido)
</script>
<template>
    <HeaderComponent />
    <NomeJogoComponent nome="Decifrar o filme" comoJogar="Você vai receber um filme com o nome embaralhado, e tera que advinhar que filme é esse. A cada tentativa uma letra fica na posição correta." desc="Tente advinhar o filme com essa palavra: "/>
   <GeradorCifraComponent />
   <SearchBarComponent />
   <VitoriaComponent />
</template>

<style scoped>

</style>