<template>
  <div>
    <Product-Item
      :name="productItemForm.name"
      :price="productItemForm.price"
      :imgUrl="productItemForm.imgUrl"
    />
    <n-form>
      <n-form-item label="商品名">
        <n-input
          type="text"
          v-model:value="productItemForm.name"
          round
          clearable
        />
      </n-form-item>
      <n-form-item label="单价">
        <n-input-number v-model:value="productItemForm.price" :min="0.01">
          <template #prefix> ￥ </template>
        </n-input-number>
      </n-form-item>
      <n-form-item label="商品图">
        <input
          type="file"
          accept="image/png, image/jpeg"
          @change="uploadImageHandle"
        />
      </n-form-item>
      <n-form-item label="商品图链接">
        <n-input
          type="text"
          v-model:value="productItemForm.imgUrl"
          :disabled="active"
          round
          clearable
        />
      </n-form-item>
      <n-button tertiary round @click="addToProductList"> 添加 </n-button>
      <n-button tertiary round type="error" @click="cleanForm"> 清空</n-button>
      <n-button tertiary round type="warning" @click="resetAll">
        重置所有</n-button
      >
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useProductListStore } from "@/stores/product-list";
import * as _ from "lodash";
const productListStore = useProductListStore();
const { productList } = productListStore;
const message = useMessage();
const active = ref(false);

const initialProductItemForm: ProductItem = {
  id: -1,
  name: "",
  price: 0.01,
  imgUrl: "https://pic.imgdb.cn/item/638dc205b1fccdcd3672ee3b.png",
};

const productItemForm = ref<ProductItem>({ ...initialProductItemForm });

function addToProductList() {
  if (productItemForm.value.name === "") {
    message.warning("商品名称不能为空");
    return;
  }
  const dto = _.cloneDeep(productItemForm.value);
  dto.id = productList.length + 1;
  productList.push(dto);
  window.localStorage.setItem("product-list", JSON.stringify(productList));
  cleanForm();
  message.success(`添加 ${dto.name} 到商品列表`);
}

function cleanForm() {
  productItemForm.value = { ...initialProductItemForm }
  active.value = false;
}

function resetAll() {
  window.localStorage.removeItem("product-list");
  window.localStorage.removeItem("trolley-product-item-list");
  window.location.reload();
}

function uploadImageHandle(event: Event) {
  const inputElement = <HTMLInputElement>event.target;
  const file = inputElement.files![0];
  const MAX_SIZE = 1024 * 1024 * 2;
  const accept = ["image/jpeg", "image/png"];
  const isImage = accept.includes(file.type);
  if (!isImage) {
    message.error("仅支持 jpeg 和 png 格式的图片");
    inputElement.value = "";
    return;
  }
  if (file.size <= MAX_SIZE) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener(
      "loadend",
      (event: ProgressEvent<FileReader>) => {
        const base64 = event.target?.result;
        productItemForm.value.imgUrl = base64 as string;
        inputElement.value = "";
        if (active.value === false) {
          active.value = true;
        }
      }
    );
  } else {
    message.error("上传图片过大，最大 2M");
    inputElement.value = "";
  }
}
</script>

<style scoped lang="less">
.n-form {
  .n-button {
    margin: 0 5px 0 5px;
  }
}
</style>
