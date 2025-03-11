document.addEventListener("DOMContentLoaded", function () {
    let savedUsername = localStorage.getItem("savedUsername");
    let savedPassword = localStorage.getItem("savedPassword");

    if (savedUsername && savedPassword) {
        document.getElementById("loginUsername").value = savedUsername;
        document.getElementById("loginPassword").value = savedPassword;
        document.getElementById("rememberMe").checked = true;

    }
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value;
    let rememberMe = document.getElementById("rememberMe").checked;
    let loginMessage = document.getElementById("loginMessage");

    // البحث عن اليوزر في localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
        loginMessage.style.color = "green";
        loginMessage.textContent = "تم تسجيل الدخول بنجاح";

        // حفظ بيانات عند تفعيل تذكرني
        if (rememberMe) {
            localStorage.setItem("savedUsername", username);
            localStorage.setItem("savedPassword", password);
        } else {
            localStorage.removeItem("savedUsername");
            localStorage.removeItem("savedPassword");
        }
        localStorage.setItem("loggedIn", "true");

        setTimeout(function () {
            window.location.replace("home.html");
        }, 800);

    } else {
        loginMessage.style.color = "red";
        loginMessage.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة";
    }
});



