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


import React from "react";
import UserStory5 from "./components/userstory5";
export default function App(){ return <UserStory5/>; }

...............................


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./components/userstory5/sc-theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
.................................................................


:root {
  --sc-blue: #00a3e0;
  --sc-green: #00a859;
  --sc-deep: #004b6b;
  --bg: #eef3f6;
  --card-border: #d7e1ea;
}

/* Body + background gradient */
body {
  background: var(--bg);
  color: #1f2937;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}

.app-shell {
  background:
    radial-gradient(1200px 600px at 15% -10%, rgba(0, 163, 224, 0.22), transparent 60%),
    radial-gradient(900px 500px at 110% 0%, rgba(0, 168, 89, 0.18), transparent 60%);
  min-height: 100vh;
}

/* Navbar */
.navbar-sc {
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
}
.navbar-sc .navbar-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.navbar-sc .nav-link {
  padding: 0.25rem 0;
  color: #374151;
}
.navbar-sc .nav-link:hover,
.navbar-sc .nav-link:focus {
  color: var(--sc-green) !important;
  background: transparent !important;
}
.navbar-sc .nav-link.active {
  color: var(--sc-deep) !important;
  font-weight: 600;
  border-bottom: 2px solid var(--sc-blue);
}

/* Avatar as a clean circle (no button chrome) */
.avatar-trigger {
  border: none;
  background: transparent;
  padding: 0;
  outline: none;
}
.avatar-initials {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--sc-green), var(--sc-blue));
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}

