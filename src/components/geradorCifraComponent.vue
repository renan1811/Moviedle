<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import api from '@/plugins/axios'
const filmes = ref([])
const numAleatorio = ref(null)

const filmeEscolhido = inject('filmeEscolhido')
const palavraEmbaralhada = ref([])

const selecionados = inject('selecionados');
const contador = ref(0)
const palavraCorreta = filmeEscolhido.value.title;

function atualizaPalavra() {
  alert("abla");
  console.log(`Contador: ${contador.value}`);
  let novaPalavra = palavraEmbaralhada.value;
  console.log(`Palavra Embaralhada: ${palavraEmbaralhada.value}`);
  console.log(`Nova Palavra: ${novaPalavra}`);
  const letra = palavraEmbaralhada.value[contador.value];
  console.log(letra);
  const letraAntiga = palavraEmbaralhada.value[contador.value];
  console.log(letraAntiga);
  const posicaoAlterar = palavraEmbaralhada.value.indexOf(letraAntiga);
  novaPalavra = novaPalavra.splice(contador, 1, filmeEscolhido.value.title[contador]);
  console.log(`Nova palavra atualizada: ${novaPalavra}`);
  novaPalavra = novaPalavra.splice(posicaoAlterar, 1, letraAntiga);
  novaPalavra = novaPalavra + palavraEmbaralhada.value.join("").substring(contador, palavraEmbaralhada.value.length - contador);
  console.log(`Nova Palavra: ${novaPalavra}`);
  // palavraEmbaralhada = novaPalavra;
  contador += 1;
}

watch(selecionados, (novoValor) => {
  console.log("watch disparou!", selecionados.length)
  if (!Array.isArray(palavraEmbaralhada.value)) {
    palavraEmbaralhada.value = palavraEmbaralhada.value.split('')
  }
  
  if (novoValor.length != 0) {
    for (const letra of filmeEscolhido.value.title) {
      for (const [index, letraEmbaralhada] of palavraEmbaralhada.value.entries()) {
        console.log(index, letraEmbaralhada, letra);
        if (letra.toLowerCase() == letraEmbaralhada.toLowerCase()) {
          const letraRemovida = palavraEmbaralhada.value.splice(index, 1)[0]
          palavraEmbaralhada.value.splice(0, 0, letraRemovida)
          break
        }
      }
      break
    }
  }
  atualizaPalavra();
}, { deep: true })

function embaralharPalavra(palavra) {
  let embaralhada = palavra
  while (embaralhada === palavra) {
    embaralhada = palavra.toLowerCase().split('').sort(() => Math.random() - 0.5).join('')
  }
  return embaralhada
}
onMounted(async () => {
  const paginaAleatoria = Math.floor(Math.random() * 50)
  const response = await api.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${paginaAleatoria}&sort_by=popularity.desc&vote_count.gte=1500
`)
  filmes.value = response.data.results

  numAleatorio.value = Math.floor(Math.random() * 20)
  filmeEscolhido.value = filmes.value[numAleatorio.value]
  palavraEmbaralhada.value = embaralharPalavra(filmeEscolhido.value.title)
})
</script>
<template>
  <div v-if="filmes.length && numAleatorio !== null">
    <h1 v-if="selecionados.length === 0">{{ palavraEmbaralhada }}</h1>
    <h1 v-else>
      {{ palavraEmbaralhada.join('') }}
    </h1>
    <h2>{{ filmeEscolhido.title }}</h2>
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
</style>