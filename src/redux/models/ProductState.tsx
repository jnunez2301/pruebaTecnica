import { Product } from "./Product";

export interface ProductState{
    data: Product[];
    loading: 'idle' | 'pending' | 'fullfilled' | 'rejected';
    error: string | null;
}