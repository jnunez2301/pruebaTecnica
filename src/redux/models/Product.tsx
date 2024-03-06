import { Image } from "./Image";

export interface Product{
    id:number;
    title:string;
    price:number;
    stock:number;
    brand:string;
    category:string;
    thumbnail:string;
}