const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>{
container.classList.add('right-panel-active');});

signInButton.addEventListener('click', () =>{
container.classList.remove('right-panel-active');});

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const loginSuccess = urlParams.has('login_success');
    const signupSuccess = urlParams.has('signup_success');
    const loginFail = urlParams.has('error') && urlParams.get('error') === 'login_fail';
    const signupFail = urlParams.has('error') && urlParams.get('error') === 'signup_fail';

    if (loginSuccess) {
        alert('Logged in successfully!');
    } else if (signupSuccess) {
        alert('Signed up successfully!');
    } else if (loginFail) {
        alert('Incorrect email or password. Please try again.');
    } else if (signupFail) {
        alert('User already registered or registration failed. Please try again.');
    }

});





import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal } from "bootstrap";

export default function CheckerDashboard() {
  const initialApplications = [
    { id: "SCW1005", customer: "Deepak Sharma", type: "Home Loan", amount: 8500000, comment: "All documents verified, CIBIL 780. Ready for final check.", status: "Pending" },
    { id: "SCW1006", customer: "Anjali Verma", type: "Personal Loan", amount: 750000, comment: "ITR matches salary slips, minor address variance noted (Maker Comment)", status: "Pending" },
    { id: "SCW1007", customer: "Rajesh Patil", type: "Vehicle Loan", amount: 1200000, comment: "Vehicle quotation received, employment history confirmed.", status: "Pending" },
    { id: "SCW1008", customer: "Pooja Singh", type: "Personal Loan", amount: 300000, comment: "Minor discrepancy in PAN and Aadhaar name spelling. Checker review required.", status: "Pending" },
    { id: "SCW1009", customer: "Vikram K.", type: "Home Loan", amount: 6000000, comment: "High-value case, EC clear, Maker recommends approval.", status: "Pending" },
    { id: "SCW1010", customer: "Geeta Iyer", type: "Vehicle Loan", amount: 950000, comment: "All documents are clean. Low risk profile.", status: "Pending" },
    { id: "SCW1011", customer: "Amit Taneja", type: "Personal Loan", amount: 400000, comment: "Recent salary increase noted. Good risk profile.", status: "Pending" },
    { id: "SCW1012", customer: "Nisha Soni", type: "Vehicle Loan", amount: 1500000, comment: "New application, all docs present.", status: "Pending" },
    { id: "SCW1013", customer: "Babu Rao", type: "Home Loan", amount: 9000000, comment: "Requires additional property verification.", status: "Pending" },
    { id: "SCW1014", customer: "Smita Wagh", type: "Personal Loan", amount: 800000, comment: "Standard processing, no issues.", status: "Pending" },
    { id: "SCW1015", customer: "Kunal Deshmukh", type: "Home Loan", amount: 7200000, comment: "Maker has flagged minor reference issue.", status: "Pending" },
  ];

  const [applications, setApplications] = useState(initialApplications);
  const [currentLoan, setCurrentLoan] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);
  const [comment, setComment] = useState("");
  const [modalInstance, setModalInstance] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const modalEl = document.getElementById("actionModal");
    if (modalEl) setModalInstance(new Modal(modalEl));
  }, []);

  const openModal = (loan, action) => {
    setCurrentLoan(loan);
    setCurrentAction(action);
    setComment("");
    setError("");
    modalInstance?.show();
  };

  const handleConfirm = () => {
    if (currentAction === "REJECT" && !comment.trim()) {
      setError("Comment is mandatory for rejection.");
      return;
    }
    setError("");

    const updatedApps = applications.map((a) =>
      a.id === currentLoan.id
        ? {
            ...a,
            status: currentAction === "APPROVE" ? "Approved" : "Rejected",
            checkerComment: comment.trim(),
          }
        : a
    );

    setApplications(updatedApps);
    modalInstance?.hide();
  };

  const pendingApps = applications.filter((a) => a.status === "Pending");

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg top-navbar fixed-top" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand navbar-brand-custom" href="#">
            LOS <span className="badge bg-primary text-white fs-6">CHECKER</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto">
              <a className="nav-link active" href="#">
                <i className="bi bi-inbox-fill me-2"></i> Verified Applications
              </a>
              <a className="nav-link approved-link" href="#">Approved</a>
              <a className="nav-link rejected-link" href="#">Rejected</a>
            </div>

            <div className="navbar-nav ms-auto d-flex align-items-center">
              <a className="nav-link nav-icon-link me-3" href="#">
                <i className="bi bi-bell-fill fs-5"></i>
                <span className="badge bg-danger rounded-circle position-absolute">{pendingApps.length + 3}</span>
              </a>

              <div className="dropdown">
                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle fs-4 me-2"></i>
                  <span className="small fw-semibold">John Doe (JD2345)</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><h6 className="dropdown-header">JD2345 - Checker</h6></li>
                  <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i> My Profile</a></li>
                  <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i> Workflow Settings</a></li>
                  <li><a className="dropdown-item" href="#"><i className="bi bi-question-circle me-2"></i> Help & Support</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item text-danger" href="#"><i className="bi bi-box-arrow-right me-2"></i> Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="content-area">
        <div className="banking-image-container d-flex align-items-center justify-content-between">
          <p className="image-text mb-0">
            <i className="bi bi-shield-check"></i> VERIFIED LOAN PROCESSING CENTER
          </p>
          <p className="text-muted mb-0 d-none d-sm-block small">Reviewing Applications: 2/6 completed</p>
        </div>

        <h5 className="mb-1 text-dark fw-bolder">Final Review Queue</h5>
        <p className="text-muted small mb-3">Applications verified by the Maker team are listed here for final approval.</p>

        {/* KPIs */}
        <div className="row mb-3">
          <KpiCard title="TOTAL IN QUEUE" value={pendingApps.length} icon="clock-history" color="var(--accent-blue)" note="Pending action" />
          <KpiCard title="APPROVALS TODAY" value="12" icon="check-circle" color="var(--success-color)" note="Successfully processed" />
          <KpiCard title="SLA RISK" value="2" icon="hourglass-split" color="var(--danger-color)" note="Approaching service limit" />
        </div>

        {/* TABLE */}
        <div className="card data-table-card">
          <div className="card-header card-header-custom">
            <i className="bi bi-table me-2"></i> Applications Pending Final Review
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light sticky-top">
                  <tr>
                    <th>Loan ID</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Amount (INR)</th>
                    <th className="d-none d-sm-table-cell">Maker Comment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApps.map((app) => (
                    <tr key={app.id}>
                      <td className="fw-bold">{app.id}</td>
                      <td>{app.customer}</td>
                      <td><span className="badge badge-loan-type">{app.type.toUpperCase()}</span></td>
                      <td className="fw-semibold">₹ {app.amount.toLocaleString("en-IN")}</td>
                      <td className="small text-muted d-none d-sm-table-cell">{app.comment}</td>
                      <td className="action-cell">
                        <button className="btn btn-sm btn-approve me-2" onClick={() => openModal(app, "APPROVE")}>Approve</button>
                        <button className="btn btn-sm btn-reject" onClick={() => openModal(app, "REJECT")}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center py-2">
            <span className="text-muted small">Showing {pendingApps.length} of {pendingApps.length} applications.</span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled"><a className="page-link rounded-pill me-1" href="#">&laquo;</a></li>
                <li className="page-item active"><a className="page-link rounded-pill me-1" href="#">1</a></li>
                <li className="page-item"><a className="page-link rounded-pill me-1" href="#">2</a></li>
                <li className="page-item"><a className="page-link rounded-pill" href="#">&raquo;</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </main>

      {/* MODAL */}
      <div className="modal fade" id="actionModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow-lg">
            <div
              className="modal-header text-white"
              style={{
                backgroundColor:
                  currentAction === "APPROVE"
                    ? "var(--success-color)"
                    : currentAction === "REJECT"
                    ? "var(--danger-color)"
                    : "#0d6efd",
              }}
            >
              <h5 className="modal-title">
                Process Loan <span>{currentLoan?.id}</span>
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="lead text-center fw-bold">
                {currentLoan
                  ? `You are about to ${currentAction} the loan application for ${currentLoan.customer}.`
                  : ""}
              </p>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  {currentAction === "REJECT"
                    ? "Checker Comments (Mandatory for Rejection)"
                    : "Checker Comments (Optional for Approval)"}
                </label>
                <textarea
                  className="form-control rounded-3"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter reason for rejection or approval notes..."
                />
              </div>

              {error && <div className="alert alert-danger mb-3">{error}</div>}

              <div
                className="alert small rounded-3"
                style={{ backgroundColor: "#e9ecef", color: "var(--text-dark)" }}
              >
                <i className="bi bi-info-circle me-1"></i>
                Finalizing this action updates the database and triggers notifications to the Maker and Customer.
              </div>
            </div>

            <div className="modal-footer justify-content-between">
              <button className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className={`btn ${currentAction === "REJECT" ? "btn-reject" : "btn-approve"} rounded-pill`}
                onClick={handleConfirm}
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, color, note }) {
  return (
    <div className="col-lg-4 col-md-4 col-12 mb-3">
      <div className="card kpi-card" style={{ borderLeftColor: color }}>
        <div className="card-body py-2">
          <h6 className="card-title small fw-semibold mb-1" style={{ color }}>
            <i className={`bi bi-${icon} me-2`}></i> {title}
          </h6>
          <p className="card-text fs-4 fw-bolder mb-1">{value}</p>
          <span className="text-muted small">{note}</span>
        </div>
      </div>
    </div>
  );
}

