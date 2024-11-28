import React, { useState } from "react";
import "./VisitorTracking.css";

function VisitorTracking() {


    const [visitors, setVisitors] = useState([
        { id: 1, name: "Evelyn Harper", phone: "97852 12369", date: "2024-01-10", unit: "A", unitNumber: "1001", time: "15:45" },
        { id: 2, name: "Wade Warren", phone: "97852 25893", date: "2024-01-11", unit: "B", unitNumber: "1002", time: "02:45" },
        { id: 3, name: "Guy Hawkins", phone: "97589 55563", date: "2024-01-15", unit: "C", unitNumber: "1003", time: "15:00" },
        { id: 4, name: "Evelyn Harper", phone: "97589 55563", date: "2024-01-01", unit: "C", unitNumber: "1003", time: "03:00" },
        { id: 5, name: "Wade Warren", phone: "97589 55563", date: "2024-01-05", unit: "D", unitNumber: "1004", time: "14:00" },
        { id: 6, name: "Guy Hawkins", phone: "97589 55563", date: "2024-01-14", unit: "C", unitNumber: "1003", time: "03:00" },
        { id: 7, name: "Sam Dorsey", phone: "97852 22345", date: "2024-01-23", unit: "B", unitNumber: "1005", time: "13:15" },
        { id: 8, name: "Linda Ray", phone: "97852 66789", date: "2024-01-25", unit: "A", unitNumber: "1006", time: "16:30" },
        { id: 9, name: "James Blair", phone: "97852 33245", date: "2024-01-30", unit: "D", unitNumber: "1007", time: "10:00" },
        { id: 10, name: "Sophia Lee", phone: "97852 87654", date: "2024-02-02", unit: "C", unitNumber: "1008", time: "14:15" },
    ]);
    const [selectedWeek, setSelectedWeek] = useState("All"); // Default to "Week All"

    const getWeekDates = (weekNumber) => {
        const startOfYear = new Date("2024-01-01");
        const startOfWeek = new Date(startOfYear.setDate(startOfYear.getDate() + (weekNumber - 1) * 7));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        return { startOfWeek, endOfWeek };
    };

    const filteredVisitors =
        selectedWeek === "All"
            ? visitors
            : visitors.filter((visitor) => {
                const visitorDate = new Date(visitor.date);
                const { startOfWeek, endOfWeek } = getWeekDates(Number(selectedWeek));
                return visitorDate >= startOfWeek && visitorDate <= endOfWeek;
            });


    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVisitorId, setSelectedVisitorId] = useState(null);
    const [formData, setFormData] = useState({
        visitorName: "",
        wing: "",
        unit: "",
        date: "",
        time: "",
    });

    const handleDeleteClick = (visitorId) => {
        setSelectedVisitorId(visitorId);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedVisitorId(null);
    };

    const handleDeleteConfirm = () => {
        setVisitors((prevVisitors) =>
            prevVisitors.filter((visitor) => visitor.id !== selectedVisitorId)
        );
        handleCloseDeleteModal();
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (
            formData.visitorName &&
            formData.wing &&
            formData.unit &&
            formData.date &&
            formData.time
        ) {
            const newVisitor = {
                id: visitors.length > 0 ? visitors[visitors.length - 1].id + 1 : 1,
                name: formData.visitorName,
                phone: "N/A", // Add phone input if necessary
                date: formData.date,
                unit: formData.wing,
                unitNumber: formData.unit,
                time: formData.time,
            };
            setVisitors([...visitors, newVisitor]);
            setFormData({
                visitorName: "",
                wing: "",
                unit: "",
                date: "",
                time: "",
            });
            setShowModal(false);
        } else {
            alert("Please fill all the fields.");
        }
    };
    const formatTime = (time) => {
        const [hour, minute] = time.split(":").map(Number);
        const isPM = hour >= 12;
        const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
        const meridiem = isPM ? "PM" : "AM";
        return `${formattedHour}:${minute.toString().padStart(2, "0")} ${meridiem}`;
    };



    return (
        <div className="visitor-tracking-container container-fluid p-4" style={{ backgroundColor: "#f5f8fb" }}>
            <div className="row ">
                <div className="col-12 bg-white rounded shadow p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 style={{ fontSize: "20px" }}>Visitor Tracking</h4>
                        <div className="">
                            <select
                                className="btn border me-2 select-week"
                                value={selectedWeek}
                                onChange={(e) => setSelectedWeek(e.target.value)}
                            >
                                <option value="All">Week All</option>
                                <option value="1">Week 1</option>
                                <option value="2">Week 2</option>
                                <option value="3">Week 3</option>
                                <option value="4">Week 4</option>
                                <option value="5">Week 5</option>
                                {/* Add more weeks as needed */}
                            </select>
                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                                + Add Visitor Details
                            </button>
                        </div>
                    </div>

                    {/* Modal for Adding Visitor */}
                    {showModal && (
                        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content bg-white p-3" style={{ maxWidth: "340px" }}>
                                    <h5 className="modal-title ms-3">Add Visitor Details</h5>
                                    <div className="modal-body">
                                        <div className="mb-2">
                                            <label>Visitor Name<span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="visitorName"
                                                value={formData.visitorName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-2 d-flex gap-2">
                                            <div>
                                                <label>Wing<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="wing"
                                                    value={formData.wing}
                                                    onChange={handleInputChange}
                                                    style={{ maxWidth: "150px" }}
                                                />
                                            </div>
                                            <div>
                                                <label>Unit<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="unit"
                                                    value={formData.unit}
                                                    onChange={handleInputChange}
                                                    style={{ maxWidth: "150px" }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-2 d-flex gap-2">
                                            <div style={{ maxWidth: "135px" }}>
                                                <label>Date<span className="text-danger">*</span></label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label>Time<span className="text-danger">*</span></label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    name="time"
                                                    value={formData.time}
                                                    onChange={handleInputChange}
                                                    style={{ maxWidth: "150px" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer p-0" style={{ border: "none" }}>
                                        <button className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ width: "45%" }}>
                                            Cancel
                                        </button>
                                        <button className="btn btn-primary" onClick={handleSave} style={{ width: "45%" }}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Table for Visitors */}
                    <div className="table-responsive scrollable">
                        <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-start" style={{ backgroundColor: "#a3b4ec" }}>Visitor Name</th>
                                    <th className="text-start" style={{ backgroundColor: "#a3b4ec" }}>Phone Number</th>
                                    <th className="text-start" style={{ backgroundColor: "#a3b4ec" }}>Date</th>
                                    <th className="text-start" style={{ backgroundColor: "#a3b4ec" }}>Unit Number</th>
                                    <th className="text-start" style={{ backgroundColor: "#a3b4ec" }}>Time</th>
                                    <th className="text-start" style={{ backgroundColor: "#a3b4ec" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVisitors.length > 0 ? (
                                    filteredVisitors.map((visitor, index) => (
                                        <tr key={visitor.id}>
                                            <td>
                                                <div className="d-flex align-items-center ps-2">
                                                    <img
                                                        src="src/Images/profileImg.png"
                                                        alt="visitor"
                                                        className="rounded-circle me-2"
                                                        style={{ width: "40px", height: "40px" }}
                                                    />
                                                    <span>{visitor.name}</span>
                                                </div>
                                            </td>
                                            <td>{visitor.phone}</td>
                                            <td>{visitor.date}</td>
                                            <td><span className="status open" style={{ fontSize: "14px" }}>{visitor.unit}</span>{visitor.unitNumber}</td>
                                            <td><span className="status time">{formatTime(visitor.time)}</span></td>
                                            <td>
                                                <button className="btn" onClick={() => {
                                                    setSelectedVisitorId(visitor.id);
                                                    setShowDeleteModal(true);
                                                }}>
                                                    <img src="src/Images/delet.png" alt="delete" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No visitors found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                        <div
                            className="modal fade show d-block"
                            tabIndex="-1"
                            role="dialog"
                            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content" style={{ marginTop: "250px" }}>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Delete Visitor?</h5>
                                        <button type="button" className="btn-close" onClick={handleCloseDeleteModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Are you sure you want to delete this visitor?</p>
                                    </div>
                                    <div className="modal-footer d-flex justify-content-between">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            style={{ width: "48%" }}
                                            onClick={handleCloseDeleteModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            style={{ width: "48%" }}
                                            onClick={handleDeleteConfirm}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VisitorTracking;