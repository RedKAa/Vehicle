import { Form, Button, Input, Popover, Progress, Row, Select, message } from 'antd';
import { Link, connect, FormattedMessage, formatMessage } from 'umi';
import { setAppToken } from '@/utils/utils';
import styles from './style.less';
import React, { useState } from 'react';
import {resetPassword} from './service';

const FormItem = Form.Item;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      Mật khẩu mạnh
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      Mật khẩu trung bình
    </div>
  ),
  poor: (
    <div className={styles.error}>
      Mật khẩu yếu
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Resetpassword = () => {
  const [form] = Form.useForm();
  const urlParams = new URL(window.location.href);
  const jwt = urlParams.searchParams.getAll('jwt')[0];
  const role = urlParams.searchParams.getAll('role')[0];

  const [updateError, setError] = useState(null);
  const [updateOk, setupdateOk] = useState(null);
  const [visible, setvisible] = useState(false);
  const [prefix, setprefix] = useState('86');
  const [popover, setpopover] = useState(false);
  const confirmDirty = false;
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  const onFinish = () => {

    if(jwt) {
      setAppToken(jwt);
      form
      .validateFields()
      .then((data) => {
        const newPassword = { newPassword: data.password };
        return resetPassword(newPassword);
      })
      .then(() => {
        message.success('Thành công');
        setupdateOk('Thành công');
      })
      .catch((err) => {
        setError(err);
      });
    } else {
      message.error('Thất bại');
    }
  };

  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(
        'Không trùng khớp'
      );
    }

    return promise.resolve();
  };

  const checkPassword = (_, value) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setvisible(!!value);
      return promise.reject(
        formatMessage({
          id: 'Bắt buộc',
        }),
      );
    } // 有值的情况

    if (!visible) {
      setvisible(!!value);
    }

    setpopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }

    return promise.resolve();
  };

  const changePrefix = (value) => {
    setprefix(value);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <h3>Thay đổi mật khẩu
      </h3>
      <Form form={form} name="UserResetpassword" onFinish={onFinish}>
        <Popover
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode;
            }

            return node;
          }}
          content={
            visible && (
              <div
                style={{
                  padding: '4px 0',
                }}
              >
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  Đánh giá mật khẩu
                </div>
              </div>
            )
          }
          overlayStyle={{
            width: 240,
          }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input
              size="large"
              type="password"
              placeholder={formatMessage({
                id: 'mật khẩu mới',
              })}
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'Không khớp',
              }),
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder={formatMessage({
              id: 'Nhập lại mật khẩu',
            })}
          />
        </FormItem>
        <FormItem>
          <Button
            size="large"
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            Đổi mật khẩu
          </Button>
          {['Provider', 'Admin'].indexOf(role) >= 0 && <Link className={styles.login} to="/user/login">
            Đăng nhập
          </Link>}
        </FormItem>
      </Form>
      <h3>
        {updateOk}
      </h3>
    </div>
  );
};

export default Resetpassword;
