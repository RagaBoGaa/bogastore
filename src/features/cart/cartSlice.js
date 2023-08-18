import { createSlice } from "@reduxjs/toolkit";

function fetchFromLocalStorage() {
  const cartItems = localStorage.getItem("cart");
  if (cartItems) {
    return JSON.parse(localStorage.getItem("cart"));
  } else return [];
}

function storeToLocalStorage(data) {
  localStorage.setItem("cart", JSON.stringify(data));
}

const initialState = {
  cart: fetchFromLocalStorage(),
  itemsCount: 0,
  totalAmount: 0,
  isCartMessageOn: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemExist = state.cart.find(
        (item) => item.id === action.payload.id,
      );

      if (itemExist) {
        const copyCart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            const tempQnt = item.quantity + action.payload.quantity;
            const tempTotal = tempQnt * item.price;
            return {
              ...item,
              quantity: tempQnt,
              totalPrice: tempTotal,
            };
          } else {
            return item;
          }
        });
        state.cart = copyCart;
        storeToLocalStorage(state.cart);
      } else {
        state.cart.push(action.payload);
        storeToLocalStorage(state.cart);
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
    getCartTotal: (state) => {
      state.totalAmount = state.cart.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);

      state.itemsCount = state.cart.length;
    },
    toggleQuantity(state, action) {
      const tempCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          let tempQuant = item.quantity;
          let tempTotalPrice = item.totalPrice;

          if (action.payload.type === "inc") {
            tempQuant++;
            if (tempQuant === item.stock) tempQuant = item.stock;
            tempTotalPrice = tempQuant * item.discountPrice;
          }
          if (action.payload.type === "dec") {
            tempQuant--;
            if (tempQuant < 1) tempQuant = 1;
            tempTotalPrice = tempQuant * item.discountPrice;
          }
          return { ...item, quantity: tempQuant, totalPrice: tempTotalPrice };
        } else return item;
      });
      state.cart = tempCart;
    },
    cartMessageOn(state) {
      state.isCartMessageOn = true;
    },
    cartMessageOff(state) {
      state.isCartMessageOn = false;
    },
  },
});

export const getCartMessageStatus = (state) => state.cart.isCartMessageOn;
export const getAllCart = (state) => state.cart.cart;
export const getAllCartAmount = (state) => state.cart.itemsCount;
export const {
  addToCart,
  removeFromCart,
  clearCart,
  getCartTotal,
  toggleQuantity,
  cartMessageOn,
  cartMessageOff,
} = cartSlice.actions;
export default cartSlice.reducer;
