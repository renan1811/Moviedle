<script setup>
import { inject, ref, watch, onMounted, computed } from 'vue'
import api from '@/plugins/axios'
import { useAtoresStore } from '@/stores/atores'
import { useEmbaralharStore } from '@/stores/embaralhar'
import { useFilmesStore as useSearchStore } from '@/stores/searchbar' 
import { useFilmesStore as useTargetStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

// Stores dos jogos
const atoresStore = useAtoresStore()
const embaralharStore = useEmbaralharStore()
const search = useSearchStore()
const targetStore = useTargetStore()


const { filmeEscolhido: filmeCards } = storeToRefs(atoresStore)
const { filmeEscolhido: filmeEmbaralhar } = storeToRefs(embaralharStore)
const { selecionados } = storeToRefs(search)


const { filmeEscolhido: filmeImage } = storeToRefs(targetStore)


const filmeAtual = computed(() => filmeCards.value || filmeEmbaralhar.value || filmeImage.value)

// Variáveis de exibição do componente
const aparecer = inject('aparecer')
const classificacao = ref('')
const dataLancamento = ref('')
const duracaoFilme = ref(null)
const notaFilme = ref('')
const inteiro = ref(0)
const decimal = ref(0)
const resto = ref(0)
const tentativas = ref(0)
const genres = ref([])
const generoCerto = ref([])

// Carrega lista de gêneros
onMounted(async () => {
  const response = await api.get('genre/movie/list?language=pt-BR')
  genres.value = response.data.genres
})

// Watch para exibir vitória
watch(
  selecionados,
  (novoValor) => {
    if (!filmeAtual.value) return

    for (const selecionado of novoValor) {
      if (selecionado.title === filmeAtual.value.title) {
        aparecer.value = true
        tentativas.value = novoValor.length  // guarda o número de tentativas
        selecionados.value = []              // limpa depois
        console.log('VITÓRIA! filme:', filmeAtual.value.title)
        break
      }
    }
  },
  { deep: true }
)

// Watch para atualizar informações do filme
watch(filmeAtual, async () => {
  if (!filmeAtual.value) return

  // Gêneros
  generoCerto.value = []
  for (const generoId of filmeAtual.value.genre_ids) {
    const genre = genres.value.find(g => g.id === generoId)
    if (genre) generoCerto.value.push(genre.name)
  }

  // Classificação indicativa
  try {
    const response = await api.get(`movie/${filmeAtual.value.id}/release_dates`)
    const br = response.data.results.find(p => p.iso_3166_1 === 'BR')
    classificacao.value = br?.release_dates?.[0]?.certification || 'Sem classificação'
  } catch (erro) {
    console.error('Erro ao buscar classificação:', erro)
  }

  // Data de lançamento, duração e nota
  try {
    const respFilme = await api.get(`movie/${filmeAtual.value.id}`)
    dataLancamento.value = respFilme.data.release_date
    duracaoFilme.value = respFilme.data.runtime
    notaFilme.value = respFilme.data.vote_average

    const notaPraCinco = ((notaFilme.value * 5) / 10).toFixed(2)
    inteiro.value = Math.floor(notaPraCinco)
    decimal.value = notaPraCinco - inteiro.value
    resto.value = Math.floor(5 - decimal.value) - inteiro.value
  } catch (erro) {
    console.error('Erro ao buscar detalhes do filme:', erro)
  }
})

// Funções auxiliares
const coresClassificacao = {
  L: '#2ecc71', 10: '#3498db', 12: '#f1c40f',
  14: '#e67e22', 16: '#e74c3c', 18: '#000000',
}
function corDaClassificacao(classificacao) {
  return coresClassificacao[classificacao] || '#7f8c8d'
}
const formatDate = date => new Date(date).toLocaleDateString('pt-BR')
function formatoHoras(minutos) {
  if (!minutos) return ''
  const horas = Math.floor(minutos / 60)
  const mins = minutos % 60
  return `${horas}h ${mins}min`
}
</script>

<template>
  <div v-if="aparecer" class="vitoria">
    <h1 class="principal">Parabéns!</h1>
    <h2>
      Você decifrou o filme em <span class="tentativas">{{ tentativas }}</span> tentativas
    </h2>

    <div class="filme" v-if="filmeAtual">
      <img :src="`https://image.tmdb.org/t/p/w342${filmeAtual.poster_path}`" alt="" />
      <div class="info">
        <h1 class="titulo">{{ filmeAtual.title }}</h1>
        <ul>
          <li v-for="(genero, index) in generoCerto" :key="index">
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
          <h2 v-for="i in inteiro" :key="i"><span class="mdi mdi-star"></span></h2>
          <h2 v-if="decimal != 0"><span class="mdi mdi-star-half-full"></span></h2>
          <h2 v-for="i in resto" :key="i"><span class="mdi mdi-star-outline"></span></h2>
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

<style scoped>
div.vitoria { display: flex; flex-direction: column; align-items: center; margin: 0; }
div.vitoria h1.principal { font-size: 3rem; color: black; font-weight: bold; }
div.vitoria h2 { color: black; }
div.vitoria h2 span.tentativas { color: #004583; font-size: 1.3rem; font-weight: bold; }
div.vitoria div.filme { display: flex; gap: 2vw; margin-top: 2vw; }
div.vitoria div.filme img { border-radius: 16px; height: 20vw; }
div.vitoria div.filme h1.titulo { font-size: 2rem; text-align: left; font-weight: bold; max-width: 20vw; color: black; }
div.info { margin-top: 2vw; }
div.info ul { display: flex; color: black; gap: 0.5vw; max-width: 20vw; }
div.info ul li { display: flex; gap: 0.5vw; color: white; }
div.info ul li h2 { font-weight: bold; font-size: 1rem; }
div.info div { display: flex; gap: 0.6vw; font-size: 0.7rem; margin-top: 2vw; }
div.info h2.classificacao { color: black; min-width: 1.9vw; text-align: center; font-weight: bold; border-radius: 4px; margin: 0; }
div.info div.estrelas { gap: 0.5vw; margin: 0.8vw 0 0 0; color: #004583; }
div.info div.estrelas h2 span { font-size: 2rem; color: #004583; }
div.sair { width: 33vw; display: flex; align-items: center; gap: 0.2vw; margin: 0; }
div.sair h2 { color: #004583; font-weight: bold; font-size: 1rem; }
div.sair span { color: #004583; font-size: 1.2rem; }
</style>
