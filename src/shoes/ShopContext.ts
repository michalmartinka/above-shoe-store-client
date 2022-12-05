import { createContext } from "react";
import { Shoe } from "./Shoe";

export const ShopContext = createContext({
    basket: new Array<{shoe: Shoe, size: number}>(),
    setBasket: (basket: {shoe: Shoe, size: number}[]) => {}
});

