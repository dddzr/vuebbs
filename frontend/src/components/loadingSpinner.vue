<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p>로딩 중...</p>
  </div>
</template>
  
<style scoped>
  .loading-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
    font-size: 1.5rem;
    color: #007bff;
  }
  
  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
  