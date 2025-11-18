<script setup>
import { ref, provide } from 'vue';
import AtoresElencoComponent from '@/components/atoresElencoComponent.vue';
import NomeJogoComponent from '@/components/reutilizaveis/nomeJogoComponent.vue';
import SearchBarComponent from '@/components/reutilizaveis/searchBarComponent.vue';


const selecionados = ref([])
provide('selecionados', selecionados)

const filmeEscolhido = ref("")
provide('filmeEscolhido', filmeEscolhido)

const aparecer = ref(false)
provide('aparecer', aparecer)
</script>
<template>
<NomeJogoComponent nome="Decifrar o filme" comoJogar="Seu objetivo é adivinhar o título do filme misterioso. Você começará com a pista de apenas 1 ator do elenco (que tem 6 no total). Após digitar sua resposta, se estiver incorreta, mais 1 ator será revelado como pista. O jogo continua, liberando um novo ator a cada tentativa, até que você acerte o filme." desc="Tente advinhar o filme com esse elenco: "/>
<AtoresElencoComponent />
<SearchBarComponent />
</template>
<style scoped>
</style>