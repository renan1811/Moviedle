<script setup>
import { onMounted } from 'vue'
import { useEmbaralharStore } from '@/stores/embaralhar'

const store = useEmbaralharStore()

onMounted(() => {
  store.gerarFilmeAleatorio()
})
</script>

<template>
  <div v-if="store.filmeEscolhido && store.palavraEmbaralhada.length">
    <h1>
      <span
        v-for="(letra, index) in store.palavraEmbaralhada"
        :key="index"
        :class="{ acertou: index < store.contador }"
      >
        {{ letra }}
      </span>
    </h1>
  </div>
</template>

<style>
div {
  margin: 2vw 0 0 0;
}

h1, span {
  text-align: center;
  font-size: 6rem;
  font-weight: bold;
  color: black;
}

.acertou {
  color: #004583;
  font-weight: bold;
}
</style>
