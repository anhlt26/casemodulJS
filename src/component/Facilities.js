import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchFacilities, handleDeleteFacility, searchFacilityByName } from "../Function/typeFacilities";

const Facilities = () => {
    const [facilities, setFacilities] = useState([]); // Danh sách facilities
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

    const searchTypeRef = useRef();
    const searchRoomRef = useRef();

    // Tải dữ liệu facilities khi component được render
    useEffect(() => {
        loadFacilities(currentPage);
    }, [currentPage]);

    const loadFacilities = async (page) => {
        const data = await fetchFacilities(page);
        setFacilities(data.items); // Gán danh sách facilities
        setTotalPages(data.totalPages); // Gán tổng số trang
    };

    const handleSearch = async () => {
        const searchType = searchTypeRef.current.value.trim(); // Lấy tên để tìm kiếm từ type
        const searchRoom = searchRoomRef.current.value.trim(); // Lấy tên để tìm kiếm từ room_standard
        const page = 1; // Mặc định tìm kiếm từ trang 1
        const data = await searchFacilityByName(searchType, searchRoom, page);
        setFacilities(data.items); // Gán danh sách facilities từ kết quả tìm kiếm
        setTotalPages(data.totalPages); // Gán tổng số trang từ kết quả tìm kiếm
        setCurrentPage(page); // Reset trang hiện tại về 1
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Danh sách Phòng tại Furama</h2>
            <div className="input-group mb-3">
                <input ref={searchRoomRef} name={"searchRoom"} placeholder={"Enter Room Type name"} className="form-control" />
                <input ref={searchTypeRef} name={"searchType"} placeholder={"Enter search name"} className="form-control" />
                <button className="input-group-text btn btn-primary" onClick={handleSearch}>
                    SEARCH
                </button>
            </div>
            <div className="row">
                {facilities.length > 0 ? (
                    facilities.map((facility) => (
                        <div className="col-md-4 mb-4" key={facility.id}>
                            <div className="card">
                                <img
                                    src={facility.img_url}
                                    className="card-img-top img-fluid"
                                    alt={facility.type}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{facility.type}</h5>
                                    <p className="card-text">
                                        <strong>Diện Tích:</strong> {facility.area} m² <br />
                                        <strong>Giá thuê:</strong> {facility.rental_cost} USD <br />
                                        <strong>Loại phòng:</strong> {facility.room_standard || "N/A"} <br />
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
                    ))
                ) : (
                    <p className="text-center">Không tìm thấy phòng nào!</p>
                )}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li
                                key={page}
                                className={`page-item ${currentPage === page ? "active" : ""}`}
                                onClick={() => handlePageChange(page)}
                            >
                                <button className="page-link">{page}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Facilities;