/* Cards */
.section-card {
  background: #fff;
  border: 1px solid var(--card-border);
  border-radius: 12px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
  padding: 1rem;
}
.kpi-card {
  background: linear-gradient(145deg, #fff, #f1f6fb);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.kpi-card:hover {
  border-color: var(--sc-blue);
}
.kpi-card:hover .text-muted {
  color: var(--sc-green) !important;
}

/* Status pills */
.badge-status {
  font-weight: 700;
}
.badge-status.pending {
  background: rgba(0, 163, 224, 0.15);
  color: var(--sc-deep);
}
.badge-status.approved {
  background: rgba(0, 168, 89, 0.15);
  color: #0f5132;
}
.badge-status.rejected {
  background: rgba(239, 68, 68, 0.15);
  color: #991b1b;
}

/* Links */
.link-soft {
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  color: var(--sc-blue);
}
.link-soft:hover {
  color: var(--sc-green);
  background: rgba(0, 168, 89, 0.08);
}

/* ===========================
   INPUT + SEARCH BAR STYLING
   =========================== */

/* Basic input and search bar appearance */
input,
textarea,
select {
  border: 1px solid #d7e1ea;
  border-radius: 8px;
  transition: border-color 0.2s ease;
  background-color: #fff;
}

/* Hover border accent */
input:hover,
textarea:hover,
select:hover {
  border-color: var(--sc-green);
}

/* ✅ REMOVE BLUE FOCUS GLOW */
input:focus,
textarea:focus,
select:focus,
button:focus,
.form-control:focus {
  outline: none !important;
  box-shadow: none !important;
  border-color: #ccc !important;
}

/* Placeholder */
::placeholder {
  color: #9ca3af;
  font-size: 0.9rem;
}

/* Search button next to bar */
.search-btn {
  border: 1px solid #d7e1ea;
  background: #fff;
  color: var(--sc-blue);
  border-radius: 0 8px 8px 0;
  transition: background 0.2s ease;
}
.search-btn:hover {
  background: rgba(0, 163, 224, 0.1);
}

/* Responsive pager for tables */
.pager-responsive {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

@media (max-width: 576px) {
  .pager-responsive {
    flex-wrap: wrap;
  }
  .pager-responsive .pager-meta {
    width: 100%;
    order: 2;
    text-align: center;
    margin-top: 0.25rem;
  }
  .pager-responsive .btn-group {
    width: 100%;
    order: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .pager-responsive .btn-group .btn {
    width: 100%;
  }
}


......................................



import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoansQueuePage from "./pages/LoansQueuePage";
import LoanDetailPage from "./pages/LoanDetailPage";
import HistoryPage from "./pages/HistoryPage";
import NotificationsPage from "./pages/NotificationsPage";
import CheckerNavbar from "./Layout/CheckerNavbar";



export default function UserStory5() {
    
  return (
    <div className="app-shell">
      <CheckerNavbar />
      <div className="container py-3">
        <Routes>
          <Route path="/" element={<Navigate to="/loans" replace />} />
          <Route path="/loans" element={<LoansQueuePage />} />
          <Route path="/loans/:id" element={<LoanDetailPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          
          

        </Routes>
      </div>
    </div>
  );
}


......................................


    

import React from "react";

export default function LoanFilters({ filters, onChange }) {
  return (
    <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
      <div className="input-group" style={{ maxWidth: 420 }}>
        <input
          className="form-control"
          placeholder="Search by name, type, or ID"
          value={filters.q}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
          aria-label="Search by name, type, or ID"
        />
        <span className="input-group-text bg-white">
          <i className="bi bi-search" />
        </span>
      </div>
    </div>
  );
}



.................................


import React, { useState } from "react";
import { statusBadge } from "../utils/constants";

export default function LoanTable({ rows, loading, onOpen, emptyText = "No results found." }) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const view = rows.slice(startIndex, startIndex + pageSize);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th><i className="bi bi-hash me-1" /> Application ID</th>
              <th><i className="bi bi-person me-1" /> Applicant</th>
              <th><i className="bi bi-journal-text me-1" /> Loan Type</th>
              <th><i className="bi bi-cash-coin me-1" /> Amount</th>
              <th><i className="bi bi-calendar2-week me-1" /> Submitted</th>
              <th><i className="bi bi-info-circle me-1" /> Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="text-center text-muted py-3">
                  Loading…
                </td>
              </tr>
            )}

            {!loading && view.map((r) => (
              <tr key={r.applicationId}>
                <td className="fw-semibold">{r.applicationId}</td>
                <td>{r.fullName}</td>
                <td>{r.loanType}</td>
                <td>₹ {r.loanAmount.toLocaleString("en-IN")}</td>
                <td>{new Date(r.submittedAt).toLocaleDateString()}</td>
                <td>{statusBadge(r.status)}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onOpen(r.applicationId)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}

            {!loading && view.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted py-3">
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Responsive pagination footer */}
      <div className="pager-responsive mt-2">
        <small className="text-muted pager-meta">
          Showing {view.length} of {rows.length} (Page {page} / {totalPages})
        </small>

        <div className="btn-group" role="group" aria-label="Pagination">
          <button
            className="btn btn-outline-primary"
            disabled={page === 1}
            onClick={goPrev}
            aria-label="Previous page"
            title="Previous"
          >
            <i className="bi bi-chevron-left me-1" /> Prev
          </button>

          <button
            className="btn btn-outline-primary"
            disabled={page === totalPages}
            onClick={goNext}
            aria-label="Next page"
            title="Next"
          >
            Next <i className="bi bi-chevron-right ms-1" />
          </button>
        </div>
      </div>
    </div>
  );
}


..................................


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { approveLoan, rejectLoan } from "../services/api";

export default function ActionBar({ loan }) {
  const [comments, setComments] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [confirmFinal, setConfirmFinal] = useState(false);
  const navigate = useNavigate();

  const ping = () => {
    window.dispatchEvent(new Event("loans-updated"));
    window.dispatchEvent(new Event("notifications-updated"));
  };

  const doApprove = async () => {
    setBusy(true);
    const res = await approveLoan(loan.applicationId, { comments });
    setMsg(res.message); setBusy(false); setDone(true); ping();
    setTimeout(() => navigate("/loans"), 450);
  };

  const doReject = async () => {
    if (!comments.trim()) { setMsg("Rejection comments are mandatory."); return; }
    setBusy(true);
    const res = await rejectLoan(loan.applicationId, { comments });
    setMsg(res.message); setBusy(false); setDone(true); ping();
    setTimeout(() => navigate("/loans"), 450);
  };

  const disabled = busy || done || !confirmFinal;

  return (
    <div className="section-card mt-3">
      {/* Final decision notice */}
      <div className="alert alert-warning py-2 mb-3">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        This is your <strong>final decision</strong>. Approved items move to system processing; rejected items return to Maker/Customer.
      </div>

      <div className="form-check mb-3">
        <input className="form-check-input" type="checkbox" id="confirmFinal"
               checked={confirmFinal} onChange={(e)=>setConfirmFinal(e.target.checked)} />
        <label className="form-check-label" htmlFor="confirmFinal">
          I confirm this is my final decision for Application #{loan.applicationId}.
        </label>
      </div>

      <div className="mb-2">
        <label className="form-label">Checker Comments</label>
        <textarea
          className={`form-control ${msg && !comments.trim() ? "is-invalid" : ""}`}
          rows="3"
          placeholder="Add reasoning (kept in audit trail)"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          required
          disabled={done}
        />
        <div className="invalid-feedback">Comments are required to reject.</div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-success" disabled={disabled} onClick={doApprove}>
          <i className="bi bi-check2-circle me-1" /> Approve &amp; Send to System
        </button>
        <button className="btn btn-outline-danger" disabled={disabled} onClick={doReject}>
          <i className="bi bi-x-circle me-1" /> Reject to Maker/Customer
        </button>
      </div>

      {msg && <div className="alert alert-info mt-2 py-2 m-0">{msg}</div>}
    </div>
  );
}


..................................................

import React from "react";

export default function DocumentViewer({ doc }) {
  // We ALWAYS show a neutral placeholder (no live image preview for Offer Letter).
  // If you later want previews for other types, toggle by tag/name here.
  const showImage = false; // <- force placeholder for a clean, consistent review UX

  return (
    <div className="border rounded-3 p-2 h-100" style={{ borderColor: "var(--card-border)" }}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <strong className="text-truncate" title={doc.name}>{doc.name}</strong>
        <span className="badge bg-light text-dark">{doc.tag}</span>
      </div>

      <div className="ratio ratio-16x9 bg-light rounded-2 mb-2">
        {showImage ? (
          <img alt={doc.name} src={doc.url} className="rounded-2" />
        ) : (
          <div className="d-flex align-items-center justify-content-center text-muted">Preview</div>
        )}
      </div>

      <div className="d-flex gap-2">
        <a className="btn btn-sm btn-outline-primary" href={doc.url} target="_blank" rel="noreferrer">Open</a>
        {/* Removed Verify per requirement */}
      </div>
    </div>
  );
}


.............................


import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { getNotifications } from "../services/api";

export default function CheckerNavbar(){

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [navQ,setNavQ] = useState("");
  const [notifCount,setNotifCount] = useState(0);

  const onSearch = (e)=>{ e.preventDefault(); const q=navQ.trim(); navigate(q?`/loans?q=${encodeURIComponent(q)}`:"/loans"); };

  useEffect(()=>{ (async()=>setNotifCount((await getNotifications()).length))();
    const h=()=>getNotifications().then(n=>setNotifCount(n.length));
    window.addEventListener("notifications-updated",h);
    return ()=>window.removeEventListener("notifications-updated",h);
  },[]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-sc">
      <div className="container">
        {/* 🔁 Change to your local asset path */}
        <Link to="/loans" className="navbar-brand d-flex align-items-center" title="My Queue">
          <img src="/assets/sc-logo.png" alt="SCB" height="70"
               onError={(e)=>{e.currentTarget.src="https://www.sc.com/wp-content/themes/standard-chartered/images/standard-chartered-logo.svg";}}/>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${pathname.startsWith("/loans")?"active":""}`} to="/loans">
                <i className="bi bi-inbox me-1"/> My Queue
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname.startsWith("/history")?"active":""}`} to="/history">
                <i className="bi bi-clock-history me-1"/> History
              </Link>
            </li>
          </ul>

          <div className="navbar-actions">
            <form className="d-flex" onSubmit={onSearch} role="search">
              <div className="input-group">
                <input className="form-control" placeholder="Search by name, type, or ID"
                       value={navQ} onChange={(e)=>setNavQ(e.target.value)}/>
                <button className="btn btn-outline-primary" type="submit" title="Search"><i className="bi bi-search"></i></button>
              </div>
            </form>

            <Link to="/notifications" className="btn btn-outline-primary position-relative" title="Notifications" style={{marginRight:"0.65rem"}}>
              <i className="bi bi-bell"></i>
              {notifCount>0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">{notifCount}</span>}
            </Link>

            <ProfileMenu/>
          </div>
        </div>
      </div>
    </nav>
  );
}


....................................

import React from "react";
import { getCurrentChecker } from "../services/auth";

export default function ProfileMenu(){
  const checker = getCurrentChecker(); // { name, initials }
  return (
    <div className="dropdown">
      <button className="avatar-trigger" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Profile">
        <span className="avatar-initials">{checker.initials}</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><span className="dropdown-item-text text-muted"><i className="bi bi-person me-2"></i>{checker.name}</span></li>
        <li><hr className="dropdown-divider"/></li>
        <li><a className="dropdown-item text-danger" href="#"><i className="bi bi-box-arrow-right me-2"/>Logout</a></li>
      </ul>
    </div>
  );
}
...........................................

import React, { useEffect, useMemo, useState } from "react";
import { getHistory } from "../services/api";
import { decisionBadge } from "../utils/constants";

const toDateInput = (t) => new Date(t).toISOString().slice(0, 10);
const DAYS30 = 1000 * 60 * 60 * 24 * 30;

export default function HistoryPage() {
  const [rows, setRows] = useState([]);
  const [from, setFrom] = useState(toDateInput(Date.now() - DAYS30));
  const [to, setTo] = useState(toDateInput(Date.now()));

  useEffect(() => { (async () => setRows(await getHistory()))(); }, []);

  const filtered = useMemo(() => {
    const start = new Date(from).setHours(0, 0, 0, 0);
    const end = new Date(to).setHours(23, 59, 59, 999);
    return rows.filter((r) => r.timestamp >= start && r.timestamp <= end);
  }, [rows, from, to]);

  return (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h5 className="m-0">Decision History</h5>
        <div className="d-flex align-items-center gap-2">
          <label className="form-label m-0 small text-muted">From</label>
          <input type="date" className="form-control form-control-sm" value={from} onChange={(e) => setFrom(e.target.value)} />
          <label className="form-label m-0 small text-muted">To</label>
          <input type="date" className="form-control form-control-sm" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Application ID</th><th>Applicant</th><th>Type</th>
              <th>Amount</th><th>Decision</th><th>When</th><th>Checker</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.applicationId}>
                <td className="fw-semibold">{r.applicationId}</td>
                <td>{r.fullName}</td>
                <td>{r.loanType}</td>
                <td>₹ {r.loanAmount.toLocaleString("en-IN")}</td>
                <td>{decisionBadge(r.decision)}</td>
                <td>{new Date(r.timestamp).toLocaleString()}</td>
                <td>{r.checker}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="7" className="text-center text-muted">No records in this window.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}


.............................


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DocumentViewer from "../details/DocumentViewer";
import ActionBar from "../details/ActionBar";
import { getLoanById } from "../services/api";

export default function LoanDetailPage(){
  const {id}=useParams();
  const [loan,setLoan]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{ (async()=>{ setLoading(true); setLoan(await getLoanById(Number(id))); setLoading(false); })(); },[id]);

  if(loading || !loan) return <div className="section-card">Loading…</div>;
  const isPending = loan.status === "PENDING_REVIEW";

  return (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="m-0">Application #{loan.applicationId}</h5>
        <button className="btn btn-outline-secondary" onClick={()=>navigate(-1)}>Back</button>
      </div>

      <div className="row g-3">
        <div className="col-lg-5">
          <h6 className="text-muted">Personal Details</h6>
          <table className="table table-sm">
            <tbody>
              <tr><th>Name</th><td>{loan.fullName}</td></tr>
              <tr><th>DOB</th><td>{loan.dob}</td></tr>
              <tr><th>Gender</th><td>{loan.gender}</td></tr>
              <tr><th>Marital Status</th><td>{loan.maritalStatus}</td></tr>
              <tr><th>Phone</th><td>{loan.phone}</td></tr>
              <tr><th>Email</th><td>{loan.email}</td></tr>
              <tr><th>Address</th><td>{loan.address.current}{loan.address.permanent && ` | Permanent: ${loan.address.permanent}`}</td></tr>
            </tbody>
          </table>

          <h6 className="text-muted mt-3">Loan Details</h6>
          <table className="table table-sm">
            <tbody>
              <tr><th>Type</th><td>{loan.loanType}</td></tr>
              <tr><th>Amount</th><td>₹ {loan.loanAmount.toLocaleString("en-IN")}</td></tr>
              <tr><th>Duration</th><td>{loan.loanDuration} months</td></tr>
              <tr><th>Purpose</th><td>{loan.purpose}</td></tr>
              <tr><th>Status</th><td>{loan.status}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="col-lg-7">
          <h6 className="text-muted">Documents</h6>
          <div className="row g-2">
            {(loan.documents||[]).map((d,i)=>(
              <div className="col-12 col-md-6" key={i}><DocumentViewer doc={d}/></div>
            ))}
          </div>

          <div className="mt-3">
            <h6 className="text-muted">CIBIL (mock)</h6>
            <div className="d-flex align-items-center gap-3">
              <span className="display-6 fw-bold text-success">{loan.cibil.score}</span>
              <div><div className="fw-semibold">Risk: {loan.cibil.risk}</div></div>
            </div>
          </div>

          {/* Only show actions while pending */}
          {isPending && <ActionBar loan={loan}/>}
        </div>
      </div>
    </div>
  );
}


..........................


import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LoanFilters from "../dashboard/LoanFilters";
import LoanTable from "../dashboard/LoanTable";
import { getLoans, getHistory } from "../services/api";

const toDateInput = (t) => new Date(t).toISOString().slice(0, 10);
const DAYS30 = 1000 * 60 * 60 * 24 * 30;

export default function LoansQueuePage() {
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [bucket, setBucket] = useState("PENDING");
  const [localQ, setLocalQ] = useState("");
  const [from, setFrom] = useState(toDateInput(Date.now() - DAYS30));
  const [to, setTo] = useState(toDateInput(Date.now()));

  // Fetch data once
  const refresh = async () => {
    setLoading(true);
    const [q, h] = await Promise.all([getLoans(), getHistory()]);
    setQueue(q);
    setHistory(h);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    const f = () => refresh();
    window.addEventListener("loans-updated", f);
    return () => window.removeEventListener("loans-updated", f);
  }, []);

  // Change section
  const switchBucket = (key) => {
    setBucket(key);
    setLocalQ("");
  };

  const urlQ = params.get("q") || "";
  const effectiveQ = (localQ !== "" ? localQ : urlQ).toLowerCase();

  // Filter rows to display
  const rowsToShow = useMemo(() => {
    let base = [];
    const start = new Date(from).setHours(0, 0, 0, 0);
    const end = new Date(to).setHours(23, 59, 59, 999);

    if (bucket === "PENDING") {
      base = queue
        .filter((r) => r.status === "PENDING_REVIEW")
        .map((r) => ({ ...r, decision: "PENDING_REVIEW" }));
    } else {
      base = history
        .filter(
          (h) =>
            h.decision === bucket &&
            h.timestamp >= start &&
            h.timestamp <= end
        )
        .map((h) => ({
          applicationId: h.applicationId,
          fullName: h.fullName,
          loanType: h.loanType,
          loanAmount: h.loanAmount,
          submittedAt: h.timestamp,
          status: h.decision,
        }));
    }

    if (!effectiveQ) return base;
    return base.filter(
      (l) =>
        l.fullName?.toLowerCase().includes(effectiveQ) ||
        l.loanType?.toLowerCase().includes(effectiveQ) ||
        String(l.applicationId).includes(effectiveQ)
    );
  }, [bucket, queue, history, from, to, effectiveQ]);

  // KPI aligned with visible logic
  const kpi = useMemo(() => {
    const start = new Date(from).setHours(0, 0, 0, 0);
    const end = new Date(to).setHours(23, 59, 59, 999);

    const approved = history.filter(
      (x) =>
        x.decision === "APPROVED" &&
        x.timestamp >= start &&
        x.timestamp <= end
    ).length;

    const rejected = history.filter(
      (x) =>
        x.decision === "REJECTED" &&
        x.timestamp >= start &&
        x.timestamp <= end
    ).length;

    const pending = queue.filter((r) => r.status === "PENDING_REVIEW").length;

    return { pending, approved30: approved, rejected30: rejected };
  }, [queue, history, from, to]);

  const title =
    bucket === "PENDING"
      ? "Pending Review"
      : bucket === "APPROVED"
      ? "Approved"
      : "Rejected";

  return (
    <>
      {/* KPI Cards */}
      <div className="row g-3">
        {[
          ["PENDING", "Pending Review", kpi.pending, "text-primary", "bi-hourglass-split"],
          ["APPROVED", "Approved ", kpi.approved30, "text-success", "bi-check2-circle"],
          ["REJECTED", "Rejected ", kpi.rejected30, "text-danger", "bi-x-circle"],
        ].map(([key, label, val, cls, icon]) => (
          <div className="col-6 col-md-4" key={key}>
            <button
              type="button"
              className={`kpi-card w-100 text-start ${
                bucket === key ? "border border-primary" : ""
              }`}
              onClick={() => switchBucket(key)}
            >
              <div className="text-muted">
                <i className={`bi ${icon} me-1`} /> {label}
              </div>
              <div className={`fw-bold fs-5 ${cls}`}>{val}</div>
            </button>
          </div>
        ))}
      </div>

      <div className="section-card mt-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-2">
          <h5 className="m-0">{title}</h5>

          {bucket !== "PENDING" && (
            <div className="d-flex align-items-center gap-2 ms-auto">
              <label className="form-label m-0 small text-muted">From</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
              <label className="form-label m-0 small text-muted">To</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
              <Link to="/history" className="link-soft ms-2">
                View full history
              </Link>
            </div>
          )}
        </div>

        <LoanFilters
          filters={{ q: localQ }}
          onChange={(f) => setLocalQ(f.q)}
        />

        <LoanTable
          rows={rowsToShow}
          loading={loading}
          onOpen={(id) => navigate(`/loans/${id}`)}
          emptyText={
            localQ || urlQ ? "No results found." : "No records to show."
          }
        />
      </div>
    </>
  );
}


