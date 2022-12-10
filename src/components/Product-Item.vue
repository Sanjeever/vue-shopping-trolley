<template>
  <div>
    <n-card :bordered="false">
      <n-space>
        <n-image
          fallback-src="https://www.sakuras.cyou/logo.png"
          width="100"
          :src="imgUrl"
        />
        <n-space vertical justify="space-around">
          <n-h3>{{ name }}</n-h3>
          <n-p>
            <span>¥ {{ price }}</span
            ><span>
              <div class="atProductListView" v-show="atProductListView">
                <n-button quaternary @click="$emit('ready-to-buy')">
                  🛒
                </n-button>
              </div>

              <div class="atTrolleyView" v-show="atTrolleyView">
                <span>数量：{{ trolleyProductItemCount }}</span>
                <n-button
                  strong
                  secondary
                  type="error"
                  @click="$emit('delete-from-trolley')"
                >
                  删除
                </n-button>
              </div>
              <div class="atManagerialView" v-show="atManagerialView">
                <n-button quaternary @click="$emit('delete-from-product-list')">
                  🗑️
                </n-button>
              </div>
            </span></n-p
          >
        </n-space>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  name: string;
  price: number;
  imgUrl?: string;
  trolleyProductItemCount?: number;
  atProductListView?: boolean;
  atTrolleyView?: boolean;
  atManagerialView?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  atProductListView: false,
  atTrolleyView: false,
  atManagerialView: false,
});

const emit = defineEmits<{
  (e: "ready-to-buy", product: ProductItem): void;
  (e: "delete-from-product-list", product: TrolleyProductItem): void;
}>();
</script>

<style scoped lang="less">
.n-p {
  display: flex;
  span {
    display: flex;
    align-items: center;
  }
}
.n-space {
  min-height: 100%;
}

.n-h.n-h3 {
  max-width: 30ch;
}

.atProductListView,
.atManagerialView {
  display: inline-flex;
  .n-button {
    margin: 5px;
  }
}

.atTrolleyView {
  display: inline-flex;
  .n-input-number {
    margin: 0 20px 0 20px;
    display: inline-flex;
    width: 25%;
  }
  * {
    margin: 5px;
    align-items: center;
  }
}
</style>
