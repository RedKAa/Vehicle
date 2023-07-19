/* eslint-disable @typescript-eslint/no-shadow */
import { getCategories } from '@/services/category';
import { getTags } from '@/services/tags';
import { getPromotion } from '@/services/promotions';
import { PRODUCT_TYPE_DATA, BLOGPOST_TYPE, ARTICLE_TYPE_DATA } from '@/utils/constraints';
import { getCollections, getStore } from '@/services/store';
import { getCurrentStore } from '@/utils/utils';
import { Empty, Radio, Select, Spin } from 'antd';
import { useIntl } from 'umi';
import React, { useEffect, useState } from 'react';
import { buildCategoriesOption, buildDefaultOption, buildMenuOption, buildPlacesOption, buildProductsOption, buildProvidersOption, buildSellersOption, buildServicesOption, buildServiceTypesOption, buildVehicleOption, buildVehicleOwnerOption, buildVouchersOption, builIROption, builSOOption } from './utils';
import { useDebounceFn } from '@umijs/hooks';
import { getSuppliers, getStoreOfSuppliers } from '@/services/brand';
import { getProductByName } from '@/services/product';
import { getMenus } from '@/services/menu';
import {getAvailableSellersByName} from '@/services/seller';
import { getServiceType } from '@/services/servicetype';
import { getPlaces } from '@/services/place';
import { getProvidersByName } from '@/services/provider';
import { getServiceByName } from '@/services/service';
import { getVoucherByName } from '@/services/voucher';
import { getAvailableAssessorsByAddress } from '@/services/v_assessor';
import { getVehicleOwnerByPhone } from '@/services/v_vehicleowner';
import { getVehicleByID, getVehicleByOwnerPhone } from '@/services/v_vehicle';
import { getCustomerByPhone } from '@/services/v_customer';
import { getWarehouseByName } from '@/services/v_warehouse';
import { getItemreceiptById, searchItemreceiptById } from '@/services/v_itemreceipt';
import { getSaleorderById, searchSaleorderById } from '@/services/v_saleorder';

const { Option } = Select;

const buildOptionsDefault = (storeData = []) =>
  storeData?.map((d) => (
    <Option value={d.id} key={d.id}>
      {d.name?.trim()}
    </Option>
  ));

const normalizeResDefault = (res) => res;

const normalizeRes = (res) => {
  return res?.data;
};

const CommonSelect = ({
  value,
  buildOptions,
  onSearch,
  getLsPromotion,
  normalizeRes,
  placeholder,
  getRes,
  fetchOnFirst,
  onFinishFetch,
  initOptions,
  onSelectItem,
  ...props
}) => {
  // const [optionData, setOptionData] = useState(initOptions ?? []);
  const [fetchingData, setFetchingData] = useState(false);
  const { formatMessage } = useIntl();
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (fetchOnFirst) {
      setFetchingData(true);
      Promise.resolve(onSearch())
        .then((res) => {
          return normalizeRes(res);
        })
        .then((data) => {
          setOptions(buildOptions(data));
          // setOptionData(data);
          return data;
        })
        .then((data) => onFinishFetch(data))
        .then(() => setFetchingData(false));
    }
  }, [fetchOnFirst, onSearch, normalizeRes]);

  // setOptions(buildOptions(optionData));

  const handleSearch = (searchValue) => {
    if (searchValue) {
      console.log(searchValue);
      // call to fetch data
      Promise.resolve(onSearch(searchValue))
        .then((res) => {
          return normalizeRes(res);
        })
        // .then((data) => setOptionData(data));
        .then((data) => setOptions(buildOptions(data)));
    }
  };

  const { run: changeSearch } = useDebounceFn(handleSearch, 200);

  const handleChange = (value) => {};
  return (
    <Select
      showSearch
      value={value}
      loading={fetchingData}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      showArrow
      filterOption={false}
      onSearch={(val) => {
        changeSearch(val);
      }}
      notFoundContent={fetchingData ? <Spin size="small" /> : <Empty />}
      // filterOption={(input, option) =>
      //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      // }
      {...props}
      // options={options}
      onChange={(selectedValue, data) => {
        props.onChange(selectedValue, data);
        // onSelectItem(selectedValue, optionData);
      }}
    >
      {options}
    </Select>
  );
};

const SelectPromotions = (props) => {
  return <CommonSelect placeholder="select.promotionPlaceholder" {...props} />;
};

const SelectProductType = (props) => {
  const { selectType = 'radio' } = props;
  return selectType === 'radio' ? (
    <Radio.Group
      placeholder="select.productTypePlaceholder"
      options={PRODUCT_TYPE_DATA}
      // optionType="button"
      buttonStyle="solid"
      {...props}
    />
  ) : (
    <CommonSelect options={PRODUCT_TYPE_DATA} {...props} />
  );
};



