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


package com.bank.model;

import java.util.concurrent.atomic.AtomicInteger;

public class Customer {
    // For auto-generating customer IDs starting from a base number (e.g., 1000 or 4000)
    private static final AtomicInteger ID_GENERATOR = new AtomicInteger(1000); 

    private final int customerid; // Final since it's auto-generated and immutable
    private String name;
    private String mailid;
    private String contact;
    private String accountType;

    // Parameterized Constructor
    public Customer(String name, String mailid, String contact, String accountType) {
        // Auto-generate ID upon creation
        this.customerid = ID_GENERATOR.getAndIncrement(); 
        this.name = name;
        this.mailid = mailid;
        this.contact = contact;
        this.accountType = accountType;
    }

    // Getters
    public int getCustomerid() {
        return customerid;
    }

    public String getName() {
        return name;
    }

    public String getMailid() {
        return mailid;
    }

    public String getContact() {
        return contact;
    }

    public String getAccountType() {
        return accountType;
    }

    // Overriding toString() for easy display
    @Override
    public String toString() {
        return "Customer Id = " + customerid + 
               ", Customer name = " + name + 
               ", Customer email = " + mailid + 
               ", Customer contact = " + contact + 
               ", Account Type = " + accountType;
    }
}



package com.bank.exception;

// All business rule validation failures will throw this exception.
public class ValidationException extends Exception {
    public ValidationException(String message) {
        super(message);
    }
}


package com.bank.service;

import com.bank.exception.ValidationException;

public class CustomerValidator {

    /**
     * Validates all required fields for a new customer entry.
     * @param name Customer name
     * @param mailid Customer email
     * @param contact Customer 10-digit contact number
     * @param accountType Account type (Savings or Current)
     * @throws ValidationException if any field fails its corresponding validation rule.
     */
    public void validate(String name, String mailid, String contact, String accountType) throws ValidationException {
        // 1. Name validation (only alphabets)
        if (!name.matches("[a-zA-Z\\s]+")) { // Allowing spaces for full names
            throw new ValidationException("Invalid Name: Name can only contain alphabets and spaces.");
        }

        // 2. Email validation (basic regex check)
        if (!mailid.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")) {
            throw new ValidationException("Invalid Email: Email format is invalid or not provided.");
        }

        // 3. Contact validation (must be exactly 10 digits)
        if (!contact.matches("\\d{10}")) {
            throw new ValidationException("Invalid Contact: Contact number must have exactly 10 digits.");
        }

        // 4. Account Type validation (case-insensitive check)
        String standardizedAccountType = accountType.trim().toLowerCase();
        if (!standardizedAccountType.equals("savings") && !standardizedAccountType.equals("current")) {
            throw new ValidationException("Invalid Account Type: Account type must be 'Savings' or 'Current'.");
        }
    }
}


package com.bank.service;

import com.bank.model.Customer;
import java.util.ArrayList;
import java.util.List;

public class CustomerManager {
    // Requirement: Convert array into ArrayList (using List interface for flexibility)
    private List<Customer> customerList = new ArrayList<>();

    // For injecting the Validator dependency (dependency inversion principle)
    private final CustomerValidator validator = new CustomerValidator();

    /**
     * Adds a new customer after successful validation.
     * @param name, mailid, contact, accountType Raw input data.
     * @return The newly created Customer object.
     */
    public Customer addNewCustomer(String name, String mailid, String contact, String accountType) throws Exception {
        // Validation is delegated to the Validator class
        validator.validate(name, mailid, contact, accountType);

        // If validation passes, create the object (which auto-generates the ID)
        Customer newCustomer = new Customer(name, mailid, contact, accountType);
        customerList.add(newCustomer);
        return newCustomer;
    }

    /**
     * Retrieves all customers in the system.
     * @return A list of all customers.
     */
    public List<Customer> getAllCustomers() {
        return customerList;
    }

    /**
     * Searches for a customer by ID.
     * @param customerId The ID to search for.
     * @return The Customer object if found, or null otherwise.
     */
    public Customer searchCustomer(int customerId) {
        // Use stream API for modern, efficient searching
        return customerList.stream()
                           .filter(c -> c.getCustomerid() == customerId)
                           .findFirst()
                           .orElse(null);
    }

    /**
     * Deletes a customer by ID.
     * @param customerId The ID to delete.
     * @return true if a customer was deleted, false otherwise.
     */
    public boolean deleteCustomer(int customerId) {
        // Uses the List removeIf method for concise deletion
        return customerList.removeIf(c -> c.getCustomerid() == customerId);
    }
}

package com.bank.app;

