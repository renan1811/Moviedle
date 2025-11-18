<script setup>
import { onMounted, ref } from 'vue';
import api from '@/plugins/axios'
const atores = ref([]);

onMounted(async () => {
  try {
    const response = await api.get(`https://api.themoviedb.org/3/movie/238/credits` );
    
    const elencoCompleto = response.data.cast;
    const novosNomesAtores = elencoCompleto.slice(0, 6);
    atores.value = novosNomesAtores;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
});
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
