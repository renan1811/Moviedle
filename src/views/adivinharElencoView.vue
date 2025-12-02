<script setup>
import { ref, provide } from 'vue';
import AtoresElencoComponent from '@/components/atoresElencoComponent.vue';
import NomeJogoComponent from '@/components/reutilizaveis/nomeJogoComponent.vue';
import SearchBarComponent from '@/components/reutilizaveis/searchBarComponent.vue';
import vitoriaComponent from '@/components/reutilizaveis/vitoriaComponent.vue';
import HeaderComponent from '@/components/reutilizaveis/HeaderComponent.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'


const aparecer = ref(false)
provide('aparecer', aparecer)
</script>
<template>
    <HeaderComponent />
    <div class="fundo">
<vitoriaComponent />
    <div v-if="aparecer == false">
        <NomeJogoComponent nome="Decifrar o filme" comoJogar="Seu objetivo é adivinhar o título do filme misterioso. Você começará com a pista de apenas 1 ator do elenco (que tem 6 no total). Após digitar sua resposta, se estiver incorreta, mais 1 ator será revelado como pista. O jogo continua, liberando um novo ator a cada tentativa, até que você acerte o filme." desc="Tente advinhar o filme com esse elenco: "/>
<AtoresElencoComponent />
<SearchBarComponent />
    </div>
    <div class="voltar">
      <router-link to="/">
        <p>voltar para a tela inicial <span><FontAwesomeIcon :icon="faHouse" class="icone"></FontAwesomeIcon> </span></p>
      </router-link>
    </div>
    </div>

</template>
<style scoped>
div.fundo {
 position: relative;
  width: 100%;
  height: 90vh;
  background-image: url('/images/fundo elenco.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
}

.voltar p{
  color: #004583;
  padding-bottom: 3vh;
  margin-left: 2vw;
  align-items: center;
  display: flex;
  font-size: 1.1rem;

}
div.voltar p span  {
  margin-left: 0.3vw;
  margin-bottom: 0.5vh;
  color: #004583;
  align-items: center;
  display: flex;
  font-size: 1.3rem;
}
</style>