import com.bank.exception.ValidationException;
import com.bank.model.Customer;
import com.bank.service.CustomerManager;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Scanner;

public class BankCustomerManagementSystemApp {

    // Dependency Injection: Manager handles all business logic and data
    private final CustomerManager manager = new CustomerManager();
    private final Scanner scanner = new Scanner(System.in);

    private void displayMenu() {
        System.out.println("\n==============================================");
        System.out.println("Welcome to Standard Chartered Bank");
        System.out.println("Please enter your choice:");
        System.out.println("1 for Add New Customer");
        System.out.println("2 for Display Customers");
        System.out.println("3 for Search Customer");
        System.out.println("4 for Delete Customer");
        System.out.println("5 for Exit the bank application");
        System.out.print("Choice: ");
    }

    private void handleAddCustomer() {
        System.out.println("\nPlease enter customer details:");
        System.out.print("Enter name: ");
        String name = scanner.nextLine().trim();

        System.out.print("Enter email: ");
        String mailid = scanner.nextLine().trim();

        System.out.print("Enter contact (10 digits): ");
        String contact = scanner.nextLine().trim();

        System.out.print("Enter account type (Savings or Current): ");
        String accountType = scanner.nextLine().trim();

        try {
            Customer newCustomer = manager.addNewCustomer(name, mailid, contact, accountType);
            System.out.println("Customer added successfully with customer id " + newCustomer.getCustomerid());
        } catch (ValidationException e) {
            // Requirement: If any condition fails, display the appropriate error message using custom exceptions.
            System.err.println("\n[ERROR] Failed to add customer: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("\n[ERROR] An unexpected error occurred: " + e.getMessage());
        }
    }

    private void handleDisplayCustomers() {
        // Requirement: If user enters 2, display all existing customer details.
        List<Customer> allCustomers = manager.getAllCustomers();
        System.out.println("\n--- All Existing Customers ---");
        if (allCustomers.isEmpty()) {
            System.out.println("No customers currently in the system.");
            return;
        }

        for (Customer customer : allCustomers) {
            System.out.println(customer);
        }
        System.out.println("------------------------------");
    }

    private void handleSearchCustomer() {
        // Requirement: If user enters 3, display the matched customer details.
        System.out.print("\nPlease enter customer id to search: ");
        try {
            // Requirement: Make sure customer id input has to be an integer
            int searchId = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            Customer foundCustomer = manager.searchCustomer(searchId);

            if (foundCustomer != null) {
                System.out.println("\n--- Customer Found ---");
                System.out.println(foundCustomer);
                System.out.println("----------------------");
            } else {
                System.out.println("Customer with ID " + searchId + " not found.");
            }
        } catch (InputMismatchException e) {
            // Requirement: Display the appropriate error message using custom exceptions (or clear error).
            System.err.println("\n[ERROR] Invalid Search ID: Customer ID must be a valid integer.");
            scanner.nextLine(); // Clear the invalid input
        }
    }

    private void handleDeleteCustomer() {
        // Requirement: If user enters 4, delete the matched customer details.
        System.out.print("\nPlease enter customer id to be deleted: ");
        try {
            int deleteId = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            if (manager.deleteCustomer(deleteId)) {
                System.out.println("Deleted customer with id = " + deleteId);
            } else {
                System.out.println("Customer with ID " + deleteId + " not found for deletion.");
            }
        } catch (InputMismatchException e) {
            System.err.println("\n[ERROR] Invalid Deletion ID: Customer ID must be a valid integer.");
            scanner.nextLine(); // Clear the invalid input
        }
    }

    public void startApplication() {
        int choice = 0;
        
        while (choice != 5) {
            displayMenu();
            try {
                choice = scanner.nextInt();
                scanner.nextLine(); // Consume the newline character

                switch (choice) {
                    case 1: handleAddCustomer(); break;
                    case 2: handleDisplayCustomers(); break;
                    case 3: handleSearchCustomer(); break;
                    case 4: handleDeleteCustomer(); break;
                    case 5: 
                        System.out.println("\nApplication exiting. Thank you for using the Bank Customer Management System!");
                        break;
                    default:
                        System.out.println("Invalid choice. Please enter a number between 1 and 5.");
                }
            } catch (InputMismatchException e) {
                System.err.println("\n[ERROR] Invalid Input. Please enter a number for your choice.");
                scanner.nextLine(); // Clear the invalid input
                choice = 0; // Reset choice
            }
        }
        scanner.close();
    }

    public static void main(String[] args) {
        BankCustomerManagementSystemApp app = new BankCustomerManagementSystemApp();
        app.startApplication();
    }
}


