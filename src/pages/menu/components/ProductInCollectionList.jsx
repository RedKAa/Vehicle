import AsyncButton from '@/components/AsyncButton';
import { normalizeProductForm } from '@/utils/utils';
import ProCard from '@ant-design/pro-card';
import ProForm, { ModalForm, StepsForm } from '@ant-design/pro-form';
import {
  Alert,
  Button,
  Divider,
  Image,
  message,
  Result,
  Space,
  Tag,
  Typography,
  Modal,
} from 'antd';
import React from 'react';
import { useParams } from 'umi';
import SortableModal from './SortableModal';
import {
  addProdToCollection,
  fetchCollection,
  removeProdInCollection,
  removeProductInMenu,
  updateCollection,
  updateProductInCollection,
  updateProductInMenu,
  useMenu,
  addProductInMenu,
} from '../menu-context';
import BasicStep from '@/pages/product/steps/BasicStep';
import SimpleProdMenuForm from '@/components/Form/ProductInMenuForm/SimpleProdMenuForm';
import { createProduct } from '@/services/product';
import CombinationStep from '@/pages/product/steps/CombinationStep';
import ProTable, { EditableProTable } from '@ant-design/pro-table';

const ProductInCollectionList = (props) => {
  const [{ collections }] = useMenu();

  if (!collections?.length) {
    return <Result status="404" title="Không có nhóm voucher nào" />;
  }

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Alert type="info" message="Mặc định nhóm voucher đầu tiên sẽ là nhóm voucher bán chạy" />
      {collections.map((collection, index) => (
        <div key={`collection_group_${collection.id}`} style={{ marginBottom: '2.5rem' }}>
          <CollectionGroup isStarCollection={index === 0} collection={collection} />
        </div>
      ))}
    </Space>
  );
};

