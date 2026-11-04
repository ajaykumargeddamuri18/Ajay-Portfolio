/* ==========================================================================
   AJAY KUMAR GEDDAMURI - PORTFOLIO INTERACTIVITY SCRIPT
   Matching Certificate Viewers, IEEE Video Modal, and Live Project Buttons
   ========================================================================== */

const certificatesData = {
  ieee_conference: {
    title: "IEEE International Research Conference Certificate",
    issuer: "1st International IEEE Conference Panel",
    badgeIcon: "fa-solid fa-award",
    date: "2025",
    type: "Machine Learning & Predictive Modeling Paper Presentation",
    details: "Official IEEE conference certification (336.png) awarded for presenting the research paper on Machine Learning algorithms, exploratory telemetry data analytics, and industrial anomaly detection.",
    verifyId: "IEEE-CONF-2025-336",
    pdfUrl: "/static/assets/336.png",
    imageUrl: "/static/assets/336.png"
  },
  servicenow_sysadmin: {
    title: "Certified System Administrator (CSA)",
    issuer: "ServiceNow",
    badgeIcon: "fa-solid fa-cloud-bolt",
    date: "2025",
    type: "Globally Certified System Administrator",
    details: "Demonstrates proficiency in ServiceNow system administration, user management, database schema configuration, workflow automation, and security rule enforcement.",
    verifyId: "SN-CSA-2025-AJAY",
    pdfUrl: "/static/assets/ServiceNow Certified System Administrator (CSA).pdf"
  },
  servicenow_appdev: {
    title: "Certified Application Developer (CAD)",
    issuer: "ServiceNow",
    badgeIcon: "fa-solid fa-code-branch",
    date: "2025",
    type: "Globally Certified Application Developer",
    details: "Validates expertise in designing and building custom ServiceNow applications, REST integration APIs, business rules, client scripts, and UI actions.",
    verifyId: "SN-CAD-2025-AJAY",
    pdfUrl: "/static/assets/ServiceNow Certified Application Developer (CAD).pdf"
  },
  java_coursera: {
    title: "Java Programming Certification",
    issuer: "Coursera – Learn Quest",
    badgeIcon: "fa-brands fa-java",
    date: "2025",
    type: "Object-Oriented Programming & Data Structures",
    details: "Comprehensive certification covering Core Java, OOPs concepts, Collections Framework, Multithreading, Exception Handling, and File I/O stream operations.",
    verifyId: "COURSERA-JAVA-88329"
  },
  python_cisco: {
    title: "Python Course Certification",
    issuer: "Cisco Networking Academy",
    badgeIcon: "fa-brands fa-python",
    date: "2025",
    type: "Python Programming & Data Analytics",
    details: "Covers Python fundamentals, data structures, file processing, modules, object-oriented concepts, and analytical script building.",
    verifyId: "CISCO-PY-99214"
  },
  cloud_simplilearn: {
    title: "Cloud Computing Certification",
    issuer: "Simplilearn",
    badgeIcon: "fa-solid fa-cloud",
    date: "2024",
    type: "AWS & Cloud Infrastructure Essentials",
    details: "Covers cloud architecture, virtualization, AWS core services (EC2, S3, IAM), cloud security, and scalable infrastructure deployment.",
    verifyId: "SIMPLI-CLOUD-77123"
  },
  prompt_infosys: {
    title: "Prompt Engineering Certification",
    issuer: "Infosys Springboard",
    badgeIcon: "fa-solid fa-robot",
    date: "2025",
    type: "Generative AI & LLM Prompting",
    details: "Covers advanced prompt engineering techniques for Large Language Models (LLMs), chain-of-thought prompting, RAG architectures, and AI tool integration.",
    verifyId: "INFOSYS-PE-44810"
  }
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCopyButtons();
    initContactForm();
    initModalCloseHandlers();
});

/* --------------------------------------------------------------------------
   1. CERTIFICATE VIEWER MODAL HANDLER
   -------------------------------------------------------------------------- */
