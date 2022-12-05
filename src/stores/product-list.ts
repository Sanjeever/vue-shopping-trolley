import { ref, computed } from "vue";
import { defineStore } from "pinia";
import springBootVueUrl from "@/assets/product/image/SpringBoot-Vue.jpg";
import jvmUrl from "@/assets/product/image/In-depth understanding of the Java Virtual Machine.jpg";
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
            imgUrl: springBootVueUrl,
          },
          {
            id: 2,
            name: "深入理解 Java 虚拟机（第 3 版） : JVM 高级特性与最佳实践",
            price: 101.9,
            imgUrl: jvmUrl,
          },
        ]
      );
    }
  }

  return { productList, init };
});
