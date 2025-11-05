<template>
    <div class="input-wrapper">
      <input
        v-model="query"
        @input="buscarFilmes"
        placeholder="Digite para buscar..."
        class="input"
      />
  
      <ul v-if="resultados.length">
        <li v-for="filme in resultados" :key="filme.id">
          {{ filme.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const query = ref('')
  const resultados = ref([])
  
  const buscarFilmes = async () => {
    if (!query.value.trim()) {
      resultados.value = []
      return
    }
  
    try {
      const resposta = await axios.get('https://api.themoviedb.org/3/search/movie', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDMyZjIxYWZjMjFmNWEwMTBiMmEyYjVmZTBmYWVlNiIsIm5iZiI6MTc1OTI1MjA4NC41NzksInN1YiI6IjY4ZGMwZTc0OTUwYTUxMTEwYWM3NmY5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0iCrH0giesdGUiEjH1HNqQQ0OyKyW3dkc-fQO6j4LI4'
        },
        params: {
          language: 'pt-BR',
          query: query.value
        }
      })
      resultados.value = resposta.data.results
    } catch (erro) {
      console.error('Erro ao buscar filmes:', erro)
    }
  }
  </script>
  
  <style scoped>
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
  }
  
  .input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>
  