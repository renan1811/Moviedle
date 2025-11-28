import { ref } from 'vue'
import api from '@/plugins/axios'
import { defineStore } from 'pinia'

export const useFilmesStore = defineStore('searchbar', () => {
  const query = ref('')
  const resultados = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selecionados = ref([])

  function addSelecionado(filme) {
    const existe = selecionados.value.some(f => f.id === filme.id)
    if (!existe) {
      selecionados.value.unshift(filme) // adiciona no começo igual você fazia
    }
  }
  function removeSelecionado(id) {
    selecionados.value = selecionados.value.filter(f => f.id !== id)
  }
  async function buscarFilmes() {
    if (!query.value.trim()) {
      resultados.value = []
      return
    }
    loading.value = true
    error.value = null
    try {
      const resposta = await api.get('/search/movie', {
        params: {
          language: 'pt-BR',
          query: query.value
        }
      })
      resultados.value = resposta.data.results || []
    } catch (err) {
      console.error('Erro ao buscar filmes:', err)
      error.value = err
      resultados.value = []
    } finally {
      loading.value = false
    }
  }
  function limpar() {
    query.value = ''
    resultados.value = []
    error.value = null
  }
  return {
    query,
    resultados,
    loading,
    error,
    buscarFilmes,
    limpar,
    selecionados,
    addSelecionado,
    removeSelecionado
  }
})
