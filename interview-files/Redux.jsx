const productSlice = {
  name: "Product Slice",
  initialState: {
    cartItem: [],
    totalPrice: 0,
  },
  reducer: {
    addItem: (state, action) => {
      state.cartItem = [...state.cartItem, action.payload];
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.cartItem = state.cartItem.filter((item) => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.cartItem = state.cartItem.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      );
    },
    applyCouponCode: (state, action) => {
      const { discount } = action.payload;
      let totalPrice = state.cartItem.reducer((acc, item) => {
        return acc + item.quantity * item.price;
      }, 0);
      state.totalPrice = totalPrice - discount;
    },
  },
};
