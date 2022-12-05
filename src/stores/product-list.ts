import { ref, computed } from "vue";
import { defineStore } from "pinia";
export const useProductListStore = defineStore("product-list", () => {
  const productList: ProductItem[] = reactive([]);

  function init() {
    const productListString = window.localStorage.getItem("product-list");
    if (productListString) {
      productList.push(...JSON.parse(productListString));
    } else {
      productList.push(
        ...[
          {
            id: 1,
            name: "Spring Boot + Vue.js + 分布式组件全栈开发训练营 (视频教学版)",
            price: 49.8,
            imgUrl: "https://pic.imgdb.cn/item/638dc185b1fccdcd36721321.jpg",
          },
          {
            id: 2,
            name: "深入理解 Java 虚拟机（第 3 版） : JVM 高级特性与最佳实践",
            price: 101.9,
            imgUrl: "https://pic.imgdb.cn/item/638dc1bfb1fccdcd367280d4.jpg",
          },
        ]
      );
    }
  }

  return { productList, init };
});