const SelectArticleType = (props) => {
  return (
    <CommonSelect
      placeholder="select.articleTypePlaceholder"
      options={ARTICLE_TYPE_DATA}
      // optionType="button"
      buttonStyle="solid"
      {...props}
    />
  );
};

const SelectBlogPostType = (props) => {
  return (
    <CommonSelect
      placeholder="select.blogPostTypePlaceholder"
      options={BLOGPOST_TYPE}
      // optionType="button"
      buttonStyle="solid"
      {...props}
    />
  );
};


const SelectPaymentType = (props) => {
  return (
    <CommonSelect
      placeholder="select.paymentPlaceholder"
      fetchOnFirst
      options={[
        {
          value: 1,
          label: 'Cash',
        },
        {
          value: 21,
          label: 'Momo',
        },
        {
          value: 23,
          label: 'ZaloPay',
        },
      ]}
      {...props}
    />
  );
};
const SelectSeller = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildSellersOption}
      onSearch={getAvailableSellersByName}
      normalizeRes={normalizeRes}
      style={{ width: 200 }}
      {...props}
    />
  );
};

const SelectServiceType = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildDefaultOption}
      onSearch={getServiceType}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};

const SelectPlace = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildPlacesOption}
      onSearch={getPlaces}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};

const SelectProvider = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildProvidersOption}
      onSearch={getProvidersByName}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};

const SelectService = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildServicesOption}
      onSearch={getServiceByName}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};

const SelectTag = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildDefaultOption}
      onSearch={getTags}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};

const SelectVoucher = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildVouchersOption}
      onSearch={getVoucherByName}
      normalizeRes={normalizeRes}
      style={{ width: 200 }}
      {...props}
    />
  );
};

const SelectAssessor = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildDefaultOption}
      onSearch={getAvailableAssessorsByAddress}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};

const SelectVehicleOwner = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildVehicleOwnerOption}
      onSearch={getVehicleOwnerByPhone}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};


const SelectCustomer = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildVehicleOwnerOption}
      onSearch={getCustomerByPhone}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};
 
const SelectVehicle = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildVehicleOption}
      onSearch={getVehicleByOwnerPhone}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};

const SelectWarehouse = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={buildDefaultOption}
      onSearch={getWarehouseByName}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};


const SelectItemReceipt = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={builIROption}
      onSearch={searchItemreceiptById}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};

const SelectSaleOrder = (props) => {
  return (
    <CommonSelect
      fetchOnFirst={true}
      allowClear={true}
      buildOptions={builSOOption}
      onSearch={searchSaleorderById}
      normalizeRes={normalizeRes}
      {...props}
    />
  );
};


CommonSelect.SelectProductType = SelectProductType;
CommonSelect.SelectBlogPostType = SelectBlogPostType;
CommonSelect.SelectArticleType = SelectArticleType;
CommonSelect.SelectPaymentType = SelectPaymentType;
CommonSelect.SelectTag = SelectTag;
CommonSelect.SelectPromotions = SelectPromotions;
CommonSelect.SelectSeller = SelectSeller;
CommonSelect.SelectServiceType = SelectServiceType;
CommonSelect.SelectPlace = SelectPlace;
CommonSelect.SelectProvider = SelectProvider;
CommonSelect.SelectService = SelectService;
CommonSelect.SelectVoucher = SelectVoucher;
CommonSelect.SelectAssessor = SelectAssessor;
CommonSelect.SelectVehicleOwner = SelectVehicleOwner;
CommonSelect.SelectVehicle = SelectVehicle;
CommonSelect.SelectCustomer = SelectCustomer;
CommonSelect.SelectWarehouse = SelectWarehouse;
CommonSelect.SelectSaleOrder = SelectSaleOrder;
CommonSelect.SelectItemReceipt = SelectItemReceipt;


CommonSelect.defaultProps = {
  onSelectItem: (selectedValue, storeData) => null,
  onSearch: () => [],
  normalizeRes: (res) => res?.data,
  onFinishFetch: (data) => null,
  fetchOnFirst: false,
  buildOptions: buildOptionsDefault,
};

export {
  SelectArticleType,
  SelectProductType,
  SelectBlogPostType,
  SelectPaymentType,
  SelectPromotions,
  SelectTag,
  SelectSeller,
  SelectServiceType,
  SelectPlace,
  SelectProvider,
  SelectService,
  SelectVoucher,
  SelectAssessor,
  SelectVehicleOwner,
  SelectVehicle,
  SelectCustomer,
  SelectWarehouse,
  SelectItemReceipt,
  SelectSaleOrder
};
export default CommonSelect;
