// email.js

document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("jvRFpYauDVYXl4WsI");
    document.getElementById('contact-form').addEventListener('submit', function (event) {
      event.preventDefault();
      // Fetch the form data
      const formData = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
      };
      // Send the email
      emailjs.send("service_dcopfa2", "template_x6i2crl", formData)
        .then(function (response) {
          console.log('Email sent successfully:', response);
          alert('Your message has been sent successfully!');
          document.getElementById('contact-form').reset();
        }, function (error) {
          console.error('Email sending failed:', error);
          alert('Oops! Something went wrong. Please try again later.');
        });
    });
  });


import React from "react";
import ModernSearch from "../ui/ModernSearch";

export default function LoanFilters({ filters, onChange }) {
  return (
    <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
      <ModernSearch
        value={filters.q}
        onChange={(v) => onChange({ ...filters, q: v })}
        onSubmit={() => { /* handled by parent filtering */ }}
        placeholder="Search by name, type, or ID"
      />
    </div>
  );
}


...................................


import React, { useState } from "react";
import { statusBadge } from "../utils/constants";
import Pager from "../ui/Pager";

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

      <small className="text-muted pager-meta d-block mt-2">
        Showing {view.length} of {rows.length} (Page {page} / {totalPages})
      </small>
      <Pager page={page} totalPages={totalPages} onPrev={goPrev} onNext={goNext} />
    </div>
  );
}


.............................
import React, { useState } from "react";
import { approveLoan, rejectLoan } from "../services/api";
import ToggleConfirm from "../ui/ToggleConfirm";

