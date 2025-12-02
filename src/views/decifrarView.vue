<script setup>
import { ref, provide } from 'vue'
import NomeJogoComponent from '@/components/reutilizaveis/nomeJogoComponent.vue';
import HeaderComponent from '@/components/reutilizaveis/HeaderComponent.vue';
import GeradorCifraComponent from '@/components/geradorCifraComponent.vue';
import SearchBarComponent from '@/components/reutilizaveis/searchBarComponent.vue';
import VitoriaComponent from '@/components/reutilizaveis/vitoriaComponent.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
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
     <div class="voltar">
      <router-link to="/">
        <p>voltar para a tela inicial <span><FontAwesomeIcon :icon="faHouse" class="icone"></FontAwesomeIcon> </span></p>
      </router-link>
    </div>
    </div>



</template>

<style scoped>
div.fundo {
 position: relative;
  width: 100%;
  height: 90vh;
  background-image: url('/images/fundo elenco.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
}
.voltar p{
  color: #004583;
  padding-bottom: 3vh;
  margin-left: 2vw;
  align-items: center;
  display: flex;
  font-size: 1.1rem;

}
div.voltar p span  {
  margin-left: 0.3vw;
  margin-bottom: 0.5vh;
  color: #004583;
  align-items: center;
  display: flex;
  font-size: 1.3rem;
}
</style>
