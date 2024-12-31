import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Facilities = () => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const respone = await axios.get("http://localhost:8080/facilities");
                console.log(respone.data);
                setFacilities(respone.data);
            } catch (error) {
                console.error("----error get data---", error);
            }
        }
        fetchFacilities()
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/facilities/${id}`);
            setFacilities(facilities.filter((facility) => facility.id !== id));
        } catch (error) {
            console.error("--Error roi---", error);
        }
    }

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
                                    <strong>Loại phòng:</strong> {facility.room_standard ? facility.room_standard : "N/A"} <br />
                                    <strong>Max People:</strong> {facility.max_people} <br />
                                    <Link to={`/facilities/${facility.id}`} className="btn btn-primary">
                                        Detail
                                    </Link>
                                    <button type="button" className="btn btn-warning" onClick={() => handleDelete(facility.id)}>Delete</button>
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
