document.addEventListener("DOMContentLoaded", () => {
    const resultsContainer = document.getElementById("results");
    const currentUrl = window.location.href;

    if (currentUrl.includes("?")) {
        const formData = new URLSearchParams(window.location.search);

        const fname = formData.get("fname") || "N/A";
        const lname = formData.get("lname") || "N/A";
        const email = formData.get("email") || "N/A";
        const phone = formData.get("phone") || "N/A";
        const organization = formData.get("organization") || "N/A";
        const rawTimestamp = formData.get("timestamp") || "";

        let formattedDate = "N/A";
        if (rawTimestamp) {
            const dateObj = new Date(decodeURIComponent(rawTimestamp));
            formattedDate = isNaN(dateObj) ? rawTimestamp : dateObj.toLocaleString();
        }

        resultsContainer.innerHTML = `
            <p><strong>First Name:</strong> ${fname}</p>
            <p><strong>Last Name:</strong> ${lname}</p>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Mobile Phone:</strong> ${phone}</p>
            <p><strong>Organization Name:</strong> ${organization}</p>
            <p><strong>Date & Time Submitted:</strong> ${formattedDate}</p>
        `;
    } else {
        resultsContainer.innerHTML = "<p>No application data found. Please complete the application form first.</p>";
    }
});