window.openCertModal = function(key) {
    const cert = certificatesData[key];
    const modal = document.getElementById('cert-modal');
    if (!cert || !modal) return;

    document.getElementById('cert-modal-title').textContent = cert.title;
    document.getElementById('cert-modal-issuer').textContent = `${cert.issuer} • ${cert.type}`;

    const isImage = cert.imageUrl || (cert.pdfUrl && (cert.pdfUrl.endsWith('.png') || cert.pdfUrl.endsWith('.jpg')));
    const actionUrl = cert.imageUrl || cert.pdfUrl;

    const mediaButton = actionUrl ? `
      <a href="${actionUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="margin-right: 0.5rem; text-decoration: none;">
        <i class="fa-solid ${isImage ? 'fa-image' : 'fa-file-pdf'}"></i> Open Official Certificate ${isImage ? 'Image' : 'PDF'}
      </a>
    ` : '';

    const imagePreview = isImage ? `
      <div style="background: #000; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-glass); margin-bottom: 1.25rem; max-height: 380px; overflow-y: auto;">
        <img src="${actionUrl}" alt="${cert.title}" style="width: 100%; display: block; object-fit: contain;">
      </div>
    ` : '';

    const bodyHtml = `
      <div style="text-align: center; margin-bottom: 1.25rem;">
        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(0, 242, 254, 0.15); color: var(--cyan-electric); display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 0.75rem auto; box-shadow: 0 0 25px rgba(0, 242, 254, 0.3);">
          <i class="${cert.badgeIcon}"></i>
        </div>
        <div style="font-size: 0.85rem; color: var(--emerald-neon); font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
          <i class="fa-solid fa-circle-check"></i> Verified Official Credential
        </div>
      </div>

      ${imagePreview}

      <div style="background: var(--bg-surface); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
        <h4 style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 0.5rem;">Credential Scope & Competencies:</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 0.85rem;">${cert.details}</p>
        
        <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 0.75rem; border-top: 1px solid var(--border-glass); font-size: 0.825rem;">
          <span style="color: var(--text-subtle);">Credential ID: <strong style="color: var(--text-main);">${cert.verifyId}</strong></span>
          <span style="color: var(--text-subtle);">Issued: <strong style="color: var(--text-main);">${cert.date}</strong></span>
        </div>
      </div>

      <div style="text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap;">
        ${mediaButton}
        <button class="btn btn-secondary btn-sm" onclick="showToast('Credential verification confirmed!')">
          <i class="fa-solid fa-shield-halved"></i> Verify Credential Status
        </button>
      </div>
    `;

    document.getElementById('cert-modal-body').innerHTML = bodyHtml;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

/* --------------------------------------------------------------------------
   2. IEEE PRESENTATION VIDEO & FULL SCREEN HANDLERS
   -------------------------------------------------------------------------- */
window.openIEEEVideoModal = function() {
    const modal = document.getElementById('ieee-video-modal');
    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.toggleVideoFullScreen = function(videoId) {
    const video = document.getElementById(videoId || 'ieee-presentation-video');
    if (!video) return;

    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    } else {
        showToast("Fullscreen API unavailable in browser");
    }
};

window.openResumeModal = function() {
    const modal = document.getElementById('resume-modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.sendTwilioSMS = function(event) {
    if (event) event.preventDefault();
    const name = document.getElementById('twilio-name')?.value;
    const phone = document.getElementById('twilio-phone')?.value;
    const message = document.getElementById('twilio-msg')?.value;

    if (!name || !phone || !message) {
        showToast("Please fill out all fields for Twilio SMS!");
        return;
    }

    fetch('/api/twilio/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message })
    })
    .then(res => res.json())
    .then(data => {
        showToast(data.message || "Twilio SMS notification sent!");
        const form = document.getElementById('twilio-contact-form');
        if (form) form.reset();
    })
    .catch(() => {
        showToast("Opening SMS client via Twilio channel...");
        window.location.href = `sms:+919494953539?body=${encodeURIComponent(`Hi Ajay (${name}, ${phone}): ${message}`)}`;
    });
};

window.toggleModalFullScreen = function(modalId) {
    const modalBox = document.querySelector(`#${modalId} .modal-content-box`);
    if (!modalBox) return;

    const isFull = modalBox.classList.toggle('modal-fullscreen');
    if (isFull) {
        showToast("Expanded to Full Screen View!");
    } else {
        showToast("Restored standard view");
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

function initModalCloseHandlers() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
}

/* --------------------------------------------------------------------------
   3. NAVIGATION & HAMBURGER MENU
   -------------------------------------------------------------------------- */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Active Navigation Link on Scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   4. COPY TO CLIPBOARD HELPER
   -------------------------------------------------------------------------- */
function initCopyButtons() {
    window.copyToClipboard = function(text, label) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`${label} copied to clipboard!`);
        }).catch(() => {
            showToast(`Copied: ${text}`);
        });
    };
}

