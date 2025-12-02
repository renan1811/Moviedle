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

const aparecer = ref(false)
provide('aparecer', aparecer)
</script>
<template>
    <HeaderComponent />
    <div class="fundo">
     <VitoriaComponent />
     <div v-if="aparecer == false">
        <NomeJogoComponent nome="Decifrar o filme" comoJogar="Você vai receber um filme com o nome embaralhado, e tera que advinhar que filme é esse. A cada tentativa uma letra fica na posição correta." desc="Tente advinhar o filme com essa palavra: "/>
   <GeradorCifraComponent />
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
