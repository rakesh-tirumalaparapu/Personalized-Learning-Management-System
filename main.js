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






new task 


[
  { "id": 1, "firstName": "Sundar", "lastName": "Pichai", "email": "sundar.pichai@google.com" },
  { "id": 2, "firstName": "Satya", "lastName": "Nadella", "email": "satya.nadella@microsoft.com" },
  { "id": 3, "firstName": "Jeff", "lastName": "Bezos", "email": "jeff.bezos@amazon.com" },
  { "id": 4, "firstName": "Sergey", "lastName": "Brin", "email": "sergey.brin@google.com" },
  { "id": 5, "firstName": "Larry", "lastName": "Page", "email": "larry.page@google.com" }
]



import { useState } from "react";
// Assuming customers.json is in the correct path relative to components
import initialCustomers from "../assets/customers.json"; 
import CustomerDetails from "./CustomerDetails";
import CustomerForm from "./CustomerForm";

function CustomerList() {
    // FIX 1: Use initialCustomers data for the list
    const [customers, setCustomers] = useState(initialCustomers);
    
    // FIX 2: Add a separate state for the currently selected customer
    const [selectedCustomer, setSelectedCustomer] = useState({});

    // Handler to update the selectedCustomer state when a table row is clicked
    const onCustomerSelect = (e, customer) => {
        e.preventDefault();
        // FIX 3: Use the setter for the selected customer
        setSelectedCustomer(customer); 
    };

    // Handler to add a new customer to the list
    const addCustomer = (newCustomer) => {
        // Create a new customer object with a unique ID
        const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
        const customerWithId = { ...newCustomer, id: newId };
        
        // FIX 4: Correctly update the list state by appending the new customer
        setCustomers([...customers, customerWithId]);
        
        // Optionally select the newly added customer
        setSelectedCustomer(customerWithId);
    };

    // --- Rendering Logic for the Table Rows ---
    // tabRows now uses the 'customers' list state
    const tabRows = customers.map((customer) => {
        return (
            <tr 
                key={customer.id} 
                onClick={(e) => onCustomerSelect(e, customer)}
                // Optional: Highlight the selected row
                className={selectedCustomer.id === customer.id ? "table-active" : ""}
                style={{ cursor: 'pointer' }}
            >
                <td>{customer.id}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
            </tr>
        );
    });

    return (
        // Added 'container' for margins as seen in UI
        <div className="container mt-4"> 
            
            {/* Customer List Table */}
            <div className="row">
                <div className="col-12">
                    <h1>Customers List</h1>
                    {/* Your table code block */}
                    <table className="table table-hover table-bordered table-sm">
                        <thead className="thead-light">
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabRows}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Layout for Form and Details (Two Columns) */}
            <div className="row mt-4">
                
                {/* Left side: Add Customer Form */}
                <div className="col-md-6">
                    <h2>Add Customer</h2>
                    <CustomerForm addCustomer={addCustomer} />
                </div>
                
                {/* Right side: Customer Details */}
                <div className="col-md-6">
                    <h2>Customer Details</h2>
                    {/* FIX 5: Pass the selectedCustomer state */}
                    <CustomerDetails customer={selectedCustomer} />
                </div>
            </div>
        </div>
    );
}

export default CustomerList;





import { useState } from 'react';

function CustomerForm(props) {
    // State for the form inputs
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    // Function to reset the form state
    const resetForm = () => {
        setCustomer({
            firstName: "",
            lastName: "",
            email: ""
        });
    };

    // Updates state whenever an input field changes
    const handleInputChange = (e) => {
        setCustomer({
            ...customer,
            // Uses the input's 'name' attribute to set the corresponding state key
            [e.target.name]: e.target.value 
        });
    };

    // Handles form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // 1. Call the addCustomer function passed from CustomerList
        props.addCustomer(customer); 

        // 2. Clear the form after adding the customer (FIX)
        resetForm();
    };

    return (
        <div>
            <h1>Customer Form</h1>
            <form onSubmit={handleFormSubmit}> 
                
                {/* First Name Input */}
                <div className="form-group mb-3">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text" 
                        id="firstName"
                        name="firstName" 
                        value={customer.firstName}
                        onChange={handleInputChange} 
                        className="form-control"
                    />
                </div>

                {/* Last Name Input */}
                <div className="form-group mb-3">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        id="lastName"
                        name="lastName" 
                        value={customer.lastName}
                        onChange={handleInputChange} 
                        className="form-control"
                    />
                </div>

                {/* Email Input */}
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email" 
                        value={customer.email}
                        onChange={handleInputChange} 
                        className="form-control"
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CustomerForm;



function CustomerDetails(props) {
    const customer = props.customer;

    // Check if the customer object is empty
    if (!customer || Object.keys(customer).length === 0) {
        return (
            <div className="p-3 text-muted">
                <p>Click a row in the Customer List to view details.</p>
            </div>
        );
    }
    
    return (
        <div className="p-3">
            <h1>Customer Details</h1>
            <p>ID : {props.customer.id}</p>
            {/* FIX 1: Corrected mappings */}
            <p>First Name : {props.customer.firstName}</p>
            <p>Last Name : {props.customer.lastName}</p>
            <p>Email: {props.customer.email}</p>
            {/* Removed "Phone" as it's not in the data structure */}
        </div>
    );
}

export default CustomerDetails;


<link 
  rel="stylesheet" 
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" 
  crossorigin="anonymous"
>

            

