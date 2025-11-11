<script setup>
import { inject, ref, watch, onMounted } from 'vue';
import api from '@/plugins/axios'
const selecionados = inject('selecionados')
const filmeEscolhido = inject('filmeEscolhido')
const aparecer = inject('aparecer')
const classificacao = ref('')
watch(selecionados, () => {
    for (const selecionado of selecionados.value) {
        if (selecionado.title === filmeEscolhido.value.title) {
            aparecer.value = true
        }
    }
}, { deep: true })
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
    const br = resultados.find(pais => pais.iso_3166_1 === 'BR')
    classificacao.value = br?.release_dates?.[0]?.certification || 'Sem classificação'
    console.log('Classificação indicativa:', classificacao.value)
  } catch (erro) {
    console.error('Erro ao buscar classificação:', erro)
  }
})
    onMounted(async () => {
    const response = await api.get(`movie/${filmeEscolhido.value.id}/release_dates`)
    const resultados = response.data.results
    const br = resultados.find(pais => pais.iso_3166_1 === 'BR')
    const classificacao = br?.release_dates?.[0]?.certification || 'Sem classificação'
    console.log('Classificação indicativa:', classificacao)
    })
</script>
<template>
    <div v-if="aparecer" class="vitoria">
        <h1 class="principal">Parabéns!</h1>
        <h2>Você decifrou o filme em <span>{{ selecionados.length }}</span> tentativas</h2>
        <div class="filme">
        <img :src="`https://image.tmdb.org/t/p/w342${filmeEscolhido.poster_path}`" alt="">
        <div class="info">
            <h1 class="titulo">{{ filmeEscolhido.title }}</h1>
                <ul>
                    <li v-for="(genero, index) in generoCerto" :key="genero.id">
                        <h2>{{ genero }}</h2>
                        <h2 v-if="index < generoCerto.length - 1">•</h2>
                    </li>
                </ul>
            <h2>{{ classificacao }}</h2>
        </div>
        </div>
    </div>
</template>
<style>
div.vitoria {
    display: flex;
    flex-direction: column;
    align-items: center;
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
}
div.vitoria div.filme img {
    border-radius: 16px;
    height: 20vw;
}
div.vitoria div.filme h1.titulo {
    font-size: 2rem;
    text-align: left;
    max-width: 26vw;
}

div.vitoria div.filme div.info ul {
    display: flex;
    color: white;
    gap: 0.5vw;
}

div.vitoria div.filme div.info ul li {
    display: flex;
    gap: 0.5vw;
    color: white;
}
</style>