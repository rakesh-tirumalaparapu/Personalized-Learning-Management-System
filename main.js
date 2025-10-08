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


import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.InputMismatchException;

// --- Customer Class ---
class Customer {
    private static int nextCustomerId = 1000; // Starting ID for auto-generation

    private int customerId;
    private String name;
    private String contact;
    private String mailId;
    private String accountType; // Savings or Current

    // Constructor to create a new customer with auto-generated ID
    public Customer(String name, String contact, String mailId, String accountType) {
        this.customerId = nextCustomerId++;
        this.name = name;
        this.contact = contact;
        this.mailId = mailId;
        this.accountType = accountType;
    }

    // Getters for display
    public int getCustomerId() {
        return customerId;
    }

    public String getName() {
        return name;
    }

    public String getContact() {
        return contact;
    }

    public String getMailId() {
        return mailId;
    }

    public String getAccountType() {
        return accountType;
    }

    // toString method for easy display of customer details
    @Override
    public String toString() {
        return String.format(
            "Customer ID = %d, Customer name = %s, Customer email = %s, Customer contact = %s, Account Type = %s",
            customerId, name, mailId, contact, accountType
        );
    }
}


// --- BankCustomerManagementSystem Class ---
public class BankCustomerManagementSystem {

    private static List<Customer> customerList = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);

    // --- Main application logic ---
    public static void main(String[] args) {
        // Pre-populate with some data as shown in the image for testing
        customerList.add(new Customer("Sandra", "7788990011", "Sandra@gmail.com", "Savings"));
        customerList.add(new Customer("Michelle", "9988776655", "Michelle@gmail.com", "Current"));
        customerList.add(new Customer("Steve", "5544332211", "Steve@gmail.com", "Savings"));
        
        int choice;

        do {
            displayMenu();
            try {
                System.out.print("Please enter your choice: ");
                choice = scanner.nextInt();
                scanner.nextLine(); // Consume newline left over after nextInt()

                switch (choice) {
                    case 1:
                        addCustomer();
                        break;
                    case 2:
                        displayAllCustomers();
                        break;
                    case 3:
                        searchCustomer();
                        break;
                    case 4:
                        deleteCustomer();
                        break;
                    case 5:
                        System.out.println("\nExiting the application. Thank you for using Standard Chartered Bank System.");
                        break;
                    default:
                        System.out.println("Invalid choice. Please enter a number between 1 and 5.");
                }
            } catch (InputMismatchException e) {
                System.out.println("Error: Invalid input. Please enter a number for your choice.");
                scanner.nextLine(); // Clear the buffer
                choice = 0; // Set choice to 0 to re-run the loop
            } catch (Exception e) {
                System.out.println("An unexpected error occurred: " + e.getMessage());
                choice = 0;
            }
            
            System.out.println("-------------------------------------------------------");

        } while (choice != 5);
        
        scanner.close();
    }

    // --- Menu Display ---
    private static void displayMenu() {
        System.out.println("\nWelcome to Standard Chartered Bank");
        System.out.println("1 for Add new Customer");
        System.out.println("2 for Display Customers");
        System.out.println("3 for Search Customer");
        System.out.println("4 for Delete Customer");
        System.out.println("5 for Exit the bank application");
    }

    // --- Customer Data Validation ---
    private static boolean validate(String name, String contact, String mailId, String accountType) {
        // 1. Name validation: Only alphabets
        if (!name.matches("[a-zA-Z\\s]+")) {
            System.err.println("Validation Error: Customer name must contain only alphabets.");
            return false;
        }

        // 2. Contact validation: Exactly 10 digits
        if (!contact.matches("\\d{10}")) {
            System.err.println("Validation Error: Contact number must be exactly 10 digits.");
            return false;
        }

        // 3. Email validation: Basic format check
        if (!mailId.matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$")) {
            System.err.println("Validation Error: Email should be a valid format (e.g., example@domain.com).");
            return false;
        }

        // 4. Account Type validation: Either 'Savings' or 'Current' (case-insensitive)
        String standardizedAccountType = accountType.toLowerCase();
        if (!standardizedAccountType.equals("savings") && !standardizedAccountType.equals("current")) {
            System.err.println("Validation Error: Account type must be either 'Savings' or 'Current'.");
            return false;
        }

        return true; // All validations passed
    }
    
    // --- 1: Add Customer ---
    private static void addCustomer() {
        System.out.println("\n--- Add New Customer Details ---");
        
        System.out.print("Enter name: ");
        String name = scanner.nextLine().trim();

        System.out.print("Enter contact: ");
        String contact = scanner.nextLine().trim();

        System.out.print("Enter mail id: ");
        String mailId = scanner.nextLine().trim();

        System.out.print("Enter account type (Savings or Current): ");
        String accountType = scanner.nextLine().trim();

        if (validate(name, contact, mailId, accountType)) {
            // Standardize account type before adding
            String finalAccountType = accountType.substring(0, 1).toUpperCase() + accountType.substring(1).toLowerCase();
            
            Customer newCustomer = new Customer(name, contact, mailId, finalAccountType);
            customerList.add(newCustomer);
            System.out.printf("Customer added successfully with customer id %d\n", newCustomer.getCustomerId());
        } else {
            System.err.println("Customer not added due to invalid entry.");
        }
    }

    // --- 2: Display All Customers ---
    private static void displayAllCustomers() {
        System.out.println("\n--- All Customer Details ---");
        if (customerList.isEmpty()) {
            System.out.println("No customers found in the system.");
            return;
        }
        for (Customer customer : customerList) {
            System.out.println(customer);
        }
    }
    
    // --- 3: Search Customer ---
    private static void searchCustomer() {
        System.out.println("\n--- Search Customer ---");
        System.out.print("Please enter customer id: ");
        
        try {
            int searchId = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            Customer foundCustomer = null;
            for (Customer customer : customerList) {
                if (customer.getCustomerId() == searchId) {
                    foundCustomer = customer;
                    break;
                }
            }

            if (foundCustomer != null) {
                System.out.println("Customer Found!");
                System.out.println(foundCustomer);
            } else {
                System.out.println("Customer with ID " + searchId + " not found.");
            }
            
        } catch (InputMismatchException e) {
            System.err.println("Invalid input. Please enter a numerical Customer ID.");
            scanner.nextLine(); // Clear buffer
        }
    }

    // --- 4: Delete Customer ---
    private static void deleteCustomer() {
        System.out.println("\n--- Delete Customer ---");
        System.out.print("Please enter customer id to be deleted: ");

        try {
            int deleteId = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            boolean wasDeleted = customerList.removeIf(customer -> customer.getCustomerId() == deleteId);

            if (wasDeleted) {
                System.out.printf("Deleted customer with id = %d\n", deleteId);
            } else {
                System.out.println("Customer with ID " + deleteId + " not found. Deletion failed.");
            }
            
        } catch (InputMismatchException e) {
            System.err.println("Invalid input. Please enter a numerical Customer ID.");
            scanner.nextLine(); // Clear buffer
        }
    }
}



