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
    <title>Checker Portal Wireframe - Standard Chartered Balanced Color Style</title>
    <style>
        /* --- Standard Chartered-Inspired Wireframe Styling (Balanced Blue & Green) --- */
        body {
            font-family: monospace;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7; /* Off-White Canvas */
            color: #333;
        }

        /* Standard Chartered Palette (Blue and Vibrant Green) */
        :root {
            --sc-blue: #006AA7; /* Primary Dark Blue (Structural) */
            --sc-green: #38C172; /* **Vibrant Green (Secondary Structure/Action)** */
            --sc-text-dark: #333;
            --sc-text-light: #fff;
            --border-color: #ccc; /* Lighter border for clean look */
            --subtle-gray: #e0e0e0; /* Used for neutral blocks */
            --light-blue: #eef2ff;
            --light-green: #e9fff0;
        }

        /* Utility classes for spacing and layout */
        .container {
            width: 95%;
            max-width: 1400px;
            margin: 0 auto;
            padding: 25px 0;
        }

        /* Common block styling - Solid borders */
        .block {
            border: 1px solid var(--border-color); 
            background-color: #fff;
            padding: 10px;
            margin-bottom: 15px;
            box-shadow: 1px 1px 0 0 #ddd; /* Softer shadow */
        }
        
        /* 1. Navbar Block (Primary SC Blue) */
        .navbar-block {
            background-color: var(--sc-blue);
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 25px;
            color: var(--sc-text-light);
            font-weight: bold;
            border: none;
        }

        .nav-links div {
            padding: 5px 10px;
            transition: background-color 0.2s;
        }

        .nav-links div:hover {
            background-color: #008cdb; /* Lighter blue hover */
            cursor: pointer;
            color: #f7f7f7; 
        }

        .nav-links {
            display: flex;
            gap: 20px;
            font-size: 0.95em;
        }

        /* Styling for the new User Dropdown Structure */
        .nav-user {
            position: relative;
            height: 30px;
            line-height: 30px;
            font-size: 0.85em;
            color: var(--sc-text-dark);
            cursor: pointer;
            /* Centering the text horizontally and vertically */
            display: flex;
            align-items: center;
            justify-content: center;
            
            padding-right: 20px; /* Space for the arrow */
            padding-left: 10px;
            
            background-color: var(--subtle-gray);
            border: 1px solid var(--border-color);
            width: 180px; 
            box-sizing: border-box; /* Include padding/border in width */
        }
        .nav-user::after {
            content: '▼'; /* Placeholder for dropdown arrow */
            position: absolute;
            right: 5px;
            font-size: 0.6em;
            top: 50%;
            transform: translateY(-50%);
        }
        .user-dropdown {
            position: absolute;
            top: 30px; 
            right: 0;
            width: 180px;
            background-color: #fff;
            border: 1px solid var(--border-color);
            z-index: 10;
            display: none; /* Hide in wireframe, conceptually a dropdown */
        }
        .user-dropdown div {
            padding: 8px 10px;
            color: var(--sc-text-dark);
            border-bottom: 1px solid #eee;
        }

        /* 2. Banner/Title Block (SC Green for balanced branding) */
        .banner-block {
            background-color: var(--sc-green); /* Use VIBRANT Green for the main banner */
            color: var(--sc-text-light); /* White text on Green background */
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            font-size: 1.1em;
            font-weight: 600;
            border: 1px solid var(--sc-green);
        }

        /* 3. KPI / Metrics Grid */
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
            margin: 25px 0;
        }
        
        @media (max-width: 768px) {
            .kpi-grid {
                grid-template-columns: 1fr;
            }
        }

        .kpi-block {
            padding: 15px;
            height: 90px;
            background-color: #fff; 
        }

        .kpi-label {
            height: 15px;
            width: 100%;
            background-color: transparent;
            margin-bottom: 8px;
            border-bottom: 1px solid var(--border-color);
            color: var(--sc-text-dark); 
            font-size: 0.9em;
        }

        /* Use Blue and Green alternately for KPI values */
        .kpi-value {
            height: 30px;
            width: 40%;
            background-color: var(--sc-blue); /* Default KPI value is Blue */
            border: 1px solid var(--border-color);
            margin-top: 5px;
        }
        
        .kpi-block:nth-child(2) .kpi-value {
            background-color: var(--sc-green); /* Second KPI value is Vibrant Green */
        }
        .kpi-block:nth-child(3) .kpi-value {
            background-color: var(--sc-blue); /* Third KPI value is Blue */
        }

        /* 4. Main Table/Queue Block */
        .table-container {
            padding: 15px;
            min-height: 400px;
        }

        .table-title-block {
            height: 25px;
            width: 300px;
            background-color: #e0e0e0;
            margin-bottom: 15px;
            border: 1px solid var(--border-color);
            line-height: 25px;
            padding-left: 5px;
        }
        
        /* Table Structure */
        .table-row {
            display: flex;
            padding: 8px 0;
            border-bottom: 1px solid #e0e0e0; 
            font-size: 0.9em;
        }
        
        .table-header-row {
            /* Alternating subtle blue and green for the header background */
            background: linear-gradient(90deg, var(--light-blue) 50%, var(--light-green) 100%);
            font-weight: bold;
            padding: 10px 0;
            border-bottom: 2px solid var(--sc-blue); 
            color: var(--sc-text-dark); /* Dark text for readability */
        }

        /* Placeholder styles for data cells */
        .data-placeholder { 
            height: 15px; 
            margin-right: 15px;
            line-height: 15px;
        }

        .table-col-id { width: 10%; }
        .table-col-customer { width: 20%; }
        .table-col-type { width: 10%; }
        .table-col-amount { width: 15%; }
        .table-col-comment { width: 25%; }
        .table-col-actions { width: 15%; display: flex; gap: 10px; }
        
        /* Action buttons in wireframe */
        .action-button-placeholder {
            width: 48%;
            height: 25px;
            background-color: var(--sc-green); /* VIBRANT Green for Approve */
            line-height: 25px;
            text-align: center;
            font-size: 0.8em;
            color: white;
            border: 1px solid var(--sc-text-dark);
        }
        /* Override for Reject (Standard professional Red) */
        .action-button-placeholder:nth-child(2) {
             background-color: #d9534f; 
        }


        .pagination-block {
            height: 30px;
            width: 250px;
            background-color: #e0e0e0;
            margin-top: 20px;
            float: right;
            border: 1px solid var(--border-color);
            line-height: 30px;
            text-align: center;
            font-size: 0.9em;
        }
        
        /* Mobile Visibility for Table */
        @media (max-width: 768px) {
            .table-col-comment {
                display: none;
            }
            .table-col-id { width: 15%; }
            .table-col-customer { width: 30%; }
            .table-col-type { width: 15%; }
            .table-col-amount { width: 20%; }
            .table-col-actions { width: 20%; }
        }
    </style>
