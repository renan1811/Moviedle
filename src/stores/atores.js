import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'
export const useAtoresStore = defineStore('atores', () => {
  const selecionados = ref([])   // guarda os palpites/tentativas
  const aparecer = ref(false)
  const atores = ref([])
  const filmeEscolhido = ref(null)
  const filmes = ref([])
  const numAleatorio = ref(null)
  const isLoading = ref(false)
  const cards = ref([
    { id: 1, name: '?', profile_path: null },
    { id: 2, name: '?', profile_path: null },
    { id: 3, name: '?', profile_path: null },
    { id: 4, name: '?', profile_path: null },
    { id: 5, name: '?', profile_path: null },
    { id: 6, name: '?', profile_path: null },
  ])

  async function carregarFilmeEElenco() {
    isLoading.value = true
    cards.value = [
      { id: 1, name: '?', profile_path: null },
      { id: 2, name: '?', profile_path: null },
      { id: 3, name: '?', profile_path: null },
      { id: 4, name: '?', profile_path: null },
      { id: 5, name: '?', profile_path: null },
      { id: 6, name: '?', profile_path: null },
    ]

    atores.value = []
    filmeEscolhido.value = null

    const paginaAleatoria = Math.floor(Math.random() * 50)
    const response = await api.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${paginaAleatoria}&sort_by=popularity.desc&vote_count.gte=1500`,
    )

    filmes.value = response.data.results
    numAleatorio.value = Math.floor(Math.random() * 20)
    filmeEscolhido.value = filmes.value[numAleatorio.value]

    try {
      const responseElenco = await api.get(
        `https://api.themoviedb.org/3/movie/${filmeEscolhido.value.id}/credits`,
      )

      const elencoCompleto = responseElenco.data.cast
      atores.value = elencoCompleto.slice(0, 6)
      if (atores.value[0]) {
        cards.value[0] = {
          id: cards.value[0].id,
          name: atores.value[0].name,
          profile_path: atores.value[0].profile_path,
        }
      }
    } catch (error) {
      console.error('Erro ao buscar elenco:', error)
    }
    isLoading.value = false
  }


  return {
    atores,
    filmeEscolhido,
    cards,
    carregarFilmeEElenco,
     selecionados,
     aparecer,
     isLoading,
  }
})
