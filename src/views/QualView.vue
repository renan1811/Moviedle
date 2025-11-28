<script setup>
import { ref, provide, onMounted } from 'vue'
import { useFilmesStore } from '@/stores/index.js'
import NomeJogoComponent from '@/components/reutilizaveis/nomeJogoComponent.vue';
import HeaderComponent from '@/components/reutilizaveis/HeaderComponent.vue';
import VitoriaComponent from '@/components/reutilizaveis/vitoriaComponent.vue';
import QualComponent from '@/components/QualComponent.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const selecionados = ref([])
provide('selecionados', selecionados)

const filmeEscolhido = ref("")
provide('filmeEscolhido', filmeEscolhido)

const aparecer = ref(false)
provide('aparecer', aparecer)


const store = useFilmesStore()

onMounted(() => {
  store.carregarFilmeAleatorio()
})

</script>

<template>
<HeaderComponent />
     <VitoriaComponent />
     <div v-if="aparecer == false">
        <NomeJogoComponent nome="Qual é mais caro" comoJogar="Dois filmes aparecerão na tela e voce tera que adivinhar qual deles custou mais dinheiro para ser feito." desc="Tente advinhar qual filme custou mais: "/>
      </div>
    <QualComponent />
    <div class="voltar">
      <router-link to="/">
        <p>voltar para a tela inicial<span><FontAwesomeIcon :icon="faHouse" class="icone"></FontAwesomeIcon></span></p>
      </router-link>
    </div>
</template>

<style scoped>
.voltar p{
  color: #ffe100;
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
