// 🚀 INITIALISATION COMPLÈTE
document.addEventListener('DOMContentLoaded', function() {
    initAll();
});

function initAll() {
    initScrollAnimations();
    initCounters();
    initLoginTabs();
    initLoginForm();
    initRegisterForm();
    initModals();
    console.log('✅ MediPlan chargé !');
}

// 1️⃣ MODALS - Ouvrir/Fermer
function openLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openRegister() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeRegister() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetRegisterForm();
    }
}

function closeConfirm() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 2️⃣ Fermer modals en cliquant dehors
window.onclick = function(event) {
    const modals = ['loginModal', 'registerModal', 'confirmModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// 3️⃣ Animations Scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.service-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// 4️⃣ Compteurs Stats
function initCounters() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const targetValue = parseInt(stat.getAttribute('data-target') || stat.innerText);
                    if (!isNaN(targetValue)) {
                        animateCounter(stat, targetValue);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.stats-grid')?.forEach(grid => {
        statsObserver.observe(grid);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 1000;
    const increment = target / (duration / 20);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// 5️⃣ Login Tabs
function initLoginTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const userRole = document.getElementById('userRole');
            if (userRole) {
                userRole.value = this.dataset.role;
            }
        });
    });
}

// 6️⃣ Formulaire Login (temporaire sans PHP)
function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Redirection temporaire - sera remplacé par PHP plus tard
            window.location.href = 'doctor-dashboard.html';
        });
    }
}

// 7️⃣ Formulaire Inscription (avec redirection vers confirmation)
function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateRegister()) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                const email = document.getElementById('regEmail').value;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    localStorage.setItem('registeredEmail', email);
                    window.location.href = `confirmation.html?email=${encodeURIComponent(email)}`;
                }, 1000);
            }
        });
    }
}

function validateRegister() {
    const name = document.getElementById('regName');
    const email = document.getElementById('regEmail');
    const phone = document.getElementById('regPhone');
    
    if (!name || !email || !phone) {
        alert('❌ Formulaire incomplet');
        return false;
    }
    
    const nameValue = name.value.trim();
    const emailValue = email.value;
    const phoneValue = phone.value;
    
    if (nameValue.length < 2) {
        alert('❌ Nom trop court (2 caractères minimum)');
        return false;
    }
    if (!emailValue.includes('@') || !emailValue.includes('.')) {
        alert('❌ Email invalide');
        return false;
    }
    if (phoneValue.length < 10) {
        alert('❌ Téléphone invalide (10 chiffres minimum)');
        return false;
    }
    return true;
}

function resetRegisterForm() {
    const form = document.getElementById('registerForm');
    if (form) {
        form.reset();
    }
}

// 8️⃣ Initialisation Modals
function initModals() {
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
}