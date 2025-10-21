<script setup>
import { ref } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import '@mdi/font/css/materialdesignicons.css'

const myCarousel = ref(null)

const currentSlide = ref(0) 
const goToSlide = (index) => {
  if (myCarousel.value) {
    myCarousel.value.slideTo(index)
    currentSlide.value = index
  }
}
const slides = [
  { titulo: 'Decifre o filme', number: 1, subtitulo: 'Decifre através de carácteristicas do filme' },
  { titulo: 'Descubra o filme', number: 2, subtitulo: 'Descubra o filme através de dicas'},
  { titulo: 'Descubra pela imagem', number: 3, subtitulo: 'Descubra o filme pela imagem'},
  { titulo: 'Quem é mais famoso', number: 4, subtitulo: 'Adivinhe qual ator é mais famoso' },
  { titulo: 'Acerte pelo elenco', number: 5, subtitulo: 'Acerte o filme pelo elenco' },
]
</script>

<template>
    <Carousel
    ref="myCarousel"
    :items-to-show="3"
    snap-align="center"
    :wrap-around="true"
  >
    <Slide
      v-for="(slide, index) in slides"
      :key="index"
      @click="goToSlide(index)"
    >
      <li>
        <div v-if="currentSlide == index">
            <div class="card">
                <h1>1</h1>
                <span class="mdi mdi-play"></span>
            </div>
            <div>
                <h1>Moviedle: {{ slide.titulo }}</h1>
            <h2>{{ slide.subtitulo }}</h2>
            </div>
            
        </div>
        <div v-else>
            <h1>sla</h1>
        </div>
      </li>
    </Slide>
  </Carousel>
</template>

<style scoped>
div {
    color: white;
}
nav ul {
    display: flex;
    justify-content: center;
}

nav ul li {
    background-color: black;
    width: 15vw;
    height: 35vh;
    color: white;
    box-shadow: rgba(255, 255, 255, 0.35) 0px 5px 15px;
    margin: 1vw 1.5vw 1vw 1.5vw;
    border-radius: 14px;
}


nav ul li h2 {
    font-size: 1.5vw;
    font-weight: bold;
    margin-left: 0.5vw;
    margin-top: 1vw;
    width: 90%;
}

nav ul li h3 {
    font-size: 12vw;
    font-weight: bold;
    color: rgb(48, 45, 45);
    text-shadow:
        -2px -2px 0 #FFE100,
        2px -2px 0 #FFE100,
        -2px 2px 0 #FFE100,
        2px 2px 0 #FFE100;
    font-family: 'Outfit', sans-serif;
    color: black;
    font-family: 'Inter', sans-serif;
    position: relative;
    right: 3vw;
    bottom: 1vw;
    user-select: none;
}

nav ul li span h3 {
    top: 1.5vw;
}
</style>