const CollectionGroup = ({ collection, isStarCollection }) => {
  const [_, menuDispatch] = useMenu();
  const [visible, setVisible] = React.useState(false);
  const [editableKeys, setEditableRowKeys] = React.useState([]);
  const [loadingProdProcess, setLoadingProdProcess] = React.useState(false);
  const [prodData, setProdData] = React.useState();

  const { supplierId } = useParams();
  const formRef = React.useRef();
  const [productFormRef] = ProForm.useForm();

  const onRemoveProductInMenu = (collectionId, prodId) => {
    return removeProdInCollection(menuDispatch, collectionId, prodId).then(() => {
      message.success({ content: 'Xóa thành công 🎉', icon: null });
    });
  };

  const { name: collectionName, products = [], id: collectionId } = collection ?? {};
  const isNoCollection = collectionId === 'NO_COLLECTION';

  const expandedRowRender = (menuData = [], prodId) => {
    return (
      <EditableProTable
        columns={[
          { title: 'Menu', dataIndex: 'menu_name', key: 'date', editable: false },
          {
            title: 'Thời gian',
            dataIndex: 'time_from_to',
            key: 'name',
            editable: false,
            render: (_, { time_from_to: [from, to] }) => (
              <Typography.Text>{`${from}-${to}`}</Typography.Text>
            ),
          },
          { title: 'Giá mua', dataIndex: 'price', key: 'price' },
          { title: 'Giá bán', dataIndex: 'cost', key: 'cost' },
          {
            title: 'Action',
            valueType: 'option',
            render: (_, menu, __, action) => [
              <Button
                key="edit_prod_in_menu"
                onClick={() => action?.startEditable(menu.menu_id)}
                type="link"
              >
                Thay đổi
              </Button>,
              <AsyncButton
                key="delete-prod-in-menu"
                isNeedConfirm={{
                  title: `Xác nhận xóa khỏi menu`,
                  okText: 'Xác nhận',
                  cancelText: 'Hủy',
                }}
                btnProps={{
                  danger: true,
                  type: 'link',
                }}
                title="Xóa"
                onClick={() =>
                  removeProductInMenu(menuDispatch, collectionId, menu.menu_id, prodId)
                }
              />,
            ],
          },
        ]}
        recordCreatorProps={false}
        editable={{
          onSave: (key, record) => true,
          onChange: setEditableRowKeys,
          editableKeys,
          actionRender: (menu, action) => (
            <>
              <AsyncButton
                btnProps={{
                  type: 'link',
                }}
                onClick={() => {
                  const updateData = { ...menu, ...action.form.getFieldsValue()[menu.menu_id] };
                  return updateProductInMenu(
                    menuDispatch,
                    collectionId,
                    menu.menu_id,
                    prodId,
                    updateData,
                  ).then(() => action.cancelEditable(menu.menu_id));
                }}
                title="Lưu"
              />
              <Button
                type="link"
                onClick={() => {
                  action.cancelEditable(menu.menu_id);
                }}
              >
                Hủy
              </Button>
            </>
          ),
        }}
        headerTitle={false}
        search={false}
        options={false}
        value={menuData}
        rowKey="menu_id"
        pagination={false}
      />
    );
  };

  const addProdBtn = React.useMemo(
    () => (
      <Space style={{ width: '100%' }}>
        <Button onClick={() => setVisible(true)} type="ghost">
          <Typography.Title level={5} type="success">
            Thêm voucher
          </Typography.Title>
        </Button>
        <StepsForm
          onFinish={(prodValues) => {
            addProdToCollection(menuDispatch, collection.id, prodValues);
            setVisible(false);
            setProdData(null);
          }}
          formMapRef={formRef}
          containerStyle={{ width: '100%' }}
          submitter={{
            searchConfig: {
              submitText: 'Tiếp tục',
              cancelText: 'Quay lại',
            },
            render: ({ step, onPre, onSubmit }) => {
              const submitter = (
                <Space>
                  {step === 1 && (
                    <Button onClick={onPre} type="default">
                      Quay lại
                    </Button>
                  )}
                  <Button loading={loadingProdProcess} onClick={onSubmit} type="primary">
                    {step === 0 ? 'Tạo voucher' : 'Hoàn tất'}
                  </Button>
                </Space>
              );
              return submitter;
            },
          }}
          stepsFormRender={(dom, submitter) => {
            return (
              <Modal
                title={`Thêm voucher vào ${collection.name}`}
                width={800}
                onCancel={() => setVisible(false)}
                visible={visible}
                footer={submitter}
                destroyOnClose
              >
                {dom}
              </Modal>
            );
          }}
        >
          <StepsForm.StepForm
            name="product-info"
            title="Thông tin voucher"
            initialValues={{
              supplier_id: +supplierId,
              collection_id: [collection.id],
            }}
            formRef={productFormRef}
            onFinish={async (prodFormValues) => {
              const createProductData = normalizeProductForm(prodFormValues);
              setLoadingProdProcess(true);
              return createProduct(createProductData)
                .then((res) => {
                  message.success({ content: `Tạo voucher thành công ${res}` });
                  setProdData({ ...prodFormValues, product_id: res });
                  formRef.current.forEach((formInstanceRef) => {
                    formInstanceRef.current?.setFields([{ name: 'product_id', value: res }]);
                  });
                })
                .then(() => true)
                .catch((e) => {
                  console.log(e);
                  message.error({ content: e.toString() });
                  return false;
                })
                .finally(() => setLoadingProdProcess(false));
            }}
          >
            <BasicStep />
            <CombinationStep form={productFormRef} />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="menu-info"
            title="Thêm vào thực đơn"
            onFinish={(menuInfo) => {
              setLoadingProdProcess(true);
              return addProductInMenu(menuDispatch, menuInfo.menu_id, menuInfo)
                .then((res) => {
                  message.success({ content: `Thêm voucher vào menu thành công` });
                  return true;
                })
                .catch((e) => {
                  message.error({ content: e });
                  return false;
                })
                .finally(() => setLoadingProdProcess(false));
            }}
          >
            <SimpleProdMenuForm
              currentProdSupplierId={prodData?.supplier_id}
              currentProductType={prodData?.product_type_id}
              hideSelectMenu={false}
            />
          </StepsForm.StepForm>
        </StepsForm>
        <Divider type="vertical" />
        <SortableModal
          initialValues={{ ...collection }}
          id={`collection_products_of_${collectionId}`}
          items={products}
          onOk={(updateCollectionData) =>
            updateCollection(menuDispatch, collectionId, updateCollectionData).then(() => true)
          }
        />
      </Space>
    ),
    [
      collection,
      collectionId,
      loadingProdProcess,
      menuDispatch,
      prodData?.product_type_id,
      prodData?.supplier_id,
      productFormRef,
      products,
      supplierId,
      visible,
    ],
  );

  return (
    <ProCard
      title={
        <Typography.Title level={4} strong>
          {collectionName} {isStarCollection && <Tag color="warning">Best seller</Tag>}
        </Typography.Title>
      }
      layout="default"
      ghost
      extra={addProdBtn}
    >
      <ProTable
        rowKey="product_id"
        columns={[
          {
            title: 'Thumbnail',
            dataIndex: 'pic_url',
            render: (_, { pic_url }) => <Image width={64} src={pic_url} />,
          },
          {
            title: 'Tên',
            dataIndex: 'product_name',
          },
          {
            title: 'Miêu tả',
            dataIndex: 'description',
          },
          {
            title: 'Hành động',
            align: 'center',
            render: (_, prod) => [
              <ModalForm
                key="edit-product"
                formRef={productFormRef}
                trigger={
                  <Button ghost type="link">
                    Điều chỉnh
                  </Button>
                }
                title={`Điều chỉnh voucher ${prod.product_name}`}
                initialValues={{
                  ...prod,
                  collection_id: !isNoCollection ? [collection.id] : [],
                }}
                onFinish={(values) =>
                  updateProductInCollection(menuDispatch, collectionId, prod.product_id, {
                    ...prod,
                    ...values,
                  }).then(() => true)
                }
                layout="horizontal"
                width={650}
              >
                <BasicStep />
                <CombinationStep form={productFormRef} />
              </ModalForm>,
              !isNoCollection && (
                <AsyncButton
                  isNeedConfirm={{
                    title: `Xác nhận xóa nhóm voucher ${prod.product_name}`,
                    content: `Hành động này chỉ  xóa voucher ra nhóm sác phẩm này và không xóa ở các nhóm voucher khác`,
                    okText: 'Xác nhận',
                    cancelText: 'Hủy',
                  }}
                  btnProps={{
                    danger: true,
                    type: 'link',
                  }}
                  title="Xóa"
                  onClick={() => onRemoveProductInMenu(collectionId, prod.product_id)}
                />
              ),
            ],
          },
        ]}
        expandable={{
          expandedRowRender: (prod) =>
            prod.menus && prod.menus.length ? (
              expandedRowRender(prod.menus, prod.product_id)
            ) : (
              <ModalForm
                trigger={<Button type="dashed">Thêm vào menu</Button>}
                title="Thêm vào thực đơn"
                initialValues={prod}
                onFinish={async (menuInfo) => {
                  try {
                    await addProductInMenu(menuDispatch, menuInfo.menu_id, menuInfo);
                    await fetchCollection(menuDispatch, supplierId);
                    return true;
                  } catch (e) {
                    message.error({ content: e?.toString() });
                    return false;
                  }
                }}
              >
                <SimpleProdMenuForm
                  currentProdSupplierId={prod?.supplier_id}
                  currentProductType={prod?.product_type_id}
                  hideSelectMenu={false}
                />
              </ModalForm>
            ),
        }}
        options={false}
        pagination={false}
        search={false}
        dataSource={collection.products}
      />
    </ProCard>
  );
};

export default ProductInCollectionList;
