import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    isLoading: false,  // 로딩 상태
    modalOpen: false,  // 모달 상태
    menuActive: false, // 메뉴 활성화 상태
    darkMode: false,
    language: 'ko',
  }),
  actions: {
    setIsLoading(isLoading) {
      this.isLoading = isLoading;
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleMenu() {
      this.menuActive = !this.menuActive;
    }
  }
});
