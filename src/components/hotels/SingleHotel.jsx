import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { diffDays, getHotelById, isAlreadyBooked } from '../../actions/hotels';
import { toast } from 'react-toastify';
import { BiBed, BiCalendarAlt } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { getSessionId } from '../../actions/stripe';
import { loadStripe } from '@stripe/stripe-js';
import badge from '../../assets/images/badge.png';
import pillow from '../../assets/images/pillow.png';
import cozy from '../../assets/images/cozy.jpg';
import special from '../../assets/images/special.jpg';
import Footer from '../Footer';

const SingleHotel = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { auth } = useSelector((state) => ({ ...state }));

  const [hotel, setHotel] = useState({});
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSingleHotel = async () => {
    try {
      const res = await getHotelById(params.id);
      if (res.data) {
        setHotel(res.data);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    let res = await getSessionId(auth.token, params.id);
    const stripe = await loadStripe(`${import.meta.env.VITE_APP_STRIPE_KEY}`);

    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log('Shitak e)) ', result));
  };

  useEffect(() => {
    getSingleHotel();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, params.id).then((res) => {
        setAlreadyBooked(true);
      });
    }
  }, []);

  return (
    <>
      <div className="hotel-top">
        <div
          className="hotel-banner"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34, 34, 34, 0.7), rgba(0, 0, 0, 0)),url(' +
              `${import.meta.env.VITE_APP_API}/hotel/image/${params.id}` +
              ')',
          }}
        ></div>
        <div className="hotel-hero">
          <h2 className="mb-2 white-text hero-text">{hotel.title}</h2>
          <span className="subheader-hotel">
            {' '}
            <GoLocation />
            {hotel.location}
          </span>
        </div>
      </div>
      {Object.keys(hotel).length && (
        <div className="container">
          <div className="row g-xl-5 mt-5 mb-5 d-flex align-items-start">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                  <div className=" d-md-flex flex-md-column-reverse">
                    <div
                      className="img-single-hotel w-100"
                      style={{
                        backgroundImage: `url('${cozy}')`,
                      }}
                    ></div>
                    <div className="text w-100 p-4 text-center mb-md-4 single-hotel-side">
                      <div className="icon">
                        <span>
                          <img
                            className="pillow-icon mb-3"
                            src={pillow}
                            alt="pillow"
                          />
                        </span>
                      </div>
                      <h3>Cozy Rooms</h3>
                      <p>
                        All our guestrooms are elegantly furnished with handmade
                        furniture include luxury en-suite facilities with
                        complimentary amenities pack
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="">
                    <div
                      className="img-single-hotel w-100 mb-md-4"
                      style={{
                        backgroundImage: `url('${special}')`,
                      }}
                    ></div>
                    <div className="text w-100 p-4 text-center single-hotel-side">
                      <div className="icon">
                        <span>
                          <img
                            className="badge-icon mb-3"
                            src={badge}
                            alt="badge"
                          />
                        </span>
                      </div>
                      <h3>Special Offers</h3>
                      <p>
                        Best Prices Guaranteed with Deals on Discounts, Special
                        Member Prices, Instant Coupons!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 heading-section d-flex align-items-center aos-init aos-animate">
              <div className="mt-5 mt-md-0">
                <span className="subheading">
                  {' '}
                  <GoLocation />
                  {hotel.location}
                </span>
                <h2 className="mb-4">{hotel.title}</h2>
                <p className="mb-5">{hotel.content}</p>
                <p>
                  <BiCalendarAlt />
                  for {diffDays(hotel.from, hotel.to)}{' '}
                  {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
                </p>
                <p>
                  <BiBed />
                  {hotel.bed}
                </p>
                <p>
                  Available from {new Date(hotel.from).toLocaleDateString()}
                </p>
                <p>
                  <Button
                    disabled={loading || alreadyBooked}
                    variant="primary"
                    className="py-3 px-4"
                    onClick={handleBooking}
                  >
                    {loading
                      ? 'Loading...'
                      : alreadyBooked
                      ? 'Already Booked'
                      : auth && auth.token
                      ? 'Book Now'
                      : 'Login to Book'}
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default SingleHotel;
