const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existe = state.find(item => item.id === action.payload.id);
      if (existe) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, cantidad: 1 }];
      }
    }

    case 'INCREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload ? { ...item, cantidad: item.cantidad + 1 } : item
      );

    case 'DECREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export default cartReducer;
