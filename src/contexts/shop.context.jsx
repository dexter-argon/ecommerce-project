import { createContext, useState, useEffect } from "react";
import PRODUCTS from "../shop-data.json";

// as the actual value you want to access
export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  //   useEffect(() => {
  //     });
  //     // return unsubscribe;
  //   }, []);
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
