/* =========================================================
   EXPERTCARE - MAIN JAVASCRIPT
   File: static/js/script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. SMOOTH SCROLL
       ===================================================== */

    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                targetId &&
                targetId !== "#" &&
                document.querySelector(targetId)
            ) {
                event.preventDefault();

                const target = document.querySelector(targetId);

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =====================================================
       2. DOCTOR DATA
       ===================================================== */

    const doctors = [
        {
            name: "Dr. Rahul Sharma",
            speciality: "General Physician",
            specialityValue: "general-physician",
            area: "Shahdara",
            areaValue: "shahdara",
            experience: "12 Years Experience",
            qualification: "MBBS, MD",
            fee: "₹500",
            rating: "4.8",
            image: "doctor1.jpg"
        },

        {
            name: "Dr. Amit Verma",
            speciality: "Orthopedic",
            specialityValue: "orthopedic",
            area: "Laxmi Nagar",
            areaValue: "laxmi-nagar",
            experience: "10 Years Experience",
            qualification: "MBBS, MS Orthopedics",
            fee: "₹700",
            rating: "4.7",
            image: "doctor2.jpg"
        },

        {
            name: "Dr. Neha Gupta",
            speciality: "Gynecologist",
            specialityValue: "gynecologist",
            area: "Preet Vihar",
            areaValue: "preet-vihar",
            experience: "9 Years Experience",
            qualification: "MBBS, MD",
            fee: "₹600",
            rating: "4.9",
            image: "doctor3.jpg"
        },

        {
            name: "Dr. Pooja Mehta",
            speciality: "Dermatologist",
            specialityValue: "dermatologist",
            area: "Vivek Vihar",
            areaValue: "vivek-vihar",
            experience: "8 Years Experience",
            qualification: "MBBS, MD Dermatology",
            fee: "₹650",
            rating: "4.8",
            image: "doctor4.jpg"
        }
    ];


    /* =====================================================
       3. DOCTOR SEARCH
       ===================================================== */

    const doctorFilterForm = document.querySelector(
        ".doctor-filters form"
    );

    const doctorArea = document.getElementById(
        "doctor-area"
    );

    const doctorSpeciality = document.getElementById(
        "doctor-speciality"
    );

    const doctorNameInput = document.getElementById(
        "doctor-name"
    );

    const doctorList = document.querySelector(
        ".doctor-list"
    );


    function filterDoctors() {

        if (!doctorList) {
            return;
        }

        const selectedArea =
            doctorArea ? doctorArea.value.toLowerCase() : "";

        const selectedSpeciality =
            doctorSpeciality
                ? doctorSpeciality.value.toLowerCase()
                : "";

        const searchedName =
            doctorNameInput
                ? doctorNameInput.value.toLowerCase().trim()
                : "";


        const filteredDoctors = doctors.filter(function (doctor) {

            const matchesArea =
                selectedArea === "" ||
                doctor.areaValue.toLowerCase() === selectedArea;

            const matchesSpeciality =
                selectedSpeciality === "" ||
                doctor.specialityValue.toLowerCase() ===
                selectedSpeciality;

            const matchesName =
                searchedName === "" ||
                doctor.name.toLowerCase().includes(searchedName);

            return (
                matchesArea &&
                matchesSpeciality &&
                matchesName
            );

        });


        displayDoctors(filteredDoctors);

    }


    /* =====================================================
       4. DISPLAY DOCTORS
       ===================================================== */

    function displayDoctors(doctorsToDisplay) {

        if (!doctorList) {
            return;
        }


        doctorList.innerHTML = "";


        if (doctorsToDisplay.length === 0) {

            doctorList.innerHTML = `
                <div class="no-doctors"
                     style="
                        grid-column: 1 / -1;
                        text-align: center;
                        padding: 40px 20px;
                        background: #ffffff;
                        border-radius: 15px;
                     ">

                    <h3>No doctors found</h3>

                    <p>
                        Try another area or speciality.
                    </p>

                </div>
            `;

            return;
        }


        doctorsToDisplay.forEach(function (doctor) {

            const doctorCard = document.createElement(
                "article"
            );

            doctorCard.className = "doctor-card";


            doctorCard.innerHTML = `

                <div class="doctor-photo">

                    <img
                        src="/static/images/doctors/${doctor.image}"
                        alt="${doctor.name}"
                    >

                </div>


                <div class="doctor-information">

                    <p class="doctor-speciality">
                        ${doctor.speciality}
                    </p>

                    <h3>
                        ${doctor.name}
                    </h3>

                    <p>
                        ${doctor.qualification}
                    </p>

                    <p>
                        ${doctor.experience}
                    </p>

                    <p>
                        📍 ${doctor.area}
                    </p>

                    <p>
                        Consultation Fee:
                        ${doctor.fee}
                    </p>

                    <p>
                        ⭐ ${doctor.rating}
                    </p>


                    <div class="doctor-actions">

                        <a
                            href="#"
                            class="view-profile"
                            data-doctor="${doctor.name}"
                        >
                            View Profile
                        </a>

                        <a
                            href="#appointment"
                            class="book-doctor"
                            data-doctor="${doctor.name}"
                        >
                            Book Appointment
                        </a>

                    </div>

                </div>

            `;


            doctorList.appendChild(doctorCard);

        });


        attachDoctorButtons();

    }


    /* =====================================================
       5. DOCTOR FILTER FORM
       ===================================================== */

    if (doctorFilterForm) {

        doctorFilterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                filterDoctors();

                if (doctorList) {
                    doctorList.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            }
        );

    }


    /* =====================================================
       6. LIVE DOCTOR SEARCH
       ===================================================== */

    if (doctorNameInput) {

        doctorNameInput.addEventListener(
            "input",
            function () {

                filterDoctors();

            }
        );

    }


    if (doctorArea) {

        doctorArea.addEventListener(
            "change",
            function () {

                filterDoctors();

            }
        );

    }


    if (doctorSpeciality) {

        doctorSpeciality.addEventListener(
            "change",
            function () {

                filterDoctors();

            }
        );

    }


    /* =====================================================
       7. INITIAL DOCTORS
       ===================================================== */

    if (doctorList) {

        /*
         * Initially HTML ke doctors already available hain.
         * Isliye initial load par unko replace nahi karenge.
         */

        attachDoctorButtons();

    }


    /* =====================================================
       8. DOCTOR BUTTONS
       ===================================================== */

    function attachDoctorButtons() {

        const profileButtons =
            document.querySelectorAll(
                ".view-profile"
            );


        profileButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const doctorName =
                        this.getAttribute(
                            "data-doctor"
                        );

                    showDoctorProfile(
                        doctorName
                    );

                }
            );

        });


        const bookingButtons =
            document.querySelectorAll(
                ".book-doctor"
            );


        bookingButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const doctorName =
                        this.getAttribute(
                            "data-doctor"
                        );

                    const appointmentMessage =
                        document.getElementById(
                            "message"
                        );


                    if (appointmentMessage) {

                        appointmentMessage.value =
                            "I would like to book an appointment with " +
                            doctorName +
                            ".";

                    }

                }
            );

        });

    }


    /* =====================================================
       9. DOCTOR PROFILE
       ===================================================== */

    function showDoctorProfile(doctorName) {

        const doctor = doctors.find(
            function (item) {
                return item.name === doctorName;
            }
        );


        if (!doctor) {
            return;
        }


        alert(
            doctor.name +
            "\n\n" +
            doctor.speciality +
            "\n" +
            doctor.qualification +
            "\n" +
            doctor.experience +
            "\n" +
            "Area: " + doctor.area +
            "\n" +
            "Consultation Fee: " + doctor.fee +
            "\n" +
            "Rating: ⭐ " + doctor.rating
        );

    }


    /* =====================================================
       10. MAIN HEALTHCARE SEARCH
       ===================================================== */

    const healthcareSearchForm =
        document.querySelector(
            ".healthcare-search form"
        );


    if (healthcareSearchForm) {

        healthcareSearchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const area =
                    document.getElementById(
                        "area"
                    ).value;

                const service =
                    document.getElementById(
                        "service"
                    ).value;

                const speciality =
                    document.getElementById(
                        "speciality"
                    ).value;


                /*
                 * Doctor Appointment
                 */

                if (service === "doctor") {

                    if (doctorArea) {
                        doctorArea.value = area;
                    }

                    if (doctorSpeciality) {
                        doctorSpeciality.value =
                            speciality;
                    }

                    filterDoctors();


                    const doctorSection =
                        document.getElementById(
                            "doctors"
                        );

                    if (doctorSection) {

                        doctorSection.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                    return;
                }


                /*
                 * Surgery
                 */

                if (service === "surgery") {

                    const surgerySection =
                        document.getElementById(
                            "surgery"
                        );

                    if (surgerySection) {

                        surgerySection.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                    return;
                }


                /*
                 * Home Care
                 */

                if (service === "home-care") {

                    const homeCareSection =
                        document.getElementById(
                            "home-care"
                        );

                    if (homeCareSection) {

                        homeCareSection.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                    return;
                }


                /*
                 * No service selected
                 */

                alert(
                    "Please select a healthcare service."
                );

            }
        );

    }


    /* =====================================================
       11. APPOINTMENT FORM
       ===================================================== */

    const appointmentForm =
        document.querySelector(
            ".appointment-form form"
        );


    if (appointmentForm) {

        appointmentForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const patientName =
                    document.getElementById(
                        "patient-name"
                    ).value.trim();


                const phone =
                    document.getElementById(
                        "phone"
                    ).value.trim();


                const area =
                    document.getElementById(
                        "appointment-area"
                    ).value;


                const service =
                    document.getElementById(
                        "appointment-service"
                    ).value;


                const date =
                    document.getElementById(
                        "appointment-date"
                    ).value;


                const time =
                    document.getElementById(
                        "appointment-time"
                    ).value;


                /* Basic validation */

                if (!patientName) {

                    alert(
                        "Please enter patient name."
                    );

                    return;

                }


                if (!phone) {

                    alert(
                        "Please enter mobile number."
                    );

                    return;

                }


                if (!/^[0-9]{10}$/.test(phone)) {

                    alert(
                        "Please enter a valid 10-digit mobile number."
                    );

                    return;

                }


                if (!area) {

                    alert(
                        "Please select an area."
                    );

                    return;

                }


                if (!service) {

                    alert(
                        "Please select a service."
                    );

                    return;

                }


                if (!date) {

                    alert(
                        "Please select appointment date."
                    );

                    return;

                }


                if (!time) {

                    alert(
                        "Please select appointment time."
                    );

                    return;

                }


                /*
                 * Frontend confirmation.
                 *
                 * Later Flask backend/database
                 * ke saath yahin request bhejenge.
                 */

                alert(
                    "Appointment request submitted successfully!\n\n" +
                    "Patient: " + patientName +
                    "\nArea: " + area +
                    "\nService: " + service +
                    "\nDate: " + date +
                    "\nTime: " + time
                );


                appointmentForm.reset();

            }
        );

    }


    /* =====================================================
       12. DATE VALIDATION
       ===================================================== */

    const appointmentDate =
        document.getElementById(
            "appointment-date"
        );


    if (appointmentDate) {

        /*
         * Past date select nahi karne denge.
         */

        const today =
            new Date().toISOString().split("T")[0];

        appointmentDate.setAttribute(
            "min",
            today
        );

    }


    /* =====================================================
       13. PHONE NUMBER INPUT
       ===================================================== */

    const phoneInput =
        document.getElementById(
            "phone"
        );


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                /*
                 * Sirf numbers allow
                 */

                this.value =
                    this.value.replace(
                        /[^0-9]/g,
                        ""
                    );


                /*
                 * Maximum 10 digits
                 */

                if (this.value.length > 10) {

                    this.value =
                        this.value.slice(
                            0,
                            10
                        );

                }

            }
        );

    }


    /* =====================================================
       14. SERVICE CARD BOOK BUTTONS
       ===================================================== */

    const serviceLinks =
        document.querySelectorAll(
            '.service-card a[href="#appointment"], ' +
            '.home-care-card a[href="#appointment"]'
        );


    serviceLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                const appointmentService =
                    document.getElementById(
                        "appointment-service"
                    );

                const linkText =
                    this.closest(
                        "article"
                    )
                    ?.querySelector("h3")
                    ?.textContent
                    .trim()
                    .toLowerCase();


                if (!appointmentService) {
                    return;
                }


                if (
                    linkText &&
                    linkText.includes("doctor")
                ) {

                    appointmentService.value =
                        "doctor";

                }

                else if (
                    linkText &&
                    linkText.includes("surgery")
                ) {

                    appointmentService.value =
                        "surgery";

                }

                else if (
                    linkText &&
                    (
                        linkText.includes("nurse") ||
                        linkText.includes("patient") ||
                        linkText.includes("elder") ||
                        linkText.includes("post")
                    )
                ) {

                    appointmentService.value =
                        "home-care";

                }

            }
        );

    });


    /* =====================================================
       15. NAVIGATION ACTIVE STATE
       ===================================================== */

    const pageSections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navItems =
        document.querySelectorAll(
            'nav a[href^="#"]'
        );


    window.addEventListener(
        "scroll",
        function () {

            let currentSection = "";


            pageSections.forEach(function (section) {

                const sectionTop =
                    section.offsetTop - 120;


                if (
                    window.scrollY >= sectionTop
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            });


            navItems.forEach(function (link) {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        }
    );


    /* =====================================================
       16. PREVENT EMPTY HASH LINKS
       ===================================================== */

    document.querySelectorAll(
        'a[href="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

            }
        );

    });


    /* =====================================================
       17. CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "ExpertCare JavaScript loaded successfully."
    );

});
