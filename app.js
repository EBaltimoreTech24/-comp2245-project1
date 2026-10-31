// Project 1: write your form validation in this file.
// Find the form and the thank-you message
const form = document.getElementById("signup-form");
const message = document.getElementById("form-message");

// Pattern: text, @, text, dot, text, no spaces
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Each field's id and its check (returns an error message or "")
const fields = [{
        id: "name",
        check: function(value) {
            if (value === "") {
                return "Enter your name.";
            }
            return "";
        }
    },
    {
        id: "email",
        check: function(value) {
            if (value === "") {
                return "Enter your email address.";
            }
            if (!emailPattern.test(value)) {
                return "Enter an email address like name@example.com.";
            }
            return "";
        }
    },
    {
        id: "frequency",
        check: function(value) {
            if (value === "") {
                return "Choose how often we should email you.";
            }
            return "";
        }
    }
];

// Run when the form is submitted
form.addEventListener("submit", function(event) {
    // Stop the page from reloading
    event.preventDefault();

    // Remove any old thank-you message
    message.textContent = "";
    message.classList.remove("success");

    // Will hold the first field with a problem
    let firstInvalid = null;

    for (const field of fields) {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.id + "-error");

        // trim() removes spaces from both ends
        const problem = field.check(input.value.trim());

        if (problem) {
            // Show the error and mark the field invalid
            error.textContent = problem;
            input.setAttribute("aria-invalid", "true");

            if (firstInvalid === null) {
                firstInvalid = input;
            }
        } else {
            error.textContent = "";
            input.removeAttribute("aria-invalid");
        }
    }

    // Focuses on the first bad field and stop
    if (firstInvalid !== null) {
        firstInvalid.focus();
        return;
    }

    // Reads the name before the form is cleared
    const name = document.getElementById("name").value.trim();

    message.textContent = "Thank you, " + name + "! You're on the mailing list.";
    message.classList.add("success");

    form.reset();
});
