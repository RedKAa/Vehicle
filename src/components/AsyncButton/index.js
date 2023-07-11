/* eslint-disable consistent-return */
import React, { useState, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Popconfirm } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const AsyncButton = ({
  onClick,
  title,
  btnProps,
  isNeedConfirm = false,
  confirmType = 'default',
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!onClick) return;
    if (isNeedConfirm) {
      const { title, icon, content, okText, cancelText, okType } = isNeedConfirm;
      // eslint-disable-next-line consistent-return
      if (confirmType === 'default') {
        return confirm({
          title,
          icon: icon ?? <ExclamationCircleOutlined />,
          content: content ?? 'Some descriptions',
          okText: okText ?? 'Yes',
          okType: okType ?? 'danger',
          cancelText: cancelText ?? 'No',
          onOk() {
            setLoading(true);
            return Promise.resolve(onClick()).finally(() => setLoading(false));
          },
          onCancel() {},
        });
      }
      setLoading(true);
      return Promise.resolve(onClick()).finally(() => setLoading(false));
    }
    setLoading(true);
    return Promise.resolve(onClick()).finally(() => setLoading(false));
  };

  if (confirmType === 'pop-confirm') {
    return (
      <Popconfirm title={isNeedConfirm.title ?? 'Are you sure'} onConfirm={handleClick}>
        <Button {...btnProps} loading={loading}>
          {title}
        </Button>
      </Popconfirm>
    );
  }

  return (
    <Button {...btnProps} loading={loading} onClick={handleClick}>
      {title}
    </Button>
  );
};

AsyncButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AsyncButton;
