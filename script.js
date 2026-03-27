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
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openRegister() {
    document.getElementById('registerModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRegister() {
    document.getElementById('registerModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    resetRegisterForm();
}

function closeConfirm() {
    document.getElementById('confirmModal').style.display = 'none';
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
// 4️⃣ Compteurs Stats - Version corrigée
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
    const duration = 1000; // 1 seconde
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
            document.getElementById('userRole').value = this.dataset.role;
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

// 7️⃣ Formulaire Inscription (temporaire sans PHP)
function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateRegister()) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('✅ Inscription réussie ! Veuillez vous connecter.');
                    window.location.href = 'login.html';
                }, 1000);
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }
}

function validateRegister() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    
    if (name.length < 2) {
        alert('❌ Nom trop court (2 caractères minimum)');
        return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
        alert('❌ Email invalide');
        return false;
    }
    if (phone.length < 10) {
        alert('❌ Téléphone invalide (10 chiffres minimum)');
        return false;
    }
    return true;
}

function resetRegisterForm() {
    const form = document.getElementById('registerForm');
    if (form) form.reset();
}

// 8️⃣ Initialisation Modals
function initModals() {
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
}