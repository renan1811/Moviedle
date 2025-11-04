<script setup>
import NomeJogoComponent from '@/components/reutilizaveis/nomeJogoComponent.vue';
import HeaderComponent from '@/components/reutilizaveis/HeaderComponent.vue';
import GeradorCifraComponent from '@/components/geradorCifraComponent.vue';
</script>
<template>
    <HeaderComponent />
    <NomeJogoComponent nome="Decifrar o filme" comoJogar="Você vai receber um filme com o nome embaralhado, e tera que advinhar que filme é esse. A cada tentativa uma letra fica na posição correta." desc="Tente advinhar o filme com essa palavra: "/>
   <GeradorCifraComponent />
</template>

<style scoped>

</style>