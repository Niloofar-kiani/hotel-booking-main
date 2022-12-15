import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { BiPhone } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';


const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.localStorage.clear();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="booking-navbar-light navbar-dark">
      <Container className="menu-top">
        <div className="tel">
          <BiPhone /> 041757071
        </div>
        <div className="contact us">
          <FiMail /> info@luxe-booking.com
        </div>
      </Container>
      <Container>
        <Link to="/" className="navbar-brand">
          <span className="brand">Luxe</span>
          <span className="brand-sub">hotel booking</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto d-flex justify-content-end w-100">
            <>
              <Link to="/" className="nav-link">
                hotels
              </Link>
            </>
            {auth && auth.token ? (
              <NavDropdown align="end" className="" title={auth.user.name}>
                <NavDropdown.Item as={Link} to="/dashboard/bookings">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
