import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { activationById, createSubject, deleteSubject, updateSubject } from '@/services/b_subject';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { Column } from './config';
import SubjectForm from '@/components/Form/b_SubjectForm/SubjectForm';


const SubjectPage = ({ history }) => {
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
    return deleteSubject(selectedRows[0]).then(() => ref.current?.reload());
  };

  const createHandler = async (values) => {
    console.log(`values`, values);
    const res = await createSubject({...values, subjectId: 0});
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
              activationHandler({id, status});
            }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, subject) =>
        (<ModalForm
          title="Cập nhật môn học"
          modalProps={{
            destroyOnClose: true,
          }}
          width="500px"
          name="upadte-Subject"
          key={`upadte-Subject${subject.id}`}
          initialValues={subject}
          onFinish={(values) =>
            updateSubject(subject.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <SubjectForm update/>
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
              title: 'Xác nhận xóa môn học',
              content: 'Bạn có muốn xóa môn học này không',
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
            title="Tạo môn học"
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
            trigger={<Button icon={<PlusOutlined />} onClick={() => setVisible(true)} type="primary">Thêm môn học</Button>}
          >
            <SubjectForm />
          </ModalForm>
        ]}
        rowKey="id"
        resource="subjects"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default SubjectPage;
