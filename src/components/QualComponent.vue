<script setup>
import { ref, provide, onMounted, computed } from 'vue'
import { useFilmesStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

const router = useRouter()


const selecionados = ref([])
provide('selecionados', selecionados)

const filmeEscolhido = ref("")
provide('filmeEscolhido', filmeEscolhido)

const filmeEscolhido2 = ref("")
provide('filmeEscolhido2', filmeEscolhido2)

const aparecer = ref(false)
provide('aparecer', aparecer)




const store = useFilmesStore()

const clicou = ref(false)

const isCorrect = ref(null)

const contador = ref(0)

const isLoading = ref(true)



onMounted(() => {
  store.carregarFilmeAleatorio()
})

const custo1 = computed(() => store.filmeEscolhido?.budget || 0)
const custo2 = computed(() => store.filmeEscolhido2?.budget || 0)

function formatCurrency(value) {
  if (typeof value !== 'number' || value === 0) {
    return 'N/A'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const custo1Dolar = computed(() => formatCurrency(custo1.value))
const custo2Dolar = computed(() => formatCurrency(custo2.value))


const Custo1Maior = computed(() => custo1.value >= custo2.value)
const Custo2Maior = computed(() => custo2.value >= custo1.value)


const filmesiguais = computed(() => {
    return store.filmeEscolhido?.id &&
           store.filmeEscolhido2?.id &&
           store.filmeEscolhido.id === store.filmeEscolhido2.id
})

const custozero = computed(() => {
    return custo1.value <= 0 || custo2.value <= 0
})

async function loadUniqueFilms() {

    isLoading.value = true

    await store.carregarFilmeAleatorio()

    while (filmesiguais.value || custozero.value) {
        console.log("Filmes iguais, recarregando...")
        await store.carregarFilmeAleatorio()
    }

    isLoading.value = false
}


onMounted(() => {
  loadUniqueFilms()
})

function resetGame() {
    clicou.value = false
    isCorrect.value = null


    loadUniqueFilms()
}



function clicar(filmeId) {

    if (clicou.value) return

    clicou.value = true


    let escolhaCorreta = false

    if (filmeId === 1) {

        escolhaCorreta = Custo1Maior.value
    } else if (filmeId === 2) {

        escolhaCorreta = Custo2Maior.value
    }

    isCorrect.value = escolhaCorreta


    if (isCorrect.value){
        contador.value +=1
    }



    setTimeout(() => {
      if (isCorrect.value) {

            resetGame()
        } else {

            router.push({ name: 'Derrota', params: { score: contador.value } })
        }
    }, 3000)
}





</script>

<template>
  <div class="bigger">
  <div>
  <div v-if="isLoading" class="loading-screen">
      <h1>Carregando Filmes...</h1>
    </div>

  <div v-else>
    <div class="maior">

      <div class="jorge" v-if="store.filmeEscolhido" @click="clicar(1)">
        <img :src="`https://image.tmdb.org/t/p/w185${store.filmeEscolhido.poster_path}`" alt="imagem do filme">
        <div class="texto"><span>{{ store.filmeEscolhido.title }}</span></div>
        <div v-if="clicou" :class="{ 'maior-custo': Custo1Maior, 'menor-custo': Custo2Maior}">{{ custo1Dolar }}</div>
      </div>


      <div v-if="clicou" class="resultado-container">
        <div :class="['bola', isCorrect ? 'bola-verde' : 'bola-vermelha']">
        <FontAwesomeIcon v-if="isCorrect" :icon="faCheck" class="icone-resultado" />
        <FontAwesomeIcon v-else :icon="faXmark" class="icone-resultado" />
        </div>
      </div>


      <div class="jorge" v-if="store.filmeEscolhido2" @click="clicar(2)">
        <img :src="`https://image.tmdb.org/t/p/w185${store.filmeEscolhido2.poster_path}`" alt="imagem do filme">
        <div class="texto"><span>{{ store.filmeEscolhido2.title }}</span></div>
        <div v-if="clicou" :class="{ 'maior-custo': Custo2Maior, 'menor-custo': Custo1Maior}">{{ custo2Dolar}}</div>
      </div>
    </div>
    </div>

    <div class="score">
      <p>score atual:</p>
      <p class="con">{{ contador }}</p>
    </div>
    </div>
  </div>


</template>

<style scoped>
.jorge {
 display: flex;
  flex-direction: column;
  margin: 4vw;
  align-items: center;
  width: 18vw;
}

.maior {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.jorge img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  flex-shrink: 0;
}
.jorge .texto{
 margin-top: 2vh;
 border-top: #004583 3px solid;

 font-size: 1.5rem;
}
.jorge span {
  font-size: 1.2rem;
  font-weight: 700;
  font-family: arimo, sans-serif;
  color: black;
   text-align: center;
  word-break: break-word;
  display: block;
}

.bigger {
  display: flex;
  flex-direction:column ;
  align-items: center;
  margin-bottom: 10vh;
}
.score{
  display: flex;
  flex-direction:column ;
  align-items: center;
}

.maior-custo {
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 1.3rem;
  margin-top: 2vh;
  background-color: green;
  padding: 0.2vw;
  border-radius: 10px;
}

.menor-custo {
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 1.3rem;
  margin-top: 2vh;
  background-color: red;
  padding: 0.2vw 0.3vw;
  border-radius: 10px;
}

.resultado-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 4vw;
}

.bola {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icone-resultado {
  font-size: 30px;
  font-weight: bold;
  color: black;
}

.bola-verde {
  background-color: #4CAF50;
}

.bola-vermelha {
  background-color: #F44336;
}

.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  font-size: 2em;
  color: #333;
}
.score{
  color: black;
  font-size: 1.1rem;
}

.score .con{
  color: #004583;
  font-size: 1.5rem;
  font-weight: bold;

}
</style>
