/* eslint-disable camelcase */
import React from 'react';
import { Select } from 'antd';
import { formatCurrency } from '@/utils/utils';
import moment from 'moment';

export const buildCategoriesOption = (data) =>
  data?.map(({ id: cate_id, category_name: cate_name }) => (
    <Select.Option value={cate_id} key={cate_id}>
      {cate_name}
    </Select.Option>
  ));

export const buildMenuOption = (data) =>
  data?.map(({ menu_id, menu_name }) => (
    <Select.Option value={menu_id} key={menu_id}>
      {menu_name}
    </Select.Option>
  ));

export const buildProductsOption = (data) =>
  data?.map(({ product_id, product_name }) => (
    <Select.Option value={product_id} key={product_id}>
      {product_name}
    </Select.Option>
  ));

export const buildOptionsPromotionCodeDefault = (lsPrCode = []) => {
  if (!lsPrCode.data) {
    lsPrCode?.map((d) => (
      <Select.Option value={d.promotion_code} key={d.id}>
        {d.promotion_code}
      </Select.Option>
    ));
  }
};

const BusyColorSchema = {
  "Free": "green",
  "Moderate": "yellow",
  "Busy": "red",
  "Unavailable": "gray"
}

export const buildSellersOption = (data) =>
  data?.map(({ id, sellerName, busyLevel }) => {
   return (
    <Select.Option value={id} key={id}>
       <span>{sellerName}</span> - <span style={{fontWeight: 'bold', color: BusyColorSchema[busyLevel]}}>{busyLevel}</span>
    </Select.Option>
  )
});


const ActiveColorSchema = {
  "Active": "green",
  "Disable": "gray"
}
const IRStatus = {
  VehicleOwnerOpen: 'Khởi tạo',
  WaitingForAssessment: 'Đợi thẩm định',
  Submit: 'Đợi kiểm duyệt',
  Reject: 'Không được duyệt',
  Approved: 'Đã duyệt'
}
const SOStatus = {
  Open: 'Khởi tạo',
  PendingApproval: 'Đợi kiểm duyệt',
  Reject: 'Không được duyệt',
  Approved: 'Đã duyệt',
}
export const buildServiceTypesOption = (data) =>
  data?.map(({ id, name, status }) => {
   return (
    <Select.Option value={id} key={id}>
       <span>{name}</span> - <span style={{fontWeight: 'bold', color: ActiveColorSchema[status]}}>{status}</span>
    </Select.Option>
  )
});

export const buildPlacesOption = (data) =>
  data?.map(({ id, name, image, status }) => {
   return (
    <Select.Option value={id} key={id}>
       <span>{name}</span> - <span style={{fontWeight: 'bold', color: ActiveColorSchema[status]}}>{status}</span>
    </Select.Option>
  )
});

export const buildProvidersOption = (data) =>
  data?.map(({ id, providerName, status }) => {
   return (
    <Select.Option value={id} key={id}>
       <span>{providerName}</span> - <span style={{fontWeight: 'bold', color: ActiveColorSchema[status]}}>{status}</span>
    </Select.Option>
  )
});

export const buildServicesOption = (data) =>
  data?.map(({ id, name, status, commissionRate }) => {
   return (
    <Select.Option value={id} key={id}>
      <div style={{display: 'flex', justifyContent:'space-between'}}>
        <span style={{display: 'inline-block'}}>{name}</span> <span style={{display: 'inline-block', fontWeight: 'bold', color: ActiveColorSchema[status]}}>{`Hoa hồng mặc định:     ${commissionRate}    -    ${status}`}</span>
      </div>
    </Select.Option>
  )
});

export const buildVehicleOption = (data) =>
  data?.map(({ id, name, carModel, color, status }) => {
   return (
    <Select.Option value={id} key={id}>
      <div style={{display: 'flex', justifyContent:'space-between'}}>
        <span style={{display: 'inline-block'}}>{name}</span> <span style={{display: 'inline-block', fontWeight: 'bold', color: ActiveColorSchema[status]}}>{`:     ${carModel}    -    ${color}`}</span>
      </div>
    </Select.Option>
  )
});
export const builIROption = (data) =>
  data?.map(({ id, itemReceiptStatus, createAt }) => {
   return (
    <Select.Option value={id} key={id}>
      <div style={{display: 'flex', justifyContent:'space-between'}}>
        <span style={{display: 'inline-block'}}>ID: {id}</span> <span style={{display: 'inline-block', fontWeight: 'bold', color: ActiveColorSchema.Active}}><pre>{`Tạo lúc: ${moment(createAt).format('HH:mm DD-MM-YYYY')}          Trạng thái: ${IRStatus[itemReceiptStatus]}`}</pre></span>
      </div>
    </Select.Option>
  )
});

export const builSOOption = (data) =>
  data?.map(({ id, approvalStatus, createAt }) => {
   return (
    <Select.Option value={id} key={id}>
      <div style={{display: 'flex', justifyContent:'space-between'}}>
        <span style={{display: 'inline-block'}}>ID: {id}</span> <span style={{display: 'inline-block', fontWeight: 'bold', color: ActiveColorSchema.Active}}><pre>{`Tạo lúc: ${moment(createAt).format('HH:mm DD-MM-YYYY')}          Trạng thái: ${SOStatus[approvalStatus]}`}</pre></span>
      </div>
    </Select.Option>
  )
});

export const buildVehicleOwnerOption = (data) =>
  data?.map(({ id, name, phone, status }) => {
   return (
    <Select.Option value={id} key={id}>
      <div style={{display: 'flex', justifyContent:'space-between'}}>
        <span style={{display: 'inline-block'}}>{name}</span> <span style={{display: 'inline-block', fontWeight: 'bold', color: ActiveColorSchema[status]}}>{`:     ${phone}    -    ${status}`}</span>
      </div>
    </Select.Option>
  )
});

export const buildDefaultOption = (data) =>
  data?.map(({ id, name, status }) => {
   return (
    <Select.Option value={id} key={id} style={{display: 'flex'}}>
       <span>{name}</span>  <span style={{fontWeight: 'bold', float: 'right', color: ActiveColorSchema[status]}}>{status}</span>
    </Select.Option>
  )
});

export const buildVouchersOption = (data) =>
  data?.map(({ id, voucherName, status, provider, inventory, soldPrice }) => {
   return (
    <Select.Option value={id} key={id}>
       <span style={{fontWeight: 'bold', color: 'green'}}>{voucherName}</span> - <span>NCC: {provider.providerName}</span> - <span>(còn lại: {inventory})</span> - <span style={{fontWeight: 'bold', color: 'green'}}>(Giá bán: {formatCurrency(soldPrice)})</span> - <span style={{fontWeight: 'bold', color: ActiveColorSchema[status]}}>{status}</span>
    </Select.Option>
  )
});