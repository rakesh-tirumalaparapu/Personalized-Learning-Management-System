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



package com.exercise.model;

// Note: This model has different fields as per the second set of requirements
public class Customer_Usecase2 {
    private int customerid;
    private String name;
    private String mailid;
    private double salary; 
    private String dept;
    private String location;
    private String contact;
    private String accountType;

    // Parameterized Constructor (required)
    public Customer_Usecase2(int customerid, String name, String mailid, double salary, String dept, String location, String contact, String accountType) {
        this.customerid = customerid;
        this.name = name;
        this.mailid = mailid;
        this.salary = salary;
        this.dept = dept;
        this.location = location;
        this.contact = contact;
        this.accountType = accountType;
    }

    // Overriding toString() for display (required)
    @Override
    public String toString() {
        return String.format("Customer ID: %d, Name: %s, Email: %s, Salary: $%.2f, Dept: %s, Location: %s, Contact: %s, Account Type: %s",
                customerid, name, mailid, salary, dept, location, contact, accountType);
    }
}



package com.exercise.app;

import com.exercise.model.Customer_Usecase2;

public class UseCase2_Demo {
    public static void main(String[] args) {
        // Create 3 customer class objects using parameterized constructor
        Customer_Usecase2 customerA = new Customer_Usecase2(
            1001, "Amit Sharma", "amit@test.com", 
            50000.00, "Sales", "Pune", "9876543210", "Savings"
        );
        
        Customer_Usecase2 customerB = new Customer_Usecase2(
            1002, "Bela Singh", "bela@test.com", 
            75000.50, "IT", "Bangalore", "9988776655", "Current"
        );
        
        Customer_Usecase2 customerC = new Customer_Usecase2(
            1003, "Chandan Gupta", "chandan@test.com", 
            60000.00, "HR", "Delhi", "9001122334", "Savings"
        );
        
        // Insert them into an array of customers
        Customer_Usecase2[] customerArray = new Customer_Usecase2[] {
            customerA, 
            customerB, 
            customerC
        };

        System.out.println("--- Use Case 2: Array Iteration Demo ---");
        
        // Finally iterate the array and display all customer objects.
        for (Customer_Usecase2 customer : customerArray) {
            System.out.println(customer);
        }
        System.out.println("----------------------------------------");
    }
}

