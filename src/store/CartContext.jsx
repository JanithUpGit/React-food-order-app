import { createContext, useReducer } from "react";

// Initial context structure, primarily for autocompletion and clarity
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items]; // Always create a new array to avoid direct state mutation

    if (existingCartItemIndex > -1) {
      const updatedItem = {
        ...state.items[existingCartItemIndex],
        quantity: state.items[existingCartItemIndex].quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; // Correct assignment
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    console.log({ ...state, items: updatedItems });
    return { ...state, items: updatedItems };

    
  } else if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // If item not found, just return the current state
    if (existingCartItemIndex === -1) {
      return state;
    }

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items]; // Always create a new array

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1); // Correct splice usage
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;

    }
    return {...state,items:updatedItems};
  }
 
  return state; // Return current state for unknown actions
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
     
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  // Use a different variable name to avoid shadowing the imported CartContext
  const cartContextValue = {
    items: cartState.items,
    addItem: addItem,
    removeItem: removeItem,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;