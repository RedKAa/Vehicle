import { arrayMove, restrictToFirstScrollableAncestor } from '@/utils/utils';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Button, Card, Divider } from 'antd';
import React from 'react';
import CollectionForm from '../form/CollectionForm';
import SortableItem from './SortableItem';

const SortableModal = ({ id, items, onOk, initialValues }) => {
  const [sortItems, setSortItems] = React.useState(items ?? []);

  React.useEffect(() => {
    setSortItems(items);
  }, [items]);

  const onChangeProductPosotion = ({ active, over }) => {
    if (active && over && active.id !== over.id) {
      // swap element in collection
      const from = sortItems.findIndex(({ id }) => id === active.id);
      const to = sortItems.findIndex(({ id }) => id === over.id);
      const updatePosition = arrayMove(sortItems, from, to);
      setSortItems(updatePosition);
    }
  };

  const okHandler = async (formData) => {
    const success = await onOk(formData, sortItems);
    return success;
  };

  const renderProdDrag = () => (
    <>
      <Divider orientation="left">Thứ tự voucher</Divider>
      <DndContext
        modifiers={[restrictToFirstScrollableAncestor]}
        onDragEnd={onChangeProductPosotion}
      >
        <SortableContext id={id} items={sortItems}>
          {sortItems.map(({ product_id: id, product_name: name }) => (
            <SortableItem title={name} key={id} id={id}>
              <Card bodyStyle={{ padding: '1rem' }} style={{ marginBottom: '1rem' }} hoverable>
                {name}
              </Card>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </>
  );

  return (
    <ModalForm
      onFinish={(values) => {
        return okHandler(values);
      }}
      title="Cập nhật nhóm"
      destroyOnClose
      maskClosable={false}
      width={500}
      initialValues={initialValues}
      trigger={<Button type="ghost">Điều chỉnh 📝</Button>}
      // layout="inline"
    >
      <CollectionForm />
    </ModalForm>
  );
};

export default SortableModal;
