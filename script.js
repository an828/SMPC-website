// =========================
// S.M.P.C. WEBSITE JAVASCRIPT
// =========================

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // ELEMENTS
    // =========================

    const jobButtons = document.querySelectorAll(".job-card button");

    const jobModal = document.getElementById("jobModal");
    const closeModal = document.getElementById("closeModal");

    const jobSearch = document.getElementById("jobSearch");
    const locationFilter = document.getElementById("locationFilter");

    const noJobsMessage = document.getElementById("noJobsMessage");

    const modalJobTitle = document.getElementById("modalJobTitle");
    const modalSalary = document.getElementById("modalSalary");
    const modalLocation = document.getElementById("modalLocation");
    const modalQualification = document.getElementById("modalQualification");
    const modalExperience = document.getElementById("modalExperience");
    const modalDuty = document.getElementById("modalDuty");
    const modalRoom = document.getElementById("modalRoom");
    const modalFood = document.getElementById("modalFood");
    const modalDescription = document.getElementById("modalDescription");

    const modalContactBtn = document.querySelector(".modal-contact-btn");


    // =========================
    // CLOSE POPUP FUNCTION
    // =========================

    function closeJobModal() {

        jobModal.style.display = "none";

        document.body.style.overflow = "";

    }


    // Close button

    closeModal.addEventListener("click", function () {

        closeJobModal();

    });


    // Click outside popup

    jobModal.addEventListener("click", function (event) {

        if (event.target === jobModal) {

            closeJobModal();

        }

    });


    // Escape key

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeJobModal();

        }

    });


    // =========================
    // CONTACT S.M.P.C.
    // =========================

    


    // =========================
    // SEARCH + LOCATION FILTER
    // =========================

    function filterJobs() {

        const searchText =
            jobSearch.value.toLowerCase().trim();

        const selectedLocation =
            locationFilter.value.toLowerCase();

        let visibleJobs = 0;


        jobButtons.forEach(function (button) {

            const jobCard =
                button.closest(".job-card");

            const jobText =
                jobCard.textContent.toLowerCase();


            const matchesSearch =
                searchText === "" ||
                jobText.includes(searchText);


            const matchesLocation =
                selectedLocation === "" ||
                jobText.includes(selectedLocation);


            if (matchesSearch && matchesLocation) {

                jobCard.style.display = "";

                visibleJobs++;

            } else {

                jobCard.style.display = "none";

            }

        });


        // Show / hide No Jobs Found

        if (visibleJobs === 0) {

            noJobsMessage.style.display = "block";

        } else {

            noJobsMessage.style.display = "none";

        }

    }


    // Search typing

    jobSearch.addEventListener(
        "input",
        filterJobs
    );


    // Location change

    locationFilter.addEventListener(
        "change",
        filterJobs
    );


    // =========================
    // INITIAL STATE
    // =========================

    filterJobs();

});

// APPLICATION FORM → WHATSAPP

const applicationForm = document.getElementById("applicationForm");

if (applicationForm) {

    applicationForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("candidateName").value.trim();
        const phone = document.getElementById("candidatePhone").value.trim();
        const qualification = document.getElementById("candidateQualification").value;
        const job = document.getElementById("appliedJob").value.trim();
        const message = document.getElementById("candidateMessage").value.trim();

        if (!name || !phone || !qualification || !job) {
            alert("Please fill all required details.");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }
const response = await fetch("http://localhost:3000/api/applications", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: name,
        phone: phone,
        qualification: qualification,
        job: job,
        message: message
    })
});

const result = await response.json();

if (!response.ok || !result.success) {
    alert("Application save nahi ho payi. Please try again.");
    return;
}
        const whatsappMessage =
`Hello S.M.P.C.,

I am interested in the ${job} job.

My Details:
Name: ${name}
Mobile: ${phone}
Qualification: ${qualification}
Applied Job: ${job}
Message: ${message || "N/A"}

Thank you.`;

        const whatsappURL =
            "https://wa.me/919411821570?text=" +
            encodeURIComponent(whatsappMessage);

        window.open(whatsappURL, "_blank");

    });

}