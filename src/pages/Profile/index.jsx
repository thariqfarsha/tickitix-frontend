import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookingCard from "../../components/BookingCard";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getUserById, logout } from "../../stores/action/user";
import axios from "../../utils/axios";
import "./index.css";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.data);
  const refreshToken = localStorage.getItem("refreshToken");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTabActive, setIsTabActive] = useState({
    profile: true,
    history: false
  });
  const [isFormEditable, setIsFormEditable] = useState({
    profile: false,
    pwd: false
  });
  const [formProfile, setFormProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    noTelp: user.noTelp
  });
  const [formPwd, setFormPwd] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [formImage, setFormImage] = useState({
    image: null
  });
  const [bookings, setBookings] = useState([]);
  const [updateProfpicMsg, setUpdateProfpicMsg] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(preview);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    setFormImage({ ...formImage, image: e.target.files[0] });
  };

  useEffect(() => {
    if (isTabActive.history === true) {
      getBookingByUserId();
    }

    return () => {
      setBookings([]);
    };
  }, [isTabActive.history]);

  useEffect(() => {
    setTimeout(() => {
      setUpdateProfpicMsg("");
    }, 3000);
  }, [updateProfpicMsg]);

  const handleChangeTab = () => {
    setIsTabActive({
      profile: !isTabActive.profile,
      history: !isTabActive.history
    });
  };

  const handleFormToggle = (e, formName) => {
    e.preventDefault();

    setIsFormEditable({
      ...isFormEditable,
      [formName]: !isFormEditable[formName]
    });
  };

  const handleChangeFormProfile = (e) => {
    const { name, value } = e.target;

    setFormProfile({ ...formProfile, [name]: value });
  };

  const handleChangeFormPwd = (e) => {
    const { name, value } = e.target;

    setFormPwd({ ...formPwd, [name]: value });
  };

  const handleSubmitFormProfile = async (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);
      const result = await axios.patch(`user/profile/${user.id}`, formProfile);
      await dispatch(getUserById(user.id));
      setIsLoading(false);
      setIsFormEditable({ ...isFormEditable, profile: false });
      resetForm.pwd();
      console.log(result.data.msg);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmitFormPwd = async (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);
      const result = await axios.patch(`user/password/${user.id}`, formPwd);
      setIsLoading(false);
      setIsFormEditable({ ...isFormEditable, pwd: false });
      resetForm.pwd();
      console.log(result.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = {
    profile: () =>
      setFormProfile({
        firstName: "",
        lastName: "",
        noTelp: ""
      }),
    pwd: () =>
      setFormPwd({
        newPassword: "",
        confirmPassword: ""
      })
  };

  const getBookingByUserId = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(`booking/user/${user.id}`);
      console.log(result.data);
      setBookings(result.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout(refreshToken));
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", formImage.image);
      const result = await axios.patch(`user/image/${user.id}`, formData);
      setIsError(false);
      setUpdateProfpicMsg(result.data.msg);
      dispatch(getUserById(user.id));
    } catch (error) {
      console.log(error);
      setIsError(true);
      setUpdateProfpicMsg(error.response.data.msg);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const result = await axios.delete(`user/image/${user.id}`);
      setIsError(false);
      setUpdateProfpicMsg(result.data.msg);
      dispatch(getUserById(user.id));
    } catch (error) {
      console.log(error);
      setIsError(true);
      setUpdateProfpicMsg(error.response.data.msg);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-primary-light pb-4">
        <div className="container-lg">
          <div className="row my-4">
            <div className="col-md-3">
              <div
                className="bg-white rounded shadow-sm d-flex flex-column justify-content-center align-items-center px-4 py-5 mb-4 sticky-md-top"
                style={{ top: 100 }}
              >
                <div
                  role="button"
                  className="profpic position-relative mb-5"
                  style={{ width: "50%", aspectRatio: "1 / 1" }}
                  data-bs-toggle="modal"
                  data-bs-target="#modalProfpic"
                >
                  <img
                    src={
                      user.imagePath
                        ? user.imagePath
                        : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random&size=44`
                    }
                    alt="profile"
                    className="rounded-circle shadow-sm"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                  <div
                    className="profpic-overlay rounded-circle position-absolute top-0 start-0"
                    style={{ width: "100%", height: "100%" }}
                  ></div>
                  <div
                    className="rounded-circle bg-secondary shadow-sm d-flex justify-content-center align-items-center position-absolute end-0 bottom-0"
                    style={{ width: 28, height: 28 }}
                  >
                    <i className="bi bi-pen d-block fs-7 text-white"></i>
                  </div>
                </div>
                <h2 className="h5 fw-semibold">{`${user.firstName} ${user.lastName}`}</h2>
                <p className="text-secondary mb-4">Moviegoers</p>
                <button className="btn btn-outline-primary py-2 w-50" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div className="col-md-9">
              <div className="d-flex justify-content-center justify-content-md-start bg-white rounded shadow-sm mb-4">
                <div
                  className={`d-inline-block mx-4 py-3 ${
                    isTabActive.profile && "border-bottom border-primary border-3"
                  }`}
                  onClick={handleChangeTab}
                  style={{ cursor: "pointer" }}
                >
                  <p className={`mb-0 ${isTabActive.profile && "text-primary"}`}>
                    Account Settings
                  </p>
                </div>
                <div
                  className={`d-inline-block mx-4 py-3 ${
                    isTabActive.history && "border-bottom border-primary border-3"
                  }`}
                  onClick={handleChangeTab}
                  style={{ cursor: "pointer" }}
                >
                  <p className={`mb-0 ${isTabActive.history && "text-primary"}`}>Order History</p>
                </div>
              </div>
              {isTabActive.profile && (
                <>
                  <div className="bg-white rounded p-4 mb-4">
                    <h5 className="fw-semibold">Details Information</h5>
                    <hr className="mb-4" />
                    <form onSubmit={handleSubmitFormProfile}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              name="firstName"
                              value={formProfile.firstName}
                              onChange={handleChangeFormProfile}
                              placeholder="Enter your first Name"
                              disabled={!isFormEditable.profile}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              name="lastName"
                              value={formProfile.lastName}
                              onChange={handleChangeFormProfile}
                              placeholder="Enter your last Name"
                              disabled={!isFormEditable.profile}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              value={user.email}
                              placeholder="Enter your email"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              maxLength={13}
                              className="form-control"
                              id="phoneNumber"
                              name="noTelp"
                              value={formProfile.noTelp}
                              onChange={handleChangeFormProfile}
                              placeholder="08XXXXXXXXXX"
                              disabled={!isFormEditable.profile}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          {!isFormEditable.profile ? (
                            <div className="d-grid d-md-block">
                              <button
                                type="button"
                                className="btn btn-primary py-2 fw-semibold"
                                onClick={(e) => handleFormToggle(e, "profile")}
                              >
                                Update Profile
                              </button>
                            </div>
                          ) : (
                            <div className="row">
                              <div className="col-md-6">
                                <button
                                  type="submit"
                                  className="btn btn-primary py-2 w-100 fw-semibold mb-2 mb-md-0"
                                >
                                  {isLoading ? (
                                    <div
                                      className="spinner-border spinner-border-sm text-white"
                                      role="status"
                                    >
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  ) : (
                                    "Save Changes"
                                  )}
                                </button>
                              </div>
                              <div className="col-md-6">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary py-2 w-100"
                                  onClick={(e) => handleFormToggle(e, "profile")}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="bg-white rounded p-4">
                    <h5 className="fw-semibold">Account and Privacy</h5>
                    <hr className="mb-4" />
                    <form onSubmit={handleSubmitFormPwd}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="newPassword"
                              name="newPassword"
                              value={formPwd.newPassword}
                              onChange={handleChangeFormPwd}
                              placeholder="Enter new password"
                              disabled={!isFormEditable.pwd}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirmPassword"
                              name="confirmPassword"
                              value={formPwd.confirmPassword}
                              onChange={handleChangeFormPwd}
                              placeholder="Confirm your password"
                              disabled={!isFormEditable.pwd}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          {!isFormEditable.pwd ? (
                            <div className="d-grid d-md-block">
                              <button
                                type="button"
                                className="btn btn-primary py-2 fw-semibold"
                                onClick={(e) => handleFormToggle(e, "pwd")}
                              >
                                Update Password
                              </button>
                            </div>
                          ) : (
                            <div className="row">
                              <div className="col-md-6">
                                <button
                                  type="submit"
                                  className="btn btn-primary py-2 w-100 fw-semibold mb-2 mb-md-0"
                                >
                                  {isLoading ? (
                                    <div
                                      className="spinner-border spinner-border-sm text-white"
                                      role="status"
                                    >
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  ) : (
                                    "Save Changes"
                                  )}
                                </button>
                              </div>
                              <div className="col-md-6">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary py-2 w-100"
                                  onClick={(e) => handleFormToggle(e, "pwd")}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
              {isTabActive.history && isLoading ? (
                <div className="h-100 d-flex justify-content-center align-items-center">
                  <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : bookings.length === 0 ? (
                ""
              ) : (
                bookings
                  .sort(
                    (b, a) => new Date(a.dateBooking).getTime() - new Date(b.dateBooking).getTime()
                  )
                  .map((booking) => (
                    <div key={booking.id}>
                      <BookingCard booking={booking} />
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal Profile Picture */}
      <div
        className="modal fade"
        id="modalProfpic"
        tabIndex="-1"
        aria-labelledby="updateProfpicModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: 16 }}>
            <div className="modal-header">
              <h5 className="modal-title" id="updateProfpicModal">
                Update Profile Picture
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-column align-items-center">
                <img
                  src={
                    !preview
                      ? !user.imagePath
                        ? `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random&size=44`
                        : user.imagePath
                      : preview
                  }
                  alt="movie preview"
                  className="d-block rounded-circle mt-3 mb-4"
                  style={{ width: "30%", aspectRatio: "1 / 1", objectFit: "cover" }}
                />
                <label htmlFor="formFile" className="form-label btn btn-outline-primary py-2 mb-0">
                  <i className="bi bi-upload me-2"></i>Upload image
                </label>
                <input
                  className="form-control visually-hidden"
                  type="file"
                  id="formFile"
                  onChange={handleSelectFile}
                />
                {updateProfpicMsg && (
                  <p
                    className={`mb-0 mt-2 text-center ${isError ? "text-danger" : "text-success"}`}
                  >
                    {updateProfpicMsg}
                  </p>
                )}
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-danger py-2"
                // data-bs-dismiss="modal"
                onClick={handleDeleteImage}
              >
                Delete image
              </button>
              <button type="button" className="btn btn-primary py-2" onClick={handleUpdateImage}>
                Update image
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