export default function ActionBar({ loan, onApprove, onReject }) {
  const [comments, setComments] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [confirmFinal, setConfirmFinal] = useState(false);

  const ping = () => {
    window.dispatchEvent(new Event("loans-updated"));
    window.dispatchEvent(new Event("notifications-updated"));
  };

  const doApprove = async () => {
    setBusy(true);
    const res = await approveLoan(loan.applicationId, { comments });
    setMsg(res.message);
    setBusy(false);
    setDone(true);
    ping();
    setTimeout(() => onApprove(), 450);
  };

  const doReject = async () => {
    if (!comments.trim()) {
      setMsg("Rejection comments are mandatory.");
      return;
    }
    setBusy(true);
    const res = await rejectLoan(loan.applicationId, { comments });
    setMsg(res.message);
    setBusy(false);
    setDone(true);
    ping();
    setTimeout(() => onReject(), 450);
  };

  const disabled = busy || done || !confirmFinal;

  return (
    <div className="section-card mt-3">
      <div className="alert alert-warning py-2 mb-3">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        This is your <strong>final decision</strong>. Approved items move to system processing; rejected items return to Maker/Customer.
      </div>

      <div className="mb-3">
        <ToggleConfirm id="confirmFinal" checked={confirmFinal} onChange={setConfirmFinal} label={`I confirm this is my final decision for Application #${loan.applicationId}.`} />
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


.......................


import React from "react";

export default function DocumentViewer({ doc }) {
  // Compact attachment tile; preview placeholder by default
  const showImage = false;

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
      </div>
    </div>
  );
}


.........................................


import React, { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import ModernSearch from "../ui/ModernSearch";
import { getNotifications } from "../services/api";

export default function CheckerNavbar({ 
  currentPage, 
  setCurrentPage, 
  searchQuery, 
  setSearchQuery,
  notifications,
  notificationOpen,
  setNotificationOpen,
  userMenuOpen,
  setUserMenuOpen,
  handleLogout
}) {
  const [notifCount, setNotifCount] = useState(0);

  const onSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      // Handle search - you can implement search logic here
      console.log('Searching for:', q);
    }
  };

  useEffect(() => {
    (async () => setNotifCount((await getNotifications()).length))();
    const h = () => getNotifications().then((n) => setNotifCount(n.length));
    window.addEventListener("notifications-updated", h);
    return () => window.removeEventListener("notifications-updated", h);
  }, []);

  // Remove theme toggling per request (force light)
  useEffect(() => { document.documentElement.setAttribute("data-theme", "light"); }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-sc">
      <div className="container">
        <button 
          className="navbar-brand d-flex align-items-center" 
          title="My Queue"
          onClick={() => setCurrentPage('loans')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <img
            src="/assets/sc-logo.png"
            alt="SCB"
            height="64"
            onError={(e) => {
              e.currentTarget.src = "https://www.sc.com/wp-content/themes/standard-chartered/images/standard-chartered-logo.svg";
            }}
          />
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button 
                className={`nav-link ${currentPage === 'loans' ? "active" : ""}`}
                onClick={() => setCurrentPage('loans')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <i className="bi bi-inbox me-1" /> My Queue
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${currentPage === 'history' ? "active" : ""}`}
                onClick={() => {
                  console.log('History clicked, setting page to history');
                  setCurrentPage('history');
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <i className="bi bi-clock-history me-1" /> History
              </button>
            </li>
          </ul>

          <div className="navbar-actions">
            <form className="d-flex" onSubmit={onSearch} role="search">
              <ModernSearch
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={() => {
                  const q = searchQuery.trim();
                  if (q) {
                    console.log('Searching for:', q);
                  }
                }}
                placeholder="Search by name, type, or ID"
              />
            </form>

            <button
              className="btn btn-outline-primary position-relative rounded-pill"
              title="Notifications"
              style={{ marginRight: "0.65rem" }}
              onClick={() => {
                console.log('Notifications clicked, setting page to notifications');
                setCurrentPage('notifications');
              }}
            >
              <i className="bi bi-bell" />
              {notifCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{fontSize:'0.65rem'}}>
                  {notifCount}
                </span>
              )}
            </button>

            <ProfileMenu handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
}

.................................

import React from "react";
import { getCurrentChecker } from "../services/auth";

export default function ProfileMenu({ handleLogout }) {
  const checker = getCurrentChecker();
  return (
    <div className="dropdown">
      <button className="avatar-trigger" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Profile">
        <span className="avatar-initials">{checker.initials}</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <span className="dropdown-item-text text-muted">
            <i className="bi bi-person me-2"></i>
            {checker.name}
          </span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item text-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </li>
      </ul>
    </div>
  );
}


.........................................

import React, { useEffect, useMemo, useState } from "react";
import { getHistory } from "../services/api";
import { decisionBadge } from "../utils/constants";

const toDateInput = (t) => new Date(t).toISOString().slice(0, 10);
const DAYS30 = 1000 * 60 * 60 * 24 * 30;

export default function HistoryPage() {
  const [rows, setRows] = useState([]);
  const [from, setFrom] = useState(toDateInput(Date.now() - DAYS30));
  const [to, setTo] = useState(toDateInput(Date.now()));

  useEffect(() => {
    (async () => setRows(await getHistory()))();
  }, []);

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
              <th>Application ID</th>
              <th>Applicant</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Decision</th>
              <th>When</th>
              <th>Checker</th>
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">No records in this window.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


......................................


import React from "react";
import AttachmentTile from "../ui/AttachmentTile";
import CibilCard from "../ui/CibilCard";
import ActionBar from "../details/ActionBar";

export default function LoanDetailPage({ loan, onBack, onApprove, onReject }) {
  if (!loan) return <div className="section-card">Loading…</div>;
  
  const isPending = loan.status === "PENDING_REVIEW";

  return (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="m-0">Application #{loan.applicationId}</h5>
        <button className="btn btn-outline-secondary" onClick={onBack}>Back</button>
      </div>

      {/* Vertical, organized layout */}
      <div className="mb-3">
        <h6 className="text-muted">Applicant</h6>
        <div className="row g-2">
          <div className="col-6"><small className="text-muted">Name</small><div className="fw-semibold">{loan.fullName || 'N/A'}</div></div>
          <div className="col-6"><small className="text-muted">DOB</small><div>{loan.dob || 'N/A'}</div></div>
          <div className="col-6"><small className="text-muted">Gender</small><div>{loan.gender || 'N/A'}</div></div>
          <div className="col-6"><small className="text-muted">Marital Status</small><div>{loan.maritalStatus || 'N/A'}</div></div>
          <div className="col-6"><small className="text-muted">Phone</small><div>{loan.phone || 'N/A'}</div></div>
          <div className="col-6"><small className="text-muted">Email</small><div>{loan.email || 'N/A'}</div></div>
          <div className="col-12"><small className="text-muted">Address</small><div>{loan.address?.current || 'N/A'}{loan.address?.permanent && ` | Permanent: ${loan.address.permanent}`}</div></div>
        </div>
      </div>

      <div className="mb-3">
        <h6 className="text-muted">Loan</h6>
        <div className="row g-2">
          <div className="col-6"><small className="text-muted">Type</small><div>{loan.loanType || 'N/A'}</div></div>
          <div className="col-6"><small className="text-muted">Amount</small><div className="fw-semibold">₹ {loan.loanAmount ? loan.loanAmount.toLocaleString("en-IN") : 'N/A'}</div></div>
          <div className="col-6"><small className="text-muted">Duration</small><div>{loan.loanDuration ? `${loan.loanDuration} months` : 'N/A'}</div></div>
          <div className="col-12"><small className="text-muted">Purpose</small><div>{loan.purpose || 'N/A'}</div></div>
          <div className="col-12"><small className="text-muted">Status</small><div>{loan.status || 'N/A'}</div></div>
        </div>
      </div>

      {loan.makerComment && (
        <div className="mb-3">
          <h6 className="text-muted">Maker Comment</h6>
          <div className="p-2 rounded" style={{ background: "#f8fafc", border: "1px solid var(--card-border)" }}>{loan.makerComment}</div>
        </div>
      )}

      <div className="mb-3">
        <h6 className="text-muted">Attachments</h6>
        <ul className="list-group">
          {(loan.documents || []).map((d, i) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
              <span className="text-truncate" style={{maxWidth:'70%'}}>{d.name || 'Document'} <span className="badge bg-light text-dark ms-2">{d.tag || 'File'}</span></span>
              <a className="btn btn-sm btn-outline-primary rounded-pill" href={d.url || '#'} target="_blank" rel="noreferrer">Open</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <h6 className="text-muted">CIBIL (mock)</h6>
        <CibilCard score={loan.cibil?.score || 0} risk={loan.cibil?.risk || 'Unknown'} />
      </div>

      {isPending && <ActionBar loan={loan} onApprove={onApprove} onReject={onReject} />}
    </div>
  );
}


...................................

import React, { useEffect, useMemo, useState } from "react";
import LoanFilters from "../dashboard/LoanFilters";
import LoanTable from "../dashboard/LoanTable";
import KPICard from "../ui/KPICard";
import { getLoans, getHistory } from "../services/api";

const toDateInput = (t) => new Date(t).toISOString().slice(0, 10);
const DAYS30 = 1000 * 60 * 60 * 24 * 30;

export default function LoansQueuePage({ onLoanClick, searchQuery, onViewHistory }) {
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [bucket, setBucket] = useState("PENDING");
  const [localQ, setLocalQ] = useState("");
  const [from, setFrom] = useState(toDateInput(Date.now() - DAYS30));
  const [to, setTo] = useState(toDateInput(Date.now()));

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

  const switchBucket = (key) => {
    setBucket(key);
    setLocalQ("");
  };

  const effectiveQ = (localQ !== "" ? localQ : searchQuery || "").toLowerCase();

  const rowsToShow = useMemo(() => {
    const start = new Date(from).setHours(0, 0, 0, 0);
    const end = new Date(to).setHours(23, 59, 59, 999);

    // When a URL/global search is active, search across ALL lists
    if (effectiveQ) {
      const pending = queue
        .filter((r) => r.status === "PENDING_REVIEW")
        .map((r) => ({ ...r, submittedAt: r.submittedAt, status: r.status }));
      const past = history
        .filter((h) => h.timestamp >= start && h.timestamp <= end)
        .map((h) => ({
          applicationId: h.applicationId,
          fullName: h.fullName,
          loanType: h.loanType,
          loanAmount: h.loanAmount,
          submittedAt: h.timestamp,
          status: h.decision,
        }));
      const merged = [...pending, ...past];
      return merged.filter(
        (l) =>
          l.fullName?.toLowerCase().includes(effectiveQ) ||
          l.loanType?.toLowerCase().includes(effectiveQ) ||
          String(l.applicationId).includes(effectiveQ)
      );
    }

    // Otherwise, use the selected bucket view
    if (bucket === "PENDING") {
      return queue
        .filter((r) => r.status === "PENDING_REVIEW")
        .map((r) => ({ ...r, decision: "PENDING_REVIEW" }));
    }

    return history
      .filter((h) => h.decision === bucket && h.timestamp >= start && h.timestamp <= end)
      .map((h) => ({
        applicationId: h.applicationId,
        fullName: h.fullName,
        loanType: h.loanType,
        loanAmount: h.loanAmount,
        submittedAt: h.timestamp,
        status: h.decision,
      }));
  }, [bucket, queue, history, from, to, effectiveQ]);

  const kpi = useMemo(() => {
    const start = new Date(from).setHours(0, 0, 0, 0);
    const end = new Date(to).setHours(23, 59, 59, 999);

    const approved = history.filter((x) => x.decision === "APPROVED" && x.timestamp >= start && x.timestamp <= end).length;
    const rejected = history.filter((x) => x.decision === "REJECTED" && x.timestamp >= start && x.timestamp <= end).length;
    const pending = queue.filter((r) => r.status === "PENDING_REVIEW").length;

    return { pending, approved30: approved, rejected30: rejected };
  }, [queue, history, from, to]);

  const title = bucket === "PENDING" ? "Pending Review" : bucket === "APPROVED" ? "Approved" : "Rejected";

  return (
    <>
      <div className="row g-3">
        <div className="col-6 col-md-4">
          <KPICard active={bucket === "PENDING"} label="Pending Review" value={kpi.pending} icon="bi-hourglass-split" tone="text-primary" onClick={() => switchBucket("PENDING")} />
        </div>
        <div className="col-6 col-md-4">
          <KPICard active={bucket === "APPROVED"} label="Approved" value={kpi.approved30} icon="bi-check2-circle" tone="text-success" onClick={() => switchBucket("APPROVED")} />
        </div>
        <div className="col-6 col-md-4">
          <KPICard active={bucket === "REJECTED"} label="Rejected" value={kpi.rejected30} icon="bi-x-circle" tone="text-danger" onClick={() => switchBucket("REJECTED")} />
        </div>
      </div>

      <div className="section-card mt-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-2">
          <h5 className="m-0">{title}</h5>

          {bucket !== "PENDING" && (
            <div className="d-flex align-items-center gap-2 ms-auto">
              <label className="form-label m-0 small text-muted">From</label>
              <input type="date" className="form-control form-control-sm" value={from} onChange={(e) => setFrom(e.target.value)} />
              <label className="form-label m-0 small text-muted">To</label>
              <input type="date" className="form-control form-control-sm" value={to} onChange={(e) => setTo(e.target.value)} />
              <button
                className="link-soft ms-2"
                style={{whiteSpace:'nowrap', background:'none', border:'none', color:'#0066cc'}}
                onClick={() => onViewHistory && onViewHistory()}
              >
                View full history
              </button>
            </div>
          )}
        </div>

        <LoanFilters filters={{ q: localQ }} onChange={(f) => setLocalQ(f.q)} />

        <LoanTable
          rows={rowsToShow}
          loading={loading}
          onOpen={(id) => {
            const loan = rowsToShow.find(r => r.applicationId === id);
            if (loan) onLoanClick(loan);
          }}
          emptyText={localQ || searchQuery ? "No results found." : "No records to show."}
        />
      </div>
    </>
  );
}


.............................................

import React, { useEffect, useState } from "react";
import { getNotifications } from "../services/api";

export default function NotificationsPage({ notifications, setNotifications }) {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    (async () => {
      const fetchedItems = await getNotifications();
      setItems(fetchedItems);
      if (setNotifications) {
        setNotifications(fetchedItems);
      }
    })();
  }, [setNotifications]);
  return (
    <div className="section-card">
      <h5 className="mb-3">Notifications</h5>
      <ul className="list-group">
        {items.map((n, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-semibold">{n.title}</div>
              <small className="text-muted">{n.message}</small>
            </div>
            <span className={`badge rounded-pill ${n.type === "success" ? "bg-success" : "bg-primary"}`}>{n.type}</span>
          </li>
        ))}
        {items.length === 0 && <li className="list-group-item text-muted">No notifications.</li>}
      </ul>
    </div>
  );
}


........................................

import { getCurrentChecker } from "./auth";

let QUEUE = [
  { applicationId: 200101, fullName: "Ramkumar",  loanType: "Home Loan",     loanAmount: 48000,  submittedAt: Date.now()-86400000,   status: "PENDING_REVIEW" },
  { applicationId: 200102, fullName: "Sita Meda", loanType: "Personal Loan", loanAmount: 250000, submittedAt: Date.now()-86400000*2, status: "PENDING_REVIEW" }
];

let HISTORY = [
  { applicationId: 200001, fullName: "Anil Rao",  loanType: "Vehicle Loan", loanAmount: 780000, decision: "APPROVED", timestamp: Date.now()-86400000*7, checker: "Rakesh T" },
  { applicationId: 200002, fullName: "Meera Shah",loanType: "Home Loan",    loanAmount: 650000, decision: "REJECTED", timestamp: Date.now()-86400000*5, checker: "Rakesh T" }
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
    cibil:{ score:768, risk:"Low" },
    makerComment: "Income proofs verified by Maker; confirm employer tenure."
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


............................

const DEFAULT_NAME = "Rakesh T";

export function getCurrentChecker(){
  const name = localStorage.getItem("checkerName") || DEFAULT_NAME;
  const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return { name, initials };
}


...................................


import React from "react";

export default function AttachmentTile({ name, tag, href, preview = false }) {
  return (
    <div className="border rounded-3 p-2 h-100 hover-lift" style={{ borderColor: "var(--card-border)" }}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <strong className="text-truncate" title={name}>{name}</strong>
        <span className="badge bg-light text-dark">{tag}</span>
      </div>
      <div className="ratio ratio-16x9 bg-light rounded-2 mb-2">
        {preview ? (
          <img alt={name} src={href} className="rounded-2" />
        ) : (
          <div className="d-flex align-items-center justify-content-center text-muted">Preview</div>
        )}
      </div>
      <div className="d-flex gap-2">
        <a className="btn btn-sm btn-outline-primary" href={href} target="_blank" rel="noreferrer">Open</a>
      </div>
    </div>
  );
}


........................


import React from "react";

export default function CibilCard({ score, risk }) {
  return (
    <div className="section-card p-3 d-flex align-items-center justify-content-between hover-lift">
      <div className="d-flex align-items-center gap-3">
        <span className="display-6 fw-bold text-success m-0">{score}</span>
        <div className="fw-semibold">Risk: {risk}</div>
      </div>
      <div className="text-muted small">Latest pull: just now</div>
    </div>
  );
}


..........................

import React from "react";

export default function KPICard({ active = false, label, value, icon, tone = "text-primary", onClick }) {
  return (
    <button
      type="button"
      className={`kpi-card w-100 text-start hover-lift fade-in ${active ? "border border-primary" : ""}`}
      onClick={onClick}
    >
      <div className="text-muted">
        <i className={`bi ${icon} me-1`} /> {label}
      </div>
      <div className={`fw-semibold fs-5 ${tone} kpi-value`}>{value}</div>
    </button>
  );
}


...........................

import React from "react";

export default function ModernSearch({ value, onChange, onSubmit, placeholder = "Search" }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.();
    }
  };
  return (
    <div className="modern-search">
      <i className="bi bi-search ms-2 me-2 text-muted" role="button" onClick={onSubmit} title="Search"></i>
      <input
        className="modern-search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <i className="bi bi-x-circle me-2 text-muted" role="button" title="Clear" onClick={() => onChange?.("")}></i>
      )}
    </div>
  );
}


........................................

import React from "react";

export default function Pager({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pager-responsive mt-2">
      <div className="btn-group" role="group" aria-label="Pagination" style={{gap:'0.5rem'}}>
        <button
          className="btn btn-outline-primary rounded-pill px-3"
          disabled={page === 1}
          onClick={onPrev}
          aria-label="Previous page"
          title="Previous"
        >
          <i className="bi bi-chevron-left me-1" /> Previous
        </button>
        <button
          className="btn btn-primary rounded-pill px-4"
          disabled={page === totalPages}
          onClick={onNext}
          aria-label="Next page"
          title="Next"
        >
          Next <i className="bi bi-chevron-right ms-1" />
        </button>
      </div>
    </div>
  );
}


...............................

import React from "react";

export default function ToggleConfirm({ id, checked, onChange, label }) {
  return (
    <div className="form-check form-switch">
      <input className="form-check-input" type="checkbox" role="switch" id={id} checked={checked} onChange={(e)=>onChange?.(e.target.checked)} />
      <label className="form-check-label" htmlFor={id}>{label}</label>
    </div>
  );
}


....................................



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


.........................................

import React, { useState, useEffect } from "react";
// Temporarily reference existing submodules under userstory5 until full rename is applied
import CheckerNavbar from "./layout/CheckerNavbar";
import LoansQueuePage from "./pages/LoansQueuePage";
import LoanDetailPage from "./pages/LoanDetailPage";
import HistoryPage from "./pages/HistoryPage";
import NotificationsPage from "./pages/NotificationsPage";
import { getLoanById } from "./services/api";

export default function Checker(){
  const [currentPage, setCurrentPage] = useState('loans'); // loans | history | notifications | loan-detail
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize notifications
    setNotifications([]);
    
    // Ensure Bootstrap CSS and Icons are loaded
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    if (!document.querySelector('link[href*="bootstrap@5"]')) {
      document.head.appendChild(bootstrapCSS);
    }
    
    const iconsCSS = document.createElement('link');
    iconsCSS.rel = 'stylesheet';
    iconsCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.css';
    if (!document.querySelector('link[href*="bootstrap-icons"]')) {
      document.head.appendChild(iconsCSS);
    }
  }, []);

  // Handle loan selection for detail view
  const handleLoanClick = async (loan) => {
    if (!loan || !loan.applicationId) {
      console.error('Invalid loan data:', loan);
      return;
    }

    setLoading(true);
    try {
      // Fetch full loan details using the API
      const fullLoanDetails = await getLoanById(loan.applicationId);
      if (fullLoanDetails) {
        setSelectedLoan(fullLoanDetails);
        setCurrentPage('loan-detail');
      } else {
        throw new Error('No loan details found');
      }
    } catch (error) {
      console.error('Error fetching loan details:', error);
      alert('Error loading loan details. Please try again.');
      // Fallback to the basic loan data
      setSelectedLoan(loan);
      setCurrentPage('loan-detail');
    } finally {
      setLoading(false);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    console.log('Back button clicked, current page:', currentPage);
    if (currentPage === 'loan-detail') {
      setCurrentPage('loans');
      setSelectedLoan(null);
    }
  };


  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
      window.location.href = '/';
    }
  };

  return (
    <div className="app" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Checker Navbar */}
      <CheckerNavbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications}
        notificationOpen={notificationOpen}
        setNotificationOpen={setNotificationOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        handleLogout={handleLogout}
      />

      <div className="container py-3">
        {/* Debug info - remove this in production */}
        <div className="alert alert-info mb-3" style={{ fontSize: '0.8rem' }}>
          <strong>Debug:</strong> Current page: {currentPage} | Loading: {loading ? 'Yes' : 'No'} | Selected loan: {selectedLoan ? selectedLoan.applicationId : 'None'}
        </div>
        
        {/* Main Content */}
        <div className="main-content" style={{ minHeight: 'calc(100vh - 200px)' }}>
          {currentPage === 'loans' && (
            <LoansQueuePage
              onLoanClick={handleLoanClick}
              searchQuery={searchQuery}
              onViewHistory={() => setCurrentPage('history')}
            />
          )}

          {currentPage === 'history' && (
            <HistoryPage />
          )}

          {currentPage === 'notifications' && (
            <NotificationsPage
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}

          {currentPage === 'loan-detail' && selectedLoan && !loading && (
            <LoanDetailPage
              loan={selectedLoan}
              onBack={handleBack}
              onApprove={() => {
                alert('Loan approved successfully');
                handleBack();
              }}
              onReject={() => {
                alert('Loan rejected successfully');
                handleBack();
              }}
            />
          )}

          {currentPage === 'loan-detail' && loading && (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading loan details...</p>
            </div>
          )}

          {currentPage === 'loan-detail' && !selectedLoan && (
            <div className="no-loan" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>Select a loan to view details</h3>
              <p>Choose a loan from the queue to view details and take action</p>
              <button
                className="btn btn-primary back-btn"
                onClick={() => setCurrentPage('loans')}
              >
                ← Back to Loans
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


......................

.btn-primary { background: var(--sc-blue); border-color: var(--sc-blue); }
.btn-primary:hover { background: #005bb8; border-color: #005bb8; }
.btn-outline-primary { color: var(--sc-blue); border-color: var(--sc-blue); }
.btn-outline-primary:hover { background: rgba(0,163,224,.1); }

:root {
  --sc-blue: #0066cc;
  --sc-green: #00a859;
  --sc-deep: #004b6b;
  --bg: #eef3f6;
  --card-border: #d7e1ea;
  --surface: #ffffff;
  --text: #1f2937;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}

.app-shell {
  background:
    radial-gradient(1200px 600px at 15% -10%, rgba(0, 163, 224, 0.22), transparent 60%),
    radial-gradient(900px 500px at 110% 0%, rgba(0, 168, 89, 0.18), transparent 60%);
  min-height: 100vh;
}

.navbar-sc { background:#fff; box-shadow:0 1px 6px rgba(0,0,0,0.06); }
.navbar-sc .navbar-nav { display:flex; align-items:center; gap:2rem; }
.navbar-actions { display:flex; align-items:center; gap:1rem; }
.navbar-sc .nav-link { padding:0.25rem 0; color:#374151; }
.navbar-sc .nav-link:hover, .navbar-sc .nav-link:focus { color:var(--sc-green) !important; background:transparent !important; }
.navbar-sc .nav-link.active { color:var(--sc-deep) !important; font-weight:600; border-bottom:2px solid var(--sc-blue); }

.avatar-trigger { border:none; background:transparent; padding:0; outline:none; }
.avatar-initials { width:32px; height:32px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; background:linear-gradient(135deg, rgba(0,168,89,0.7), rgba(0,102,204,0.7)); border:1px solid #d7e1ea; color:#fff; font-weight:700; font-size:12px; letter-spacing:0.3px; }
/* keep bell same size as avatar */
.navbar-actions .btn[title="Notifications"] { height:32px; display:inline-flex; align-items:center; justify-content:center; padding:0 .6rem; border-color: var(--sc-blue); color: var(--sc-blue); }
.navbar-actions .btn[title="Notifications"] i { font-size:16px; }
.navbar-actions .btn[title="Notifications"]:hover { background:#005bb8; border-color:#005bb8; color:#fff; }
.navbar-actions .btn[title="Notifications"]:hover i { color:#fff; }

.section-card { background:var(--surface); border:1px solid var(--card-border); border-radius:12px; box-shadow:0 1px 8px rgba(0,0,0,0.05); padding:1rem; }
.kpi-card { background:linear-gradient(145deg, #fff, #f1f6fb); border:1px solid var(--card-border); border-radius:12px; padding:1rem; box-shadow:inset 0 0 3px rgba(0,0,0,0.04); cursor:pointer; transition:border-color .15s ease, color .15s ease; }
.kpi-card:hover { border-color:var(--sc-blue); }
.kpi-card:hover .text-muted { color:var(--sc-green) !important; }
.kpi-value { opacity:0.9; }
.kpi-value.text-success { color:#1e7e34; } /* subtle, darker green */
.kpi-value.text-danger { color:#842029; } /* subtle, darker red */

/* micro-interactions */
.hover-lift { transition: transform .2s ease, box-shadow .2s ease; }
.hover-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(0,0,0,0.06); }
.fade-in { animation: fadeIn .25s ease-out both; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform:none; } }

.badge-status { font-weight:700; }
.badge-status.pending { background:rgba(0,163,224,0.15); color:var(--sc-deep); }
.badge-status.approved { background:rgba(0,168,89,0.15); color:#0f5132; }
.badge-status.rejected { background:rgba(239,68,68,0.15); color:#991b1b; }

.link-soft { text-decoration:none; padding:0.25rem 0.5rem; border-radius:8px; color:var(--sc-blue); }
.link-soft:hover { color:var(--sc-green); background:rgba(0,168,89,0.08); }

input, textarea, select { border:1px solid #d7e1ea; border-radius:8px; transition:border-color .2s ease; background-color:#fff; }
input:hover, textarea:hover, select:hover { border-color:var(--sc-green); }
input:focus, textarea:focus, select:focus, button:focus, .form-control:focus { outline:none !important; box-shadow:none !important; border-color:#ccc !important; }
::placeholder { color:#9ca3af; font-size:.9rem; }
.search-btn { border:1px solid #d7e1ea; background:#fff; color:var(--sc-blue); border-radius:0 8px 8px 0; transition:background .2s ease; }
.search-btn:hover { background:rgba(0,163,224,0.1); }

.pager-responsive { display:flex; align-items:center; justify-content:space-between; gap:1rem; padding-top:.25rem; }
@media (max-width: 576px) {
  .pager-responsive { flex-wrap:wrap; }
  .pager-responsive .pager-meta { width:100%; order:2; text-align:center; margin-top:.25rem; }
  .pager-responsive .btn-group { width:100%; order:1; display:grid; grid-template-columns:1fr 1fr; gap:.5rem; }
  .pager-responsive .btn-group .btn { width:100%; }
}

/* modern search */
.modern-search { display:flex; align-items:center; background:var(--surface); border:1px solid var(--card-border); border-radius:999px; padding:2px 6px; box-shadow:0 1px 2px rgba(0,0,0,0.04); height:40px; }
.modern-search-input { border:none; outline:none; padding:.35rem .6rem; width:200px; background:transparent; font-size:0.95rem; }

/* Dark theme */
[data-theme="dark"] {
  --bg: #0b1720;
  --surface: #0f2130;
  --card-border: #183446;
  --text: #e5eef5;
}
[data-theme="dark"] .navbar-sc { background:#0f2130; }
[data-theme="dark"] .section-card { box-shadow:none; }
[data-theme="dark"] .modern-search { background:#122636; }
[data-theme="dark"] input, [data-theme="dark"] textarea, [data-theme="dark"] select { background:#0f2130; color:var(--text); border-color:#183446; }


................................

import React from "react";
import Checker from "./components/UserCase5/Checker";

export default function App(){
  return <Checker/>;
}


...........................

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./components/UserCase5/sc-theme.css";

ReactDOM.render(
  <App />,
  document.getElementById("root")
);


      
