import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DetailFacilities() {
  const { id } = useParams(); // Lấy id từ URL
  const [facility, setFacility] = useState(null);
  const navigate = useNavigate();

  // Khi component được render, tải thông tin chi tiết của facility theo id
  useEffect(() => {
    axios.get(`http://localhost:5000/api/facilities/${id}`)
      .then(response => {
        setFacility(response.data);
      })
      .catch(error => {
        console.error('Error fetching facility details:', error);
      });
  }, [id]);

  if (!facility) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Facility Details</h2>
      <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
      <div className="card mt-4">
        <img src={facility.img_url} className="card-img-top" alt={facility.type} />
        <div className="card-body">
          <h5 className="card-title">{facility.type}</h5>
          <p className="card-text">
            <strong>Diện Tích:</strong> {facility.area} m² <br />
            <strong>Giá thuê:</strong> {facility.rental_cost} USD <br />
            <strong>Loại phòng:</strong> {facility.room_standard.name} <br />
            <strong>Max People:</strong> {facility.max_people} <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailFacilities;
