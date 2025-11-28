<script setup>
import { onMounted, ref, inject, watch } from 'vue';
import api from '@/plugins/axios'

const atores = ref([]);
const filmes = ref([]);
const numAleatorio = ref(null);

const selecionados = inject('selecionados');
const filmeEscolhido = inject('filmeEscolhido');

// Inicializa cards com "?" e sem imagem
const cards = ref([
  { id: 1, name: '?', profile_path: null },
  { id: 2, name: '?', profile_path: null },
  { id: 3, name: '?', profile_path: null },
  { id: 4, name: '?', profile_path: null },
  { id: 5, name: '?', profile_path: null },
  { id: 6, name: '?', profile_path: null },
]);

// Monta o filme e elenco
onMounted(async () => {
  const paginaAleatoria = Math.floor(Math.random() * 50);
  const response = await api.get(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${paginaAleatoria}&sort_by=popularity.desc&vote_count.gte=1500`
  );
  filmes.value = response.data.results;

  numAleatorio.value = Math.floor(Math.random() * 20);
  filmeEscolhido.value = filmes.value[numAleatorio.value];

  try {
    const response = await api.get(
      `https://api.themoviedb.org/3/movie/${filmeEscolhido.value.id}/credits`
    );
    const elencoCompleto = response.data.cast;
    atores.value = elencoCompleto.slice(0, 6); // primeiros 6 atores
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
});

// Watch para revelar ator no card correto
watch(
  () => selecionados.value,
  (novoValor) => {
    if (novoValor.length > 0) {
      const index = novoValor.length - 1; // posição do ator a revelar
      if (atores.value[index]) {
        cards.value[index] = {
          name: atores.value[index].name,
          profile_path: atores.value[index].profile_path,
          id: cards.value[index].id, // mantém o id original
        };
      }
    }
  },
  { deep: true }
);
</script>

<template>
  <div>
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
    <div v-if="filmeEscolhido && filmeEscolhido.id">
      <h1>{{ filmeEscolhido.title }}</h1>
    </div>
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
  color: white;
}

li.card div.escondido{
      background-color: black;
  width: 10vw;
  height: 30vh;
  border-radius: 0.5vw;
  border: 1px solid #ffe100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

li.card div.escondido h1 {
  color: #ffe100;
  font-size: 6rem;
  margin-top: 0.5rem;
}
</style>
