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





<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Standard Chartered Bank</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <header class="header">
        <nav class="nav-container">
            <div class="nav-left">
                <a href="#" class="home-icon">
                    <img src="home.png" alt="Home">              </a>
                <a href="#" class="india-link">You're in <span>India</span></a>
                <a href="#">Our Products</a>
                <a href="#">Promotions</a>
                <a href="#">Services</a>
                <a href="#">Help</a>
                <span class="search-icon"><img width="20px" height="20px" src="search.png" alt=""></span>
            </div>
            <div class="nav-right">
                <a href="#" class="login-btn">
                    <span><img width="20px" height="20px" src="lock.png" alt=""></span>
                    LOGIN
                </a>
                <div class="logo-container">
                    <div class="logo-icon"><img width="110px" height="110px" src="standard-chartered.png" alt=""></div>
                </div>
            </div>
        </nav>
    </header>

    <main class="main-content">
        <div class="container">
            <h1 class="welcome-title">Welcome to Standard Chartered</h1>

            <div class="cards-grid">
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=180&fit=crop"
                        alt="Wildlife Conservation" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Combating the illegal wildlife trade</h3>
                        <p class="card-description">See how we work in partnership to fight poaching and protect against
                            the illegal wildlife trade.</p>
                    </div>
                </div>

                <div class="card">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=180&fit=crop"
                        alt="Investment" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Invest like you never left India</h3>
                        <p class="card-description">Invest in the world's first FacePay trading platform.</p>
                    </div>
                </div>

                <div class="card">
                    <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=180&fit=crop"
                        alt="Local Exploration" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Explore the world like a local #PayLikeALocal</h3>
                        <p class="card-description">Load up to 22 currencies on the Multi-Currency ForexPlus card and
                            book now.</p>
                    </div>
                </div>

                <div class="card">
                    <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=180&fit=crop"
                        alt="Mobile Banking" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">SC Edge app – Exclusive for salary accounts</h3>
                        <p class="card-description">One app for travel, online payments and pay bills, add more than
                            enough money.</p>
                    </div>
                </div>

                <div class="card">
                    <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=180&fit=crop"
                        alt="Shopping Rewards" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Get 5% cashback at supermarket</h3>
                        <p class="card-description">With Cashback+ Platinum credit card.</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>

</html>



* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f0f0f0;
}

.header {
    background-color: #ffffff;
    padding: 12px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-container {
    width: 100%;
        max-width: none;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2px;
}

.nav-left {
    display: flex;
    align-items: center;
    gap: 55px;
}

.home-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    
    background-color: #efeeed;
    box-shadow: 0 40px 65px rgba(213, 210, 210, 0.3);
    
}

.home-icon img {
    width: 25px;
    height: 25px;
}
.nav-left a {
    text-decoration: none;
    color: black;
    font-size: 18px;
    font-weight: 400;
    padding: 5px 0;
    position: relative;
}

.nav-left .india-link span{
    color: #28a745 !important;
    font-weight: 500;
}

.search-icon {
    font-size: 16px;
    color: #666;
    cursor: pointer;
}

.nav-right {
    display: flex;
    align-items: center;
    gap: 25px;
}

.login-btn {
    background-color: rgb(23, 126, 23);
    color: white;
    padding: 10px 20px;
    width: 150px;
    height: 38px;;
    border: none;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 0.3s ease;
}

.login-btn:hover {
    background-color: #218838;
}

.logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 60px;
        padding-right: 45px;
}



.logo-icon {
    width: 30px;
    height: 20px;
    display: flex;
    align-items: center;

    justify-content: center;
    
}

/* Main Content */
.main-content {
    background: linear-gradient(135deg, #4a90e2 0%, #2c5282 50%, #1a365d 100%);
    min-height: 100vh;
    padding: 50px 0 60px 0;
    position: relative;
}

.main-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.5;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 30px;
    position: relative;
    z-index: 1;
}

.welcome-title {
    text-align: center;
    color: rgba(255, 255, 255, 0.95);
    font-size: 52px;
    font-weight: 300;
    margin-bottom: 35px;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Cards Grid */
.cards-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
    max-width: 1350px;
    margin: 0 auto;
}

.card {
    background-color: #ffffff;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    cursor: pointer;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

.card-content {
    padding: 24px 20px;
    height: 180px;
    display: flex;
    flex-direction: column;
}

.card-title {
    font-size: 17px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 12px;
    line-height: 1.4;
    flex-shrink: 0;
}

.card-description {
    font-size: 13px;
    color: #7f8c8d;
    line-height: 1.5;
    flex-grow: 1;
    overflow: hidden;
}

/* Specific card styling based on the image */
.card:nth-child(1) .card-image {
    background: linear-gradient(135deg, #f39c12, #e67e22);
}

.card:nth-child(2) .card-image {
    background: linear-gradient(135deg, #3498db, #2980b9);
}

.card:nth-child(3) .card-image {
    background: linear-gradient(135deg, #9b59b6, #8e44ad);
}

.card:nth-child(4) .card-image {
    background: linear-gradient(135deg, #34495e, #2c3e50);
}

.card:nth-child(5) .card-image {
    background: linear-gradient(135deg, #1abc9c, #16a085);
}

/* Responsive Design */
@media (max-width: 1200px) {
    .cards-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
}

@media (max-width: 768px) {
    .nav-container {
        padding: 0 20px;
    }

    .nav-left {
        gap: 20px;
    }

    .nav-left a {
        font-size: 13px;
    }

    .welcome-title {
        font-size: 36px;
        margin-bottom: 40px;
    }

    .cards-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }

    .container {
        padding: 0 20px;
    }
}

@media (max-width: 480px) {
    .welcome-title {
        font-size: 28px;
    }

    .cards-grid {
        grid-template-columns: 1fr;
    }

    .card-content {
        padding: 20px 16px;
        height: auto;
        min-height: 150px;
    }
}



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  
