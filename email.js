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



javascript code :


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Form</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .main-box {
            border: 2px solid #00aaff;
            padding: 20px;
            margin: 30px auto;
            width: 80%;
            border-radius: 0px;
        }

        label {
            font-weight: bold;
        }

        .form-group {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }

        .form-group label {
            width: 130px;
            text-align: right;
        }

        .form-group input,
        .form-group select {
            flex: 1;
            margin-left: 30px;
        }

        .btn-container {
            margin-left: 160px;
            width: 200px;
            height: 50px;
            background-color: rgb(32, 65, 123);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;;
        }
        .btn-container>button{
            background-color: transparent; 
            border: none;                 
            color: white; 
            font-size: 18px;;
            width: 100%;
            height: 100%;
        }

        .error-message {
            color: #dc3545;
            font-size: 0.875em;
            margin-left: 140px;
            margin-top: 5px;
        }

        /* Responsive styles for small screens */
        @media (max-width: 768px) {
            .main-box {
                width: 95%;
                margin: 15px auto;
                padding: 15px;
            }

            .form-group {
                flex-direction: column;
                align-items: flex-start;
            }

            .form-group label {
                width: 100%;
                text-align: left;
                margin-bottom: 5px;
            }

            .form-group input,
            .form-group select {
                margin-left: 0;
                width: 100%;
            }

            .btn-container {
                margin-left: 0;
                text-align: center;
            }

            .error-message {
                margin-left: 0;
            }

            /* Make table scrollable on small screens */
            .table-responsive {
                overflow-x: auto;
            }

            .table {
                min-width: 600px;
            }
        }

        @media (max-width: 480px) {
            .main-box {
                width: 98%;
                margin: 10px auto;
                padding: 10px;
            }

            .table {
                font-size: 0.875em;
            }
        }
    </style>
</head>

<body>

    <div class="main-box">
        <!-- Form -->
        <form id="customerForm" style="font-weight: bold; margin-left: 50px;">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" class="form-control" placeholder="Enter Name" required>
            </div>

            <div class="form-group">
                <label for="email">Email Id:</label>
                <input type="email" id="email" class="form-control" placeholder="Enter email" required>
            </div>

            <div class="form-group">
                <label for="contact">Contact No:</label>
                <input type="tel" id="contact" class="form-control" placeholder="Enter contact no" required
                    pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number">
            </div>

            <div class="form-group">
                <label for="accountType">Account Type:</label>
                <select id="accountType" class="form-select" required>
                    <option value="">Select account type</option>
                    <option value="savings">savings</option>
                    <option value="current">current</option>
                </select>
            </div>

            <div class="btn-container">
                <button type="submit" >Add Customer</button>
            </div>

            <div id="errorMessage" class="error-message" style="display: none;"></div>
        </form>

        <!-- Table -->
        <div class="table-responsive">
            <table class="table mt-4 table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Account Type</th>
                    </tr>
                </thead>
                <tbody id="customerTable">
                    <!-- Default rows will be loaded from localStorage or default data -->
                </tbody>
            </table>
        </div>
    </div>

    <script>
        // Default customer data
        const defaultCustomers = [
            {
                name: "Sandra Rogers",
                email: "Rogers@gmail.com",
                contact: "9999888877",
                accountType: "savings"
            },
            {
                name: "Steve Casey",
                email: "Casey@gmail.com",
                contact: "8899888877",
                accountType: "current"
            },
            {
                name: "Michelle Michaels",
                email: "Michaels@gmail.com",
                contact: "8899888899",
                accountType: "current"
            }
        ];

        // Load customers from localStorage or use default data
        function loadCustomers() {
            let customers = JSON.parse(localStorage.getItem('customers'));
            if (!customers || customers.length === 0) {
                customers = defaultCustomers;
                localStorage.setItem('customers', JSON.stringify(customers));
            }
            return customers;
        }

        // Save customers to localStorage
        function saveCustomers(customers) {
            localStorage.setItem('customers', JSON.stringify(customers));
        }

        // Display customers in table
        function displayCustomers() {
            const customers = loadCustomers();
            const tableBody = document.getElementById("customerTable");
            tableBody.innerHTML = '';

            customers.forEach(customer => {
                const newRow = tableBody.insertRow();
                newRow.innerHTML = `
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.contact}</td>
                    <td>${customer.accountType}</td>
                `;
            });
        }

        // Validate phone number
        function validatePhoneNumber(phone) {
            const phoneRegex = /^[0-9]{10}$/;
            return phoneRegex.test(phone);
        }

        // Validate email
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Show error message
        function showError(message) {
            const errorDiv = document.getElementById("errorMessage");
            errorDiv.textContent = message;
            errorDiv.style.display = "block";
            setTimeout(() => {
                errorDiv.style.display = "none";
            }, 3000);
        }

        // Form submission handler
        document.getElementById("customerForm").addEventListener("submit", function (e) {
            e.preventDefault();

            // Get values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const contact = document.getElementById("contact").value.trim();
            const accountType = document.getElementById("accountType").value;

            // Validation
            if (!name) {
                showError("Please enter a valid name");
                return;
            }

            if (!validateEmail(email)) {
                showError("Please enter a valid email address");
                return;
            }

            if (!validatePhoneNumber(contact)) {
                showError("Please enter a valid 10-digit phone number");
                return;
            }

            if (!accountType) {
                showError("Please select an account type");
                return;
            }

            // Check for duplicate email or phone
            const customers = loadCustomers();
            const isDuplicate = customers.some(customer =>
                customer.email.toLowerCase() === email.toLowerCase() ||
                customer.contact === contact
            );

            if (isDuplicate) {
                showError("Customer with this email or phone number already exists");
                return;
            }

            // Add new customer
            const newCustomer = { name, email, contact, accountType };
            customers.push(newCustomer);
            saveCustomers(customers);

            // Add row to table
            const table = document.getElementById("customerTable");
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${email}</td>
                <td>${contact}</td>
                <td>${accountType}</td>
            `;

            // Reset form
            document.getElementById("customerForm").reset();
        });

        // Load and display customers when page loads
        document.addEventListener("DOMContentLoaded", function () {
            displayCustomers();
        });

        // Handle responsive form layout
        function handleResponsiveLayout() {
            const form = document.getElementById("customerForm");
            if (window.innerWidth <= 768) {
                form.style.marginLeft = "0";
            } else {
                form.style.marginLeft = "50px";
            }
        }

        // Listen for window resize
        window.addEventListener("resize", handleResponsiveLayout);

        // Initial call
        handleResponsiveLayout();
    </script>

</body>

</html>