</head>
<body>

    <!-- 1. Navbar Block (SC Blue - Structural) -->
    <div class="navbar-block">
        <div>SC BANK - LOS CHECKER</div>
        <div class="nav-links">
            <div>Verified Applications</div>
            <div>Approved</div>
            <div>Rejected</div>
            <div style="position: relative;">Notifications <span style="position: absolute; top: -5px; right: -10px; width: 12px; height: 12px; background-color: red; border-radius: 50%;"></span></div>
        </div>
        
        <!-- User Dropdown Menu -->
        <div class="nav-user">
            User Dropdown Menu
            <div class="user-dropdown">
                <div>My Profile</div>
                <div>Change Password</div>
                <div>Settings</div>
                <div style="color: #d9534f; font-weight: bold;">Logout</div>
            </div>
        </div>
    </div>

    <div class="container">
        
        <!-- 2. Banner Block (SC Green - Balanced Branding) -->
        <div class="banner-block">
            VERIFIED LOAN PROCESSING CENTER
        </div>

        <!-- Section Title -->
        <div style="margin-top: 25px; margin-bottom: 10px; font-size: 1.2em; font-weight: bold; color: var(--sc-blue);">Final Review Queue</div>

        <!-- 3. KPI / Metrics Grid -->
        <div class="kpi-grid">
            <div class="kpi-block block">
                <div class="kpi-label">TOTAL IN QUEUE</div>
                <div class="kpi-value"></div>
            </div>
            <div class="kpi-block block">
                <div class="kpi-label">APPROVALS TODAY</div>
                <div class="kpi-value"></div>
            </div>
            <div class="kpi-block block">
                <div class="kpi-label">SLA RISK</div>
                <div class="kpi-value"></div>
            </div>
        </div>

        <!-- 4. Main Table/Queue Block -->
        <div class="table-container block">
            <div class="table-title-block">Current Workflow Items</div>
            
            <!-- Table Headers -->
            <div class="table-row table-header-row">
                <div class="table-col-id data-placeholder">Loan ID</div>
                <div class="table-col-customer data-placeholder">Customer</div>
                <div class="table-col-type data-placeholder">Type</div>
                <div class="table-col-amount data-placeholder">Amount</div>
                <div class="table-col-comment data-placeholder" style="display: block;">Maker Comment</div>
                <div class="table-col-actions data-placeholder">Actions</div>
            </div>

            <!-- Table Rows (Real Data) -->
            <div class="table-row">
                <div class="table-col-id data-placeholder">LNS-9012</div>
                <div class="table-col-customer data-placeholder">Rhea Sharma</div>
                <div class="table-col-type data-placeholder">Home</div>
                <div class="table-col-amount data-placeholder">45,00,000</div>
                <div class="table-col-comment data-placeholder">All documents verified; clear CIBIL.</div>
                <div class="table-col-actions">
                    <div class="action-button-placeholder">Approve</div>
                    <div class="action-button-placeholder">Reject</div>
                </div>
            </div>
             <div class="table-row">
                <div class="table-col-id data-placeholder">LNS-8955</div>
                <div class="table-col-customer data-placeholder">Arjun Singh</div>
                <div class="table-col-type data-placeholder">Vehicle</div>
                <div class="table-col-amount data-placeholder">8,50,000</div>
                <div class="table-col-comment data-placeholder">Income proof strong; minor address discrepancy.</div>
                <div class="table-col-actions">
                    <div class="action-button-placeholder">Approve</div>
                    <div class="action-button-placeholder">Reject</div>
                </div>
            </div>
             <div class="table-row">
                <div class="table-col-id data-placeholder">LNS-8941</div>
                <div class="table-col-customer data-placeholder">Priya Kulkarni</div>
                <div class="table-col-type data-placeholder">Personal</div>
                <div class="table-col-amount data-placeholder">2,00,000</div>
                <div class="table-col-comment data-placeholder">Self-employed ITR for 2 years attached.</div>
                <div class="table-col-actions">
                    <div class="action-button-placeholder">Approve</div>
                    <div class="action-button-placeholder">Reject</div>
                </div>
            </div>
             <div class="table-row">
                <div class="table-col-id data-placeholder">LNS-8890</div>
                <div class="table-col-customer data-placeholder">Karan Verma</div>
                <div class="table-col-type data-placeholder">Home</div>
                <div class="table-col-amount data-placeholder">95,00,000</div>
                <div class="table-col-comment data-placeholder">High amount, re-verified property papers.</div>
                <div class="table-col-actions">
                    <div class="action-button-placeholder">Approve</div>
                    <div class="action-button-placeholder">Reject</div>
                </div>
            </div>
            
            <div class="pagination-block">Pagination / Page Size Control</div>
        </div>

    </div>

</body>
</html>



