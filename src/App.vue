<script setup lang="ts">
import { RouterView } from "vue-router";
import { useProductListStore } from "@/stores/product-list";
import { useTrolleyProductItemListStore } from "./stores/trolley-product-item-list";

const productListStore = useProductListStore();
const trolleyProductItemList = useTrolleyProductItemListStore();
onMounted(() => {
  productListStore.init();
  trolleyProductItemList.init();
});
</script>

<template>
  <n-notification-provider>
    <n-dialog-provider>
      <n-message-provider>
        <main>
          <n-h1>⛈️ 乌云商店</n-h1>
          <RouterView />
        </main>
      </n-message-provider>
    </n-dialog-provider>
  </n-notification-provider>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
