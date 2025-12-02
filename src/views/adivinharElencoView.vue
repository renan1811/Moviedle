<script setup>
import { ref, provide } from 'vue';
import AtoresElencoComponent from '@/components/atoresElencoComponent.vue';
import NomeJogoComponent from '@/components/reutilizaveis/nomeJogoComponent.vue';
import SearchBarComponent from '@/components/reutilizaveis/searchBarComponent.vue';
import vitoriaComponent from '@/components/reutilizaveis/vitoriaComponent.vue';
import HeaderComponent from '@/components/reutilizaveis/HeaderComponent.vue';



const aparecer = ref(false)
provide('aparecer', aparecer)
</script>
<template>
    <HeaderComponent />
    <div class="fundo">
<vitoriaComponent />
    <div v-if="aparecer == false">
        <NomeJogoComponent nome="Decifrar o filme" comoJogar="Seu objetivo é adivinhar o título do filme misterioso. Você começará com a pista de apenas 1 ator do elenco (que tem 6 no total). Após digitar sua resposta, se estiver incorreta, mais 1 ator será revelado como pista. O jogo continua, liberando um novo ator a cada tentativa, até que você acerte o filme." desc="Tente advinhar o filme com esse elenco: "/>
<AtoresElencoComponent />
<SearchBarComponent />
    </div>
    </div>
    
</template>
<style scoped>
div.fundo {
 position: relative;           /* relativo à própria div */
  width: 100%;
  height: 90vh;                 /* altura fixa inicial */
  background-image: url('/images/fundo elenco.png'); 
  background-repeat: no-repeat;
  background-size: contain;     /* mantém proporção da imagem */
  background-position: top center; /* fixa no topo da div */
}
</style>