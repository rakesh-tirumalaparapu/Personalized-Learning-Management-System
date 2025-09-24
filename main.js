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



task2:

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Standard Chartered</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            background: #000;
            color: white;
            overflow-x: hidden;
            height: 100vh;
        }

        .top-nav {
            position: absolute;
            right: 5px;
            background: rgba(3, 2, 2, 0.726);
            backdrop-filter: blur(10px);
            border-bottom-left-radius: 12px;
            gap: 15px;
            padding: 8px 20px;
            z-index: 1000;
            width: 600px;
        }

        .top-nav a {
            color: white;
            text-decoration: none;
            padding: 6px 12px;
            border-right: 1px solid rgba(255, 255, 255, 0.2);
            transition: color 0.3s;
            font-size: 11.5px;
            white-space: nowrap;
        }

        .top-nav a:last-child {
            border-right: none;
        }

        .top-nav a:hover {
            color: #00a651;
        }

        .main-navbar {
            position: absolute;
            padding-top: 22px;
            display: flex;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 999;
            width: 92rem;
            margin: 0 40px;
        }

        .logo-container {
            display: flex;
            align-items: center;
            margin-left: 80px;
            margin-right: 10px;
        }

        .logo-text {
            font-size: 16px;
            font-weight: 400;
            color: #333;
            line-height: 1.1;
        }

        .logo-text strong {
            font-weight: 600;
        }

        .nav-links {
            display: flex;
            align-items: center;
            gap: 60px;
            flex: 1;
            margin-left: -225px;
            margin-right: 25px;
            justify-content: flex-end;
        }

        .nav-link {
            color: #000 !important;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
            transition: color 0.3s;
            white-space: nowrap;
        }

        .nav-link:hover {
            color: #00a651 !important;
        }

        .search-icon {
            font-size: 20px;
            color: blue;
            cursor: pointer;
            transition: color 0.3s;
            margin-left: -45px;
        }

        .search-icon:hover {
            color: #00a651;
        }

        .hero {
            height: 100vh;
            background:
                linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 0 20px;
            position: relative;
        }

        .hero-content {
            max-width: 800px;
            margin-top: 80px;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 400;
            margin-bottom: 25px;
            line-height: 1.2;
        }

        .hero h1 .blue {
            display: inline-block;
            width: 25px;
            height: 24px;
            background-color: blue;
            border-radius: 100% 0 100% 100%;
            transform: rotate(45deg);
            vertical-align: middle;
        }

        .hero h1 .green {
            display: inline-block;
            width: 25px;
            height: 25px;
            background-color: #00a651;
            border-radius: 50% 0 50% 50%;
            transform: rotate(220deg);
            vertical-align: middle;
        }

        .hero p {
            font-size: 20px;
            margin-bottom: 35px;
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.6;
        }

        .btn-learn {
            background: #007bff;
            color: white;
            padding: 14px 40px;
            font-weight: bold;
            font-size: 18px;
            border-radius: 30px;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s;
            border: none;
        }

        .btn-learn span {
            margin-left: 20px;
        }

        .btn-learn:hover {
            background: #0056b3;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
        }

        .green-circle {
            position: absolute;
            bottom: 30px;
            left: 30px;
            width: 60px;
            height: 60px;
            background: #00a651;
            border-radius: 50%;
            z-index: 100;
            opacity: 0.8;
        }

        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: #333;
            font-size: 20px;
            padding: 5px;
        }

        .mobile-nav {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            z-index: 2000;
            padding: 20px;
            overflow: scroll;
        }

        .mobile-nav.active {
            display: block;
        }

        .mobile-nav-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .mobile-close {
            background: none;
            border: none;
            font-size: 24px;
            color: #333;
        }

        .mobile-nav-links {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .mobile-nav-links a {
            color: #333;
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            padding: 10px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 1516px) {
            .top-nav {
                display: none;
            }

            .main-navbar {
                top: 20px;
                padding: 15px 20px;
                width: calc(100% - 40px);
                max-width: none;
                margin: 0 20px;
            }

            .logo-container {
                margin-left: 0;
            }

            .nav-links {
                display: none;
            }

            .mobile-menu-btn {
                display: block;
                margin-left: auto;
            }

            .hero h1 {
                font-size: 2.2rem;
            }

            .mobile-res {
                display: none;
            }

            .hero p {
                font-size: 1rem;
            }

            .btn-learn {
                padding: 12px 25px;
                font-size: 14px;
            }

            .green-circle {
                width: 40px;
                height: 40px;
                bottom: 20px;
                left: 20px;
            }
        }

        @media (max-width: 1516px) {
            .top-nav {
                display: none;
            }

            .hero h1 {
                font-size: 1.8rem;
            }

            .logo-text {
                font-size: 14px;
            }

            .main-navbar {
                padding: 12px 15px;
                margin: 0 10px;
                width: calc(100% - 20px);
            }
        }
    </style>
</head>

<body>
    <div class="container-fluid p-0">
        <div id="mobile-res" class="top-nav">
            <a href="#" class="text-decoration-none">Online banking</a>
            <a href="#" class="text-decoration-none">Private banking online</a>
            <a href="#" class="text-decoration-none">Straight2Bank</a>
            <a href="#" class="text-decoration-none">Local sites</a>
            <a href="#" class="text-decoration-none">Contact us</a>
        </div>

        <nav class="main-navbar">
            <div class="logo-container">
                <img class="img-fluid" width="150" height="100" src="../Standard-Chartered-Logo.png" alt="Logo">
            </div>

            <div class="nav-links">
                <a class="nav-link" href="#">About us</a>
                <a class="nav-link" href="#">Corporate & Investment</a>
                <a class="nav-link" href="#">Wealth & Retail</a>
                <a class="nav-link" href="#">Ventures</a>
                <a class="nav-link" href="#">Investors</a>
                <a class="nav-link" href="#">Insights</a>
                <a class="nav-link" href="#">Media</a>
                <a class="nav-link" href="#">Careers</a>
                <i class="fas fa-search search-icon"></i>
            </div>

            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                <i class="fas fa-bars"></i>
            </button>
        </nav>

        <div class="mobile-nav" id="mobileNav">
            <div class="mobile-nav-header">
                <div class="d-flex align-items-center">
                    <img class="img-fluid" width="145" height="110" src="../Standard-Chartered-Logo.png" alt="Logo">
                </div>
                <button class="mobile-close" onclick="toggleMobileMenu()">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="mobile-nav-links">
                <a href="#" class="text-decoration-none">Online banking</a>
                <a href="#" class="text-decoration-none">Private banking online</a>
                <a href="#" class="text-decoration-none">Straight2Bank</a>
                <a href="#" class="text-decoration-none">Local sites</a>
                <a href="#" class="text-decoration-none">Contact us</a>
                <a href="#" class="text-decoration-none">About us</a>
                <a href="#" class="text-decoration-none">Corporate & Investment</a>
                <a href="#" class="text-decoration-none">Wealth & Retail</a>
                <a href="#" class="text-decoration-none">Ventures</a>
                <a href="#" class="text-decoration-none">Investors</a>
                <a href="#" class="text-decoration-none">Insights</a>
                <a href="#" class="text-decoration-none">Media</a>
                <a href="#" class="text-decoration-none">Careers</a>
                <div class="mt-3">
                    <i class="fas fa-search" style="color: #333; font-size: 18px;"></i>
                </div>
            </div>
        </div>

        <section class="hero">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="hero-content text-center">
                            <h1 class="display-4 mb-4">
                                <span class="blue"></span> From here, possibilities are everywhere <span
                                    class="green"></span>
                            </h1>
                            <p class="lead mb-4">
                                We're here to connect your potential to possibilities in the world's most <br> dynamic
                                markets.
                            </p>
                            <a href="#" class="btn btn-learn">Learn how <span>></span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="green-circle"></div>
        </section>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function toggleMobileMenu() {
            const mobileNav = document.getElementById('mobileNav');
            mobileNav.classList.toggle('active');
        }

        document.addEventListener('click', function (e) {
            const mobileNav = document.getElementById('mobileNav');
            const menuBtn = document.querySelector('.mobile-menu-btn');

            if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileNav.classList.remove('active');
            }
        });
    </script>
</body>

</html>
