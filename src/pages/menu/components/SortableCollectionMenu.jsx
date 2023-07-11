import { arrayMove, getCollections, restrictToFirstScrollableAncestor } from '@/utils/utils';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Button, Card, Divider } from 'antd';
import React, { forwardRef } from 'react';
import SortableItem from './SortableItem';

export const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div {...props} ref={ref}>
      {props.content}
    </div>
  );
});

const SortableCollectionMenu = ({ id, items, onOk, initialValues }) => {
  const [sortItems, setSortItems] = React.useState(items ?? []);
  const [activeId, setActiveId] = React.useState(null);

  React.useEffect(() => {
    setSortItems(items);
  }, [items]);

  function handleDragStart(event) {
    const { active } = event;

    setActiveId(active.id);
  }

  const onChangeProductPosotion = ({ active, over }) => {
    if (active && over && active.id !== over.id) {
      // swap element in collection
      const from = sortItems.findIndex(({ id }) => id === active.id);
      const to = sortItems.findIndex(({ id }) => id === over.id);
      const updatePosition = arrayMove(sortItems, from, to);
      console.log('updatePosition :>> ', updatePosition);
      setActiveId(null);
      setSortItems(updatePosition);
    }
  };

  const okHandler = async (formData) => {
    const success = await onOk(sortItems, formData);
    return success;
  };

  return (
    <ModalForm
      onFinish={(values) => {
        return okHandler(values);
      }}
      title="Cập nhật thứ tự nhóm"
      destroyOnClose
      maskClosable={false}
      width={500}
      modalProps={{
        destroyOnClose: true,
        forceRender: true,
        bodyStyle: {
          height: '40vh',
          overflowY: 'scroll',
        },
      }}
      initialValues={initialValues}
      trigger={
        <Button style={{ padding: 0 }} type="link">
          Sắp xếp
        </Button>
      }
      layout="inline"
    >
      <DndContext
        modifiers={[restrictToFirstScrollableAncestor]}
        onDragEnd={onChangeProductPosotion}
        onDragStart={handleDragStart}
      >
        <SortableContext id={id} items={sortItems}>
          {sortItems.map(({ id, name }) => (
            <SortableItem title={name} key={id} id={id}>
              <Card bodyStyle={{ padding: '1rem' }} style={{ marginBottom: '1rem' }} hoverable>
                {name}
              </Card>
            </SortableItem>
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <Item id={activeId} content={sortItems.find((c) => c.id == activeId).name} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </ModalForm>
  );
};

export default SortableCollectionMenu;
