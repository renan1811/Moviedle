<script setup>
import { useFilmesStore } from '@/stores/searchbar'

const search = useFilmesStore()

function selecionou(filme) {
  search.addSelecionado(filme)
  search.query = ''
  search.resultados = []
}
</script>
  <template>
  <div class="input-wrapper">
     <h2 class="tentativas">tentativas: <span>{{ search.selecionados.length }}</span></h2>
    <input
      v-model="search.query"
      @input="search.buscarFilmes"
      placeholder="Digite para buscar..."
      class="input"
    />
    <div v-if="search.resultados.length" class="filmes">
      <ul>
        <li
          v-for="filme in search.resultados"
          :key="filme.id"
          @click="selecionou(filme)"
        >
          <img :src="`https://image.tmdb.org/t/p/w92${filme.poster_path}`" alt="">
          <h2>{{ filme.title }}</h2>
        </li>
      </ul>
    </div>
    <div class="selecionados">
  <ul>
    <li
      v-for="filme in search.selecionados"
      :key="filme.id"
      class="selecionados"
    >
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
    font-size: 1.2rem;
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
