import {ref} from 'vue';
import api from '@/plugins/axios'
import {defineStore} from 'pinia'


export const useFilmesStore = defineStore('filmes', () => {

  const filmes = ref([])
  const filmeEscolhido = ref(null)
  const filmeEscolhido2 = ref(null)
  const isLoading = ref(false)
  async function carregarFilmeAleatorio() {

    isLoading.value = true
    const paginaAleatoria = Math.floor(Math.random() * 50)
    const response = await api.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${paginaAleatoria}&sort_by=popularity.desc&vote_count.gte=1500`
    )

    filmes.value = response.data.results

    const numAleatorio = Math.floor(Math.random() * filmes.value.length)
    const numAleatorio2 = Math.floor(Math.random() * filmes.value.length)
    filmeEscolhido.value = filmes.value[numAleatorio]
    filmeEscolhido2.value = filmes.value[numAleatorio2]



    const detalhes1 = await api.get(`/movie/${filmeEscolhido.value.id}?language=pt-BR`)
    const detalhes2 = await api.get(`/movie/${filmeEscolhido2.value.id}?language=pt-BR`)

    filmeEscolhido.value = detalhes1.data
    filmeEscolhido2.value = detalhes2.data
    isLoading.value = false
  }

  return {
    filmes,
    filmeEscolhido,
    filmeEscolhido2,
    carregarFilmeAleatorio,
    isLoading,
  }
})
