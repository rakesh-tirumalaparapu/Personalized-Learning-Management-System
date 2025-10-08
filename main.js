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


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checker Dashboard - Verified Applications</title>
    <!-- Load Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Load Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        /* --- PROFESSIONAL LIGHT BANKING STYLES (PREMIUM) --- */
        :root {
            --primary-color: #007bff; /* Standard professional blue */
            --light-background: #f8f9fa; /* Very light gray for body */
            --content-background: #ffffff; /* Pure white for cards/content */
            --text-dark: #333333; /* Dark gray for general text */
            --text-muted: #6c757d; /* Standard Bootstrap muted text */
            --accent-blue: #0056b3; /* Darker blue for links/strong accents */
            --success-color: #28a745; /* Professional success green */
            --danger-color: #dc3545; /* Professional danger red */
            --warning-color: #ffc107; /* Standard warning yellow */
            --border-color: #dee2e6;
            
            /* NEW DARK NAVBAR THEME VARIABLES */
            --navbar-dark-bg: #343a40; 
            --navbar-dark-text: #f8f9fa; /* Soft white text */
            --navbar-hover-text: #adb5bd; /* Subtle light gray on hover */
            --navbar-active-bg: #495057; /* Darker active background */
        }

        body {
            background-color: var(--light-background);
            font-family: 'Inter', sans-serif;
            color: var(--text-dark);
            margin-top: 56px; /* Reduced margin for top navbar */
        }

        /* --- New Horizontal Navbar Styling (DARK THEME) --- */
        .top-navbar {
            background-color: var(--navbar-dark-bg); /* Dark background */
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
            z-index: 1030; 
            padding-top: 0; 
            padding-bottom: 0; 
            height: 56px; 
        }
        
        /* Navbar links styling */
        .top-navbar .nav-link {
            color: var(--navbar-dark-text); 
            font-weight: 500;
            padding: 0.7rem 1rem;
            border-radius: 4px;
            transition: color 0.2s, background-color 0.2s;
        }

        /* Hover effect: Subtle text color change */
        .top-navbar .nav-link:not(.active):hover {
            color: var(--navbar-hover-text); /* Subtle text change */
            background-color: rgba(255, 255, 255, 0.05); /* Very subtle background hint */
        }

        /* Active link (Verified Applications) style */
        .top-navbar .nav-link.active {
            color: var(--primary-color); /* Blue indicator text */
            background-color: var(--navbar-active-bg); 
            border-bottom: 3px solid var(--primary-color); 
        }
        
        /* IDENTIFIABLE APPROVED/REJECTED LINKS - REMOVE COLOR OVERRIDE */
        .nav-link.approved-link {
            color: var(--navbar-dark-text) !important; /* Keep text white/subtle */
        }
        .nav-link.rejected-link {
            color: var(--navbar-dark-text) !important; /* Keep text white/subtle */
        }

        /* Hover on Approved/Rejected Links: Use standard subtle hover */
        .nav-link.approved-link:hover,
        .nav-link.rejected-link:hover {
            color: var(--navbar-hover-text) !important; /* Use standard hover text color */
        }
        
        .navbar-brand-custom {
            color: var(--navbar-dark-text) !important; /* White text for logo */
            font-weight: 700;
            padding-top: 0.5rem; 
            padding-bottom: 0.5rem;
        }

        /* Logo badge color update for contrast */
        .navbar-brand-custom .badge {
            background-color: var(--primary-color) !important;
            color: white !important;
        }
        
        /* Dropdown styling for Checker options */
        .dropdown-menu {
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid var(--border-color);
            /* Reset dropdown items to light theme */
            background-color: var(--content-background);
        }
        .dropdown-menu .dropdown-header, .dropdown-menu .dropdown-item {
            color: var(--text-dark);
        }
        .dropdown-item:hover {
            background-color: var(--light-background);
        }
        .dropdown-item:active {
            background-color: var(--primary-color) !important;
            color: white !important;
        }

        /* Fixing Notification Badge position */
        .nav-icon-link {
            position: relative;
            padding-right: 1.5rem !important; /* Add space for the badge */
            color: var(--navbar-dark-text) !important; /* Ensure icon is white */
        }
        .nav-icon-link .badge {
            position: absolute;
            top: 0.4rem; /* Adjust position down */
            right: 0.4rem; /* Adjust position left */
            transform: translate(0, 0);
        }

        /* User profile text in navbar */
        .navbar-nav .dropdown-toggle {
            color: var(--navbar-dark-text) !important;
        }

        /* --- END NAVBAR STYLING --- */


        /* Main Content and Card Styling */
        .content-area {
            padding: 20px; 
            min-height: calc(100vh - 56px); 
        }
        
        .text-primary {
            color: var(--accent-blue) !important;
        }
        
        .text-secondary {
            color: var(--text-muted) !important;
        }

        .card {
            background-color: var(--content-background);
            color: var(--text-dark);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem; 
            margin-bottom: 15px; 
        }

        .card-header-custom {
            background-color: var(--light-background);
            color: var(--text-dark);
            font-weight: 600;
            border-bottom: 1px solid var(--border-color);
            border-radius: 0.5rem 0.5rem 0 0 !important;
            padding: 10px 15px; 
        }

        .data-table-card {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); 
        }

        /* Table Styles for Density */
        .data-table-card .table {
            color: var(--text-dark);
            font-size: 0.9rem; 
            margin-bottom: 0;
        }
        
        .data-table-card .table thead th {
            font-weight: 600;
            color: var(--text-muted); 
            background-color: var(--light-background);
            border-bottom: 2px solid var(--border-color);
            padding: 8px 12px; 
        }
        
        .data-table-card .table tbody tr td {
            padding: 8px 12px; 
        }
        
        .data-table-card .table tbody tr:nth-child(even) {
            background-color: #f5f5f5; 
        }
        .data-table-card .table-hover tbody tr:hover {
            background-color: #e9ecef; 
        }

        /* KPI Card Enhancements */
        .kpi-card {
            border: none;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border-left: 4px solid; 
            transition: transform 0.2s;
            margin-bottom: 15px;
        }
        .kpi-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }
        
        .kpi-card .card-title {
            color: var(--text-muted) !important;
            font-size: 0.8rem; 
        }
        
        .kpi-card .card-text {
            font-size: 1.8rem; 
        }
        
        /* Badges for loan type */
        .badge-loan-type {
            background-color: #e9ecef !important;
            color: var(--accent-blue) !important;
            font-weight: 600;
            padding: 0.4em 0.6em; 
            font-size: 0.75rem;
            border-radius: 0.25rem;
            border: 1px solid #ced4da;
        }

        /* Action Buttons */
        .btn-sm {
            padding: 0.25rem 0.5rem;
            font-size: 0.8rem;
        }

        /* NEW: ACTION BUTTON STYLES FOR SYMMETRY AND CLARITY */
        .action-cell {
            min-width: 90px; /* Ensures cell width is consistent */
            text-align: center; /* Center buttons within the cell */
        }
        .btn-approve, .btn-reject {
            min-width: 85px; /* Fixed width for symmetrical buttons */
            text-align: center;
        }

        .btn-approve {
            background-color: var(--success-color);
            color: white;
            border-color: var(--success-color);
        }
        .btn-approve:hover {
            background-color: #1e7e34; /* Slightly darker green */
            border-color: #1c7430;
            color: white;
        }
        
        .btn-reject {
            background-color: var(--danger-color);
            color: white;
            border-color: var(--danger-color);
        }
        .btn-reject:hover {
            background-color: #bd2130; /* Slightly darker red */
            border-color: #b21f2d;
            color: white;
        }
        /* END: ACTION BUTTON HOVER STYLES */
        
        /* Premium Banner - Highly Condensed */
        .banking-image-container {
            background: linear-gradient(90deg, #f5f5f5 0%, #e9e9e9 100%);
            height: 60px; 
            border-radius: 0.5rem;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
            margin-bottom: 15px; 
            padding: 0 20px; 
        }
        
        .image-text {
            color: var(--accent-blue);
            font-size: 1.2rem; 
            font-weight: 600;
        }
        
        .image-text i {
            font-size: 1.5rem;
            margin-right: 10px;
        }
        
        /* --- RESPONSIVENESS RULES --- */
        
        /* Tablet and Desktop (Default setting for KPI stacking is horizontal) */
        
        /* Mobile Specific Adjustments */
        @media (max-width: 767.98px) {
            .content-area {
                padding: 10px;
            }
            .banking-image-container {
                height: 45px;
                padding: 0 10px;
            }
            .image-text {
                font-size: 1rem;
            }
            .image-text i {
                font-size: 1.2rem;
            }

            /* Stack KPI cards vertically and remove margin bottom on column to reduce space */
            .row .col-md-4 {
                margin-bottom: 10px !important;
            }
            .kpi-card {
                margin-bottom: 5px;
            }
            .kpi-card .card-body {
                padding: 8px 10px !important; /* Reduce padding */
            }
            .kpi-card .card-text {
                font-size: 1.5rem; /* Smaller KPI font */
            }
            .kpi-card .card-title {
                margin-bottom: 0 !important;
            }

            /* Responsive table: Hide less critical columns */
            .data-table-card .table thead th:nth-child(5), /* Maker Comment */
            .data-table-card .table tbody td:nth-child(5) {
                display: none;
            }
            .data-table-card .table tbody td {
                padding: 6px 8px;
                font-size: 0.85rem;
            }
            
            .action-cell {
                min-width: 100px;
                padding-right: 5px;
            }
            .btn-approve, .btn-reject {
                min-width: 45px; /* Allow buttons to shrink slightly */
                padding: 0.2rem 0.3rem;
                font-size: 0.7rem;
                margin: 1px !important;
                display: block; /* Stack buttons vertically in the cell */
                width: 100%;
            }
            .action-cell button.me-2 {
                margin-right: 0 !important;
                margin-bottom: 2px !important;
            }
        }
        
        /* Adjusting main content area to fit view height */
        @media (min-width: 992px) {
            .content-area {
                min-height: calc(100vh - 56px); 
            }
            
            /* Give table a fixed max height to prevent overflow and enable internal scrolling */
            .data-table-card .table-responsive {
                 /* Calculated height based on fixed elements to prevent main page scroll */
                 max-height: calc(100vh - 380px); 
                 overflow-y: auto; 
            }
        }
    </style>
</head>
<body>
    
    <!-- TOP HORIZONTAL NAVBAR (FIXED) -->
    <nav class="navbar navbar-expand-lg top-navbar fixed-top" data-bs-theme="dark">
        <div class="container-fluid">
            <!-- LOGO/BRAND - Always visible on the left -->
            <a class="navbar-brand navbar-brand-custom" href="#">
                LOS <span class="badge bg-primary text-white fs-6">CHECKER</span>
            </a>
            <!-- END LOGO/BRAND -->

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                
                <!-- NAVIGATION LINKS (CENTERED) -->
                <div class="navbar-nav mx-auto">
                    <!-- REMOVED ICONS FROM NAVBAR LINKS -->
                    <a class="nav-link active" aria-current="page" href="#"><i class="bi bi-inbox-fill me-2"></i> Verified Applications</a>
                    <!-- Approved link -->
                    <a class="nav-link approved-link" href="#"> Approved</a>
                    <!-- Rejected link -->
                    <a class="nav-link rejected-link" href="#"> Rejected</a>
                </div>
                
                <!-- USER ACTIONS (RIGHT SIDE) -->
                <div class="navbar-nav ms-auto d-flex align-items-center">
                    
                    <!-- NOTIFICATIONS -->
                    <a class="nav-link nav-icon-link me-3" href="#">
                        <i class="bi bi-bell-fill fs-5"></i>
                        <span class="badge bg-danger rounded-circle position-absolute" id="notificationCount">3</span>
                    </a>
                    
                    <!-- USER PROFILE DROPDOWN (Consolidated) -->
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-circle fs-4 me-2"></i> 
                            <span class="small fw-semibold">John Doe (JD2345)</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><h6 class="dropdown-header">JD2345 - Checker</h6></li>
                            <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i> My Profile</a></li>
                            <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i> Workflow Settings</a></li>
                            <li><a class="dropdown-item" href="#"><i class="bi bi-question-circle me-2"></i> Help & Support</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-box-arrow-right me-2"></i> Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    
    <!-- Main Content Area -->
    <div class="d-flex main-container">
        <main class="flex-grow-1 content-area">

            <!-- Premium Banner - Highly Condensed -->
            <div class="banking-image-container d-flex align-items-center justify-content-between">
                <p class="image-text mb-0">
                    <i class="bi bi-shield-check"></i>
                    VERIFIED LOAN PROCESSING CENTER
                </p>
                <p class="text-muted mb-0 d-none d-sm-block small">Reviewing Applications: 2/6 completed</p>
            </div>

            <h5 class="mb-1 text-dark fw-bolder">Final Review Queue</h5>
            <p class="text-muted small mb-3">Applications verified by the Maker team are listed here for final approval.</p>
            
            <!-- Dashboard Metrics (KPIs) - Condense Margins -->
            <!-- Use col-12 for mobile to force stacking -->
            <div class="row mb-3">
                <div class="col-lg-4 col-md-4 col-12 mb-3">
                    <div class="card kpi-card" style="border-left-color: var(--accent-blue) !important;">
                        <div class="card-body py-2">
                            <h6 class="card-title small fw-semibold mb-1" style="color: var(--accent-blue) !important;"><i class="bi bi-clock-history me-2"></i> TOTAL IN QUEUE</h6>
                            <p class="card-text fs-4 fw-bolder mb-1" id="queueCount">6</p>
                            <span class="text-muted small">Pending action</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-12 mb-3">
                    <div class="card kpi-card" style="border-left-color: var(--success-color) !important;">
                        <div class="card-body py-2">
                            <h6 class="card-title small fw-semibold mb-1" style="color: var(--success-color) !important;"><i class="bi bi-check-circle me-2"></i> APPROVALS TODAY</h6>
                            <p class="card-text fs-4 fw-bolder mb-1">12</p>
                            <span class="text-muted small">Successfully processed</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-12 mb-3">
                    <div class="card kpi-card" style="border-left-color: var(--danger-color) !important;">
                        <div class="card-body py-2">
                            <h6 class="card-title small fw-semibold mb-1" style="color: var(--danger-color) !important;"><i class="bi bi-hourglass-split me-2"></i> SLA RISK</h6>
                            <p class="card-text fs-4 fw-bolder mb-1">2</p>
                            <span class="text-muted small">Approaching service limit</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Verified Applications Table -->
            <div class="card data-table-card flex-grow-1 d-flex flex-column">
                <div class="card-header card-header-custom">
                    <i class="bi bi-table me-2"></i> Applications Pending Final Review
                </div>
                <div class="card-body p-0 flex-grow-1">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead class="bg-light sticky-top">
                                <tr>
                                    <th scope="col">Loan ID</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Amount (INR)</th>
                                    <th scope="col" class="d-none d-sm-table-cell">Maker Comment</th> <!-- Hide on smallest mobile -->
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="applicationTableBody">
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center py-2">
                    <span class="text-muted small">Showing <span id="displayedCount"></span> of <span id="totalCount"></span> applications.</span>
                    <nav aria-label="Page navigation">
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled"><a class="page-link rounded-pill me-1" href="#">&laquo;</a></li>
                            <li class="page-item active"><a class="page-link rounded-pill me-1" href="#">1</a></li>
                            <li class="page-item"><a class="page-link rounded-pill me-1" href="#">2</a></li>
                            <li class="page-item"><a class="page-link rounded-pill" href="#">&raquo;</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

        </main>
    </div>

    <!-- Modal for Approval/Rejection (Wireframe Action) -->
    <div class="modal fade" id="actionModal" tabindex="-1" aria-labelledby="actionModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 shadow-lg">
          <div class="modal-header" id="modalHeader">
            <h5 class="modal-title" id="actionModalLabel">Process Loan <span id="modalLoanId"></span></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="lead text-center fw-bold" id="modalActionText"></p>
            <div class="mb-3">
              <label for="commentTextarea" class="form-label fw-bold"><span id="commentLabel">Checker Comments (Mandatory for Reject)</span></label>
              <textarea class="form-control rounded-3" id="commentTextarea" rows="3" placeholder="Enter reason for rejection or approval notes for the system..."></textarea>
            </div>
            <div class="alert small rounded-3" role="alert" style="background-color: #e9ecef; border-color: #ced4da; color: var(--text-dark);">
                <i class="bi bi-info-circle me-1"></i>
                Finalizing this action updates the database and triggers notifications to the Maker and Customer.
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn action-btn" id="confirmActionButton">Confirm Action</button>
          </div>
        </div>
      </div>
    </div>


    <!-- Load Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Mock data representing applications that have passed the Maker step
        const applications = [
            { id: 'SCW1005', customer: 'Deepak Sharma', type: 'Home Loan', amount: 8500000, comment: 'All documents verified, CIBIL 780. Ready for final check.', status: 'Pending' },
            { id: 'SCW1006', customer: 'Anjali Verma', type: 'Personal Loan', amount: 750000, comment: 'ITR matches salary slips, minor address variance noted (Maker Comment)', status: 'Pending' },
            { id: 'SCW1007', customer: 'Rajesh Patil', type: 'Vehicle Loan', amount: 1200000, comment: 'Vehicle quotation received, employment history confirmed.', status: 'Pending' },
            { id: 'SCW1008', customer: 'Pooja Singh', type: 'Personal Loan', amount: 300000, comment: 'Minor discrepancy in PAN and Aadhaar name spelling. Checker review required.', status: 'Pending' },
            { id: 'SCW1009', customer: 'Vikram K.', type: 'Home Loan', amount: 6000000, comment: 'High-value case, EC clear, Maker recommends approval.', status: 'Pending' },
            { id: 'SCW1010', customer: 'Geeta Iyer', type: 'Vehicle Loan', amount: 950000, comment: 'All documents are clean. Low risk profile.', status: 'Pending' },
            // Adding more entries to necessitate internal table scrolling on large screens
            { id: 'SCW1011', customer: 'Amit Taneja', type: 'Personal Loan', amount: 400000, comment: 'Recent salary increase noted. Good risk profile.', status: 'Pending' },
            { id: 'SCW1012', customer: 'Nisha Soni', type: 'Vehicle Loan', amount: 1500000, comment: 'New application, all docs present.', status: 'Pending' },
            { id: 'SCW1013', customer: 'Babu Rao', type: 'Home Loan', amount: 9000000, comment: 'Requires additional property verification.', status: 'Pending' },
            { id: 'SCW1014', customer: 'Smita Wagh', type: 'Personal Loan', amount: 800000, comment: 'Standard processing, no issues.', status: 'Pending' },
            { id: 'SCW1015', customer: 'Kunal Deshmukh', type: 'Home Loan', amount: 7200000, comment: 'Maker has flagged minor reference issue.', status: 'Pending' }
        ];

        let currentLoanId = null;
        let currentActionType = null;

        document.addEventListener('DOMContentLoaded', () => {
            const tableBody = document.getElementById('applicationTableBody');
            const queueCountSpan = document.getElementById('queueCount');
            const totalCountSpan = document.getElementById('totalCount');
            const displayedCountSpan = document.getElementById('displayedCount');
            const modalElement = document.getElementById('actionModal');
            const modal = new bootstrap.Modal(modalElement);
            
            const pendingCount = applications.filter(a => a.status === 'Pending').length;
            queueCountSpan.textContent = pendingCount;
            totalCountSpan.textContent = pendingCount;
            displayedCountSpan.textContent = pendingCount; // Assuming no pagination is applied in mock

            renderTable();

            function renderTable() {
                tableBody.innerHTML = '';
                applications.forEach(app => {
                    if (app.status === 'Pending') {
                        const row = tableBody.insertRow();
                        row.innerHTML = `
                            <td class="fw-bold text-accent-blue">${app.id}</td>
                            <td>${app.customer}</td>
                            <td><span class="badge badge-loan-type">${app.type.toUpperCase()}</span></td>
                            <td class="fw-semibold">₹ ${app.amount.toLocaleString('en-IN')}</td>
                            <td class="small text-muted d-none d-sm-table-cell" style="max-width: 250px;">${app.comment}</td>
                            <td class="action-cell">
                                <button class="btn btn-sm action-btn btn-approve me-2" onclick="openModal('${app.id}', 'APPROVE')">
                                    Approve
                                </button>
                                <button class="btn btn-sm action-btn btn-reject" onclick="openModal('${app.id}', 'REJECT')">
                                    Reject
                                </button>
                            </td>
                        `;
                    }
                });
            }
            
            // Expose the function globally for button clicks
            window.openModal = (loanId, actionType) => {
                currentLoanId = loanId;
                currentActionType = actionType;
                
                const loan = applications.find(a => a.id === loanId);
                
                const modalHeader = document.getElementById('modalHeader');
                const confirmButton = document.getElementById('confirmActionButton');
                const commentLabel = document.getElementById('commentLabel');
                const commentTextarea = document.getElementById('commentTextarea');
                
                // Get CSS variable values safely
                const successColor = getComputedStyle(document.documentElement).getPropertyValue('--success-color').trim();
                const dangerColor = getComputedStyle(document.documentElement).getPropertyValue('--danger-color').trim();

                document.getElementById('modalLoanId').textContent = loanId;
                document.getElementById('modalActionText').textContent = 
                    `You are about to ${actionType} the loan application for ${loan.customer}.`;
                
                // Set modal style based on action
                if (actionType === 'APPROVE') {
                    // Apply success color
                    modalHeader.className = 'modal-header text-white';
                    modalHeader.style.backgroundColor = successColor;
                    confirmButton.className = 'btn btn-approve action-btn';
                    commentLabel.innerHTML = 'Checker Comments (Optional for Approval)';
                    commentTextarea.required = false;
                } else {
                    // Apply danger color
                    modalHeader.className = 'modal-header text-white';
                    modalHeader.style.backgroundColor = dangerColor;
                    confirmButton.className = 'btn btn-reject action-btn';
                    commentLabel.innerHTML = 'Checker Comments (Mandatory for Rejection)';
                    commentTextarea.required = true;
                }
                
                commentTextarea.value = ''; // Clear previous comments
                
                // Remove error if present before opening modal
                const errorDiv = document.getElementById('modalError');
                if (errorDiv) errorDiv.remove();

                modal.show();
            };

            document.getElementById('confirmActionButton').addEventListener('click', () => {
                const commentText = document.getElementById('commentTextarea').value.trim();
                const commentRequired = currentActionType === 'REJECT';

                if (commentRequired && commentText === '') {
                    // Display error message instead of alert
                    const modalBody = document.querySelector('#actionModal .modal-body');
                    let errorDiv = document.createElement('div');
                    errorDiv.id = 'modalError';
                    errorDiv.className = 'alert alert-danger mb-3';
                    errorDiv.textContent = 'Comment is mandatory for rejection.';
                    
                    // Check if error is already displayed before prepending
                    if (!document.getElementById('modalError')) {
                        modalBody.prepend(errorDiv);
                    }
                    return;
                } else {
                    // Remove error if present
                    const errorDiv = document.getElementById('modalError');
                    if (errorDiv) errorDiv.remove();
                }

                // SIMULATION: Perform action and close modal
                processLoanAction(currentLoanId, currentActionType, commentText);
                modal.hide();
            });

            function processLoanAction(loanId, action, comment) {
                // In a real app, this is where your Java Spring Boot API call happens
                console.log(`[API CALL] Processing Loan ${loanId}: Action=${action}, Comment="${comment}"`);

                const loanIndex = applications.findIndex(app => app.id === loanId);
                if (loanIndex !== -1) {
                    // Update the status in the mock data
                    applications[loanIndex].status = action === 'APPROVE' ? 'Approved' : 'Rejected';
                    applications[loanIndex].checkerComment = comment;

                    // Simulate Notification (Text Requirement) - Using console log instead of alert
                    console.log(`ACTION SUCCESS! Loan ${loanId} ${action === 'APPROVE' ? 'Approved' : 'Rejected'}. Notifications sent to Maker and Customer.`);
                }
                
                // Recalculate and update counts
                const currentPendingCount = applications.filter(a => a.status === 'Pending').length;
                queueCountSpan.textContent = currentPendingCount;
                totalCountSpan.textContent = currentPendingCount;
                displayedCountSpan.textContent = currentPendingCount;
                document.getElementById('notificationCount').textContent = currentPendingCount + 3; // Mock update

                // Re-render the table to remove the processed application
                renderTable();
            }
        });
    </script>
</body>
</html>



