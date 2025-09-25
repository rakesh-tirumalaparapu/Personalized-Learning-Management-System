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



task4

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Feedback — Showcase</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        :root {
            --light-mint: #b7f0e7;
            --main-teal: #23b2a9;
            --main-blue: #0f7bd6;
            --button-positive: #2fc04e;
            --badge-dark-blue: #0b64c7;
        }

        body {
            font-family: "Poppins", "Segoe UI", Arial;
            background: #fff;
            color: #222;
            padding: 24px;
        }

        /* Outer form box */
        .feedback-form-box {
            border: 2px solid var(--main-teal);
            padding: 18px;
            max-width: 800px;
            margin-bottom: 28px;
        }

        /* label badges on left */
        .info-label {
            background: var(--badge-dark-blue);
            color: #fff;
            padding: 12px 18px;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            min-width: 110px;
        }

        /* inputs style */
        .text-input-field {
            border: 3px solid var(--main-teal);
            padding: 12px;
            background: rgba(0, 0, 0, 0.02);
            font-size: 1.05rem;
            color: #a99b9bd2;
            min-height: 48px;
        }
        .text-input-field::placeholder{
            font-size: 2.2rem;
            color: #888;
            display: flex;
            text-align: center;
            justify-content: center;
        }

        .action-button {
            background: var(--button-positive);
            color: #fff;
            border: 2px solid black;
            padding: 10px 20px;
            border-radius: 12px;
            font-size: 1.5rem;
            min-width: 120px;
            display: block;
            margin: 18px auto 0;
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.08);
        }

        /* Feedback display area */
        .feedback-display-area {
            border: 2px solid #bdbdbd;
            padding: 18px;
        }

        .feedback-display-area h3 {
            margin-top: 0;
            margin-bottom: 16px;
            font-weight: 500;
        }

        /* The inner feedback card */
        .feedback-card {
            background: #fff;
            border: 3px solid var(--main-teal);
            border-radius: 28px;
            padding: 22px 28px;
            position: relative;
            margin-bottom: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .feedback-card .user-name {
            font-size: 1.5rem;
            font-weight: 500;
            color: #333;
        }

        .feedback-card .user-message {
            font-size: 1.5rem;
            margin-left: 40px;
            color: #555;
            line-height: 1.6;
        }

        /* Modify/Remove control (top-right) */
        .control-pill {
            position: absolute;
            right: 18px;
            top: 6px;
            border: 2px solid black;
            background: var(--button-positive);
            color: #fff;
            padding: 1px 25px;
            border-radius: 12px;
            text-align: center;
            cursor: pointer;
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.08);
            font-size: 1.5rem;
        }

        .control-pill small {
            display: block;
            font-size: 1.5rem;
            line-height: 1;
        }

        /* Responsive tweaks to match screenshot feeling */
        @media (max-width: 767px) {
            .info-label {
                min-width: 90px;
                font-size: 0.95rem;
                padding: 8px;
            }

            .text-input-field {
                font-size: 1rem;
            }

            .feedback-card {
                border-radius: 18px;
                padding: 16px;
            }

            .control-pill {
                right: 12px;
                top: 10px;
                padding: 8px 10px;
                font-size: 0.95rem;
            }

            .action-button {
                min-width: 110px;
                font-size: 1rem;
                padding: 8px 14px;
            }
        }
    </style>
</head>

