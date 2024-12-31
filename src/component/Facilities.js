import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchFacilities, handleDeleteFacility, searchFacilityByName} from "../Function/typeFacilities";

const Facilities = () => {
    const [facilities, setFacilities] = useState([]);
    const searchTypeRef = useRef();
    const searchRoomRef = useRef();

    // Tải dữ liệu facilities khi component được render
    useEffect(() => {
        const loadFacilities = async () => {
            const data = await fetchFacilities();
            setFacilities(data);
        };
        loadFacilities();
    }, []);
    const handleSearch = async () => {
        const searchType = searchTypeRef.current.value.trim(); // lấy tên để tìm kiếm từ type
        const searchRoom = searchRoomRef.current.value.trim(); // lấy tên để tìm kiếm từ type
        let searchList = [];
        if (searchType || searchRoom) {
            searchList = await searchFacilityByName(searchType,searchRoom);
            setFacilities(searchList);
        } else {
            // Nếu không có tên tìm kiếm, tải lại tất cả các facilities
            searchList = await fetchFacilities();
        }
        setFacilities(searchList)
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Danh sách Phòng tại Furama</h2>
            <div class="input-group">
                <input ref={searchRoomRef} name={'searchRoom'} placeholder={'Enter Room Type name'} className="form-control" />
                <input ref={searchTypeRef} name={'searchType'} placeholder={'Enter search name'} className="form-control" />
                <button className="input-group-text" onClick={handleSearch}>SEARCH</button>
            </div>
            <br />
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
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={() => handleDeleteFacility(facility.id, facilities, setFacilities)}
                                    >
                                        Delete
                                    </button>
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
