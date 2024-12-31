import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const DetailFacilities = () => {
  const { id } = useParams(); // lay id tu URL nhe
  const [facility, setFacility] = useState(null);
  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const respone = await axios.get(`http://localhost:8080/facilities/${id}`);
        setFacility(respone.data);
      } catch (error) {
        console.error("----loi ne-----", error);
      }
    };
    fetchFacility();
  }, [id]);
  if (!facility) {
    return <div> wait wait</div>;
  }
  return (
    <div className="container mt-4">
      <h2 className="text-center">Chi tiết Facility</h2>
      <div className="card">
        <img
          src={facility.img_url}
          className="card-img-top img-fluid"
          alt={facility.type}
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{facility.type}</h5>
          <p className="card-text">
            <strong>Diện Tích:</strong> {facility.area} m²     <br />
            {facility.floors && (<><strong>Số Tầng:</strong> {facility.floors} <br /></>)}
            <strong>Giá thuê:</strong> {facility.rental_cost} USD <br />
            <strong>Thời Gian Thuê:</strong> {facility.rental_type.name} <br />
            {facility.room_standard && (<><strong>Loại Phòng:</strong> {facility.room_standard} <br /></>)}
            <strong>Số người tối đa:</strong> {facility.max_people} <br />
            {facility.pool_area && (<><strong>Kích Thước Bể Bơi:</strong> {facility.pool_area}m²  <br /></>)}
            {facility.other_services && (<><strong>Dịch Vụ Khác:</strong> {facility.other_services.name} <br /></>)}
            {facility.free_services && (<><strong>Dịch Vụ Miễn Phí:</strong> {facility.free_services.name} <br /></>)}
          </p>
          <Link to="/facilities" className="btn btn-primary">Quay lại</Link><Link to={`/facilities/${id}/edit`} className="btn btn-outline-success ml-2">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailFacilities;