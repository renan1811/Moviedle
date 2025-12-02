<script setup>
import { onMounted } from 'vue'
import { useEmbaralharStore } from '@/stores/embaralhar'

const store = useEmbaralharStore()

onMounted(() => {
  store.gerarFilmeAleatorio()
})
</script>

<template>
  <div v-if="store.isLoading" class="loader-wrapper">
  <div class="loader"></div>
</div>
<div v-else>
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
