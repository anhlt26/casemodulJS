import React from "react";
import { useFormik } from "formik";

function AddFacilities() {
  // Khai báo useFormik
  const formik = useFormik({
    initialValues: {
      type: "",
      area: "",
      rental_cost: "",
      max_people: "",
      room_standard: "",
      img_url: "",
    },
    // Validation cơ bản
    validate: (values) => {
      const errors = {};
      if (!values.type) {
        errors.type = "Required";
      }
      if (!values.area) {
        errors.area = "Required";
      }
      if (!values.rental_cost) {
        errors.rental_cost = "Required";
      }
      if (!values.max_people) {
        errors.max_people = "Required";
      }
      if (!values.room_standard) {
        errors.room_standard = "Required";
      }
      if (!values.img_url) {
        errors.img_url = "Required";
      }
      return errors;
    },
    onSubmit: (values) => {
      // Xử lý khi submit form
      console.log("Form values:", values);
    },
  });

  return (
    <div className="container mt-5 addfacilities-bg ">
      <h2 className="mb-4">Add a New Facility</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            className="form-control"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.type && formik.errors.type ? (
            <div className="text-danger">{formik.errors.type}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="area" className="form-label">
            Area (m²)
          </label>
          <input
            type="number"
            id="area"
            name="area"
            className="form-control"
            value={formik.values.area}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.area && formik.errors.area ? (
            <div className="text-danger">{formik.errors.area}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="rental_cost" className="form-label">
            Rental Cost (USD)
          </label>
          <input
            type="number"
            id="rental_cost"
            name="rental_cost"
            className="form-control"
            value={formik.values.rental_cost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rental_cost && formik.errors.rental_cost ? (
            <div className="text-danger">{formik.errors.rental_cost}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="max_people" className="form-label">
            Max People
          </label>
          <input
            type="number"
            id="max_people"
            name="max_people"
            className="form-control"
            value={formik.values.max_people}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.max_people && formik.errors.max_people ? (
            <div className="text-danger">{formik.errors.max_people}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="room_standard" className="form-label">
            Room Standard
          </label>
          <input
            type="text"
            id="room_standard"
            name="room_standard"
            className="form-control"
            value={formik.values.room_standard}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.room_standard && formik.errors.room_standard ? (
            <div className="text-danger">{formik.errors.room_standard}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="img_url" className="form-label">
            Image URL
          </label>
          <input
            type="url"
            id="img_url"
            name="img_url"
            className="form-control"
            value={formik.values.img_url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.img_url && formik.errors.img_url ? (
            <div className="text-danger">{formik.errors.img_url}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddFacilities;
