// emailValidation.js

function isEmailValid(email) {
    // Regular expression pattern for a valid email address
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Use the test method to check if the email matches the pattern
    return emailPattern.test(email);
}

module.exports = isEmailValid;
