import React from 'react';
import ProCard from '@ant-design/pro-card';
import { Affix, Button, message, Tree, Typography } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { DrawerForm } from '@ant-design/pro-form';
import CollectionForm from '../form/CollectionForm';
import SortableCollectionMenu from './SortableCollectionMenu';
import { createCollection, fetchCollection, setCollections, useMenu } from '../menu-context';

const CollectionMenu = ({ supplierId }) => {
  const [{ collections, error }, menuDispatch] = useMenu();
  const treeData = React.useMemo(() => {
    return collections.map((col) => {
      const children = col.products?.map(({ product_name, id }) => ({
        title: product_name,
        key: id,
      }));
      return {
        title: <Typography.Text strong>{col.name}</Typography.Text>,
        key: col.id,
        children,
      };
    });
  }, [collections]);

  const addCollectionToMenu = async (collectionData, prodKeys = []) => {
    return createCollection(menuDispatch, collectionData, prodKeys)
      .then((res) => true)
      .then(() => fetchCollection(menuDispatch, supplierId));
  };

  const changeCollectionPosHandler = (updatedCollectionsArr = []) => {
    const collectionArr = [];

    updatedCollectionsArr.forEach((col, position) => {
      collectionArr.push({ ...col, position });
    });

    console.log(`updatedCollectionsArr`, updatedCollectionsArr);
    return new Promise((res) => {
      setTimeout(() => {
        message.success({ content: 'Cập nhật thành công 🎉', icon: null });
        setCollections(menuDispatch, collectionArr);
        res(true);
      }, 3000);
    });
  };

  return (
    <Affix offsetTop={40}>
      <ProCard
        title={<Typography.Text style={{ color: '#787878' }}>NHÓM</Typography.Text>}
        extra={
          <SortableCollectionMenu onOk={changeCollectionPosHandler} items={collections} id={`id`} />
        }
        bordered
      >
        <Tree treeData={treeData} />
        <DrawerForm
          title="Tạo nhóm voucher"
          onFinish={(vals) => {
            const { products, ...collectionData } = vals;
            return addCollectionToMenu(collectionData, products);
          }}
          width={600}
          submitter={{
            searchConfig: {
              submitText: 'Thêm vào thực đơn',
              resetText: 'Quay về',
            },
          }}
          trigger={
            <Button type="link">
              <PlusCircleFilled twoToneColor="#52be58" /> Thêm nhóm
            </Button>
          }
        >
          <CollectionForm />
        </DrawerForm>
      </ProCard>
    </Affix>
  );
};

export default CollectionMenu;
