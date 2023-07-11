/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import React from 'react';
import * as collectionService from '@/services/collection';
import * as menuService from '@/services/menu';
import produce from 'immer';
import { getAllProduct, updateProduct } from '@/services/product';
import { normalizeProductForm } from '@/utils/utils';

const MenuContext = React.createContext(undefined);
MenuContext.displayName = 'MenuContext';
const formatProducts = (data) => {
  const collectionArr = [
    {
      name: 'Chưa chọn bộ sưu tập',
      position: 10000,
      id: 'NO_COLLECTION',
      products: [],
    },
  ];

  const findCollection = (colId) => collectionArr.find(({ id }) => id === colId);

  data.forEach((prod) => {
    const collections = prod.collections ?? [];

    if (!collections.length) {
      findCollection('NO_COLLECTION').products.push(prod);
    } else {
      collections.forEach((col) => {
        if (!findCollection(col.id)) {
          collectionArr.push({
            ...col,
            products: [],
          });
        }

        findCollection(col.id).products.push(prod);
      });
    }
  });

  return collectionArr;
};

const sortCollectionByPosition = (collectionMap = []) => {
  const sortable = collectionMap.sort((a, b) => a?.position - b?.position);
  return sortable;
};

const initStates = {
  collections: [],
  error: null,
  loading: true,
};

const addProductToCollectionReducer = (draft, action) => {
  const {
    payload: { collectionId, product },
  } = action;
  console.log(`draft.collections`, draft.collections);
  const collection = draft.collections.find((col) => col.id === collectionId);

  if (!collection) {
    return draft;
  }

  collection.products?.push(product);
};

const updateProductMenuReducer = (draft, action) => {
  const {
    payload: { collectionId, menuId, prod, prodId },
  } = action;
  const collection = draft.collections?.find((col) => col.id === collectionId);

  const updateProd = collection?.products?.find(({ product_id }) => product_id === prodId);

  const updateMenu = updateProd?.menus?.find(({ menu_id }) => menu_id === menuId);

  if (!updateMenu) {
    return draft;
  }

  updateMenu.price = prod.price;
  updateMenu.cost = prod.cost;
};

const deleteProductMenuReducer = (draft, action) => {
  const {
    payload: { collectionId, menuId, prodId },
  } = action;
  const collection = draft.collections?.find((col) => col.id === collectionId);

  const updateProd = collection?.products?.find(({ product_id }) => product_id === prodId);

  if (!updateProd) return;
  updateProd.menus = updateProd?.menus?.filter(({ menu_id }) => menu_id !== menuId);
};

const reducer = produce((draft = initStates, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'ADD_COLLECTION':
      draft.collections.push(action.payload);
      break;
    case 'SET_COLLECTION':
      draft.collections = action.payload ?? {};
      break;
    case 'SET_LOADING':
      draft.loading = action.payload ?? false;
      break;
    case 'REMOVE_COLLECTION':
      draft.collections = draft.collections.filter((c) => c.id !== action.payload);
      break;
    case 'UPDATE_COLLECTION':
      draft.collections = draft.collections.map((c) => {
        if (c.id !== action.payload.collectionId) {
          return c;
        }
        return { ...c, ...action.payload.collectionData };
      });
      break;
    case 'REMOVE_PROD_IN_COLLECTION':
      draft.collections.find((col) => col.id === action.payload.collectionId).products =
        draft.collections
          .find((col) => col.id === action.payload.collectionId)
          .products.filter((pro) => pro.product_id !== action.payload.prodId);
      break;
    case 'UPDATE_PROD_IN_COLLECTION':
      draft.collections.find((col) => col.id === action.payload.collectionId).products =
        draft.collections
          .find((col) => col.id === action.payload.collectionId)
          .products.map((pro) => {
            if (pro.product_id !== action.payload.prodId) {
              return pro;
            }
            return { ...pro, ...action.payload.prodData };
          });
      break;
    case 'ADD_PROD_TO_COLLECTION':
      addProductToCollectionReducer(draft, action);
      break;
    case 'UPDATE_PRODUCT_IN_MENU':
      updateProductMenuReducer(draft, action);
      break;
    case 'DELETE_PRODUCT_IN_MENU':
      deleteProductMenuReducer(draft, action);
      break;
    case 'SET_ERROR':
      draft.error = action.payload;
      break;
  }
}, initStates);

const MenuProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initStates);

  const value = [state, dispatch];

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

