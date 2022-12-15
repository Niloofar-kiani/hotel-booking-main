import Card from 'react-bootstrap/Card';
import { GoLocation } from 'react-icons/go';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel, isOwner = false, setSmShow, setId }) => {
  const navigate = useNavigate();
  const navigateToEdit = (e) => {
    e.preventDefault();
    navigate('/hotels/edit', { state: { id: hotel._id } });
  };

  const openDeleteModal = (e) => {
    e.preventDefault();
    setSmShow(true);
    setId(hotel._id);
  };
  return (
    <Card className="mb-4 hotel-card d-md-flex">
      <Card.Img
      alt='banner'
       loading='lazy'
        variant="top"
        src={`${import.meta.env.VITE_APP_API}/hotel/image/${hotel._id}`}
      />
      <Card.Body>
        <Card.Title>{hotel.title}</Card.Title>
        <Card.Text className="mb-5">
          {`${hotel.content.substring(0, 180)}...`}
        </Card.Text>
        <Card.Text className="mb-2 loc-card">
          <GoLocation className="me-2 loc-icon" />
          <span className="loc">{hotel.location}</span>
        </Card.Text>
        <Card.Text className="mb-2 mt-2">
          <span className="me-3 hotel-price">{hotel.price}$ / night</span>
          <Link to={`/hotels/${hotel._id}`} className="hotel-more">
            details
          </Link>
        </Card.Text>
        {isOwner && (
          <div className="d-grid gap-2">
            <Button variant="warning" onClick={navigateToEdit}>
              Edit
            </Button>
            <Button variant="danger" onClick={openDeleteModal}>
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default HotelCard;
