<script setup>
import { inject, ref, watch, onMounted } from 'vue'
import api from '@/plugins/axios'
const selecionados = inject('selecionados')
const filmeEscolhido = inject('filmeEscolhido')
const aparecer = inject('aparecer')
const classificacao = ref('')
const dataLancamento = ref("")
const duracaoFilme = ref(null);
const notaFilme = ref("")
const inteiro = ref(0)
const decimal = ref(0)
const resto = ref(0)
watch(
  selecionados,
  () => {
    for (const selecionado of selecionados.value) {
      if (selecionado.title === filmeEscolhido.value.title) {
        aparecer.value = true
      }
    }
  },
  { deep: true },
)
const genres = ref([])
const generoCerto = ref([])

onMounted(async () => {
  const response = await api.get('genre/movie/list?language=pt-BR')
  genres.value = response.data.genres
})

watch(filmeEscolhido, async () => {
  generoCerto.value = []
  for (const generoId of filmeEscolhido.value.genre_ids) {
    for (const genre of genres.value) {
      if (genre.id === generoId) {
        generoCerto.value.push(genre.name)
      }
    }
  }
  try {
    const response = await api.get(`movie/${filmeEscolhido.value.id}/release_dates`)
    const resultados = response.data.results
    const br = resultados.find((pais) => pais.iso_3166_1 === 'BR')
    classificacao.value = br?.release_dates?.[0]?.certification || 'Sem classificação'
    console.log('Classificação indicativa:', classificacao.value)
  } catch (erro) {
    console.error('Erro ao buscar classificação:', erro)
  }
  try {
    const respFilme = await api.get(`movie/${filmeEscolhido.value.id}`)
    dataLancamento.value = respFilme.data.release_date
    duracaoFilme.value = respFilme.data.runtime;
    notaFilme.value = respFilme.data.vote_average

    const notaPraCinco = ((notaFilme.value * 5) / 10).toFixed(2)
    inteiro.value = Math.floor(notaPraCinco)
    decimal.value = notaPraCinco - inteiro.value
    resto.value = Math.floor(5 - decimal.value) - inteiro.value

    console.log("Data de lançamento:", dataLancamento.value)
  } catch (erro) {
    console.error("Erro ao buscar data de lançamento:", erro)
  }

})
onMounted(async () => {
  const response = await api.get(`movie/${filmeEscolhido.value.id}/release_dates`)
  const resultados = response.data.results
  const br = resultados.find((pais) => pais.iso_3166_1 === 'BR')
  const classificacao = br?.release_dates?.[0]?.certification || 'Sem classificação'
  console.log('Classificação indicativa:', classificacao)
})

function corDaClassificacao(classificacao) {
  return coresClassificacao[classificacao] || '#7f8c8d' // cinza
}
const coresClassificacao = {
  L: '#2ecc71', // verde
  10: '#3498db', // azul
  12: '#f1c40f', // amarelo
  14: '#e67e22', // laranja
  16: '#e74c3c', // vermelho
  18: '#000000', // preto
}
const formatDate = (date) => new Date(date
).toLocaleDateString('pt-BR')

function formatoHoras(minutos) {
  if (!minutos) return " "
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  return `${horas}h ${mins}min`;
}


</script>
<template>
  <div v-if="aparecer" class="vitoria">
    <h1 class="principal">Parabéns!</h1>
    <h2>
      Você decifrou o filme em <span>{{ selecionados.length }}</span> tentativas
    </h2>
    <div class="filme">
      <img :src="`https://image.tmdb.org/t/p/w342${filmeEscolhido.poster_path}`" alt="" />
      <div class="info">
        <h1 class="titulo">{{ filmeEscolhido.title }}</h1>
        <ul>
          <li v-for="(genero, index) in generoCerto" :key="genero.id">
            <h2>{{ genero }}</h2>
            <h2 v-if="index < generoCerto.length - 1">•</h2>
          </li>
        </ul>
        <div>
          <h2 class="classificacao" :style="{ backgroundColor: corDaClassificacao(classificacao) }">
            {{ classificacao }}
          </h2>
          <h2 v-if="dataLancamento">{{ formatDate(dataLancamento) }}</h2>
          <h2>{{ formatoHoras(duracaoFilme) }}</h2>
        </div>
        <div class="estrelas">
          <h2 v-for="i in inteiro" :key="i">
            <span class="mdi mdi-star"></span>
          </h2>
          <h2 v-if="decimal != 0">
            <span class="mdi mdi-star-half-full"></span>
          </h2>
          <h2 v-for="i in resto" :key="i">
            <span class="mdi mdi-star-outline"></span>
          </h2>
        </div>
      </div>

    </div>
    <router-link to="/">
    <div class="sair">
      <h2>Voltar ao menu inicial</h2>
      <span class="mdi mdi-home"></span>
    </div>
    </router-link>
  </div>
</template>
<style>
div.vitoria {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

div.vitoria h1.principal {
  font-size: 3rem;
}

div.vitoria h2 {
  color: white;
}

div.vitoria h2 span {
  color: #ffe100;
  font-size: 1.3rem;
}

div.vitoria div.filme {
  display: flex;
  gap: 2vw;
  position: relative;
}

div.vitoria div.filme img {
  border-radius: 16px;
  height: 20vw;
}

div.vitoria div.filme h1.titulo {
  font-size: 2rem;
  text-align: left;
  max-width: 20vw;
}

div.vitoria div.filme div.info ul {
  display: flex;
  color: white;
  gap: 0.5vw;
  max-width: 20vw;
}

div.vitoria div.filme div.info ul li {
  display: flex;
  gap: 0.5vw;
  color: white;
}

div.vitoria div.filme div.info ul li h2 {
  font-weight: bold;
  font-size: 1rem;
}

div.info div {
  display: flex;
  gap: 0.6vw;
  font-size: 0.7rem;
}

div.info div h2 {
  font-weight: bold;
}

div.info h2.classificacao {
  min-width: 1.9vw;
  text-align: center;
  font-weight: bold;
  border-radius: 4px;
  margin: 0;
}

div.info div.estrelas {
  gap: 0.5vw;
  margin: 0.8vw 0 0 0;
}

div.info div.estrelas h2 span {
  font-size: 2rem;
}

div.sair {
  width: 33vw;
  display: flex;
  align-items: center;
  gap: 0.2vw;
  margin: 0;
}
div.sair h2 {
  color: #ffe100;
  font-size: 1rem;
}
div.sair span {
  color: #ffe100;
  font-size: 1.2rem;
}
</style>
