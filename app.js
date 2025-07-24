const dropDownBtn = document.querySelector(".dropdown-btn");
const linksContainer = document.querySelector(".links-container");

// Toggle dropdown menu

dropDownBtn.addEventListener("click", () => {
    linksContainer.classList.toggle("show-links");

    if (linksContainer.classList.contains("show-links")) {
        dropDownBtn.innerHTML = '<i class="bi bi-x-lg"></i>'; // Cross icon
    } else {
        dropDownBtn.innerHTML = '<i class="bi bi-menu-button-wide"></i>'; // Menu icon
    }
});

/*Display loading animation*/
 function showLoading() {
     document.querySelectorAll('.coin h3').forEach(el => el.textContent = 'Updating...');
 }

 // Fetch crypto prices from CoinGecko API
 async function fetchCryptoPrices() {
    showLoading();
     try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd');
         const prices = await response.json();

        // Smoothly update prices with a fade-in effect
         document.querySelectorAll('.coin h3').forEach((el, index) => {
             el.style.opacity = 0;
             setTimeout(() => {
                 if(index === 0) el.textContent = `$${prices.bitcoin.usd}`;
                 if(index === 1) el.textContent = `$${prices.ethereum.usd}`;
                if(index === 2) el.textContent = `$${prices.dogecoin.usd}`;
                el.style.opacity = 1;
            }, 500);
         });

     } catch (error) {
         console.error('Error fetching prices:', error);
     }
 }


 setInterval(fetchCryptoPrices, 10000);


  fetchCryptoPrices();


const faqs = document.querySelectorAll('.faq');
let openFaq = null;

faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        const answer = faq.querySelector('.answer');
        const icon = faq.querySelector('.fa');

        if (faq.classList.contains('active')) {
            faq.classList.remove('active');
            answer.classList.remove('show');
            icon.classList.replace('fa-minus-circle', 'fa-plus-circle');
        } else {
            if (openFaq && openFaq !== faq) {
                const openAnswer = openFaq.querySelector('.answer');
                const openIcon = openFaq.querySelector('.fa');
                openFaq.classList.remove('active');
                openAnswer.classList.remove('show');
                openIcon.classList.replace('fa-minus-circle', 'fa-plus-circle');
            }
            
            faq.classList.add('active');
            answer.classList.add('show');
            icon.classList.replace('fa-plus-circle', 'fa-minus-circle');
            openFaq = faq;
        }
    });
});



document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevents page refresh

    // Show confirmation message
    let messageElement = document.getElementById("form-message");
    messageElement.style.display = "block";

    // Clear form fields
    this.reset();

    // Hide the confirmation message after 3 seconds
    setTimeout(() => {
        messageElement.style.display = "none";
    }, 3000); // 3000ms = 3 seconds
});


function togglePassword(event) {
    event.preventDefault(); // Prevent form submission
    let passwordField = document.getElementById("password");
    let toggleBtn = document.getElementById("toggleBtn");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleBtn.textContent = "Hide";
    } else {
        passwordField.type = "password";
        toggleBtn.textContent = "Show";
    }
}



// document.getElementById('toggle').addEventListener('click', function() {

//     const passwordField = document.getElementById('pass');
//     const toggleButton = document.getElementById('toggle');

//     if (passwordField.type === 'password') {
//         passwordField.type = 'text'; 
//         toggleButton.textContent = 'Hide';  
//     } else {
//         passwordField.type = 'password';  
//         toggleButton.textContent = 'Show'; 
//     }
// });





