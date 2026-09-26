// ========================================
// MOLESCREATIVITY PLATFORM
// MAIN JAVASCRIPT
// ========================================

// ---------- SUPABASE ----------
const SUPABASE_URL = "https://mbhhocnhydwcdxghfnry.supabase.co";

const SUPABASE_KEY = "sb_publishable_LR2biq1vtXsFOyx-AWMLXA_OTUq3DKn";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ---------- PAGE READY ----------
document.addEventListener("DOMContentLoaded", function () {

    console.log("Molescreativivity Platform loaded");

    // Mobile menu
    const menuButton = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    // Close mobile menu after clicking a link
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navMenu) {
                navMenu.classList.remove("active");
            }
        });
    });

});


// ========================================
// SUPABASE AUTHENTICATION
// ========================================

// Get logged-in user
async function getCurrentUser() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();

    if (error) {
        console.error("User error:", error);
        return null;
    }

    return user;
}


// Check if user is logged in
async function checkLogin() {

    const user = await getCurrentUser();

    if (!user) {
        window.location.href = "login.html";
        return null;
    }

    return user;
}


// Logout
async function logoutUser() {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert(error.message);
        return;
    }

    window.location.href = "login.html";
}


// ========================================
// AUTH STATE
// ========================================

supabaseClient.auth.onAuthStateChange(function (event, session) {

    console.log("Authentication:", event);

    if (session) {
        console.log("Logged in:", session.user.email);
    } else {
        console.log("Not logged in");
    }

});


// ========================================
// LOGOUT BUTTONS
// ========================================

document.addEventListener("click", function (event) {

    const logoutButton = event.target.closest(
        ".logout-btn, [data-action='logout']"
    );

    if (logoutButton) {
        event.preventDefault();
        logoutUser();
    }

});


// ========================================
// REGISTER
// ========================================

async function registerUser(
    firstName,
    lastName,
    email,
    username,
    password
) {

    const { data, error } = await supabaseClient.auth.signUp({

        email: email,
        password: password,

        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                username: username
            }
        }

    });

    if (error) {
        throw error;
    }

    return data;
}


// ========================================
// LOGIN
// ========================================

async function loginUser(email, password) {

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({

            email: email,
            password: password

        });

    if (error) {
        throw error;
    }

    return data;
}


// ========================================
// REGISTER FORM
// ========================================

async function registerDemo(event) {

    event.preventDefault();

    const firstName =
        document.getElementById("firstName")?.value.trim();

    const lastName =
        document.getElementById("lastName")?.value.trim();

    const email =
        document.getElementById("email")?.value.trim();

    const username =
        document.getElementById("username")?.value.trim();

    const password =
        document.getElementById("password")?.value;

    const confirmPassword =
        document.getElementById("confirmPassword")?.value;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !username ||
        !password
    ) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    try {

        const data = await registerUser(
            firstName,
            lastName,
            email,
            username,
            password
        );

        console.log("Registration successful:", data);

        alert(
            "Account created successfully! Check your email if verification is required."
        );

        window.location.href = "login.html";

    } catch (error) {

        console.error(error);

        alert(
            "Registration failed: " + error.message
        );

    }

}


// ========================================
// LOGIN FORM
// ========================================

async function loginDemo(event) {

    event.preventDefault();

    const email =
        document.getElementById("email")?.value.trim();

    const password =
        document.getElementById("password")?.value;

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    try {

        await loginUser(email, password);

        alert("Login successful!");

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error(error);

        alert(
            "Login failed: " + error.message
        );

    }

}


// ========================================
// PROTECT DASHBOARD
// ========================================

async function protectDashboard() {

    const user = await getCurrentUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    console.log("Dashboard user:", user.email);

}


// ========================================
// DISPLAY USER EMAIL
// ========================================

async function displayUserEmail() {

    const user = await getCurrentUser();

    if (!user) {
        return;
    }

    const elements =
        document.querySelectorAll("[data-user-email]");

    elements.forEach(function (element) {
        element.textContent = user.email;
    });

}


// ========================================
// INITIALIZE
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    displayUserEmail();

});
