import React from 'react';
import { Select, Tag } from 'antd';
import { daysInWeek } from '@/utils/utils';

const { Option } = Select;

const SelectDay = ({ value, onChange, ...props }) => {
  const options = daysInWeek.map((d, index) => (
    <Option key={index} value={index}>
      {d}
    </Option>
  ));

  const handleChange = (value) => {
    if (onChange) onChange(value);
  };

  function tagRender(props) {
    const { label, value: tagValue, closable, onClose } = props;
    if (value.length === 7 && tagValue == 0) return <Tag>Cả tuần</Tag>;
    if (value.length === 7 && tagValue != 0) return <></>;
    return (
      <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }

  return (
    <Select
      showSearch
      value={value}
      tagRender={tagRender}
      placeholder="Vui lòng chọn ngày"
      defaultActiveFirstOption={false}
      showArrow
      filterOption={false}
      onChange={handleChange}
      mode="multiple"
      {...props}
    >
      {options}
    </Select>
  );
};

export default SelectDay;
