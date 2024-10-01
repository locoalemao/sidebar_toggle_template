// Function to escape special characters in user input
function escapeHTML(text) {
  return text.replace(/[&<>"']/g, function (char) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return map[char];
  });
}

if (window.location.pathname === "index.html") {
  const contactForm = document.getElementById("contact-form");
  const contactMessage = document.getElementById("contact-message");

  const sendEmail = (e) => {
    e.preventDefault();

    // Check for h fields
    const hName = document.querySelector('input[name="h_name"]').value;
    const hEmail = document.querySelector('input[name="h_email"]').value;

    if (hName || hEmail) {
      contactMessage.textContent = "Bot detected! ❌";
      return;
    }

    // Get and escape form values
    const userName = escapeHTML(document.querySelector('input[name="user_name"]').value);
    const userEmail = escapeHTML(document.querySelector('input[name="user_email"]').value);
    const userMessage = escapeHTML(document.querySelector('textarea[name="user_project"]').value);

    // Get the reCAPTCHA response token
    const recaptchaResponse = grecaptcha.getResponse();
    
    if (recaptchaResponse.length === 0) {
      // If reCAPTCHA is not completed
      contactMessage.textContent = "Please complete the reCAPTCHA ❌";
    } else {
      // Prepare data to send via the serverless function
      const formData = {
        user_name: userName,
        user_email: userEmail,
        user_project: userMessage
      };

      fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          contactMessage.textContent = "Mensagem enviada com sucesso ✔️";
          grecaptcha.reset();
          contactForm.reset();
        } else {
          contactMessage.textContent = "Message not sent (service error) ❌";
        }

        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);
      })
      .catch(() => {
        contactMessage.textContent = "Message not sent (network error) ❌";
      });
    }
  };

  contactForm.addEventListener('submit', sendEmail);
}

/*============ SHOW SCROLL UP WITH DEBOUNCE ============*/
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const scrollUp = () => {
  const scrollUpButton = document.getElementById("scroll-up");
  window.scrollY >= 350
    ? scrollUpButton.classList.add("show-scroll")
    : scrollUpButton.classList.remove("show-scroll");
};

const scrollToTop = () => {
  const scrollUpButton = document.getElementById("scroll-up");
  scrollUpButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

// Apply debounce to scroll event listener with a 100ms delay
window.addEventListener("scroll", debounce(scrollUp, 100));
scrollToTop();

window.addEventListener("scroll", scrollUp);
scrollToTop();

/*============ SCROLL SECTIONS ACTIVE LINK ============*/
document.addEventListener("DOMContentLoaded", (event) => {
  document.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && e.target.hash) {
      const targetPath = e.target.pathname;  // Get the path from the clicked link
      const currentPath = window.location.pathname;  // Get the current page path

      if (currentPath === targetPath) {  // Only prevent default if it's the same page
        e.preventDefault();
        const targetId = e.target.hash;
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerOffset = 50;  // desired offset
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          setTimeout(() => {
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }, 50);
        }
      }
    }
  });
});


/*============ CARD HOVER ============*/
const videoPreviews = document.querySelectorAll(".video__preview");

videoPreviews.forEach((preview) => {
  const thumbnailRow = preview.querySelector(".thumbnail__row");

  preview.addEventListener("mouseenter", () => {
    thumbnailRow.style.transition = "transform 0.4s";
    thumbnailRow.style.transform = "scale(1.05) translateY(-5px)";
  });

  preview.addEventListener("mouseleave", () => {
    thumbnailRow.style.transition = "transform 0.4s";
    thumbnailRow.style.transform = "none";
  });
});
