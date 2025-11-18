<script setup>
import { onMounted, ref, inject} from 'vue';
import api from '@/plugins/axios'
const atores = ref([]);
const filmes = ref([])
const numAleatorio = ref(null)

const filmeEscolhido = inject('filmeEscolhido')


onMounted(async () => {
  const paginaAleatoria = Math.floor(Math.random() * 50)
  const response =
    await api.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${paginaAleatoria}&sort_by=popularity.desc&vote_count.gte=1500`)
  filmes.value = response.data.results

  numAleatorio.value = Math.floor(Math.random() * 20)
  filmeEscolhido.value = filmes.value[numAleatorio.value]
  try {
    const response = await api.get(`https://api.themoviedb.org/3/movie/${filmeEscolhido.value.id}/credits` );
    const elencoCompleto = response.data.cast;
    const novosNomesAtores = elencoCompleto.slice(0, 6);
    atores.value = novosNomesAtores;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
})
</script>
<template>
    <div>
        <ul v-if="atores.length != 0">
            <li v-for="(ator, index) in atores" :key="index">
                <img :src="`https://image.tmdb.org/t/p/w185${ator.profile_path}`" alt="">
                <h1>{{ ator.name }}</h1>
            </li>
        </ul>
    </div>
    <div v-if="filmeEscolhido && filmeEscolhido.id">
        <h1>{{ filmeEscolhido.title }}</h1>
    </div>
    <div>
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
</style>