<body>

    <div class="container">
        <div class="row g-4 justify-content-start">
            <div class="col-12 col-md-6">
                <div class="feedback-form-box">
                    <form id="feedbackForm" novalidate>
                        <div class="row align-items-center mb-3">
                            <div class="col-auto pe-0">
                                <div class="info-label">Name</div>
                            </div>
                            <div class="col">
                                <input id="user-name-input" class="text-input-field w-100" type="text"
                                    placeholder="Your Name" required>
                            </div>
                        </div>

                        <div class="row align-items-start mb-3">
                            <div class="col-auto pe-0">
                                <div class="info-label"
                                    style="padding-top:10px;padding-bottom:10px; min-height:72px;">
                                    Message
                                </div>
                            </div>
                            <div class="col">
                                <textarea id="user-msg-input" class="text-input-field w-100" rows="4"
                                    placeholder="Enter your Message" required></textarea>
                            </div>
                        </div>

                        <button type="submit" id="submit-action-btn" class="action-button">Submit</button>
                        <input type="hidden" id="item-to-edit-id" value="">
                    </form>
                </div>
            </div>

            <div class="col-12">
                <div class="feedback-display-area">
                    <h3>Testimonials</h3>
                    <div id="feedback-list-container">
                        <div class="feedback-card" data-id="sample-1">
                            <div class="control-pill" data-action="edit">Edit | <small>Delete</small></div>
                            <div class="user-name">Ritu</div>
                            <div class="user-message">It has been a positive experience with personable banking service in a
                                timely manner</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        (function () {
            const formElement = document.getElementById('feedbackForm');
            const nameField = document.getElementById('user-name-input');
            const messageField = document.getElementById('user-msg-input');
            const displayList = document.getElementById('feedback-list-container');
            const editIdHiddenField = document.getElementById('item-to-edit-id');
            const actionButton = document.getElementById('submit-action-btn');

            // --- Storage helpers ---
            function loadItemsFromStorage() {
                // Key name changed from "testimonials" to "feedbackItems"
                return JSON.parse(localStorage.getItem("feedbackItems") || "[]");
            }
            function saveItemsToStorage(dataArray) {
                // Key name changed from "testimonials" to "feedbackItems"
                localStorage.setItem("feedbackItems", JSON.stringify(dataArray));
            }

            // utility to generate simple IDs
            function generateUniqueId() { return 'fid-' + Math.random().toString(36).slice(2, 9); } // Prefix changed

            // Render feedback card HTML element
            function createFeedbackElement(itemId, itemName, itemMsg) {
                const wrapper = document.createElement('div');
                wrapper.className = 'feedback-card'; // Class name changed
                wrapper.dataset.id = itemId;

                const control = document.createElement('div');
                control.className = 'control-pill'; // Class name changed
                control.innerHTML = 'Edit | <small>Delete</small>';
                control.addEventListener('click', handleControlPillClick); // Function name changed

                const nameDiv = document.createElement('div');
                nameDiv.className = 'user-name'; // Class name changed
                nameDiv.textContent = itemName;

                const msgDiv = document.createElement('div');
                msgDiv.className = 'user-message'; // Class name changed
                msgDiv.textContent = itemMsg;

                wrapper.appendChild(control);
                wrapper.appendChild(nameDiv);
                wrapper.appendChild(msgDiv);
                return wrapper;
            }

            // Render all feedback items
            function refreshFeedbackDisplay() { // Function name changed
                displayList.innerHTML = "";
                const items = loadItemsFromStorage();
                items.forEach(item => {
                    const elem = createFeedbackElement(item.id, item.name, item.msg);
                    displayList.appendChild(elem);
                });
            }

            // Handle form submission
            formElement.addEventListener('submit', function (e) {
                e.preventDefault();
                const name = nameField.value.trim();
                const msg = messageField.value.trim();
                if (!name || !msg) {
                    alert('Enter both name and message !');
                    return;
                }

                const items = loadItemsFromStorage();
                const editingId = editIdHiddenField.value;

                if (editingId) {
                    // update existing item
                    const index = items.findIndex(item => item.id === editingId);
                    if (index > -1) {
                        items[index].name = name;
                        items[index].msg = msg;
                    }
                    saveItemsToStorage(items);
                    editIdHiddenField.value = "";
                    actionButton.textContent = "Submit";
                } else {
                    // create new item
                    const id = generateUniqueId();
                    items.push({ id, name, msg });
                    saveItemsToStorage(items);
                }

                refreshFeedbackDisplay();
                formElement.reset();
            });

            // handle edit/delete control pill click
            function handleControlPillClick(e) { // Function name changed
                const cardElement = e.currentTarget.closest('.feedback-card');
                const id = cardElement.dataset.id;

                const choice = confirm('Edit or Delete ? OK for Edit, Cancel for Delete');
                if (choice) {
                    // edit flow
                    const items = loadItemsFromStorage();
                    const item = items.find(i => i.id === id);
                    if (item) {
                        nameField.value = item.name;
                        messageField.value = item.msg;
                        editIdHiddenField.value = id;
                        actionButton.textContent = 'Update';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                } else {
                    // delete flow
                  
                        let items = loadItemsFromStorage().filter(i => i.id !== id);
                        saveItemsToStorage(items);
                        refreshFeedbackDisplay();
                    
                }
            }

            // --- On page load ---
            refreshFeedbackDisplay();
        })();
    </script>


</body>

</html>
