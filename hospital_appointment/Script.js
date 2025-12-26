/********************************
  LOGIN FUNCTIONALITY
*********************************/
function login() {
    const role = document.getElementById("role").value;
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (role === "patient" && user === "patient" && pass === "1234") {
        localStorage.setItem("role", "patient");
        window.location.href = "patient.html";
    }
    else if (role === "doctor" && user === "doctor" && pass === "1234") {
        localStorage.setItem("role", "doctor");
        window.location.href = "doctor.html";
    }
    else {
        alert("Invalid login credentials");
    }
}

/********************************
  LOGOUT FUNCTION
*********************************/
function logout() {
    localStorage.removeItem("role");
    window.location.href = "login.html";
}

/********************************
  PATIENT DASHBOARD LOGIC
*********************************/
if (document.getElementById("appointmentForm")) {

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const list = document.getElementById("appointmentList");

    function displayAppointments() {
        list.innerHTML = "";

        appointments.forEach((app, index) => {
            list.innerHTML += `
                <tr>
                    <td>${app.name}</td>
                    <td>${app.age}</td>
                    <td>${app.doctor}</td>
                    <td>${app.date}</td>
                    <td>${app.time}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteAppointment(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    document.getElementById("appointmentForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const appointment = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            doctor: document.getElementById("doctor").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value
        };

        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));

        displayAppointments();
        this.reset();
    });

    function deleteAppointment(index) {
        appointments.splice(index, 1);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        displayAppointments();
    }

    // Make function accessible to HTML
    window.deleteAppointment = deleteAppointment;

    displayAppointments();
}

/********************************
  DOCTOR DASHBOARD LOGIC
*********************************/
if (document.getElementById("doctorAppointments")) {

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const table = document.getElementById("doctorAppointments");

    table.innerHTML = "";

    appointments.forEach(app => {
        table.innerHTML += `
            <tr>
                <td>${app.name}</td>
                <td>${app.age}</td>
                <td>${app.doctor}</td>
                <td>${app.date}</td>
                <td>${app.time}</td>
            </tr>
        `;
    });
}
/********************************
  PATIENT PROFILE PAGE
*********************************/
if (document.getElementById("patientHistory")) {

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const historyTable = document.getElementById("patientHistory");

    if (appointments.length > 0) {
        document.getElementById("pName").innerText = appointments[0].name;
        document.getElementById("pAge").innerText = appointments[0].age;
    } else {
        document.getElementById("pName").innerText = "N/A";
        document.getElementById("pAge").innerText = "N/A";
    }

    appointments.forEach(app => {
        historyTable.innerHTML += `
            <tr>
                <td>${app.doctor}</td>
                <td>${app.date}</td>
                <td>${app.time}</td>
            </tr>
        `;
    });
}

/********************************
  DOCTOR PROFILE PAGE
*********************************/
if (document.getElementById("totalAppointments")) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    document.getElementById("totalAppointments").innerText = appointments.length;
}