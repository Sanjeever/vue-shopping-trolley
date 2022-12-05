import { defineStore } from "pinia";

export const useTrolleyProductItemListStore = defineStore(
  "trolley-product-item-list",
  () => {
    const trolleyProductItemList: TrolleyProductItem[] = reactive([]);

    function init() {
      const trolleyProductItemListString = window.localStorage.getItem(
        "trolley-product-item-list"
      );
      if (trolleyProductItemListString) {
        trolleyProductItemList.push(
          ...JSON.parse(trolleyProductItemListString)
        );
      }
    }

    function addProduct(productItem: ProductItem) {
      for (let i = 0; i < trolleyProductItemList.length; i++) {
        const trolleyProductItem = trolleyProductItemList[i];
        if (
          trolleyProductItem.id === productItem.id &&
          trolleyProductItem.isDelete === false
        ) {
          trolleyProductItem.count++;
          persistence();
          return;
        }
      }
      trolleyProductItemList.push({
        ...productItem,
        count: 1,
        isDelete: false,
      });
      persistence();
    }

    function changeCount(trolleyProductItemId: number, count: number) {
      for (let i = 0; i < trolleyProductItemList.length; i++) {
        const trolleyProductItem = trolleyProductItemList[i];
        if (
          trolleyProductItem.id === trolleyProductItemId &&
          trolleyProductItem.isDelete === false
        ) {
          trolleyProductItem.count = count;
          persistence();
          return;
        }
      }
    }

    function deleteProduct(productItem: ProductItem) {
      trolleyProductItemList.forEach((item) => {
        if (item.id === productItem.id) {
          item.isDelete = true;
          persistence();
          return;
        }
      });
    }

    function persistence() {
      window.localStorage.setItem(
        "trolley-product-item-list",
        JSON.stringify(trolleyProductItemList)
      );
    }

    const filteredTrolleyProductItemList = computed(() => {
      return trolleyProductItemList.filter((item) => item.isDelete === false);
    });

    const totalPrice = computed(() => {
      let ret = 0;
      filteredTrolleyProductItemList.value.forEach((item) => {
        ret += item.price * item.count;
      });
      return Math.round(ret * 100) / 100;
    });

    return {
      init,
      addProduct,
      deleteProduct,
      changeCount,
      totalPrice,
      filteredTrolleyProductItemList,
    };
  }
);
