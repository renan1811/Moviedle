<script setup>
import '@mdi/font/css/materialdesignicons.min.css'
</script>
<template>
    <div>
        <h1>Nome do jogo</h1>
        <span class="mdi mdi-information-outline"></span>
    </div>
    <div class="informacoes">
        <h1>oiiiiiiiiiiii</h1>
    </div>
</template>
<style scoped>

div {
    display: flex;
    align-items: center;
    justify-content: center;

}
h1 {
    font-size: 2rem;
    color: white    ;
    font-weight: bold;
    margin: 0 1vw 0 0;
}
span {
    font-size: 2.5rem;
    color: #ffe100;
}
.informacoes {
    opacity: 0;
    background-color: white;
    color: white;
}
span:hover .informacoes{
    opacity: 1;
}
</style>