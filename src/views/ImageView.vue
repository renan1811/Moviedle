<script setup>
import NomeJogoComponent from '@/components/reutilizaveis/nomeJogoComponent.vue';
import HeaderComponent from '@/components/reutilizaveis/HeaderComponent.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import ImageComponent from '@/components/ImageComponent.vue';
import { ref, provide, onMounted} from 'vue'
import { useFilmesStore } from '@/stores/index.js'
import VitoriaComponent from '@/components/reutilizaveis/vitoriaComponent.vue';


// const selecionados = ref([])


const store = useFilmesStore()
provide('filmeEscolhido', store.filmeEscolhido)

const aparecer = ref(false)
provide('aparecer', aparecer)




onMounted(() => {
  store.carregarFilmeAleatorio()
})



</script>

<template>
<HeaderComponent />
<div class="fundo">
    <VitoriaComponent />
    <div v-if="aparecer == false" >
        <NomeJogoComponent nome="Adivinhe pela imagem" comoJogar="Dois filmes aparecerão na tela e voce tera que adivinhar qual deles custou mais dinheiro para ser feito." desc="Tente advinhar qual filme custou mais: "/>
    <ImageComponent />
    <div class="voltar">
      <router-link to="/">
        <p>voltar para a tela inicial<span><FontAwesomeIcon :icon="faHouse" class="icone"></FontAwesomeIcon></span></p>
      </router-link>
    </div>
    </div>
    </div>
</template>

<style scoped>
div.fundo {
 position: relative;
  width: 100%;
  height: 90vh;
  background-image: url('/images/fundo imagem.png');
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
span {
  margin-left: 0.3vw;
  margin-bottom: 0.5vh;
}

</style>
