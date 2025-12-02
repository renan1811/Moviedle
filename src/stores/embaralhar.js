import { ref,watch } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import { useFilmesStore } from './searchbar' // para ler o "selecionados"

export const useEmbaralharStore = defineStore('embaralhar', () => {

  const filmes = ref([])
  const numAleatorio = ref(null)
  const selecionados = ref([])
const aparecer = ref(false)
  const filmeEscolhido = ref(null)
  const palavraEmbaralhada = ref([])

  const contador = ref(0)
  const isLoading = ref(false)

  const filmesStore = useFilmesStore()

  function embaralharPalavra(palavra) {
    let embaralhada = palavra
    while (embaralhada === palavra) {
      embaralhada = palavra
        .toLowerCase()
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('')
    }
    return embaralhada.split('')
  }
  async function gerarFilmeAleatorio() {
    isLoading.value = true
    const paginaAleatoria = Math.floor(Math.random() * 50)

    const response = await api.get(
      `/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${paginaAleatoria}&sort_by=popularity.desc&vote_count.gte=1500`
    )

    filmes.value = response.data.results
    numAleatorio.value = Math.floor(Math.random() * filmes.value.length)
    filmeEscolhido.value = filmes.value[numAleatorio.value]
    
    if (!filmeEscolhido.value?.title || filmeEscolhido.value.title.length < 2) {
    console.warn("Filme inválido, recarregando…")
    return gerarFilmeAleatorio()
  }
    palavraEmbaralhada.value = embaralharPalavra(filmeEscolhido.value.title)

    contador.value = 0
    isLoading.value = false
  }
  function verificarLetra() {
    if (!filmeEscolhido.value || !filmeEscolhido.value.title) {
  console.warn("Filme ainda não car regou!");
  return;
}
    const selecionados = filmesStore.selecionados

    if (selecionados.length === 0) return
    const letraCerta = filmeEscolhido.value.title[contador.value]

    for (let i = contador.value; i < palavraEmbaralhada.value.length; i++) {
      const letraEmbaralhada = palavraEmbaralhada.value[i]

      if (letraEmbaralhada.toLowerCase() === letraCerta.toLowerCase()) {
        const letra = palavraEmbaralhada.value.splice(i, 1)[0]
        palavraEmbaralhada.value.splice(contador.value, 0, letra)
        contador.value++
        break
      }
    }
  }

  watch(
    () => filmesStore.selecionados.length,
    () => verificarLetra()
  )
  return {
    filmes,
    numAleatorio,
    filmeEscolhido,
    palavraEmbaralhada,
    contador,
    gerarFilmeAleatorio,
    selecionados,
    aparecer,
    isLoading,
  }
})
