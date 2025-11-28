<script setup>
import { onMounted, watch, inject} from 'vue'
import { useFilmesStore } from '@/stores/index.js'
import { useRouter } from 'vue-router' // <-- NOVO: Importação do useRouter
import searchBarComponent from './reutilizaveis/searchBarComponent.vue'


const router = useRouter()

const selecionados = inject('selecionados');

const aparecer = inject('aparecer');


const store = useFilmesStore()


onMounted(() => {
  store.carregarFilmeAleatorio()
})


watch(
  () => selecionados.value,
  (novoValor) => {
    if (novoValor.length > 0) {
      const filmeSelecionado = novoValor[0];

      if (store.filmeEscolhido && filmeSelecionado.id === store.filmeEscolhido.id) {
        console.log("VITÓRIA! O filme selecionado é o correto.");
        router.push({ name: 'Vitoria' });
        aparecer.value = true

      }
    }
  },
  { deep: true }
);

</script>

<template>
  <div class="maior">
  <div class="embacado" v-if="store.filmeEscolhido">
    <img :src="`https://image.tmdb.org/t/p/w185${store.filmeEscolhido.poster_path}`" alt="imagem do filme">
  </div>
  <searchBarComponent />
  </div>
</template>

<style setup>
  .maior{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  }

.embacado {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2vw;
  width: 16vw;

}
.embacado img{
  width: 100%;
  height: auto;
  border-radius: 10px;
  flex-shrink: 0;
}
</style>
