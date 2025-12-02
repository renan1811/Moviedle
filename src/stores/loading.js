import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref(false)

  function start() {
    loading.value = true
  }

  function stop() {
    loading.value = false
  }

  return {
    loading,
    start,
    stop
  }
})
