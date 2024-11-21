import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    loading: false,   // 로딩 상태
    modalOpen: false, // 모달 상태
    menuActive: false // 메뉴 활성화 상태
  }),
  actions: {
    setLoading(isLoading) {
      this.loading = isLoading;
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleMenu() {
      this.menuActive = !this.menuActive;
    }
  }
});
