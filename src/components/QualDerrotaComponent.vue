<script setup>

</script>

<template>
<h1>Voce Perdeu!</h1>
<div class="tentar">
      <router-link to="/qual">
        <p>Tentar Novamete</p>
      </router-link>
    </div>
<div class="voltar">
      <router-link to="/">
        <p>voltar para a tela inicial</p>
      </router-link>
    </div>
</template>

<style scuped>
.voltar p{
  color: #ffe100;
  padding-bottom: 3vh;
  margin-left: 2vw;
}
.tentar p{
  color: #ffe100;
  padding-bottom: 3vh;
  margin-left: 2vw;
}

</style>
