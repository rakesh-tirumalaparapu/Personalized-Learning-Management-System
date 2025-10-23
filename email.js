    public ResponseEntity<Checker> createChecker(@RequestBody Checker checker) {
        try {
            Checker createdChecker = checkerService.createChecker(checker);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdChecker);
        } catch (IllegalArgumentException e) {
            System.err.println("Validation error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

.............

    @Override
    public Checker createChecker(Checker checker) {
        try {
            // Validate required fields
            if (checker.getCheckerId() == null || checker.getCheckerId().trim().isEmpty()) {
                throw new IllegalArgumentException("Checker ID is required");
            }
            if (checker.getEmail() == null || checker.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("Email is required");
            }
            if (checker.getFirstName() == null || checker.getFirstName().trim().isEmpty()) {
                throw new IllegalArgumentException("First name is required");
            }
            if (checker.getLastName() == null || checker.getLastName().trim().isEmpty()) {
                throw new IllegalArgumentException("Last name is required");
            }
            if (checker.getPhone() == null || checker.getPhone().trim().isEmpty()) {
                throw new IllegalArgumentException("Phone is required");
            }
            if (checker.getDepartment() == null || checker.getDepartment().trim().isEmpty()) {
                throw new IllegalArgumentException("Department is required");
            }
            if (checker.getDesignation() == null || checker.getDesignation().trim().isEmpty()) {
                throw new IllegalArgumentException("Designation is required");
            }
            
            if (checkerDAO.existsByCheckerId(checker.getCheckerId())) {
                throw new IllegalArgumentException("Checker ID already exists: " + checker.getCheckerId());
            }
            if (checkerDAO.existsByEmail(checker.getEmail())) {
                throw new IllegalArgumentException("Email already exists: " + checker.getEmail());
            }
            
            // Ensure createdAt is set
            if (checker.getCreatedAt() == null) {
                checker.setCreatedAt(LocalDateTime.now());
            }
            
            return checkerDAO.save(checker);
        } catch (Exception e) {
            System.err.println("Error creating checker: " + e.getMessage());
            throw e;
        }
    }




package com.scb.axessspringboottraining;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = {
    SecurityAutoConfiguration.class,
    UserDetailsServiceAutoConfiguration.class
})
public class AxessSpringbootTrainingApplication {

	public static void main(String[] args) {
		SpringApplication.run(AxessSpringbootTrainingApplication.class, args);
		System.out.println("\n=== CHECKER PORTAL BACKEND STARTED ===");
		System.out.println("Swagger UI: http://localhost:8080/swagger-ui.html");
		System.out.println("API Base URL: http://localhost:8080/api/checker");
		System.out.println("HTML UI: Open checker-portal-ui.html in browser");
		System.out.println("=====================================\n");
	}
}
# ===============================
# Database Configuration
# ===============================
spring.datasource.url=jdbc:postgresql://localhost:5432/loan_origination
spring.datasource.username=postgres
spring.datasource.password=postgres

# ===============================
# JPA / Hibernate Configuration
# ===============================
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

# ===============================
# Server Configuration
# ===============================
server.port=8080
server.servlet.context-path=/

# ===============================
# Logging Configuration
# ===============================
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
logging.level.com.scb.axessspringboottraining=INFO

# ===============================
# Swagger Configuration
# ===============================
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html


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


<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.2.0</version>
		<relativePath/>
	</parent>
	<groupId>com.scb</groupId>
	<artifactId>axessspringboottraining</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>axess-springboot-training</name>
	<description>Checker Portal - Loan Application Review System</description>
	<properties>
		<java.version>17</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.postgresql</groupId>
			<artifactId>postgresql</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.springdoc</groupId>
			<artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
			<version>2.2.0</version>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>

.........................


package com.scb.axessspringboottraining.controller;

import com.scb.axessspringboottraining.dto.ApplicationSummaryDTO;
import com.scb.axessspringboottraining.dto.CheckerReviewRequestDTO;
import com.scb.axessspringboottraining.dto.CheckerReviewResponseDTO;
import com.scb.axessspringboottraining.entities.Checker;
import com.scb.axessspringboottraining.entities.enums.ApplicationStatus;
import com.scb.axessspringboottraining.entities.enums.CheckerAction;
import com.scb.axessspringboottraining.services.CheckerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/checker")
@Tag(name = "Checker Portal", description = "APIs for loan application checker operations")
@CrossOrigin(origins = "*")
public class CheckerController {
    
    @Autowired
    private CheckerService checkerService;
    
    // Checker Management Endpoints
    @PostMapping("/create")
    @Operation(summary = "Create a new checker", description = "Creates a new checker account")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Checker created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "409", description = "Checker ID or email already exists")
    })
    public ResponseEntity<Checker> createChecker(@RequestBody Checker checker) {
        try {
            Checker createdChecker = checkerService.createChecker(checker);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdChecker);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
    
    @GetMapping("/{checkerId}")
    @Operation(summary = "Get checker by ID", description = "Retrieves checker details by checker ID")
    public ResponseEntity<Checker> getChecker(@PathVariable String checkerId) {
        try {
            Checker checker = checkerService.getCheckerByCheckerId(checkerId);
            return ResponseEntity.ok(checker);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/all")
    @Operation(summary = "Get all active checkers", description = "Retrieves list of all active checkers")
    public ResponseEntity<List<Checker>> getAllActiveCheckers() {
        List<Checker> checkers = checkerService.getAllActiveCheckers();
        return ResponseEntity.ok(checkers);
    }
    
    // Application Review Endpoints
    @GetMapping("/applications/pending")
    @Operation(summary = "Get pending applications", description = "Retrieves applications pending checker review")
    public ResponseEntity<List<ApplicationSummaryDTO>> getPendingApplications() {
        List<ApplicationSummaryDTO> applications = checkerService.getApplicationsForReview(ApplicationStatus.SENT_TO_CHECKER);
        return ResponseEntity.ok(applications);
    }
    
    @GetMapping("/applications/status/{status}")
    @Operation(summary = "Get applications by status", description = "Retrieves applications filtered by status")
    public ResponseEntity<List<ApplicationSummaryDTO>> getApplicationsByStatus(
            @Parameter(description = "Application status") @PathVariable ApplicationStatus status) {
        List<ApplicationSummaryDTO> applications = checkerService.getApplicationsByStatus(status);
        return ResponseEntity.ok(applications);
    }
    
    @GetMapping("/applications/{applicationId}")
    @Operation(summary = "Get application details", description = "Retrieves detailed information about a specific application")
    public ResponseEntity<ApplicationSummaryDTO> getApplicationDetails(@PathVariable Long applicationId) {
        try {
            ApplicationSummaryDTO application = checkerService.getApplicationDetails(applicationId);
            return ResponseEntity.ok(application);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Review Operations
    @PostMapping("/review")
    @Operation(summary = "Review application", description = "Allows checker to approve, reject, or request more info for an application")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Review completed successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid review data"),
        @ApiResponse(responseCode = "404", description = "Application or checker not found")
    })
    public ResponseEntity<CheckerReviewResponseDTO> reviewApplication(@RequestBody CheckerReviewRequestDTO reviewRequest) {
        try {
            CheckerReviewResponseDTO response = checkerService.reviewApplication(reviewRequest);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/reviews/history/{checkerId}")
    @Operation(summary = "Get checker review history", description = "Retrieves all reviews performed by a specific checker")
    public ResponseEntity<List<CheckerReviewResponseDTO>> getCheckerReviewHistory(@PathVariable String checkerId) {
        try {
            List<CheckerReviewResponseDTO> reviews = checkerService.getReviewHistory(checkerId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/reviews/application/{applicationId}")
    @Operation(summary = "Get application review history", description = "Retrieves all reviews for a specific application")
    public ResponseEntity<List<CheckerReviewResponseDTO>> getApplicationReviewHistory(@PathVariable Long applicationId) {
        try {
            List<CheckerReviewResponseDTO> reviews = checkerService.getApplicationReviewHistory(applicationId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Dashboard/Statistics Endpoints
    @GetMapping("/dashboard/stats")
    @Operation(summary = "Get dashboard statistics", description = "Retrieves summary statistics for checker dashboard")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        Map<String, Long> stats = Map.of(
            "pendingApplications", checkerService.getPendingApplicationsCount(),
            "approvedApplications", checkerService.getApprovedApplicationsCount(),
            "rejectedApplications", checkerService.getRejectedApplicationsCount()
        );
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/dashboard/stats/{checkerId}")
    @Operation(summary = "Get checker statistics", description = "Retrieves statistics for a specific checker")
    public ResponseEntity<Map<String, Long>> getCheckerStats(@PathVariable String checkerId) {
        Map<String, Long> stats = Map.of(
            "approvedCount", checkerService.getCheckerReviewCount(checkerId, CheckerAction.APPROVE),
            "rejectedCount", checkerService.getCheckerReviewCount(checkerId, CheckerAction.REJECT),
            "requestedInfoCount", checkerService.getCheckerReviewCount(checkerId, CheckerAction.REQUEST_MORE_INFO),
            "escalatedCount", checkerService.getCheckerReviewCount(checkerId, CheckerAction.ESCALATE_TO_SENIOR_CHECKER)
        );
        return ResponseEntity.ok(stats);
    }
    
    
    // Utility Endpoints
    @GetMapping("/actions")
    @Operation(summary = "Get available checker actions", description = "Retrieves list of available checker actions")
    public ResponseEntity<CheckerAction[]> getAvailableActions() {
        return ResponseEntity.ok(CheckerAction.values());
    }
    
    @GetMapping("/statuses")
    @Operation(summary = "Get available application statuses", description = "Retrieves list of available application statuses")
    public ResponseEntity<ApplicationStatus[]> getAvailableStatuses() {
        return ResponseEntity.ok(ApplicationStatus.values());
    }
    
    // Test endpoint to verify database updates
    @PostMapping("/test-update/{applicationId}")
    @Operation(summary = "Test database update", description = "Test endpoint to verify database updates are working")
    public ResponseEntity<Map<String, Object>> testDatabaseUpdate(@PathVariable Long applicationId) {
        try {
            ApplicationSummaryDTO application = checkerService.getApplicationDetails(applicationId);
            Map<String, Object> response = Map.of(
                "message", "Database update test successful",
                "applicationId", applicationId,
                "applicationCode", application.getApplicationCode(),
                "currentStatus", application.getStatus(),
                "customerName", application.getCustomerName(),
                "timestamp", java.time.LocalDateTime.now()
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = Map.of(
                "message", "Database update test failed",
                "error", e.getMessage(),
                "timestamp", java.time.LocalDateTime.now()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
............
                                                                  
package com.scb.axessspringboottraining.dao;

import com.scb.axessspringboottraining.entities.Checker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CheckerDAO extends JpaRepository<Checker, Long> {
    
    Optional<Checker> findByCheckerId(String checkerId);
    
    Optional<Checker> findByEmail(String email);
    
    List<Checker> findByIsActiveTrue();
    
    List<Checker> findByDepartment(String department);
    
    @Query("SELECT c FROM Checker c WHERE c.isActive = true AND c.department = :department")
    List<Checker> findActiveCheckersByDepartment(@Param("department") String department);
    
    @Query("SELECT c FROM Checker c WHERE c.isActive = true ORDER BY c.firstName, c.lastName")
    List<Checker> findAllActiveCheckersOrderedByName();
    
    boolean existsByCheckerId(String checkerId);
    
    boolean existsByEmail(String email);
}
,..................
package com.scb.axessspringboottraining.dao;

import com.scb.axessspringboottraining.entities.LoanApplication;
import com.scb.axessspringboottraining.entities.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanApplicationDAO extends JpaRepository<LoanApplication, Long> {
    
    List<LoanApplication> findByStatus(ApplicationStatus status);
    
    Long countByStatus(ApplicationStatus status);
    
    @Query("SELECT la FROM LoanApplication la WHERE la.status = :status ORDER BY la.submittedDate DESC")
    List<LoanApplication> findByStatusOrderBySubmittedDateDesc(@Param("status") ApplicationStatus status);
    
    @Query("SELECT la FROM LoanApplication la WHERE la.applicationCode = :applicationCode")
    LoanApplication findByApplicationCode(@Param("applicationCode") String applicationCode);
}
...............
package com.scb.axessspringboottraining.dao;

import com.scb.axessspringboottraining.entities.LoanApplicationReview;
import com.scb.axessspringboottraining.entities.enums.ApplicationStatus;
import com.scb.axessspringboottraining.entities.enums.CheckerAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoanApplicationReviewDAO extends JpaRepository<LoanApplicationReview, Long> {
    
    List<LoanApplicationReview> findByReviewedByCheckerId(String checkerId);
    
    List<LoanApplicationReview> findByLoanApplicationId(Long loanApplicationId);
    
    List<LoanApplicationReview> findByAction(CheckerAction action);
    
    List<LoanApplicationReview> findByNewStatus(ApplicationStatus status);
    
    @Query("SELECT r FROM LoanApplicationReview r WHERE r.reviewedBy.checkerId = :checkerId ORDER BY r.reviewedAt DESC")
    List<LoanApplicationReview> findByCheckerIdOrderByReviewedAtDesc(@Param("checkerId") String checkerId);
    
    @Query("SELECT r FROM LoanApplicationReview r WHERE r.action = :action AND r.reviewedAt BETWEEN :startDate AND :endDate")
    List<LoanApplicationReview> findByActionAndDateRange(@Param("action") CheckerAction action, 
                                                        @Param("startDate") LocalDateTime startDate, 
                                                        @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(r) FROM LoanApplicationReview r WHERE r.reviewedBy.checkerId = :checkerId AND r.action = :action")
    Long countByCheckerIdAndAction(@Param("checkerId") String checkerId, @Param("action") CheckerAction action);
    
    @Query("SELECT r FROM LoanApplicationReview r WHERE r.loanApplication.applicationCode = :applicationCode ORDER BY r.reviewedAt DESC")
    List<LoanApplicationReview> findByApplicationCodeOrderByReviewedAtDesc(@Param("applicationCode") String applicationCode);
}

............
package com.scb.axessspringboottraining.dto;

import com.scb.axessspringboottraining.entities.enums.ApplicationStatus;
import com.scb.axessspringboottraining.entities.enums.LoanType;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ApplicationSummaryDTO {
    
    private Long id;
    private String applicationCode;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private LoanType loanType;
    private ApplicationStatus status;
    private BigDecimal loanAmountRequired;
    private Integer loanDurationMonths;
    private String purpose;
    private Integer cibilScore;
    private LocalDateTime submittedDate;
    private String makerComments;
    private String checkerComments;
    private LocalDateTime lastUpdatedAt;
    
    // Constructors
    public ApplicationSummaryDTO() {}
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getApplicationCode() {
        return applicationCode;
    }
    
    public void setApplicationCode(String applicationCode) {
        this.applicationCode = applicationCode;
    }
    
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    
    public String getCustomerEmail() {
        return customerEmail;
    }
    
    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
    
    public String getCustomerPhone() {
        return customerPhone;
    }
    
    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }
    
    public LoanType getLoanType() {
        return loanType;
    }
    
    public void setLoanType(LoanType loanType) {
        this.loanType = loanType;
    }
    
    public ApplicationStatus getStatus() {
        return status;
    }
    
    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
    
    public BigDecimal getLoanAmountRequired() {
        return loanAmountRequired;
    }
    
    public void setLoanAmountRequired(BigDecimal loanAmountRequired) {
        this.loanAmountRequired = loanAmountRequired;
    }
    
    public Integer getLoanDurationMonths() {
        return loanDurationMonths;
    }
    
    public void setLoanDurationMonths(Integer loanDurationMonths) {
        this.loanDurationMonths = loanDurationMonths;
    }
    
    public String getPurpose() {
        return purpose;
    }
    
    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
    
    public Integer getCibilScore() {
        return cibilScore;
    }
    
    public void setCibilScore(Integer cibilScore) {
        this.cibilScore = cibilScore;
    }
    
    public LocalDateTime getSubmittedDate() {
        return submittedDate;
    }
    
    public void setSubmittedDate(LocalDateTime submittedDate) {
        this.submittedDate = submittedDate;
    }
    
    public String getMakerComments() {
        return makerComments;
    }
    
    public void setMakerComments(String makerComments) {
        this.makerComments = makerComments;
    }
    
    public String getCheckerComments() {
        return checkerComments;
    }
    
    public void setCheckerComments(String checkerComments) {
        this.checkerComments = checkerComments;
    }
    
    public LocalDateTime getLastUpdatedAt() {
        return lastUpdatedAt;
    }
    
    public void setLastUpdatedAt(LocalDateTime lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }
}

................
package com.scb.axessspringboottraining.dto;

import com.scb.axessspringboottraining.entities.enums.ApplicationStatus;
import com.scb.axessspringboottraining.entities.enums.CheckerAction;
import java.time.LocalDateTime;

public class CheckerReviewRequestDTO {
    
    private Long loanApplicationId;
    private CheckerAction action;
    private String checkerComments;
    private String checkerId;
    
    // Constructors
    public CheckerReviewRequestDTO() {}
    
    public CheckerReviewRequestDTO(Long loanApplicationId, CheckerAction action, 
                                  String checkerComments, String checkerId) {
        this.loanApplicationId = loanApplicationId;
        this.action = action;
        this.checkerComments = checkerComments;
        this.checkerId = checkerId;
    }
    
    // Getters and Setters
    public Long getLoanApplicationId() {
        return loanApplicationId;
    }
    
    public void setLoanApplicationId(Long loanApplicationId) {
        this.loanApplicationId = loanApplicationId;
    }
    
    public CheckerAction getAction() {
        return action;
    }
    
    public void setAction(CheckerAction action) {
        this.action = action;
    }
    
    public String getCheckerComments() {
        return checkerComments;
    }
    
    public void setCheckerComments(String checkerComments) {
        this.checkerComments = checkerComments;
    }
    
    public String getCheckerId() {
        return checkerId;
    }
    
    public void setCheckerId(String checkerId) {
        this.checkerId = checkerId;
    }
}
.....


package com.scb.axessspringboottraining.dto;

import com.scb.axessspringboottraining.entities.enums.ApplicationStatus;
import com.scb.axessspringboottraining.entities.enums.CheckerAction;
import java.time.LocalDateTime;

public class CheckerReviewResponseDTO {
    
    private Long reviewId;
    private Long loanApplicationId;
    private String applicationCode;
    private String checkerId;
    private String checkerName;
    private CheckerAction action;
    private ApplicationStatus previousStatus;
    private ApplicationStatus newStatus;
    private String checkerComments;
    private String makerComments;
    private LocalDateTime reviewedAt;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    
    // Constructors
    public CheckerReviewResponseDTO() {}
    
    // Getters and Setters
    public Long getReviewId() {
        return reviewId;
    }
    
    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }
    
    public Long getLoanApplicationId() {
        return loanApplicationId;
    }
    
    public void setLoanApplicationId(Long loanApplicationId) {
        this.loanApplicationId = loanApplicationId;
    }
    
    public String getApplicationCode() {
        return applicationCode;
    }
    
    public void setApplicationCode(String applicationCode) {
        this.applicationCode = applicationCode;
    }
    
    public String getCheckerId() {
        return checkerId;
    }
    
    public void setCheckerId(String checkerId) {
        this.checkerId = checkerId;
    }
    
    public String getCheckerName() {
        return checkerName;
    }
    
    public void setCheckerName(String checkerName) {
        this.checkerName = checkerName;
    }
    
    public CheckerAction getAction() {
        return action;
    }
    
    public void setAction(CheckerAction action) {
        this.action = action;
    }
    
    public ApplicationStatus getPreviousStatus() {
        return previousStatus;
    }
    
    public void setPreviousStatus(ApplicationStatus previousStatus) {
        this.previousStatus = previousStatus;
    }
    
    public ApplicationStatus getNewStatus() {
        return newStatus;
    }
    
    public void setNewStatus(ApplicationStatus newStatus) {
        this.newStatus = newStatus;
    }
    
    public String getCheckerComments() {
        return checkerComments;
    }
    
    public void setCheckerComments(String checkerComments) {
        this.checkerComments = checkerComments;
    }
    
    public String getMakerComments() {
        return makerComments;
    }
    
    public void setMakerComments(String makerComments) {
        this.makerComments = makerComments;
    }
    
    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }
    
    public void setReviewedAt(LocalDateTime reviewedAt) {
        this.reviewedAt = reviewedAt;
    }
    
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    
    public String getCustomerEmail() {
        return customerEmail;
    }
    
    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
    
    public String getCustomerPhone() {
        return customerPhone;
    }
    
    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }
}
...............

package com.scb.axessspringboottraining.entities.enums;

public enum ApplicationStatus {
    DRAFT,
    SUBMITTED_TO_MAKER,
    REJECTED_BY_MAKER,
    SENT_TO_CHECKER,
    APPROVED,
    REJECTED_BY_CHECKER
}
..............
package com.scb.axessspringboottraining.entities.enums;

public enum CheckerAction {
    APPROVE,
    REJECT,
    REQUEST_MORE_INFO,
    ESCALATE_TO_SENIOR_CHECKER
}
...........
package com.scb.axessspringboottraining.entities.enums;

public enum LoanType {
    PERSONAL_LOAN,
    HOME_LOAN,
    CAR_LOAN,
    BUSINESS_LOAN,
    EDUCATION_LOAN,
    GOLD_LOAN
}
..............
package com.scb.axessspringboottraining.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "checkers")
public class Checker {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String checkerId; // e.g., CHK001
    
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String phone;
    
    @Column(nullable = false)
    private String department;
    
    @Column(nullable = false)
    private String designation;
    
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    private LocalDateTime lastLoginAt;
    
    // One-to-many relationship with loan applications reviewed by this checker
    @OneToMany(mappedBy = "reviewedBy", cascade = CascadeType.ALL)
    private List<LoanApplicationReview> reviews;
    
    // Constructors
    public Checker() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Checker(String checkerId, String firstName, String lastName, String email, 
                   String phone, String department, String designation) {
        this();
        this.checkerId = checkerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.department = department;
        this.designation = designation;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getCheckerId() {
        return checkerId;
    }
    
    public void setCheckerId(String checkerId) {
        this.checkerId = checkerId;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public String getDesignation() {
        return designation;
    }
    
    public void setDesignation(String designation) {
        this.designation = designation;
    }
    
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getLastLoginAt() {
        return lastLoginAt;
    }
    
    public void setLastLoginAt(LocalDateTime lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }
    
    public List<LoanApplicationReview> getReviews() {
        return reviews;
    }
    
    public void setReviews(List<LoanApplicationReview> reviews) {
        this.reviews = reviews;
    }
    
    // Helper methods
    public String getFullName() {
        return firstName + " " + lastName;
    }
}
..................

package com.scb.axessspringboottraining.entities;

import com.scb.axessspringboottraining.entities.enums.ApplicationStatus;
import com.scb.axessspringboottraining.entities.enums.LoanType;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan_applications")
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String applicationCode; // e.g., LA2025001

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoanType loanType;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.DRAFT;

    @Column(precision = 15, scale = 2)
    private BigDecimal loanAmountRequired;

    private Integer loanDurationMonths;
    private String purpose;

    private Integer cibilScore;
    private String cibilFile;

    private LocalDateTime submittedDate;

    private String makerComments;
    private String checkerComments;
    
    // Customer information embedded for simplicity
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String customerAddress;

    // Constructors
    public LoanApplication() {}

    public LoanApplication(String applicationCode, LoanType loanType, ApplicationStatus status, 
                          BigDecimal loanAmountRequired, Integer loanDurationMonths, String purpose, 
                          Integer cibilScore, String customerName, String customerEmail, 
                          String customerPhone, String customerAddress) {
        this.applicationCode = applicationCode;
        this.loanType = loanType;
        this.status = status;
        this.loanAmountRequired = loanAmountRequired;
        this.loanDurationMonths = loanDurationMonths;
        this.purpose = purpose;
        this.cibilScore = cibilScore;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.customerAddress = customerAddress;
        this.submittedDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApplicationCode() {
        return applicationCode;
    }

    public void setApplicationCode(String applicationCode) {
        this.applicationCode = applicationCode;
    }

    public LoanType getLoanType() {
        return loanType;
    }

    public void setLoanType(LoanType loanType) {
        this.loanType = loanType;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public BigDecimal getLoanAmountRequired() {
        return loanAmountRequired;
    }

    public void setLoanAmountRequired(BigDecimal loanAmountRequired) {
        this.loanAmountRequired = loanAmountRequired;
    }

    public Integer getLoanDurationMonths() {
        return loanDurationMonths;
    }

    public void setLoanDurationMonths(Integer loanDurationMonths) {
        this.loanDurationMonths = loanDurationMonths;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public Integer getCibilScore() {
        return cibilScore;
    }

    public void setCibilScore(Integer cibilScore) {
        this.cibilScore = cibilScore;
    }

    public String getCibilFile() {
        return cibilFile;
    }

    public void setCibilFile(String cibilFile) {
        this.cibilFile = cibilFile;
    }

    public LocalDateTime getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(LocalDateTime submittedDate) {
        this.submittedDate = submittedDate;
    }

    public String getMakerComments() {
        return makerComments;
    }

    public void setMakerComments(String makerComments) {
        this.makerComments = makerComments;
    }

    public String getCheckerComments() {
        return checkerComments;
    }

    public void setCheckerComments(String checkerComments) {
        this.checkerComments = checkerComments;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }
}
................

package com.scb.axessspringboottraining.entities;

import com.scb.axessspringboottraining.entities.enums.ApplicationStatus;
import com.scb.axessspringboottraining.entities.enums.CheckerAction;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan_application_reviews")
public class LoanApplicationReview {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_application_id", nullable = false)
    private LoanApplication loanApplication;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checker_id", nullable = false)
    private Checker reviewedBy;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CheckerAction action;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus previousStatus;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus newStatus;
    
    @Column(columnDefinition = "TEXT")
    private String checkerComments;
    
    @Column(columnDefinition = "TEXT")
    private String makerComments; // Comments from maker
    
    @Column(nullable = false)
    private LocalDateTime reviewedAt;
    
    private LocalDateTime createdAt;
    
    // Constructors
    public LoanApplicationReview() {
        this.reviewedAt = LocalDateTime.now();
        this.createdAt = LocalDateTime.now();
    }
    
    public LoanApplicationReview(LoanApplication loanApplication, Checker reviewedBy, 
                               CheckerAction action, ApplicationStatus previousStatus, 
                               ApplicationStatus newStatus, String checkerComments, 
                               String makerComments) {
        this();
        this.loanApplication = loanApplication;
        this.reviewedBy = reviewedBy;
        this.action = action;
        this.previousStatus = previousStatus;
        this.newStatus = newStatus;
        this.checkerComments = checkerComments;
        this.makerComments = makerComments;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public LoanApplication getLoanApplication() {
        return loanApplication;
    }
    
    public void setLoanApplication(LoanApplication loanApplication) {
        this.loanApplication = loanApplication;
    }
    
    public Checker getReviewedBy() {
        return reviewedBy;
    }
    
    public void setReviewedBy(Checker reviewedBy) {
        this.reviewedBy = reviewedBy;
    }
    
    public CheckerAction getAction() {
        return action;
    }
    
    public void setAction(CheckerAction action) {
        this.action = action;
    }
    
    public ApplicationStatus getPreviousStatus() {
        return previousStatus;
    }
    
    public void setPreviousStatus(ApplicationStatus previousStatus) {
        this.previousStatus = previousStatus;
    }
    
    public ApplicationStatus getNewStatus() {
        return newStatus;
    }
    
    public void setNewStatus(ApplicationStatus newStatus) {
        this.newStatus = newStatus;
    }
    
    public String getCheckerComments() {
        return checkerComments;
    }
    
    public void setCheckerComments(String checkerComments) {
        this.checkerComments = checkerComments;
    }
    
    public String getMakerComments() {
        return makerComments;
    }
    
    public void setMakerComments(String makerComments) {
        this.makerComments = makerComments;
    }
    
    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }
    
    public void setReviewedAt(LocalDateTime reviewedAt) {
        this.reviewedAt = reviewedAt;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
......................

package com.scb.axessspringboottraining.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
...............


package com.scb.axessspringboottraining.services;

import com.scb.axessspringboottraining.dto.ApplicationSummaryDTO;
import com.scb.axessspringboottraining.dto.CheckerReviewRequestDTO;
import com.scb.axessspringboottraining.dto.CheckerReviewResponseDTO;
import com.scb.axessspringboottraining.entities.Checker;
import com.scb.axessspringboottraining.entities.LoanApplication;
import com.scb.axessspringboottraining.entities.LoanApplicationReview;
import com.scb.axessspringboottraining.entities.enums.ApplicationStatus;
import com.scb.axessspringboottraining.entities.enums.CheckerAction;

import java.util.List;

public interface CheckerService {
    
    // Checker management
    Checker createChecker(Checker checker);
    Checker getCheckerById(Long id);
    Checker getCheckerByCheckerId(String checkerId);
    List<Checker> getAllActiveCheckers();
    Checker updateChecker(Checker checker);
    void deactivateChecker(String checkerId);
    
    // Application review operations
    List<ApplicationSummaryDTO> getApplicationsForReview(ApplicationStatus status);
    List<ApplicationSummaryDTO> getApplicationsByStatus(ApplicationStatus status);
    ApplicationSummaryDTO getApplicationDetails(Long applicationId);
    
    // Review operations
    CheckerReviewResponseDTO reviewApplication(CheckerReviewRequestDTO reviewRequest);
    List<CheckerReviewResponseDTO> getReviewHistory(String checkerId);
    List<CheckerReviewResponseDTO> getApplicationReviewHistory(Long applicationId);
    
    // Dashboard/Statistics
    Long getPendingApplicationsCount();
    Long getApprovedApplicationsCount();
    Long getRejectedApplicationsCount();
    Long getApplicationsCountByStatus(ApplicationStatus status);
    Long getCheckerReviewCount(String checkerId, CheckerAction action);
    
}
....................

package com.scb.axessspringboottraining.services;

import com.scb.axessspringboottraining.dao.CheckerDAO;
import com.scb.axessspringboottraining.dao.LoanApplicationDAO;
import com.scb.axessspringboottraining.dao.LoanApplicationReviewDAO;
import com.scb.axessspringboottraining.dto.ApplicationSummaryDTO;
import com.scb.axessspringboottraining.dto.CheckerReviewRequestDTO;
import com.scb.axessspringboottraining.dto.CheckerReviewResponseDTO;
import com.scb.axessspringboottraining.entities.Checker;
import com.scb.axessspringboottraining.entities.LoanApplication;
import com.scb.axessspringboottraining.entities.LoanApplicationReview;
import com.scb.axessspringboottraining.entities.enums.ApplicationStatus;
import com.scb.axessspringboottraining.entities.enums.CheckerAction;
import com.scb.axessspringboottraining.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CheckerServiceImpl implements CheckerService {
    
    @Autowired
    private CheckerDAO checkerDAO;
    
    @Autowired
    private LoanApplicationDAO loanApplicationDAO;
    
    @Autowired
    private LoanApplicationReviewDAO reviewDAO;
    
    // Checker management methods
    @Override
    public Checker createChecker(Checker checker) {
        if (checkerDAO.existsByCheckerId(checker.getCheckerId())) {
            throw new IllegalArgumentException("Checker ID already exists: " + checker.getCheckerId());
        }
        if (checkerDAO.existsByEmail(checker.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + checker.getEmail());
        }
        return checkerDAO.save(checker);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Checker getCheckerById(Long id) {
        return checkerDAO.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Checker not found with id: " + id));
    }
    
    @Override
    @Transactional(readOnly = true)
    public Checker getCheckerByCheckerId(String checkerId) {
        return checkerDAO.findByCheckerId(checkerId)
                .orElseThrow(() -> new ResourceNotFoundException("Checker not found with checkerId: " + checkerId));
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Checker> getAllActiveCheckers() {
        return checkerDAO.findByIsActiveTrue();
    }
    
    @Override
    public Checker updateChecker(Checker checker) {
        Checker existingChecker = getCheckerById(checker.getId());
        existingChecker.setFirstName(checker.getFirstName());
        existingChecker.setLastName(checker.getLastName());
        existingChecker.setEmail(checker.getEmail());
        existingChecker.setPhone(checker.getPhone());
        existingChecker.setDepartment(checker.getDepartment());
        existingChecker.setDesignation(checker.getDesignation());
        existingChecker.setIsActive(checker.getIsActive());
        return checkerDAO.save(existingChecker);
    }
    
    @Override
    public void deactivateChecker(String checkerId) {
        Checker checker = getCheckerByCheckerId(checkerId);
        checker.setIsActive(false);
        checkerDAO.save(checker);
    }
    
    // Application review methods
    @Override
    @Transactional(readOnly = true)
    public List<ApplicationSummaryDTO> getApplicationsForReview(ApplicationStatus status) {
        List<LoanApplication> applications = loanApplicationDAO.findByStatus(status);
        return applications.stream()
                .map(this::convertToApplicationSummaryDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ApplicationSummaryDTO> getApplicationsByStatus(ApplicationStatus status) {
        return getApplicationsForReview(status);
    }
    
    @Override
    @Transactional(readOnly = true)
    public ApplicationSummaryDTO getApplicationDetails(Long applicationId) {
        LoanApplication application = loanApplicationDAO.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));
        return convertToApplicationSummaryDTO(application);
    }
    
    // Review operations
    @Override
    public CheckerReviewResponseDTO reviewApplication(CheckerReviewRequestDTO reviewRequest) {
        // Get the checker
        Checker checker = getCheckerByCheckerId(reviewRequest.getCheckerId());
        
        // Get the loan application
        LoanApplication application = loanApplicationDAO.findById(reviewRequest.getLoanApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + reviewRequest.getLoanApplicationId()));
        
        // Validate that application is in correct status for review
        if (application.getStatus() != ApplicationStatus.SENT_TO_CHECKER) {
            throw new IllegalArgumentException("Application is not in correct status for checker review. Current status: " + application.getStatus());
        }
        
        // Store previous status
        ApplicationStatus previousStatus = application.getStatus();
        
        // Determine new status based on action
        ApplicationStatus newStatus = determineNewStatus(reviewRequest.getAction());
        
        // Update application status
        application.setStatus(newStatus);
        application.setCheckerComments(reviewRequest.getCheckerComments());
        loanApplicationDAO.save(application);
        
        // Create review record
        LoanApplicationReview review = new LoanApplicationReview(
                application, checker, reviewRequest.getAction(), 
                previousStatus, newStatus, reviewRequest.getCheckerComments(), 
                application.getMakerComments()
        );
        review = reviewDAO.save(review);
        
        // Convert to response DTO
        return convertToReviewResponseDTO(review);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<CheckerReviewResponseDTO> getReviewHistory(String checkerId) {
        List<LoanApplicationReview> reviews = reviewDAO.findByCheckerIdOrderByReviewedAtDesc(checkerId);
        return reviews.stream()
                .map(this::convertToReviewResponseDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<CheckerReviewResponseDTO> getApplicationReviewHistory(Long applicationId) {
        List<LoanApplicationReview> reviews = reviewDAO.findByLoanApplicationId(applicationId);
        return reviews.stream()
                .map(this::convertToReviewResponseDTO)
                .collect(Collectors.toList());
    }
    
    // Dashboard/Statistics methods
    @Override
    @Transactional(readOnly = true)
    public Long getPendingApplicationsCount() {
        return loanApplicationDAO.countByStatus(ApplicationStatus.SENT_TO_CHECKER);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Long getApprovedApplicationsCount() {
        return loanApplicationDAO.countByStatus(ApplicationStatus.APPROVED);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Long getRejectedApplicationsCount() {
        return loanApplicationDAO.countByStatus(ApplicationStatus.REJECTED_BY_CHECKER);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Long getApplicationsCountByStatus(ApplicationStatus status) {
        return loanApplicationDAO.countByStatus(status);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Long getCheckerReviewCount(String checkerId, CheckerAction action) {
        return reviewDAO.countByCheckerIdAndAction(checkerId, action);
    }
    
    
    // Helper methods
    private ApplicationStatus determineNewStatus(CheckerAction action) {
        switch (action) {
            case APPROVE:
                return ApplicationStatus.APPROVED;
            case REJECT:
                return ApplicationStatus.REJECTED_BY_CHECKER;
            case REQUEST_MORE_INFO:
                return ApplicationStatus.SUBMITTED_TO_MAKER; // Send back to maker
            case ESCALATE_TO_SENIOR_CHECKER:
                return ApplicationStatus.SENT_TO_CHECKER; // Keep in checker status for senior review
            default:
                throw new IllegalArgumentException("Invalid checker action: " + action);
        }
    }
    
    private ApplicationSummaryDTO convertToApplicationSummaryDTO(LoanApplication application) {
        ApplicationSummaryDTO dto = new ApplicationSummaryDTO();
        dto.setId(application.getId());
        dto.setApplicationCode(application.getApplicationCode());
        dto.setCustomerName(application.getCustomerName());
        dto.setCustomerEmail(application.getCustomerEmail());
        dto.setCustomerPhone(application.getCustomerPhone());
        dto.setLoanType(application.getLoanType());
        dto.setStatus(application.getStatus());
        dto.setLoanAmountRequired(application.getLoanAmountRequired());
        dto.setLoanDurationMonths(application.getLoanDurationMonths());
        dto.setPurpose(application.getPurpose());
        dto.setCibilScore(application.getCibilScore());
        dto.setSubmittedDate(application.getSubmittedDate());
        dto.setMakerComments(application.getMakerComments());
        dto.setCheckerComments(application.getCheckerComments());
        dto.setLastUpdatedAt(LocalDateTime.now());
        return dto;
    }
    
    private CheckerReviewResponseDTO convertToReviewResponseDTO(LoanApplicationReview review) {
        CheckerReviewResponseDTO dto = new CheckerReviewResponseDTO();
        dto.setReviewId(review.getId());
        dto.setLoanApplicationId(review.getLoanApplication().getId());
        dto.setApplicationCode(review.getLoanApplication().getApplicationCode());
        dto.setCheckerId(review.getReviewedBy().getCheckerId());
        dto.setCheckerName(review.getReviewedBy().getFullName());
        dto.setAction(review.getAction());
        dto.setPreviousStatus(review.getPreviousStatus());
        dto.setNewStatus(review.getNewStatus());
        dto.setCheckerComments(review.getCheckerComments());
        dto.setMakerComments(review.getMakerComments());
        dto.setReviewedAt(review.getReviewedAt());
        dto.setCustomerName(review.getLoanApplication().getCustomerName());
        dto.setCustomerEmail(review.getLoanApplication().getCustomerEmail());
        dto.setCustomerPhone(review.getLoanApplication().getCustomerPhone());
        return dto;
    }
}
................................


package com.scb.axessspringboottraining.services;

import com.scb.axessspringboottraining.dao.CheckerDAO;
import com.scb.axessspringboottraining.dao.LoanApplicationDAO;
import com.scb.axessspringboottraining.entities.Checker;
import com.scb.axessspringboottraining.entities.LoanApplication;
import com.scb.axessspringboottraining.entities.enums.ApplicationStatus;
import com.scb.axessspringboottraining.entities.enums.LoanType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class DataInitializationService implements CommandLineRunner {
    
    @Autowired
    private CheckerDAO checkerDAO;
    
    @Autowired
    private LoanApplicationDAO loanApplicationDAO;
    
    @Override
    public void run(String... args) throws Exception {
        initializeSampleData();
    }
    
    private void initializeSampleData() {
        // Create sample checkers
        createSampleCheckers();
        
        // Create sample applications
        createSampleApplications();
    }
    
    private void createSampleCheckers() {
        if (checkerDAO.count() == 0) {
            Checker checker1 = new Checker("CHK001", "John", "Smith", "john.smith@bank.com", 
                    "9876543210", "Credit Department", "Senior Credit Analyst");
            checkerDAO.save(checker1);
            
            Checker checker2 = new Checker("CHK002", "Sarah", "Johnson", "sarah.johnson@bank.com", 
                    "9876543211", "Credit Department", "Credit Analyst");
            checkerDAO.save(checker2);
            
            Checker checker3 = new Checker("CHK003", "Michael", "Brown", "michael.brown@bank.com", 
                    "9876543212", "Risk Management", "Risk Analyst");
            checkerDAO.save(checker3);
            
            System.out.println("Sample checkers created successfully!");
        }
    }
    
    private void createSampleApplications() {
        if (loanApplicationDAO.count() == 0) {
            // Create sample loan applications
            LoanApplication app1 = new LoanApplication("LA2025001", LoanType.PERSONAL_LOAN, 
                    ApplicationStatus.SENT_TO_CHECKER, new BigDecimal("500000"), 36, "Home renovation", 750,
                    "Rajesh Kumar Sharma", "rajesh.sharma@email.com", "9876543213", "123 Main Street, Mumbai");
            app1.setMakerComments("Application reviewed by maker. All documents verified.");
            loanApplicationDAO.save(app1);
            
            LoanApplication app2 = new LoanApplication("LA2025002", LoanType.HOME_LOAN, 
                    ApplicationStatus.SENT_TO_CHECKER, new BigDecimal("2000000"), 240, "Purchase new home", 720,
                    "Priya Patel", "priya.patel@email.com", "9876543214", "456 Park Avenue, Delhi");
            app2.setMakerComments("Application reviewed by maker. Income documents verified.");
            loanApplicationDAO.save(app2);
            
            LoanApplication app3 = new LoanApplication("LA2025003", LoanType.CAR_LOAN, 
                    ApplicationStatus.APPROVED, new BigDecimal("800000"), 60, "Buy new car", 780,
                    "Amit Singh Verma", "amit.verma@email.com", "9876543215", "789 Garden Road, Bangalore");
            app3.setMakerComments("Application reviewed by maker. All documents verified.");
            app3.setCheckerComments("Application approved after thorough review. Customer has good credit history.");
            loanApplicationDAO.save(app3);
            
            LoanApplication app4 = new LoanApplication("LA2025004", LoanType.BUSINESS_LOAN, 
                    ApplicationStatus.REJECTED_BY_CHECKER, new BigDecimal("1000000"), 120, "Business expansion", 650,
                    "Rajesh Kumar Sharma", "rajesh.sharma@email.com", "9876543213", "123 Main Street, Mumbai");
            app4.setMakerComments("Application reviewed by maker. Some documents pending.");
            app4.setCheckerComments("Application rejected due to low CIBIL score and insufficient income documentation.");
            loanApplicationDAO.save(app4);
            
            System.out.println("Sample applications created successfully!");
        }
    }
}
....................





