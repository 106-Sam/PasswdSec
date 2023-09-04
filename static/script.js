    function Strength(password) {
        let i = 0;
        if (password.length > 6) {
            i++;
        }
        if (password.length >= 10) {
            i++;
        }
        if (/[A-Z]/.test(password)) {
            i++;
        }
        if (/[0-9]/.test(password)) {
            i++;
        }
        if (/[A-Za-z0-9]/.test(password)) {
            i++;
        }
        return i;
    }

    let container = document.querySelector('.container');
    let passwordInput = document.querySelector('#myPassword');

    document.addEventListener("keyup", function (e) {
        let password = passwordInput.value;
        let strength = Strength(password);
        
        container.classList.remove('weak', 'medium', 'strong');

        if (password === "") {
            container.classList.remove('weak', 'medium', 'strong');
        }
        else if (strength <= 2) {
            container.classList.add('weak');
        } else if (strength > 2 && strength <= 4) {
            container.classList.add('medium');
        } else {
            container.classList.add('strong');
        }
        // Send password data to backend for strength check
        sendPassword(password);
    });

    let pswrd = document.querySelector('#myPassword');
    let show = document.querySelector('.show');

    show.onclick = function () {
        if (pswrd.type === 'password') {
            pswrd.setAttribute('type', 'text');
            show.classList.add('hide');
        } else {
            show.classList.remove('hide');
            pswrd.setAttribute('type', 'password');
        }
    };

    function sendPassword(password) {
        fetch('/check_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `password=${encodeURIComponent(password)}`,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // You can handle the response here, if needed
        })
        .catch(error => {
            console.error('Error sending password:', error);
        });
    }
 
