// Sample tutor data
const tutors = [
    {
        id: 1,
        name: "Colt Steele",
        language: "English",
        languages: ["Dutch", "English","korea","polish","spanish","Portuguese"],
        level: "Advanced",
        rating: 4.7,
        experience: "4 years",
        price: "499",
        bio: "Java Script Pro:Mastering Advanced Concepts and Techniques",
        image: "https://img-c.udemycdn.com/user/200_H/4466306_6fd8_3.jpg"
    },
    {
        id: 2,
        name: "TJ Walker",
        language: "English",
        languages: ["Dutch", "English","italic","japanese"],
        level: "intermediate",
        rating: 4.5,
        experience: "3 years",
        price: "3,999",
        bio: "Listening Skills - The Ultimate Workplace Soft Skills",
        image: "https://img-c.udemycdn.com/user/200_H/2565950_892c_2.jpg"
    },
    {
        id: 3,
        name: "Dr.Angela Yu",
        language: "English",
        languages: ["English","Arabic","German","French","Spanish","Japanese","Mandarin"],
        level: "advanced",
        rating: 4.7,
        experience: "6 years",
        price: "489",
        bio: "100 Days of code:The Complete Python Pro Bootcamp",
        image: "https://img-c.udemycdn.com/user/200_H/31334738_a13c_3.jpg"
    },
    {
        id: 4,
        name: "Hans Müller",
        language: "german",
        languages: ["German", "English"],
        level: "intermediate",
        rating: 4.6,
        experience: "4 years",
        price: "$28/hour",
        bio: "The complete Javascript Course 2025:From Zero To Expert!",
        image: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
        id: 5,
        name: "Jonas Schmedtmann",
        language: "English",
        languages: ["Japanese", "English","French","Dutch","German","spanish","mandarin","Arabic"],
        level: "beginner",
        rating: 4.7,
        experience: "5 years",
        price: "579",
        bio: "Patient and friendly tutor specializing in Japanese for beginners.",
        image: "https://img-c.udemycdn.com/user/200_H/7799204_2091_5.jpg"
    },
    {
        id: 6,
        name: "Amina Al-Farsi",
        language: "arabic",
        languages: ["Arabic", "English", "French"],
        level: "advanced",
        rating: 4.7,
        experience: "6 years",
        price: "$32/hour",
        bio: "Expert in Modern Standard Arabic and various dialects.",
        image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider functionality
    if (document.querySelector('.testimonial-slider')) {
        initTestimonialSlider();
    }
    
    // Load tutors on tutors page
    if (document.getElementById('tutors-container')) {
        loadTutors();
        setupSearchFilters();
    }
    
    // Contact form submission
    if (document.getElementById('contactForm')) {
        setupContactForm();
    }
    
    // Handle language parameter from URL
    handleLanguageParameter();
});

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        currentIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
}

// Load Tutors
function loadTutors(filteredTutors = null) {
    const tutorsContainer = document.getElementById('tutors-container');
    tutorsContainer.innerHTML = '';
    
    const tutorsToDisplay = filteredTutors || tutors;
    
    if (tutorsToDisplay.length === 0) {
        tutorsContainer.innerHTML = '<p>No tutors found matching your criteria.</p>';
        return;
    }
    
    tutorsToDisplay.forEach(tutor => {
        const tutorCard = document.createElement('div');
        tutorCard.className = 'tutor-card';
        
        tutorCard.innerHTML = `
            <div class="tutor-img">
                <img src="${tutor.image}" alt="${tutor.name}">
            </div>
            <div class="tutor-info">
                <h3>${tutor.name}</h3>
                <p class="rating">⭐ ${tutor.rating}</p>
                <p>${tutor.bio}</p>
                <p>Experience: ${tutor.experience}</p>
                <p>Price: ${tutor.price}</p>
                <div class="languages">
                    ${tutor.languages.map(lang => `<span class="language">${lang}</span>`).join('')}
                </div>
                <button class="btn" onclick="viewTutor(${tutor.id})">View Profile</button>
            </div>
        `;
        
        tutorsContainer.appendChild(tutorCard);
    });
}

// Setup Search Filters
function setupSearchFilters() {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', filterTutors);
    
    // Also filter when pressing Enter in the name search field
    document.getElementById('name-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterTutors();
        }
    });
}

// Filter Tutors
function filterTutors() {
    const languageFilter = document.getElementById('language-filter').value.toLowerCase();
    const levelFilter = document.getElementById('level-filter').value.toLowerCase();
    const nameSearch = document.getElementById('name-search').value.toLowerCase();
    
    const filteredTutors = tutors.filter(tutor => {
        const matchesLanguage = !languageFilter || tutor.language === languageFilter;
        const matchesLevel = !levelFilter || tutor.level === levelFilter;
        const matchesName = !nameSearch || tutor.name.toLowerCase().includes(nameSearch);
        
        return matchesLanguage && matchesLevel && matchesName;
    });
    
    loadTutors(filteredTutors);
}

// View Tutor Profile (placeholder function)
function viewTutor(id) {
    alert(`Viewing profile for tutor ID: ${id}\n\nIn a full implementation, this would redirect to a tutor profile page.`);
}

// Setup Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Handle Language Parameter from URL
function handleLanguageParameter() {
    if (window.location.pathname.includes('tutors.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const language = urlParams.get('language');
        
        if (language) {
            document.getElementById('language-filter').value = language;
            filterTutors();
        }
    }
}