<script setup>
import { onMounted, watch, inject  } from 'vue'
import { storeToRefs } from 'pinia'
import { useAtoresStore } from '@/stores/atores'
import { useFilmesStore } from '@/stores/searchbar'
const aparecer = inject('aparecer')
const atoresStore = useAtoresStore()
const searchStore = useFilmesStore()
const { cards, filmeEscolhido, atores, isLoading } = storeToRefs(atoresStore)

watch(
  () => searchStore.selecionados, // ou outro array que armazena as tentativas
  (novoValor) => {
    if (!filmeEscolhido.value) return

    // percorre todas as tentativas do jogador
    for (const tentativa of novoValor) {
      if (tentativa.title === filmeEscolhido.value.title) {
        aparecer.value = true // dispara o Vitória
        console.log('VITÓRIA! filme adivinhado:', filmeEscolhido.value.title)
        break
      }
    }
  },
  { deep: true }
)
onMounted(() => {
  atoresStore.carregarFilmeEElenco()
})

watch(
  () => searchStore.selecionados,
  (novoValor) => {
    if (!novoValor || novoValor.length === 0) return
    const index = novoValor.length
    const ator = atores.value[index]
    if (!ator) {
      return
    }
    atoresStore.cards[index] = {
      id: index + 1,
      name: ator.name,
      profile_path: ator.profile_path
    }

  },
  { deep: true }
)
</script>

<template>
   <div v-if="isLoading" class="loader-wrapper">
  <div class="loader"></div>
</div>
  <div v-else>
    <ul>
      <li v-for="card in cards" :key="card.id" class="card">
        <div v-if="card.name !== '?'">
          <img :src="`https://image.tmdb.org/t/p/w185${card.profile_path}`" alt="">
          <h1>{{ card.name }}</h1>
        </div>

        <div v-else class="escondido">
          <h1>?</h1>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 20px;
  display: flex;
  justify-content: center;
  gap: 2vw;
  margin: 5vw 0;
}

li {
  margin-bottom: 5px;
  font-size: 1.1em;
}

img {
  border-radius: 0.5vw;
}

h1 {
  font-size: 1rem;
  color: black;
}

li.card div.escondido {
  background-color: white;
  width: 10vw;
  height: 30vh;
  border-radius: 0.5vw;
  border: 1px solid #004583;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

li.card div.escondido h1 {
  color: #004583;
  font-size: 6rem;
  margin-top: 0.5rem;
}
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.loader {
  width: 70px;
  height: 70px;
  border: 7px solid #ddd;
  border-top-color: #004583;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
