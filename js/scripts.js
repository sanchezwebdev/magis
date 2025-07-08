//  Navbar shrink and behavior on scroll 
window.addEventListener("DOMContentLoaded", (event) => {
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  navbarShrink();
  document.addEventListener("scroll", navbarShrink);

  //  Activate Bootstrap scrollspy 
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  //  Collapse responsive navbar when a link is clicked 
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

//  Contact form data storage 
const formData = {
  firstName: "",
  email: "",
  phone: "",
  message: "",
};

//  Handle input changes 
const handleInputChange = (e) => {
  const { name, value } = e.target;
  formData[name] = value;
};

//  Validate form fields 
const validateForm = () => {
  const { firstName, email, phone, message } = formData;
  let errors = [];
  let errorMessage = "";
  const emailRegex = /\S+@\S+\.\S+/;
  const emailTest = emailRegex.test(email);

  if (!firstName) errors.push("Name");
  if (!email || !emailTest)
    errors.push(`Email formatted as 'user@example.com'`);
  if (!phone) errors.push("Phone");
  if (!message) errors.push("Message");
  if (errors.length > 0) {
    errorMessage = `Please add: ${errors.join(", ")}`;
    document.getElementById("submitErrorMessage").classList.remove("d-none");
    document.getElementById("submitErrorMessage").innerHTML = errorMessage;
    return false;
  }
  return true;
};

//  Fetch environment variables (from external service) 
const fetchEnvVariables = async () => {
  try {
    const response = await fetch(
      "https://env-variables.oracle942.workers.dev/"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch environment variables");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching environment variables:", error);
  }
};

//  Handle form submission and email sending 
const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const formDataToSend = new FormData(e.target);
      e.target.reset();
      document.getElementById("submitErrorMessage").classList.add("d-none");
      document
        .getElementById("submitSuccessMessage")
        .classList.remove("d-none");
      setTimeout(() => {
        document.getElementById("submitSuccessMessage").classList.add("d-none");
      }, 5000);

      const env = await fetchEnvVariables();

      const SERVICE_ID = "service_unejne8";
      const TEMPLATE_ID = "template_0mmtnxl";
      const PUBLIC_KEY = "qn0fZOYhWEb0Qr1Vl";

      formDataToSend.append("service_id", SERVICE_ID);
      formDataToSend.append("template_id", TEMPLATE_ID);
      formDataToSend.append("user_id", PUBLIC_KEY);

      const sendResponse = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send-form",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!sendResponse.ok) {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      alert("Oops... " + error.message);
    }
  }
};