.............................................

import React, { useEffect, useState } from "react";
import { getNotifications } from "../services/api";

export default function NotificationsPage(){
  const [items,setItems]=useState([]);
  useEffect(()=>{ (async()=>setItems(await getNotifications()))(); },[]);
  return (
    <div className="section-card">
      <h5 className="mb-3">Notifications</h5>
      <ul className="list-group">
        {items.map((n,i)=>(
          <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-semibold">{n.title}</div>
              <small className="text-muted">{n.message}</small>
            </div>
            <span className={`badge rounded-pill ${n.type==="success"?"bg-success":"bg-primary"}`}>{n.type}</span>
          </li>
        ))}
        {items.length===0 && <li className="list-group-item text-muted">No notifications.</li>}
      </ul>
    </div>
  );
}


.................................

import { getCurrentChecker } from "./auth";

let QUEUE = [
  { applicationId: 200101, fullName: "Ramkumar",  loanType: "Home Loan",     loanAmount: 48000,  submittedAt: Date.now()-86400000,   status: "PENDING_REVIEW" },
  { applicationId: 200102, fullName: "Sita Meda", loanType: "Personal Loan", loanAmount: 250000, submittedAt: Date.now()-86400000*2, status: "PENDING_REVIEW" }
];

let HISTORY = [
  { applicationId: 200001, fullName: "Anil Rao",  loanType: "Vehicle Loan", loanAmount: 780000, decision: "APPROVED", timestamp: Date.now()-86400000*7, checker: "Tarun V" },
  { applicationId: 200002, fullName: "Meera Shah",loanType: "Home Loan",    loanAmount: 650000, decision: "REJECTED", timestamp: Date.now()-86400000*5, checker: "Tarun V" }
];

