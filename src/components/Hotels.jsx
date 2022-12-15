import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { allHotels } from '../actions/hotels';

import HotelCard from '../components/cards/HotelCard';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Hotels = () => {
  const [hotels, setHotels] = useState('');
  const [visible, setVisible] = useState(3);


  const showMoreImg = () => {
    setVisible((prevVal)=>prevVal +3)
  }

  const getAllHotels = async () => {
    try {
      const res = await allHotels();
      if (res.data) {
        setHotels(res.data);
      }
    } catch (err) {
      toast.error('Err');
    }
  };

  useEffect(() => {
    getAllHotels();
  }, []);

  return (
    <>
      <span className="subheader">Luxe Services</span>
      <h2 className="h2">Explore Our Hotels</h2>
      {hotels && hotels.length ? (
        hotels.slice(0,visible).map((hotel) => (
          <Col key={hotel._id} md={4}>
            <HotelCard hotel={hotel}  />
          </Col>
        ))
      ) : (
        <span>No hotels found!</span>
      )}
      <Button className='mb-5' onClick={showMoreImg}>Load More...</Button>
    </>
  );
};

export default Hotels;
