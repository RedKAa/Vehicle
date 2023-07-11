import { formatCurrency, getValidEmails } from '@/utils/utils';
import { Input, Tag } from 'antd';
const { TextArea } = Input;


export const providersColumn = [
  {
    title: 'ID',
    dataIndex: 'id',


    hideInForm: true,
  },
  {
    title: 'Email',
    dataIndex: 'Emails',
    hideInTable: true,
    search: {
      transform: (value) => getValidEmails(value),
    },
    renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
      return <TextArea placeholder="Nhập danh sách email..." />;
    },
  },
  {
    title: 'Tên',
    dataIndex: 'providerName',
  },
  {
    title: 'Tổng voucher đã bán',
    dataIndex: 'commissionRevenue',
    hideInForm:true,
    hideInSearch: true,
    render: (_, {kpi}) => <>{kpi.qrCodeSold}</>
  },
  {
    title: 'Thu nhập của nhà cung cấp',
    dataIndex: 'commissionRevenue',
    hideInForm:true,
    hideInSearch: true,
    render: (_, {kpi}) => <>{formatCurrency(kpi.providerRevenue)}</>
  },
  {
    title: 'Hoa hồng nhận được',
    dataIndex: 'commissionRevenue',
    hideInForm:true,
    hideInSearch: true,
    render: (_, {kpi}) => <>{formatCurrency(kpi.commissionFee)}</>
  },
  {
    title: 'Hoa hồng cho CTV',
    dataIndex: 'commissionRevenue',
    hideInForm:true,
    hideInSearch: true,
    render: (_, {kpi}) => <>{formatCurrency(kpi.sellerCommissionFee)}</>
  },

  // {
  //   title: 'Địa chỉ',
  //   dataIndex: 'address',
  //   hideInSearch: true,
  // },
  // {
  //   title: 'Mã số thuế',
  //   dataIndex: 'taxCode',
  //   hideInSearch: true,
  // },
  // {
  //   title: 'Trạng thái',
  //   dataIndex: 'status',
  //   sorter: (a, b) => a.status > b.status,
  //   valueEnum: {
  //     "Active": {
  //       text: 'Active',
  //     },
  //     "Disable": {
  //       text: 'Disable',
  //     }
  //   },
  //   render: (_, { status }) => <Tag>{status}</Tag>,
  // }
];
