import { Product } from "./Product";

export interface ProductState{
    data: Product[];
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
}