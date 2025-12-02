<script setup>
import HeaderComponent from './reutilizaveis/HeaderComponent.vue';
import { defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'


const props = defineProps({
  score: {
    type: [Number, String],
    required: true
  }
});


</script>

<template>
  <HeaderComponent />
  <div class="total">
    <h1 class="derrota">Voce Perdeu!</h1>
    <h2>seu score:<span>{{ props.score }}</span></h2>
    <div class="tentar">
      <router-link to="/qual">
        <p>Tentar Novamete</p>
      </router-link>
    </div>
    <div class="voltar">
      <router-link to="/">
        <p>voltar para a tela inicial<span><FontAwesomeIcon :icon="faHouse" class="icone"></FontAwesomeIcon></span></p>
      </router-link>
    </div>
  </div>
</template>

<style scuped>
.voltar p{
  color: #004583;
  padding-bottom: 3vh;
  font-size: 1.1rem;
}
.tentar p{
  color: #004583;
  padding-bottom: 2vh;
  font-size: 1.1rem;

}
.total{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.derrota{
  margin: 2vw;
    font-size: 3.5rem;
    font-weight: bold;
    color: #f44636;
    text-align: center;
}
h2{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #004583;
}
h2 span{
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 6vh;
}
.voltar span{
  margin-left: 0.5vw;
}

</style>
