<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import api from '@/plugins/axios'
const filmes = ref([])
const numAleatorio = ref(null)

const filmeEscolhido = inject('filmeEscolhido')
const palavraEmbaralhada = ref([])

const selecionados = inject('selecionados')

const contador = ref(0)

watch(selecionados, (novoValor) => {
    if (!Array.isArray(palavraEmbaralhada.value)) {
      palavraEmbaralhada.value = palavraEmbaralhada.value.split('')
    }
    if (novoValor.length != 0) {
      const letraAlvo = filmeEscolhido.value.title[contador.value]
      for (let i = contador.value; i < palavraEmbaralhada.value.length; i++) {
        const letraEmbaralhada = palavraEmbaralhada.value[i]

        if (letraAlvo.toLowerCase() === letraEmbaralhada.toLowerCase()) {
          const letraRemovida = palavraEmbaralhada.value.splice(i, 1)[0]
          palavraEmbaralhada.value.splice(contador.value, 0, letraRemovida)
          contador.value += 1
          break
        }
      }
    }
  },
  { deep: true },
)

function embaralharPalavra(palavra) {
  let embaralhada = palavra
  while (embaralhada === palavra) {
    embaralhada = palavra
      .toLowerCase()
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('')
  }
  return embaralhada
}
onMounted(async () => {
  const paginaAleatoria = Math.floor(Math.random() * 50)
  const response =
    await api.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${paginaAleatoria}&sort_by=popularity.desc&vote_count.gte=1500
`)
  filmes.value = response.data.results

  numAleatorio.value = Math.floor(Math.random() * 20)
  filmeEscolhido.value = filmes.value[numAleatorio.value]
  palavraEmbaralhada.value = embaralharPalavra(filmeEscolhido.value.title)
})
</script>
<template>
  <div v-if="filmes.length && numAleatorio !== null">
    <h1>
      <span
        v-for="(letra, index) in palavraEmbaralhada"
        :key="index"
        :class="{ acertou: index < contador }"
      >
        {{ letra }}
      </span>
    </h1>
    <h1>{{ filmeEscolhido.title }}</h1>
  </div>
</template>
<style>
div {
  margin: 2vw 0 0 0;
}

h1 {
  text-align: center;
  font-size: 6rem;
  font-weight: bold;
  color: white;
}
span {
  text-align: center;
  font-size: 6rem;
  font-weight: bold;
  color: white;
}
.acertou {
  color: #65ff5a;
  font-weight: bold;
}
</style>
