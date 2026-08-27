const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.static(__dirname));
const PORT = 3000;

app.use(cors());
app.use(express.json());

const applicationsFile = path.join(__dirname, "applications.json");

// Create applications.json if it doesn't exist
if (!fs.existsSync(applicationsFile)) {
    fs.writeFileSync(applicationsFile, "[]");
}

// Receive application
app.post("/api/applications", (req, res) => {
    const application = {
        id: Date.now(),
        name: req.body.name,
        phone: req.body.phone,
        qualification: req.body.qualification,
        job: req.body.job,
        message: req.body.message || "",
        createdAt: new Date().toISOString()
    };

    const applications = JSON.parse(
        fs.readFileSync(applicationsFile, "utf8")
    );

    applications.push(application);

    fs.writeFileSync(
        applicationsFile,
        JSON.stringify(applications, null, 2)
    );

    res.json({
        success: true,
        message: "Application saved successfully"
    });
});

// Get all applications
app.get("/api/applications", (req, res) => {
    const applications = JSON.parse(
        fs.readFileSync(applicationsFile, "utf8")
    );

    res.json(applications);
});
// Delete application
app.delete("/api/applications/:id", (req, res) => {
    const id = Number(req.params.id);

    const applications = JSON.parse(
        fs.readFileSync(applicationsFile, "utf8")
    );

    const updatedApplications = applications.filter(
        application => application.id !== id
    );

    fs.writeFileSync(
        applicationsFile,
        JSON.stringify(updatedApplications, null, 2)
    );

    res.json({
        success: true,
        message: "Application deleted successfully"
    });
});
// =========================
// JOB MANAGEMENT
// =========================

const jobsFile = path.join(__dirname, "jobs.json");

// Get all jobs
app.get("/api/jobs", (req, res) => {

    const jobs = JSON.parse(
        fs.readFileSync(jobsFile, "utf8")
    );

    res.json(jobs);

});


// Add a new job
app.post("/api/jobs", (req, res) => {

    const job = {
        id: Date.now(),
        title: req.body.title,
        salary: req.body.salary,
        location: req.body.location,
        qualification: req.body.qualification,
        experience: req.body.experience,
        duty: req.body.duty,
        room: req.body.room,
        food: req.body.food,
        description: req.body.description,
        status: "Active",
        createdAt: new Date().toISOString()
    };

    const jobs = JSON.parse(
        fs.readFileSync(jobsFile, "utf8")
    );

    jobs.push(job);

    fs.writeFileSync(
        jobsFile,
        JSON.stringify(jobs, null, 2)
    );

    res.json({
        success: true,
        message: "Job added successfully",
        job: job
    });

});
// =========================
// EDIT JOB
// =========================

app.put("/api/jobs/:id", (req, res) => {

    const jobs = JSON.parse(
        fs.readFileSync(jobsFile, "utf8")
    );

    const jobId = Number(req.params.id);

    const jobIndex = jobs.findIndex(
        job => job.id === jobId
    );

    if (jobIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Job not found"
        });
    }

    jobs[jobIndex] = {
        ...jobs[jobIndex],
        title: req.body.title,
        salary: req.body.salary,
        location: req.body.location,
        qualification: req.body.qualification,
        experience: req.body.experience,
        duty: req.body.duty,
        room: req.body.room,
        food: req.body.food,
        description: req.body.description
    };

    fs.writeFileSync(
        jobsFile,
        JSON.stringify(jobs, null, 2)
    );

    res.json({
        success: true,
        message: "Job updated successfully",
        job: jobs[jobIndex]
    });

});


// =========================
// DELETE JOB
// =========================

app.delete("/api/jobs/:id", (req, res) => {

    const jobs = JSON.parse(
        fs.readFileSync(jobsFile, "utf8")
    );

    const jobId = Number(req.params.id);

    const updatedJobs = jobs.filter(
        job => job.id !== jobId
    );

    if (updatedJobs.length === jobs.length) {
        return res.status(404).json({
            success: false,
            message: "Job not found"
        });
    }

    fs.writeFileSync(
        jobsFile,
        JSON.stringify(updatedJobs, null, 2)
    );

    res.json({
        success: true,
        message: "Job deleted successfully"
    });

});
// ADMIN LOGIN

app.post("/api/admin/login", (req, res) => {

    const { username, password } = req.body;

    // Temporary admin credentials
    if (username === "admin" && password === "SSan@$123jain") {

        res.json({
            success: true,
            message: "Login successful"
        });

    } else {

        res.status(401).json({
            success: false,
            message: "Invalid username or password"
        });

    }

});
// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`S.M.P.C. Backend running at http://localhost:${PORT}`);
});
