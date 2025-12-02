<script setup>
import {ref, onMounted} from 'vue';
import api from '@/plugins/axios'

const genres = ref([]);

onMounted(async () => {
    const response = await api.get('genre/movie/list?language=pt-BR');
    genres.value = response.data.genres; 
});
</script>

<template>
    <section>
        <h1>Generos</h1>

        <ul>
            <li v-for="genero in genres" :key="genero.id">
                {{ genero.name }}
            </li>
        </ul>
    </section>
</template>