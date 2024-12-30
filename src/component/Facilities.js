import React, { useState, useEffect } from "react";
import data from "./db.json"; // Import file JSON trực tiếp
import { Link } from "react-router-dom";

const Facilities = () => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu từ file JSON
        setFacilities(data.facilities);
    }, []);

    return (
        <div className="container mt-4 ">
            <h2 className="text-center">Danh sách Phòng tại Furama</h2>
            <div className="row">
                {facilities.map((facility) => (
                    <div className="col-md-4 mb-4" key={facility.id}>
                        <div className="card">
                            <img
                                src={facility.img_url}
                                className="card-img-top img-fluid"
                                alt={facility.type}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{facility.type}</h5>
                                <p className="card-text">
                                    <strong>Diện Tích:</strong> {facility.area} m² <br />
                                    <strong>Giá thuê:</strong> {facility.rental_cost} USD <br />
                                    <strong>Loại phòng:</strong> {facility.room_standard ? facility.room_standard.name : "N/A"} <br />
                                    <strong>Max People:</strong> {facility.max_people} <br />
                                    <button type="button" class="btn btn-primary"><Link to={`/facilities/${facility.id}`}>
                                        Detail
                                    </Link></button>
                                    <button type="button" class="btn btn-warning">Delete</button>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Facilities;
