<template>
  <div class="container">
    <n-card style="margin-bottom: 16px">
      <n-tabs type="line" animated>
        <n-tab-pane name="👑 首页" tab="👑 首页">
          <div class="inner-scroll">
            <Product-Item
              v-for="product in productList"
              :key="product.id"
              :name="product.name"
              :price="product.price"
              :imgUrl="product.imgUrl"
              :atProductListView="true"
              :atTrolleyView="false"
              :atManagerialView="false"
              @ready-to-buy="addToTrolley(product)"
            />
          </div>
        </n-tab-pane>

        <n-tab-pane name="🛒 购物车" tab="🛒 购物车">
          <div class="inner-scroll">
            <Product-Item
              v-for="trolleyProductItem in trolleyProductItemList.filteredTrolleyProductItemList"
              :key="trolleyProductItem.id"
              :name="trolleyProductItem.name"
              :price="trolleyProductItem.price"
              :imgUrl="trolleyProductItem.imgUrl"
              :trolleyProductItemCount="trolleyProductItem.count"
              :atProductListView="false"
              :atTrolleyView="true"
              :atManagerialView="false"
              @delete-from-trolley="deleteFromTrolley(trolleyProductItem)"
            />
          </div>
          <n-p>总价 : {{ trolleyProductItemList.totalPrice }}</n-p>
          <n-button tertiary round @click="settle">结算</n-button>
        </n-tab-pane>

        <n-tab-pane name="🖖 添加商品" tab="🖖 添加商品">
          <div class="inner-scroll">
            <ManagerialView />
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>

    <n-space justify="center">
      <n-tag :color="{ color: '#42d392', textColor: '#213547' }" round>
        Vue
      </n-tag>
      <n-tag :color="{ color: '#747bff', textColor: '#edeeff' }" round>
        Vite
      </n-tag>
      <n-tag :color="{ color: '#3178c6', textColor: '#eee' }" round>
        TypeScript
      </n-tag>
      <n-tag :color="{ color: '#254a7b', textColor: '#fff' }" round>
        Less
      </n-tag>
      <n-tag :color="{ color: '#f7d336', textColor: '#463e50' }" round>
        Pinia
      </n-tag>
      <n-tag :color="{ color: '#5fbc21', textColor: '#eaeaeb' }" round>
        Naive UI
      </n-tag>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { useProductListStore } from "@/stores/product-list";
import { useTrolleyProductItemListStore } from "@/stores/trolley-product-item-list";
import { useMessage, useNotification } from "naive-ui";

const productListStore = useProductListStore();
const { productList } = productListStore;
const trolleyProductItemList = useTrolleyProductItemListStore();
const message = useMessage();
const notification = useNotification();

function changeCount(trolleyProductItem: TrolleyProductItem, event: Event) {
  const newVal = (<HTMLInputElement>event.target).value;
  trolleyProductItemList.changeCount(trolleyProductItem.id, parseInt(newVal));
}

function addToTrolley(product: ProductItem) {
  trolleyProductItemList.addProduct(product);
  message.success(`添加 ${product.name} 到购物车成功`);
}

function deleteFromTrolley(trolleyProductItem: TrolleyProductItem) {
  trolleyProductItemList.deleteProduct(trolleyProductItem);
  message.warning(`从购物车删除 ${trolleyProductItem.name} 成功`);
}

function settle() {
  notification["success"]({
    content: "结算成功",
    meta: "TODO: https://github.com/Sanjeever/vue-shopping-trolley",
    duration: 2500,
    keepAliveOnHover: true,
  });
}
</script>

<style scoped lang="less">
.inner-scroll {
  overflow-y: scroll;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
  &:-webkit-scrollbar {
    width: 0 !important;
  }
  &:hover {
    scrollbar-color: auto;
    scrollbar-track-color: auto;
    -ms-scrollbar-track-color: auto;
  }
  display: block;
  width: auto;
  max-height: 71vh;
  overflow: auto;
  overscroll-behavior: contain;
  -ms-scroll-chaining: contain;
}
.container {
  max-width: 60vw;
  display: flex;
  flex-direction: column;
  > .n-h3 {
    flex: 1;
    text-align: center;
  }
}

/* .n-card {
  max-width: 60vw;
} */
</style>
