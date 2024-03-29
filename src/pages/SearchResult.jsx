import React from 'react';
import Search from '../components/Search';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSearchParams, Link } from 'react-router-dom';

import { useEffect } from 'react';
import { searchListings } from '../actions/hotels';
import { useState } from 'react';
import HotelCard from '../components/cards/HotelCard';
import HomeBanner from '../components/banners/HomeBanner';
import Footer from '../components/Footer';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState();

  const location = searchParams.get('location');
  const date = searchParams.get('date');
  const bed = searchParams.get('bed');

  useEffect(() => {
    searchListings({ location, date, bed }).then((res) => {
      setHotels(res.data);
    });
  }, [window.location.search]);

  return (
    <>
      <HomeBanner />
      <Container className="search-top">
        <h2 className="search-subheader">Search Results</h2>
        {hotels && (
          <span className="">
            {hotels.length}
            {hotels.length === 1 ? ' hotel' : ' hotels'} found
          </span>
        )}
      </Container>
      <Container>
        <Row>
          <Search locationProps={location} dateProps={date} bedProps={bed} />
        </Row>
        <Row>
          {hotels && hotels.length ? (
            hotels.map((hotel) => (
              <Col key={hotel._id} md={3}>
                <Link
                  to={`/hotels/${hotel._id}`}
                  className="text-decoration-none text-dark"
                >
                  <HotelCard hotel={hotel} />
                </Link>
              </Col>
            ))
          ) : (
            <span>no hotels found</span>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SearchResult;
