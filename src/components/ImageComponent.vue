<script setup>
import { watch, inject, ref} from 'vue'
import { useFilmesStore } from '@/stores/index.js'
import { useFilmesStore as useSearchStore } from '@/stores/searchbar.js'
import { storeToRefs } from 'pinia'
import searchBarComponent from './reutilizaveis/searchBarComponent.vue'

const aparecer = inject('aparecer');

const store = useFilmesStore()

const blur = ref(25)


const searchStore = useSearchStore()
const { selecionados } = storeToRefs(searchStore)

// onMounted(() => {
//   store.carregarFilmeAleatorio()
// })


watch(
  selecionados,
  (novoValor) => {
    if (novoValor.length > 0) {
      const filmeSelecionado = novoValor[0];


      if (store.filmeEscolhido && filmeSelecionado.id === store.filmeEscolhido.id) {

        console.log("vitoria:", store.filmeEscolhido.title);
        aparecer.value = true
      }
      else if(store.filmeEscolhido) {
        if (blur.value > 10) {
          blur.value -= 5;
      }
        else{
          blur.value -= 5;
      }
    }
  }

    },
  { deep: true }
);



</script>


<template>
  <div class="maior">
  <div class="embacado" v-if="store.filmeEscolhido">
    <img :src="`https://image.tmdb.org/t/p/w185${store.filmeEscolhido.poster_path}`" :style="{ '--blur': blur + 'px' }" alt="imagem do filme" draggable="false">
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
  filter: blur(var(--blur));
}
</style>
