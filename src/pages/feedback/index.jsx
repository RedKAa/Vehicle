import ResoTable from '@/components/ResoTable/ResoTable';
import { convertDateToStr } from '@/utils/utils';
import { PageContainer } from '@ant-design/pro-layout';
import { Typography } from 'antd';
import moment from 'moment';
import React from 'react';

const { Text, Paragraph } = Typography;

const FeedbackList = () => {
  return (
    <PageContainer>
      <ResoTable
        columns={[
          {
            title: 'Tên khách hàng',
            render: (_, { customer: { name } }) => <Text>{name}</Text>,
            fixed: 'left',
            width: 150,
            sort: true,
            sorter: (a, b) => a.customer.name > b.customer.name,
          },
          {
            title: 'SDT',
            render: (_, { customer: { phone_number } }) => <Text>{phone_number}</Text>,
            sort: true,
            sorter: (a, b) => a.customer.phone_number > b.customer.phone_number,
          },
          {
            title: 'Nội dung',
            render: (_, { content }) => (
              <Paragraph code copyable>
                {content}
              </Paragraph>
            ),
          },
          {
            title: 'Ngày gửi',
            render: (_, { create_time }) => (
              <Text>{convertDateToStr(create_time, 'HH:MM DD-MM-YYYY')}</Text>
            ),
            fixed: 'right',
            width: '150',
            sort: true,
            defaultSortOrder: 'descend',
            sorter: (a, b) => moment(a.create_time).isAfter(moment(b.create_time)),
          },
        ]}
        resource="feedbacks"
        search={false}
        pagination={false}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default FeedbackList;