const useMenu = () => {
  const context = React.useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

// async function

const setLoading = (dispatch, payload) => {
  dispatch({ type: 'SET_LOADING', payload });
};

const fetchCollection = async (dispatch, supplierId) => {
  setLoading(dispatch, true);
  return getAllProduct({ 'supplier-id': supplierId, fields: ['collections', 'menus'] })
    .then((res) => formatProducts(res.data))
    .then((collections) => setCollections(dispatch, collections))
    .catch((err) => dispatch({ type: 'SET_ERROR', payload: err }))
    .finally(() => setLoading(dispatch, false));
};

const createCollection = async (dispatch, collection, prodIds = []) => {
  try {
    const res = await collectionService.createCollection(collection);

    // ADD PRODUCT TO COLLECTION
    if (!res.data.id) {
      throw Error('Có lỗi khi thêm voucher vào bộ sưu tập');
    }
    const addProdRes = await collectionService.addProductIntoCollection(res.data.id, prodIds);

    // dispatch({ type: 'ADD_COLLECTION', payload: newCollection });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err });
  }
};

const setCollections = (dispatch, collections = []) => {
  console.log('SET_COLLECTION', collections);
  dispatch({ type: 'SET_COLLECTION', payload: sortCollectionByPosition(collections) });
};

const removeCollection = (dispatch, collectionId) => {
  console.log('REMOVE_COLLECTION', collectionId);

  return collectionService
    .deleteCollection(collectionId)
    .then((res) => {
      dispatch({ type: 'REMOVE_COLLECTION', payload: collectionId });
    })
    .catch((err) => {
      dispatch({ type: 'SET_ERROR', payload: err });
      throw err; // for continue handling error
    });
};

const updateCollection = (dispatch, collectionId, collectionData) => {
  console.log('UPDATE_COLLECTION', collectionId, collectionData);

  return collectionService
    .updateCollection(collectionId, collectionData)
    .then((res) => {
      dispatch({ type: 'UPDATE_COLLECTION', payload: { collectionId, collectionData } });
    })
    .catch((err) => {
      dispatch({ type: 'SET_ERROR', payload: err });
      throw err; // for continue handling error
    });
};

const removeProdInCollection = (dispatch, collectionId, prodId) => {
  console.log('REMOVE_PROD_IN_COLLECTION', collectionId, prodId);

  return collectionService
    .deleteProdsInCollection(collectionId, [prodId])
    .then((res) => {
      dispatch({ type: 'REMOVE_PROD_IN_COLLECTION', payload: { collectionId, prodId } });
    })
    .catch((err) => {
      dispatch({ type: 'SET_ERROR', payload: err });
      throw err; // for continue handling error
    });
};

const addProdToCollection = (dispatch, collectionId = {}, product = {}) => {
  console.log('ADD_PROD_TO_COLLECTION', collectionId, product);
  dispatch({ type: 'ADD_PROD_TO_COLLECTION', payload: { collectionId, product } });
};

const updateProductInCollection = (dispatch, collectionId, prodId, prodData) => {
  const update = normalizeProductForm(prodData);

  console.log('UPDATE_PROD_IN_COLLECTION', collectionId, prodId, prodData);

  return updateProduct(prodId, update)
    .then((res) => {
      dispatch({ type: 'UPDATE_PROD_IN_COLLECTION', payload: { collectionId, prodId, prodData } });
    })
    .catch((err) => {
      dispatch({ type: 'SET_ERROR', payload: err });
      throw err; // for continue handling error
    });
};

const updateProductInMenu = (dispatch, collectionId, menuId, prodId, prod) => {
  console.log('UPDATE_PRODUCT_IN_MENU', collectionId, menuId, prodId, prod);
  return menuService.updateProductInMenu(prod, menuId).then(() => {
    dispatch({ type: 'UPDATE_PRODUCT_IN_MENU', payload: { collectionId, menuId, prodId, prod } });
  });
};

const removeProductInMenu = (dispatch, collectionId, menuId, prodId) => {
  console.log('DELETE_PRODUCT_IN_MENU', collectionId, menuId, prodId);
  return menuService.deleteProductInMenu([prodId], menuId).then(() => {
    dispatch({
      type: 'DELETE_PRODUCT_IN_MENU',
      payload: { collectionId, menuId, prodId },
    });
  });
};

const addProductInMenu = (dispatch, menuId, menuInfo) => {
  console.log('ADD_PRODUCT_IN_MENU', menuId, menuInfo);
  return menuService.addProductIntoMenu([menuInfo], menuId);
};

export {
  MenuProvider,
  useMenu,
  createCollection,
  removeCollection,
  updateCollection,
  setCollections,
  addProdToCollection,
  fetchCollection,
  removeProdInCollection,
  updateProductInCollection,
  updateProductInMenu,
  removeProductInMenu,
  addProductInMenu,
};
