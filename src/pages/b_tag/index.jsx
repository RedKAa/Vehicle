import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { activationById, createTag, deleteTag, updateTag } from '@/services/b_tags';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { Column } from './config';
import TagForm from '@/components/Form/b_TagForm/TagForm';



const TagPage = ({ history }) => {
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

  const deleteHandler = () => {
    return deleteTag(selectedRows[0]).then(() => ref.current?.reload());
  };

  const createHandler = async (values) => {
    console.log(`values`, values);
    const res = await createTag(values);
    ref.current?.reload();
    setVisible(false);
    return true;
  };

  const columns = [
    ...Column,
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
      render: (_, subject) => {
        return (
          <Switch
            checked={subject.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = subject.id;
              activationHandler({ id, status });
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
        title="Cập nhật thẻ"
        modalProps={{
          destroyOnClose: true,
        }}
        width="500px"
        name="upadte-Tag"
        key={`upadte-Tag${tag.id}`}
        initialValues={tag}
        onFinish={(values) =>
          updateTag(tag.id, values)
            .then(ref.current?.reload)
            .then(() => true)
        }
        trigger={<Button type="link">Cập nhật</Button>}
      >
        <TagForm update />
      </ModalForm>),
    }
  ];

  return (
    <PageContainer>
      <ResoTable
        additionParams={{ orderBy: 'createAt-dec' }}
        rowSelection={rowSelection}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận xóa thẻ',
              content: 'Bạn có muốn xóa thẻ này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => deleteHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} môn`}
            key={selectedRows[0]}
          />,
        ]}
        columns={columns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo thẻ"
            modalProps={{
              width: 500,
              destroyOnClose: true,
            }}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-subject"
            key="create-subject"
            onFinish={createHandler}
            visible={visible}
            onCancel={() => {
              setVisible(false);
            }}
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
            trigger={<Button icon={<PlusOutlined />} onClick={() => setVisible(true)} type="primary">Thêm thẻ</Button>}
          >
            <TagForm />
          </ModalForm>
        ]}
        rowKey="id"
        resource="tags"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default TagPage;
