import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { useNavigate } from 'react-router';
import moment from 'moment';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Search = ({ locationProps, dateProps, bedProps }) => {
  const arrDate = dateProps ? dateProps.split(',') : '';

  const navigate = useNavigate();

  const [location, setLocation] = useState(locationProps ? locationProps : '');
  const [date, setDate] = useState(arrDate);
  const [bed, setBed] = useState(bedProps ? bedProps : 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`);
  };

  return (
    <div className="container">
      <div className=" search-bar">
        <div className="col-md-12">
          <Form onSubmit={handleSubmit} className=" ">
            <div className="row g-0">
              <Form.Group className="col-md-6 col-lg form-wrap d-flex py-3 py-lg-5 px-4 search-el">
                <label className="search-labels">location</label>
                <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_APP_GOOGLE_AUTOCOMPLETE}
                  placeholder="Location"
                  name="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="col-md-6 col-lg form-wrap d-flex py-3 py-lg-5 px-4 search-el">
                <label className="search-labels">rooms</label>
                <Form.Select
                  name="bed"
                  value={bed}
                  onChange={(e) => setBed(e.target.value)}
                >
               
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="col-md col-lg form-wrap d-flex py-3 py-lg-5 px-4 search-el">
                <label className="search-labels">Date</label>
                <RangePicker
                  className="range-picker"
                  onChange={(value, dateString) => setDate(dateString)}
                  format="YYYY-MM-DD"
                  defaultValue={
                    date && [
                      moment(date[0], 'YYYY-MM-DD'),
                      moment(date[1], 'YYYY-MM-DD'),
                    ]
                  }
                />
              </Form.Group>
              <div className="col-md-12 col-lg d-flex search-btn-div">
                <Button variant="primary" type="submit" className="search-btn">
                  Check availability
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Search;
