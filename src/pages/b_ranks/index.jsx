import AsyncButton from '@/components/AsyncButton';
import { Button, Tag, Image, Input, Switch  } from 'antd';
import ResoTable from '@/components/ResoTable/ResoTable';
import { activationById, createRank, updateRank } from '@/services/b_ranks';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import React, { useRef, useState } from 'react';
import { Column } from './config';
import RankForm from '@/components/Form/b_RankForm/RankForm';
import moment from 'moment';


const RankPage = ({ history }) => {
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

  // const deleteHandler = () => {
  //   return deleteRank(selectedRows[0]).then(() => ref.current?.reload());
  // };

  const createHandler = async (values) => {
    console.log(`values`, values);
    const res = await createRank({...values, rankId: 0});
    ref.current?.reload();
    setVisible(false);
    return true;
  };

  const columns = [
    ...Column,
    {
      title: 'Ngày Tạo',
      dataIndex: 'createAt',
      valueType: 'date',
      hideInSearch: true,
      // hideInTable: true,
      sorter: (a, b) => a.createAt > b.createAt,
      render: ({ createAt }) => (
        <Tag color="#78cc7a">{moment(createAt).format('DD-MM-YYYY')}</Tag>
      ),
    },
    {
      title: 'Ngày Cập Nhật',
      dataIndex: 'updateAt',
      valueType: 'date',
      hideInSearch: true,
      hideInTable: false,
      sorter: (a, b) => a.updateAt > b.updateAt,
      render: ({ createAt }) => (
        <Tag color="#78cc7a">{moment(createAt).format('DD-MM-YYYY')}</Tag>
      ),
    },
    {
      title: 'Ảnh xếp hạng',
      dataIndex: 'imgLink',
      hideInSearch: true,
      render: (_, { imgLink }) =>  imgLink && (<Image
      width={100}
      src={imgLink}
    />)
    },
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
      render: (_, rank) => {
        return (
          <Switch
            checked={rank.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = rank.id;
              activationHandler({id, status});
            }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, rank) =>
        (<ModalForm
          title="Cập nhật xếp hạng"
          modalProps={{
            destroyOnClose: true,
          }}
          width="500px"
          name="upadte-Rank"
          key={`upadte-Rank${rank.id}`}
          initialValues={rank}
          onFinish={(values) =>
            updateRank(rank.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <RankForm update/>
        </ModalForm>),
    }
  ];

  return (
    <PageContainer>
      <ResoTable
        additionParams={{ orderBy: 'createAt-dec'}}
        rowSelection={rowSelection}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận xóa xếp hạng',
              content: 'Bạn có muốn xóa xếp hạng này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => deleteHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} xếp hạng`}
            key={selectedRows[0]}
          />,
        ]}
        columns={columns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo xếp hạng"
            modalProps={{
              width: 500,
              destroyOnClose: true,
            }}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-rank"
            key="create-rank"
            onFinish={createHandler}
            visible={visible}
            submitter={{
              render: (props, defaultDoms) => {
                return [
                  // ...defaultDoms,
                  <Button
                    key="cancel"
                    onClick={() => {
                      setVisible(false);
                    }}
                  >
                    Hủy
                  </Button>,
                  <Button
                    key="ok"
                    type="primary"
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
            trigger={<Button icon={<PlusOutlined />} onClick={() => setVisible(true)} type="primary">Thêm xếp hạng</Button>}
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

export default RankPage;
