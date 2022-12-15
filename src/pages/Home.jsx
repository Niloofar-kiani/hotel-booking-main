import Hotels from '../components/Hotels';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Search from '../components/Search';
import HomeBanner from '../components/banners/HomeBanner';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <HomeBanner />
      <Search />
      <Container>
        <Row>
          <Hotels />
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
