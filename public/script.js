// Initialize Lucide icons
lucide.createIcons();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

hamburgerBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
        mobileMenu.classList.add('open');
        hamburgerBtn.innerHTML = '<i data-lucide="x" style="width:26px; height:26px;"></i>';
    } else {
        mobileMenu.classList.remove('open');
        hamburgerBtn.innerHTML = '<i data-lucide="menu" style="width:26px; height:26px;"></i>';
    }
    lucide.createIcons();
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        hamburgerBtn.innerHTML = '<i data-lucide="menu" style="width:26px; height:26px;"></i>';
        lucide.createIcons();
    });
});
document.getElementById('mobile-cta')?.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    hamburgerBtn.innerHTML = '<i data-lucide="menu" style="width:26px; height:26px;"></i>';
    lucide.createIcons();
});

// Intersection Observer for Animations (Framer Motion replacement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -80px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-left, .fade-scale').forEach(el => {
    observer.observe(el);
});

// Booking Form Logic
const form = document.getElementById('booking-form');
const successMsg = document.getElementById('booking-success');
const submitBtn = document.getElementById('submit-btn');

const errors = {
    name: document.getElementById('error-name'),
    email: document.getElementById('error-email'),
    phone: document.getElementById('error-phone'),
    device: document.getElementById('error-device'),
    issue: document.getElementById('error-issue'),
};

const inputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    device: document.getElementById('device'),
    issue: document.getElementById('issue'),
};

function clearErrors() {
    Object.values(errors).forEach(el => {
        if (el) el.style.display = 'none';
    });
    Object.values(inputs).forEach(el => {
        if (el) el.classList.remove('error');
    });
}

function validate() {
    let isValid = true;
    clearErrors();

    if (!inputs.name.value.trim()) {
        errors.name.textContent = 'Name is required';
        errors.name.style.display = 'flex';
        inputs.name.classList.add('error');
        isValid = false;
    }

    if (!inputs.email.value.trim()) {
        errors.email.textContent = 'Email is required';
        errors.email.style.display = 'flex';
        inputs.email.classList.add('error');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputs.email.value)) {
        errors.email.textContent = 'Enter a valid email';
        errors.email.style.display = 'flex';
        inputs.email.classList.add('error');
        isValid = false;
    }

    if (!inputs.phone.value.trim()) {
        errors.phone.textContent = 'Phone number is required';
        errors.phone.style.display = 'flex';
        inputs.phone.classList.add('error');
        isValid = false;
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(inputs.phone.value)) {
        errors.phone.textContent = 'Enter a valid phone number';
        errors.phone.style.display = 'flex';
        inputs.phone.classList.add('error');
        isValid = false;
    }

    if (!inputs.device.value.trim()) {
        errors.device.textContent = 'Device model is required';
        errors.device.style.display = 'flex';
        inputs.device.classList.add('error');
        isValid = false;
    }

    if (!inputs.issue.value.trim()) {
        errors.issue.textContent = 'Please describe the issue';
        errors.issue.style.display = 'flex';
        inputs.issue.classList.add('error');
        isValid = false;
    }

    return isValid;
}

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validate()) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting...';

        const data = {
            name: inputs.name.value,
            email: inputs.email.value,
            phone: inputs.phone.value,
            device: inputs.device.value,
            issue: inputs.issue.value
        };

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (result.success) {
                form.style.display = 'none';
                successMsg.style.display = 'block';
                form.reset();
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i data-lucide="send" style="width:18px;height:18px;"></i> Submit Booking Request';
            lucide.createIcons();
        }
    });

    document.getElementById('book-another')?.addEventListener('click', () => {
        successMsg.style.display = 'none';
        form.style.display = 'block';
    });
}
