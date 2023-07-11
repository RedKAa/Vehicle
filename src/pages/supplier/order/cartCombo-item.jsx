import React from 'react';
import CartItem from './cart-item';

import './style.css';

const CartComboItem = ({ item }) => {
  const lang = 'vn';

  const {
    product_name,
    product_name_en,
    quantity,
    products = [],
    combos = [],
    product_id,
    final_amount,
    is_current_combo,
  } = item ?? {};
  return (
    <div>
      <p className="cart__item-name">
        {lang === 'vn' ? product_name : product_name_en ?? product_name}
      </p>
      <ul className="cart__item">
        {products &&
          products.map((product, index) => (
            <li key={`combo_item_${index}`}>
              <CartItem item={product} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CartComboItem;
