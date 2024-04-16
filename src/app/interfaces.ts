export interface ProductDetails {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }
  
  export interface ProductList {
    products: ProductDetails[];
    total: number;
    skip: number;
    limit: number;
    totalPages?: number;
  }