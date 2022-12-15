import { useState } from 'react';
import { useNavigate } from 'react-router';
import { register } from '../../actions/auth/auth';
import { Formik, Form } from 'formik';
import { applicantSchema } from '../../schema/schema';
import CustomInput from '../../components/helper/CustomInput';
import PasswordInput from '../../components/helper/PasswordInput';
import { Row, Col, Space } from 'antd';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      toast.success('successfully registered');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="register-div">
      <section className="login-section">
        <Row className="login-container">
          <Col md={{ span: 6, offset: 4 }} className="mt-2 register-col">
            <div className="h3-register">Create account</div>
            <p className="text-muted">to acces our services</p>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
              }}
              validationSchema={applicantSchema}
              onSubmit={registerHandler}
            >
              <Form className="user-register-form" autoComplete={'off'}>
                <Space size={10} direction={'vertical'}>
                  <CustomInput
                    name={'name'}
                    type={'name'}
                    placeholder={'Name'}
                  />
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
                </Space>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="mt-3"
                >
                  {loading && (
                    <Spinner animation="border" className="spinner-custom" />
                  )}
                  Sign up
                </Button>
                <p className="mt-3">
                  <small className="text-muted">
                    By signing up you accept our terms of services.
                  </small>
                </p>
              </Form>
            </Formik>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Register;
