import useLocalStorageState from 'use-local-storage-state';

function useCart() {
  // Initialize with a default value and key
  const [cartItems, setCartItems] = useLocalStorageState('cartItems', { defaultValue: [] });

  const addItemToCart = (newItem) => {
    console.log("newItem",newItem)
    setCartItems((prevItems) => [...prevItems, newItem]);
  };
  const removeItemToCart = (id) => {
    console.log("remove",id)

    setCartItems((prevItems) => prevItems.filter(item=>item.id !==id));
  };
  const incrementToCart = (id) => {
    setCartItems((prevItems) => prevItems.map(item=>item.id ===id? { ...item, quantity: Math.min(10, (item.quantity || 1) + 1) }:item));

  }
  const decrementToCart = (id) => {
    setCartItems((prevItems) => prevItems.map(item=>item.id ===id? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }:item));

  }
  return {
    cartItems,
    addItemToCart,removeItemToCart,incrementToCart,decrementToCart
  };
}

export default useCart;
