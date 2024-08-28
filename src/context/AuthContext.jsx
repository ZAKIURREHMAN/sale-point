import { createContext, useState, useEffect } from "react";
import { fetchData } from "../component/Services/ApiServices";

export const counterContext = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [handelSuggestions, setHandelSuggestions] = useState(false);
  const [handelValue, setHandelValue] = useState();
  const [handelItem, setHandelItem] = useState([]);
  const [quantityNumber, setQuantityNumber] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let result = await fetchData()
        setData(result)
      } catch{
        alert('we are facing some errors')
      }
    };
    getData();
  }, []);

  return (
    <counterContext.Provider
      value={{
        data: data,
        setData: setData,
        handelSuggestions: handelSuggestions,
        setHandelSuggestions: setHandelSuggestions,
        handelValue: handelValue,
        setHandelValue: setHandelValue,
        handelItem: handelItem,
        setHandelItem: setHandelItem,
        cartItems: cartItems,
        setCartItems: setCartItems,
        quantityNumber: quantityNumber,
        setQuantityNumber: setQuantityNumber,
      }}
    >
      {children}
    </counterContext.Provider>
  );
};
