document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let message = document.getElementById("message");

   
    let passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        message.style.color = "red";
        message.textContent = "يجب أن تحتوي كلمة المرور على حروف كبيرة وصغيرة، أرقام، ورموز خاصة";
        return;
    } 

    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "كلمة المرور غير متطابقتين";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
        message.style.color = "red";
        message.textContent = "اسم المستخدم او البريد الإلكتروني مستخدم بالفعل";
        return;
    }

    users.push({ firstName, lastName, username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    message.style.color = "green";
    message.textContent = "تم التسجيل بنجاح";
    document.getElementById("registerForm").reset();
});



