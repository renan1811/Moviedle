<script setup>
  import { ref, inject } from 'vue'
  import axios from 'axios'
  
  const query = ref('')
  const resultados = ref([])
  
  const selecionados =  inject('selecionados');
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

  function selecionou(idselec) {
    const achar = resultados.value.find((filme) => filme.id == idselec)
    selecionados.value.unshift(achar)
    console.log(selecionados.value.length)
    query.value = ''
    resultados.value = [];
  }
  </script>
  <template>
    <div class="input-wrapper">
      <h2 class="tentativas">tentativas: <span>{{ selecionados.length }}</span></h2>
      <input
        v-model="query"
        @input="buscarFilmes"
        placeholder="Digite para buscar..."
        class="input"
      />
      <div v-if="resultados.length " class="filmes">
        <ul>
        <li v-for="filme in resultados" :key="filme.id" @click="selecionou(filme.id)">
          <img :src="`https://image.tmdb.org/t/p/w92${filme.poster_path}`" alt="">
          <h2>{{ filme.title }}</h2>
        </li>
      </ul>
      </div>
      <div class="selecionados">
        <ul>
          <li v-for="filme in selecionados" :key="filme.id" class="selecionados">
            <img :src="`https://image.tmdb.org/t/p/w92${filme.poster_path}`" alt="">
          <h2>{{ filme.title }}</h2>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  
  
  <style scoped>
  .input-wrapper {
    display: flex;
  flex-direction: column;
  align-items: center;
  }
  h2.tentativas {
    margin: 0 15vw 0 0;
    color: white;
    font-size: 1.2rem;
  }
  .tentativas span {
    color: #ffe100;
  }
  .input {
    width: 26vw;
    height: 7vh;
    border-radius: 10px;
    border: 2px solid #ffe100;
    color: #695e0d;
    font-size: 1.1rem;
    padding: 16px;
  }

  input:focus {
    box-shadow: rgba(255, 225, 0, 0.4) 0px 3px 8px;
  outline: none;
}
div.filmes {
  background-color: white;
  width: 26vw;
  height: 50vh;
  margin: 1vw;
  border-radius: 10px;
  border: 2px solid #ffe100;
  overflow-y: auto;
}
div ul li {
  margin: 1vw;
  display: flex;
  gap: 1vw;
  border-bottom: 1px solid rgb(202, 202, 202);
}
div ul li img {
  border-radius: 8px;
  margin-bottom: 1.5vw;
}

div ul li h2 {
  color: black;
  margin-top: 0.5vw;
}
div.selecionados {
  margin: 0;
}
li.selecionados {
  background-color: white;
  width: 26vw;
  height: 18vh;
  border-radius: 10px;
  border: 2px solid #ffe100;
}
li.selecionados img {
  margin: 1vw 0 1vw 1vw;
}
li.selecionados h2 {
  margin-top: 1.5vw;
}
  </style>
  