let NOTIFS = [
  { title:"New submission", message:"Application #200102 by Sita Meda is ready for review.", type:"info", ts: Date.now()-3600000*5 },
  { title:"Approved", message:"Application #200001 approved successfully.", type:"success", ts: Date.now()-3600000*20 }
];

const addNotification = (type, title, message) => { NOTIFS.unshift({ type, title, message, ts: Date.now() }); };

export async function getLoans(){ return [...QUEUE]; }
export async function getHistory(){ return [...HISTORY]; }
export async function getNotifications(){ return [...NOTIFS]; }

export async function getLoanById(id){
  const q = QUEUE.find(x=>x.applicationId===id);
  const h = HISTORY.find(x=>x.applicationId===id);
  const base = q || h || {};
  const status = q ? "PENDING_REVIEW" : h ? h.decision : "UNKNOWN";

  return {
    applicationId:id,
    status,
    fullName: base.fullName || "Ramkumar",
    dob:"12/06/1963", gender:"Male", maritalStatus:"Married",
    phone:"+91 9876543210", email:"ram@example.com",
    address:{ current:"Kelambakkam, Chennai", permanent:"Same" },
    loanType: base.loanType || "Home Loan",
    loanAmount: base.loanAmount || 48000, loanDuration:120, purpose:"Flat purchase",
    documents:[
      { name:"ITR_2023.pdf",   tag:"ITR",            url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
      { name:"Bank_6M.pdf",    tag:"Bank Statement", url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
      { name:"Offer_Letter.jpg",tag:"Employment",     url:"https://picsum.photos/seed/offer/600/360" }
    ],
    cibil:{ score:768, risk:"Low" }
  };
}

export async function approveLoan(id, body){
  const idx = QUEUE.findIndex(x => x.applicationId === id);
  if (idx >= 0) {
    const item = QUEUE.splice(idx,1)[0];
    const checker = getCurrentChecker().name;
    HISTORY.unshift({
      applicationId:item.applicationId, fullName:item.fullName, loanType:item.loanType, loanAmount:item.loanAmount,
      decision:"APPROVED", timestamp:Date.now(), checker, comments: body?.comments || ""
    });
    addNotification("success","Loan approved",`Application #${id} (${item.fullName}) approved.`);
  }
  return { ok:true, message:`Application ${id} approved.` };
}

export async function rejectLoan(id, body){
  if(!body?.comments) return { ok:false, message:"Comments required." };
  const idx = QUEUE.findIndex(x => x.applicationId === id);
  if (idx >= 0) {
    const item = QUEUE.splice(idx,1)[0];
    const checker = getCurrentChecker().name;
    HISTORY.unshift({
      applicationId:item.applicationId, fullName:item.fullName, loanType:item.loanType, loanAmount:item.loanAmount,
      decision:"REJECTED", timestamp:Date.now(), checker, comments: body.comments
    });
    addNotification("info","Loan rejected",`Application #${id} (${item.fullName}) rejected.`);
  }
  return { ok:true, message:`Application ${id} rejected.` };
}


.....................

const DEFAULT_NAME = "Tarun V";

export function getCurrentChecker(){
  const name = localStorage.getItem("checkerName") || DEFAULT_NAME;
  const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return { name, initials };
}

/* Optional helper to set it from a login page later:
   localStorage.setItem("checkerName", "Your Name"); */


..................................................




import React from "react";

export function statusBadge(status){
  const map = {
    PENDING_REVIEW: { cls:"badge badge-status pending",  label:"PENDING REVIEW" },
    APPROVED:       { cls:"badge badge-status approved", label:"APPROVED" },
    REJECTED:       { cls:"badge badge-status rejected", label:"REJECTED" }
  };
  const info = map[status]; if(!info) return status;
  return React.createElement("span",{className:info.cls},info.label);
}

export function decisionBadge(decision){
  const cls = decision === "APPROVED" ? "badge bg-success" : "badge bg-danger";
  return React.createElement("span",{className:cls},decision);
}
