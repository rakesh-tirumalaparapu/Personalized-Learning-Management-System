document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("jvRFpYauDVYXl4WsI");
    document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Fetch the form data
    const formData = {
        name: this.name.value,
        email: this.email.value,
        subject: this.subject.value,
        message: this.message.value
    };
    // Send the email
    emailjs.send("service_dcopfa2", "template_iekn956", formData)
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



task 5 :


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Data Entry Form</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        #jsonBox {
            background-color: #e9ecef;
            font-family: monospace;
            color: #495057;
        }
        .content-box {
            max-width: 700px; /* keep it neat */
            width: 100%;
        }
    </style>
</head>
<body>

    <div class="d-flex justify-content-center mt-5">
        <div class="card content-box shadow p-4">
            <div class="container">

                <form id="entryForm">
                    <div class="row mb-3 align-items-center">
                        <label for="fname" class="col-sm-3 col-form-label text-end"><b>First Name:</b></label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="fname" placeholder="Enter First Name" required>
                        </div>
                    </div>
                    <div class="row mb-3 align-items-center">
                        <label for="lname" class="col-sm-3 col-form-label text-end"><b>Second Name:</b></label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="lname" placeholder="Enter Second Name" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-9 offset-sm-3">
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <button type="button" id="showBtn" class="btn btn-primary">Display JSON Data</button>
                        </div>
                    </div>
                </form>

                <div class="row mt-4">
                    <div class="col-sm-9 offset-sm-3">
                        <textarea class="form-control" id="jsonBox" rows="4" readonly placeholder="JSON data will be displayed here..."></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const records = [];

        const entryForm = document.getElementById('entryForm');
        const fnameInput = document.getElementById('fname');
        const lnameInput = document.getElementById('lname');
        const showBtn = document.getElementById('showBtn');
        const jsonBox = document.getElementById('jsonBox');

        entryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const fname = fnameInput.value.trim();
            const lname = lnameInput.value.trim();

            if (fname && lname) {
                const obj = {
                    FirstName: fname,
                    LastName: lname
                };

                records.push(obj);
                alert("Data submitted successfully!");

                entryForm.reset();
                fnameInput.focus();
            } else {
                alert("Please fill in both fields!");
            }
        });

        showBtn.addEventListener('click', function() {
            const wrapper = [records];
            const jsonData = JSON.stringify(wrapper);
            jsonBox.value = jsonData;
        });
    </script>

</body>
</html>