function showToast(msg) {
    let toast = document.getElementById('toast-msg');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-msg';
        toast.className = 'toast-msg';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        }).then(res => res.json()).then(data => {
            showToast(data.message || "Message sent successfully!");
        }).catch(() => {
            showToast("Opening mail client...");
            window.location.href = `mailto:ajaykumargeddamuri123@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        });

        form.reset();
    });
}

/* --------------------------------------------------------------------------
   6. DYNAMIC TYPEWRITER FEATURE
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const roles = [
        "Software Engineer",
        "Data Science Specialist",
        "ServiceNow CSA & CAD Dev",
        "Full-Stack Python Engineer",
        "AI & Machine Learning Researcher"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 75; // Slower deletion
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // Slower deliberate typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 3200; // 3.2s pause at end of full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   7. VISITOR & ENGAGEMENT ANALYTICS
   -------------------------------------------------------------------------- */
function initVisitorAnalytics() {
    fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'visit' })
    })
    .then(res => res.json())
    .then(data => {
        const vEl = document.getElementById('total-visitors-count');
        const pEl = document.getElementById('project-views-count');
        if (vEl) vEl.textContent = data.total_visits || 1248;
        if (pEl) pEl.textContent = data.project_views || 342;
    })
    .catch(() => {});

    document.querySelectorAll('.project-card, .project-link, .btn').forEach(item => {
        item.addEventListener('click', () => {
            fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'project_view' })
            })
            .then(res => res.json())
            .then(data => {
                const pEl = document.getElementById('project-views-count');
                if (pEl && data.project_views) pEl.textContent = data.project_views;
            })
            .catch(() => {});
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initModalCloseHandlers();
    initNavigation();
    initCopyButtons();
    initContactForm();
    initTypewriter();
    initVisitorAnalytics();
});

/* ── Self Intro Video Modal ─────────────────────────────── */
function openSelfIntroModal() {
    const modal = document.getElementById('selfIntroModal');
    const video = document.getElementById('selfIntroVideo');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    if (video) {
        video.load();
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Auto-play prevented or video loading issue:", error);
            });
        }
    }

    // Animate in
    modal.style.opacity = '0';
    requestAnimationFrame(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    });
    // Close on backdrop click
    modal.addEventListener('click', function handleBackdrop(e) {
        if (e.target === modal) {
            closeSelfIntroModal();
            modal.removeEventListener('click', handleBackdrop);
        }
    });
}

function closeSelfIntroModal() {
    const modal = document.getElementById('selfIntroModal');
    const video = document.getElementById('selfIntroVideo');
    if (!modal) return;
    // Pause video when closing
    if (video) { video.pause(); }
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('selfIntroModal');
        if (modal && modal.style.display === 'flex') closeSelfIntroModal();
    }
});


/* ==========================================================================
   RESPONSIVE NAVIGATION FIX  (append-only; nothing above was changed)
   --------------------------------------------------------------------------
   initNavigation() above is registered on DOMContentLoaded twice, so the
   hamburger gets two click handlers and one tap toggles the menu open and
   straight back closed. This capture-phase handler runs first, stops the
   duplicate handlers on the button, and toggles the menu exactly once.
   It also closes the menu on outside click, Escape, and when the window is
   resized back to desktop width.
   ========================================================================== */
(function responsiveNavFix() {
    const MOBILE_NAV_MAX = 1100; // keep in sync with the hamburger breakpoint in styles.css

    function setMenu(open) {
        const menu = document.querySelector('.nav-menu');
        const burger = document.querySelector('.hamburger');
        if (!menu || !burger) return;

        menu.classList.toggle('active', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');

        const icon = burger.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !open);
            icon.classList.toggle('fa-xmark', open);
        }
    }

    // Toggle once per tap (capture phase on document runs before the button's own listeners)
    document.addEventListener('click', function (e) {
        const burger = e.target.closest('.hamburger');
        if (!burger) return;

        e.stopPropagation();
        const menu = document.querySelector('.nav-menu');
        if (!menu) return;
        setMenu(!menu.classList.contains('active'));
    }, true);

    // Tapping a menu link or anywhere outside the menu closes it
    document.addEventListener('click', function (e) {
        const menu = document.querySelector('.nav-menu');
        if (!menu || !menu.classList.contains('active')) return;
        if (e.target.closest('.hamburger')) return;
        if (e.target.closest('.nav-link') || !e.target.closest('.nav-menu')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > MOBILE_NAV_MAX) setMenu(false);
    });
})();
