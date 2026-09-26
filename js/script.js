// ========================================
// MOLESCREATIVITY PLATFORM
// MAIN JAVASCRIPT
// ========================================

// ================= SUPABASE =================

const SUPABASE_URL = "https://mbhhocnhydwcdxghfnry.supabase.co";

const SUPABASE_KEY = "sb_publishable_LR2biq1vtXsFOyx-AWMLXA_OTUq3DKn";


let supabaseClient = null;

// Only initialize Supabase if the library has loaded
if (window.supabase && SUPABASE_KEY !== "PASTE_YOUR_PUBLISHABLE_KEY_HERE") {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );
}

// ================= PAGE READY =================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Molescreativivity Platform loaded");

    // Existing mobile menu
    const menuButton = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });

    }

    // Close menu after clicking navigation links
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

        });

    });

    displayUserEmail();

});


// ================= GET CURRENT USER =================

async function getCurrentUser() {

    if (!supabaseClient) {
        return null;
    }

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


// ================= CHECK LOGIN =================

async function checkLogin() {

    const user = await getCurrentUser();

    if (!user) {

        window.location.href = "login.html";

        return null;
    }

    return user;
}


// ================= LOGOUT =================

async function logoutUser() {

    if (!supabaseClient) {

        window.location.href = "login.html";

        return;
    }

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {

        alert(error.message);

        return;
    }

    window.location.href = "login.html";
}


// ================= LOGOUT BUTTONS =================

document.addEventListener("click", function (event) {

    const logoutButton =
        event.target.closest(
            ".logout-btn, [data-action='logout']"
        );

    if (!logoutButton) {
        return;
    }

    event.preventDefault();

    logoutUser();

});


// ================= REGISTER =================

async function registerUser(
    firstName,
    lastName,
    email,
    username,
    password
) {

    if (!supabaseClient) {

        throw new Error(
            "Authentication system is not connected yet."
        );

    }

    const { data, error } =
        await supabaseClient.auth.signUp({

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


// ================= LOGIN =================

async function loginUser(email, password) {

    if (!supabaseClient) {

        throw new Error(
            "Authentication system is not connected yet."
        );

    }

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


// ================= REGISTER FORM =================

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

        return false;
    }


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return false;
    }


    if (password.length < 6) {

        alert(
            "Password must be at least 6 characters."
        );

        return false;
    }


    try {

        const data =
            await registerUser(
                firstName,
                lastName,
                email,
                username,
                password
            );

        console.log(
            "Registration successful:",
            data
        );


        if (
            data.user &&
            !data.session
        ) {

            alert(
                "Account created successfully! Please check your email to verify your account."
            );

        } else {

            alert(
                "Account created successfully!"
            );

        }


        window.location.href =
            "login.html";


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        alert(
            "Registration failed: " +
            error.message
        );

    }

    return false;
}


// ================= LOGIN FORM =================

async function loginDemo(event) {

    event.preventDefault();

    const email =
        document.getElementById("email")?.value.trim();

    const password =
        document.getElementById("password")?.value;


    if (!email || !password) {

        alert(
            "Please enter your email and password."
        );

        return false;
    }


    try {

        await loginUser(
            email,
            password
        );


        alert(
            "Login successful!"
        );


        window.location.href =
            "dashboard.html";


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        alert(
            "Login failed: " +
            error.message
        );

    }

    return false;
}


// ================= PROTECT DASHBOARD =================

async function protectDashboard() {

    const user =
        await getCurrentUser();

    if (!user) {

        window.location.href =
            "login.html";

        return null;
    }

    console.log(
        "Dashboard user:",
        user.email
    );

    return user;
}


// ================= DISPLAY USER EMAIL =================

async function displayUserEmail() {

    const user =
        await getCurrentUser();

    if (!user) {
        return;
    }


    const elements =
        document.querySelectorAll(
            "[data-user-email]"
        );


    elements.forEach(function (element) {

        element.textContent =
            user.email;

    });

}
