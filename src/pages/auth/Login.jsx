import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../../actions/auth/auth';
import Spinner from 'react-bootstrap/Spinner';
import { Formik, Form } from 'formik';
import { loginSchemaUser } from '../../schema/schema';
import CustomInput from '../../components/helper/CustomInput';
import PasswordInput from '../../components/helper/PasswordInput';
import { Checkbox, Row, Col, Typography, Space } from 'antd';
import { toast } from 'react-toastify';
const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });
      setTimeout(() => {
        navigate('/dashboard/bookings');
      }, 1000);
      if (response.data) {
        window.localStorage.setItem('auth', JSON.stringify(response.data));
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: response.data,
        });
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="login-div">
      <section className="login-section">
        <Row className="login-container">
          <Col span={12} offset={6}>
            <h3 className="h3-login">Welcome to Luxe Hotel Booking</h3>
            <p className="text-muted">
              If you don't have account, please register.
            </p>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginSchemaUser}
              onSubmit={onSubmit}
            >
              <Form className="user-register-form" autoComplete={'off'}>
                <Space size={10} direction={'vertical'}>
                  <CustomInput
                    name={'email'}
                    type={'email'}
                    placeholder={'Email'}
                  />
                  <PasswordInput
                    name={'password'}
                    type={'password'}
                    placeholder={'Password'}
                  />
                  <Checkbox>Remember me</Checkbox>
                </Space>
                <div>
                  <button
                    htmlType="submit"
                    className="btn btn-actions btn-rounded mt-2"
                  >
                    {loading && (
                      <Spinner animation="border" className="spinner-custom" />
                    )}
                    Login
                  </button>
                </div>
              </Form>
            </Formik>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Login;
