// stores/loadingStore.js
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false, // 로딩 상태
  }),

  actions: {
    setLoading(loading) {
      this.isLoading = loading; // 로딩 상태 변경
    },
  },
});
