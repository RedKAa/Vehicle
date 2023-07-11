import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, Space, Typography, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, connect, useIntl, useHistory } from 'umi';
import styles from './style.less';
import LoginFrom from './components/Login';
import { getCookie, getAppToken, setAppToken, setUserInfo } from '@/utils/utils';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userAndlogin = {}, submitting, error } = props;
  const { status, type: loginType } = userAndlogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');
  const { dispatch } = props;
  const [formRef] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    // check if has token

    const token = getAppToken();

    if (token) {
      history.replace('/');
      // fetch current
      // if success, go to dash board
    }
  });

  const handleSubmit = (values) => {
    dispatch({
      type: 'userAndlogin/login',
      payload: { ...values, type },
    });
  };

  const loginMockupHandler = () => {
    console.log(`formRef`, formRef);
    formRef?.setFieldsValue({
      user_name: 'admin-test',
      password: 'admin123',
    });
    formRef?.submit();
  };

  const { formatMessage } = useIntl();

  return (
    <div className={styles.main}>
      <LoginFrom form={formRef} activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content="账户或密码错误（admin/ant.design）" />
        )}

        <UserName
          name="email"
          placeholder="Tên đăng nhập"
          rules={[
            {
              required: true,
              min: 6,
              max: 30,
              message: 'Tên đăng nhập từ 6 đến 30 kí tự',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="Mật khẩu"
          rules={[
            {
              required: true,
              min: 6,
              max: 10,
              message: 'Mật khẩu từ 6 đến 10 kí tự',
            },
          ]}
        />
        <Typography.Text type="danger">{error}</Typography.Text>
        <Submit loading={submitting}>Đăng nhập</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(({ userAndlogin, loading }) => ({
  userAndlogin,
  error: userAndlogin.error,
  submitting: loading.effects['userAndlogin/login'],
}))(Login);
