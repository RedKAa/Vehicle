import { Card, Tag } from 'antd';
import { Link, useIntl } from 'umi';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { convertDateToStr, getCurrentStore, renderDayMenu } from '@/utils/utils';
import { addMenuIntoStore, deleteMenu } from '@/services/menu';
import ResoTable from '@/components/ResoTable/ResoTable';
import CreateMenuModal from './components/CreateMenuModal';

const columns = [
  {
    title: 'Tên thực đơn',
    dataIndex: 'menu_name',
    fixed: 'left',
    render: (text, record) => (
      <Link
        to={{
          pathname: `/menu/${record.menu_id}`,
          state: { menu_info: record },
        }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: 'Ngày áp dụng',
    dataIndex: 'day_filter',
    render: (days) => renderDayMenu(days)?.map((day) => <Tag>{day}</Tag>),
  },
  {
    title: 'Thời gian áp dụng',
    dataIndex: 'time_from_to',
    render: (time_from_to = []) => {
      if (!time_from_to) return <span>-</span>;
      const [from, to] = time_from_to;
      return (
        <span>
          {from}-{to}
        </span>
      );
    },
  },
];

const MenuList = (props) => {
  const { formatMessage } = useIntl();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const ref = React.useRef();

  const onCreate = async (values) => {
    const {
      time_from_to: [from, to],
    } = values;
    const parsedBody = {
      ...values,
      time_from_to: [convertDateToStr(from, 'HH:mm'), convertDateToStr(to, 'HH:mm')],
    };
    return addMenuIntoStore(parsedBody, getCurrentStore()).then(ref.current?.reload);
  };

  const handleConvertColumn = () => {
    const data = [];
    columns.map((item) => {
      data.push({
        ...item,
        title: formatMessage({ id: item.title }),
      });
    });

    return data;
  };

  return (
    <PageContainer content="Tạo menu">
      <Card bordered={false}>
        <ResoTable
          search={false}
          actionRef={ref}
          toolBarRender={() => [<CreateMenuModal onCreate={onCreate} />]}
          rowKey="menu_id"
          columns={handleConvertColumn()}
          resource="menus"
          onDeleteSelection={(keys) => deleteMenu(keys[0]).then(ref.current.reload)}
        />
      </Card>
    </PageContainer>
  );
};

export default MenuList;
