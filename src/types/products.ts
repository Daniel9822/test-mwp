export interface ProductsInterface {
  qty: any;
  idProduct: number;
  productUuid: string;
  name: string;
  price: number;
  pack: Pack;
  description: string;
  form: string;
  material: string;
  size: string[];
  stock: boolean;
  imageUrl: string;
  uuidCategory: string;
  uuidTag?: string[];
  options?: string[];
  enableLink: boolean;
}

export interface Pack {
  [size: string]: {
    price: number;
    qty: number;
  }[];
}
