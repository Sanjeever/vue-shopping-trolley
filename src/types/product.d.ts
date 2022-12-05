interface ProductItem {
  id: number;
  name: string;
  price: number;
  imgUrl?: string;
}

interface TrolleyProductItem extends ProductItem {
  count: number;
  isDelete: boolean;
}
