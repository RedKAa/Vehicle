import AsyncButton from '@/components/AsyncButton';
import RankForm from '@/components/Form/RankForm/RankForm';
import TagForm from '@/components/Form/TagForm/TagForm';
import ResoTable from '@/components/ResoTable/ResoTable';
import { activationById, createRank, deleteRank, updateRank } from '@/services/rank';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { RankColumn } from './config';


const RanksPage = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = React.useState(false);

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };

  const activationHandler = (data) => {
    Promise.resolve(activationById(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };

  const deleteRankHandler = () => {
    return deleteRank(selectedRows[0]).then(() => ref.current?.reload());
  };

  const createHandler = async (values) => {
    console.log(`values`, values);
    const res = await createRank(values);
    ref.current?.reload();
    return true;
  };

  const columns = [
    ...RankColumn,
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 150,
      valueType: 'select',
      valueEnum: {
        true: { text: 'Đang hiển thị', status: 'Processing' },
        false: { text: 'không hiển thị', status: 'Error' },
      },
      search: false,
      align: 'center',
      render: (_, tag) => {
        return (
          <Switch
            checked={tag.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = tag.id;
              activationHandler({id, status});
            }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, tag) =>
        (<ModalForm
          title="Cập nhật xếp hạng"
          modalProps={{
            destroyOnClose: true,
          }}
          width="500px"
          name="upadte-Tag"
          key={`upadte-Tag${tag.id}`}
          initialValues={tag}
          onFinish={(values) =>
            updateRank(tag.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <RankForm/>
        </ModalForm>),
    }
  ];

  return (
    <PageContainer>
      <ResoTable
        additionParams={{ orderBy: 'epxRequired-dec'}}
        rowSelection={rowSelection}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận xóa dịch vụ',
              content: 'Bạn có muốn xóa thẻ này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => deleteRankHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} thẻ`}
            key={selectedRows[0]}
          />,
        ]}
        columns={columns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo bậc xếp hạng"
            modalProps={{
              destroyOnClose: true,
            }}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-tag"
            key="create-tag"
            onFinish={createHandler}
            submitter={{
              render: (props, defaultDoms) => {
                return [
                  // ...defaultDoms,
                  <Button
                    key="ok"
                    onClick={() => {
                      try {
                        props.form.validateFields().then((values) => {
                          console.log(`values`, values);
                          createHandler(values);
                          props.reset();
                        });
                      } catch (error) {
                        console.log(`error`, error);
                      }
                    }}
                  >
                    Tạo
                  </Button>,
                ];
              },
            }}
            trigger={<Button icon={<PlusOutlined />} type="primary">Thêm bậc xếp hạng</Button>}
          >
            <RankForm />
          </ModalForm>
        ]}
        rowKey="id"
        resource="ranks"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default RanksPage;
