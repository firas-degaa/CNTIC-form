function isValidEmail(email) {   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function enforceMaxLength(inputId, maxLength) {
    const inputField = document.getElementById(inputId);
    
    if (!inputField) {
        return;
    }

    inputField.addEventListener('input', function() {
        if (this.value.length > maxLength) {
            this.value = this.value.slice(0, maxLength);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    if (!form) return;

    const MAX_NAME_LENGTH = 35; 
    enforceMaxLength('firstName', MAX_NAME_LENGTH);
    enforceMaxLength('lastName', MAX_NAME_LENGTH);


    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const emailInput = document.getElementById('mail');
        const phoneInput = document.getElementById('phonenumber');
        const studentIdInput = document.getElementById('studentId'); 
        const departmentInputs = document.querySelectorAll('input[name="department"]');
        
        let isValid = true;
        let departmentSelected = false;
        
        // Reset Error Styles
        emailInput.style.borderBottom = '';
        phoneInput.style.borderBottom = '';
        if (studentIdInput) studentIdInput.style.borderBottom = ''; 

        
        // 1. Email Validation
        if (!isValidEmail(emailInput.value)) {
            alert('Please enter a valid email address and ensure there are no spaces.');
            emailInput.focus();
            emailInput.style.borderBottom = '2px solid red';
            isValid = false;
        }

        // 2. Phone Number Validation (Exactly 10 digits)
        if (!/^\d{10}$/.test(phoneInput.value)) {
            if (isValid) {
                alert('Please enter a valid phone number (exactly 10 digits).');
                phoneInput.focus();
                phoneInput.style.borderBottom = '2px solid red';
            }
            isValid = false;
        }

        // 3. Student ID Validation (Exactly 12 digits)
        if (studentIdInput) {
            if (!/^\d{12}$/.test(studentIdInput.value)) {
                if (isValid) {
                    alert('Please enter a valid Student ID (exactly 12 digits).');
                    studentIdInput.focus();
                    studentIdInput.style.borderBottom = '2px solid red';
                }
                isValid = false;
            }
        }
        
        // 4. Department Selection Validation
        departmentInputs.forEach(radio => {
            if (radio.checked) {
                departmentSelected = true;
            }
        });

        if (!departmentSelected) {
            if (isValid) {
                 alert('Please select at least one department from the list.');
            }
            isValid = false;
        }
        
        // 5. Final Submission
        if (isValid) {
            const submitButton = document.querySelector('.glass-submit-btn');
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            setTimeout(() => {
                
                alert('🎉 Successfully received the membership request! Thank you for registering with CNTIC Club.');
                
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Confirm Information and Register';
            }, 1500);
        }
    });
});