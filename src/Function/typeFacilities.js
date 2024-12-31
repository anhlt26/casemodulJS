import axios from 'axios';

// Lấy danh sách các facilities
export const fetchFacilities = async () => {
  try {
    const response = await axios.get("http://localhost:8080/facilities");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu facilities:", error);
    return [];
  }
};

// Xử lý xóa facility
export const handleDeleteFacility = async (id, facilities, setFacilities) => {
  try {
    await axios.delete(`http://localhost:8080/facilities/${id}`);
    setFacilities(facilities.filter((facility) => facility.id !== id));
  } catch (error) {
    console.error("Lỗi khi xóa facility:", error);
  }
};
// Xử lý detail dữ liệu
export const fetchFacilityById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/facilities/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching facility: ", error);
      return null;
    }
};
// Xử lý hàm EDIT gồm 2 hàm nhé fetchFacilityById và updateFacilityById

export const updateFacilityById = async (id, values) => {
  try {
    await axios.put(`http://localhost:8080/facilities/${id}`, values);
  } catch (error) {
    console.error("Error updating facility: ", error);
  }
};
// Hàm xử lý tìm kiếm theo type 
export async function searchFacilityByName(searchType, searchRoom) {
  try {
    let query = "";
    if (searchType) query += `type_like=${searchType}`;
    if (searchRoom) query += (query ? "&" : "") + `room_standard_like=${searchRoom}`;

    const response = await axios.get(`http://localhost:8080/facilities?${query}`);
    console.log("-------search--------");
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log("Lỗi: " + e);
    return [];
  }
}