import { PRODUCT_COMPLEX } from '@/utils/utils';
import React from 'react';

import { getAttributesWithLang, formatCurrency } from '@/utils/utils';

import './style.css';

const CartItem = ({ item }) => {
  const lang = 'vn';
  const {
    pic_url,
    product_name,
    product_name_en,
    quantity,
    total_amount,
    final_amount,
    attributes,
    product_type_id,
    order,
    upgrade_products,
    in_promotions,
    selectedExtras = [],
    category_id,
  } = item ?? {};

  return (
    <div>
      <p className="cart__item-name">
        {lang === 'vn' ? product_name : product_name_en ?? product_name}
      </p>
      <ul className="cart__item">
        {attributes &&
          product_type_id === PRODUCT_COMPLEX &&
          getAttributesWithLang(Object.keys(attributes), 'vn').map((key) => {
            if (key == 'size') {
              return <li className="mb-2" key={key}>{`Cỡ ${attributes[key]} inch`}</li>;
            }
            return (
              <li className="mb-2" key={key}>
                {attributes[key]}{' '}
              </li>
            );
          })}
        {selectedExtras?.map((element) => (
          <li className="mb-2" key={element.name}>
            {element.product_name} ({formatCurrency(element.price1)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItem;
