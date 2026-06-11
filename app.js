// Main Application Orchestration File
// Integrates GSAP ScrollTrigger, Custom Spring Cursor, Preloader, Accordions, Audio, and Physics Sandbox.

// Force manual scroll restoration to start from the top of the page on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// --------------------------------------------------
// 1. Profile & Developer Configuration Data
// --------------------------------------------------
const DeveloperConfig = {
  profile: {
    name: "Purva",
    lastName: "Satikuvar",
    title: "Full Stack Developer",
    tagline1: "Full Stack Developer",
    tagline2: "Creative Engineer",
    resumeLink: "https://linkedin.com/in/purva-satikuvar-473122294",
    aboutTitle: "Building scalable real-time systems and responsive interfaces.",
    aboutText: "Motivated Full Stack Developer with 11 months of hands-on experience building scalable web applications. Proficient in React.js, Next.js, and TypeScript on the frontend, with growing expertise in Node.js, Express.js, and databases on the backend. Demonstrated ability to take projects from scratch to production, implement real-time features, and debug complex interlinked systems in fast-paced startup environments.",
  },
  skills: {
    develop: {
      title: "Frontend & Core Technologies",
      description: "React.js, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, GSAP",
      details: "Building high-performance, responsive user interfaces and interactive components. Proficient in Next.js, React, and TypeScript with fluid animations via GSAP.",
      tools: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "GSAP"]
    },
    design: {
      title: "Backend, Databases & Cloud",
      description: "Node.js, Express.js, REST APIs, Socket.io, SQL & NoSQL, AWS",
      details: "Implementing scalable backend APIs, real-time live trackers with Socket.io, database schema design, and deploying applications to AWS EC2.",
      tools: ["Node.js", "Express.js", "REST APIs", "Socket.io", "SQL & NoSQL", "AWS EC2", "Git/GitHub"]
    }
  },
  experiences: [
    {
      position: "Frontend Developer (Internship → Full-time)",
      company: "Devstree IT Services Pvt. Ltd. | Gota, Ahmedabad",
      period: "Jul 2025 - Present",
      description: "Building and optimizing responsive React/Next.js frontends. Leading crane/barge operational dashboards, managing complex e-commerce relational structures, and developing home services booking applications with integrated video/audio features.",
    },
    {
      position: "Bachelor of Computer Science Engineering",
      company:"",
      period: "Graduate 2027",
      description: "Acquired foundational knowledge in software engineering, database design,  networks, and algorithms in Ahmedabad, Gujarat.",
    },
  ],
  projects: [
    {
      id: 1,
      title: "DTEP - Riverport Goods Management",
      category: "Real-Time / Next.js",
      technologies: "Next.js, Socket.io, Real-Time Tracking, Crane & Barge Dashboards",
      bullets: [
        "Built responsive frontend in Next.js for both Admin and Customer-facing portals",
        "Implemented Socket.io for real-time live tracking of goods movement across the port",
        "Developed modules for crane, barge, and goods status dashboards",
        "Ensured seamless communication between admin and client views for operational visibility"
      ],
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 2,
      title: "Travel Buddy - AI Travel Platform",
      category: "AI / Travel Integration",
      technologies: "Next.js, Google ADK API, AI Chatbot, Booking Workflows",
      bullets: [
        "Architected and developed the entire application from scratch using Next.js",
        "Integrated Google ADK API to build an AI chatbot capable of planning complete trips end-to-end",
        "Implemented travel search, itinerary generation, and booking-related workflows",
        "Designed intuitive UX flows for trip discovery, planning, and AI-assisted recommendations"
      ],
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "NetParts - Auto E-Commerce",
      category: "Database / E-Commerce",
      technologies: "Relational Data, Part Catalog, Performance Optimization",
      bullets: [
        "Resolved critical bugs and implemented complex interlinking logic across car makes, models, and parts",
        "Managed deeply nested relational data structures connecting hundreds of vehicle configurations",
        "Enhanced admin panel functionality for part management and database integrity",
        "Improved frontend performance and user experience for browsing/filtering automotive parts"
      ],
      image: "auto_parts_catalog.png",
      link: "#"
    },
    {
      id: 4,
      title: "WorkSafe - Home Service Booking",
      category: "Web App / Audio & Video",
      technologies: "React.js, REST APIs, Video & Audio Calling, CRUD Booking Systems",
      bullets: [
        "Developed UI components for booking home maintenance services (repairing, plumbing) at home",
        "Integrated audio and video recording/calling features to verify and document repair work",
        "Integrated REST APIs into frontend, handling data fetching, form submissions, and state management",
        "Gained foundational experience in React component architecture and API integration patterns"
      ],
      image: "home_service_app.png",
      link: "#"
    },
    {
      id: 5,
      title: "E-Commerce - Personal Proj",
      category: "Full-Stack Project",
      technologies: "Next.js, Node.js, Express.js, Checkout/Cart Systems",
      bullets: [
        "Building a full-stack e-commerce application using Next.js (frontend) and Express.js (backend)",
        "Implementing product catalog, cart, checkout, and order management features",
        "Designing and integrating database schemas; applying backend skills in a real-world project",
        "Strengthening full-stack understanding by owning the entire development lifecycle"
      ],
      image: "ecommerce_app.png",
      link: "#"
    }
  ],
  physicsSkills: [
    { name: "React.js", color: "#161920", textColor: "#61dafb" },
    { name: "Next.js", color: "#000000", textColor: "#ffffff" },
    { name: "JS/TS", color: "#22252a", textColor: "#f7df1e" },
    { name: "HTML5/CSS3", color: "#26231e", textColor: "#e34f26" },
    { name: "GSAP", color: "#2e3a1f", textColor: "#88ce02" },
    { name: "Node.js", color: "#1a2c1a", textColor: "#43853d" },
    { name: "Express.js", color: "#2a2a2a", textColor: "#ffffff" },
    { name: "REST APIs", color: "#1c2a38", textColor: "#00add8" },
    { name: "SQL & NoSQL", color: "#2d1a24", textColor: "#f59e0b" },
    { name: "AWS", color: "#2d1e11", textColor: "#ff9900" },
    { name: "Git/GitHub", color: "#16161c", textColor: "#f05032" },
    { name: "Postman", color: "#2e1a12", textColor: "#ff6c37" }
  ],
  contact: {
    email: "purvasoni783@gmail.com",
    phone: "+91 9327287329",
    location: "Ahmedabad, Gujarat, India",
    github: "https://github.com",
    linkedin: "https://linkedin.com/in/purva-satikuvar-473122294",
    twitter: "https://x.com",
    instagram: "https://instagram.com"
  }
};

// Global reference for physics engine
let skillsPhysicsInstance = null;

// --------------------------------------------------
// 2. Preloader Mechanics
// --------------------------------------------------
// Global variables for GLB loading progress
let glbProgress = 0;
let glbReady = false;

window._on3DProgress = (progress) => {
  glbProgress = progress;
};

window._on3DReady = () => {
  glbReady = true;
};

function initThinkingBubble() {
  const bubbleText = document.querySelector(".thinking-text");
  if (!bubbleText) return;

  const thoughts = [
    '// status: Reticulating splines...',
    'npm i inspiration --save-dev',
    'git commit -m "optimize visual aesthetics"',
    'const brain = new CreativeEngine();',
    '// spaces or tabs? definitely spaces.',
    'window.addEventListener("scroll", dream);',
    'gl.clearColor(0.12, 0.08, 0.22, 1.0);',
    '// Is it a bug or a features?',
    'npm run build-immersive-portfolio',
    'git push origin master --force // spicy',
    'const idea = Math.random() > 0.5;',
    '// compiling coffee into clean code...',
    'document.querySelector("#reality").style.opacity = 1;',
    'while (idea.isCreative) { innovate(); }',
    '// Can CSS Grid solve all life problems?',
    'status: "Rendering 3D thoughts..."',
    '// fixing division by zero in creativity',
    'git merge life --no-ff',
    'import { wow } from "pixels";',
    'system.state = "highly_inspired";',
    '// loading neural portfolio layers...'
  ];

  let index = 0;

  function typeThought(text, callback) {
    let charIndex = 0;
    bubbleText.innerHTML = "";
    
    // Add typing cursor effect
    const cursor = document.createElement("span");
    cursor.className = "thinking-cursor";
    cursor.innerText = "_";
    bubbleText.appendChild(cursor);

    const interval = setInterval(() => {
      if (charIndex < text.length) {
        // Insert character before cursor
        cursor.insertAdjacentText('beforebegin', text.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(callback, 2200); // Hold for 2.2 seconds
      }
    }, 45);
  }

  function deleteThought(callback) {
    const textNode = bubbleText.childNodes[0];
    if (!textNode) {
      callback();
      return;
    }

    const interval = setInterval(() => {
      let currentText = textNode.textContent;
      if (currentText.length > 0) {
        textNode.textContent = currentText.substring(0, currentText.length - 1);
      } else {
        clearInterval(interval);
        setTimeout(callback, 400); // Wait 0.4 seconds before typing next
      }
    }, 20);
  }

  function cycle() {
    typeThought(thoughts[index], () => {
      deleteThought(() => {
        index = (index + 1) % thoughts.length;
        cycle();
      });
    });
  }

  // Start the cycle
  cycle();
}

function initPreloader() {
  const progressText = document.querySelector(".loading-content span");
  const loadingBtn = document.querySelector(".loading-button");
  const loadingScreen = document.querySelector(".loading-screen");
  
  // Game lines selector
  const gameLines = document.querySelectorAll(".loaderGame-line");
  const gameBall = document.querySelector(".loaderGame-ball");
  
  let percent = 0;
  
  const timer = setInterval(() => {
    // Target percentage matches actual GLB download progress
    let targetPercent = Math.floor(glbProgress * 100);
    
    if (percent < targetPercent) {
      percent += Math.max(1, Math.floor((targetPercent - percent) * 0.15)); // smooth catch-up
    } else if (percent < 99 && !glbReady) {
      // Crawl slowly towards 99% if download is not complete yet
      percent += 0.25;
    } else if (glbReady) {
      // Once fully loaded, count up to 100% fast
      percent = Math.min(100, percent + 2);
    }
    
    // Clamp percent between 0 and 100
    const displayPercent = Math.min(100, Math.floor(percent));
    
    // Update Percentage
    progressText.innerText = `${displayPercent}%`;
    document.documentElement.style.setProperty("--percent", `${displayPercent}%`);
    
    // Update Game Loader Graphics
    const lineCount = gameLines.length;
    const activeLines = Math.floor((displayPercent / 100) * lineCount);
    gameLines.forEach((line, index) => {
      if (index < activeLines) {
        line.classList.add("active");
      }
    });
    
    if (gameBall) {
      const parentWidth = 150; // container size
      gameBall.style.left = `${(displayPercent / 100) * (parentWidth - 10)}px`;
    }
    
    // Play a typewriter audio tic for incremental loader percentages
    if (window.PortfolioAudio && displayPercent % 10 === 0 && displayPercent > 0) {
      window.PortfolioAudio.playType(1.0 + (displayPercent / 150));
    }
    
    if (displayPercent >= 100 && glbReady) {
      clearInterval(timer);
      
      // Mark loader complete
      loadingBtn.classList.add("loading-complete");
      
      // Audio cue on complete
      if (window.PortfolioAudio) {
        window.PortfolioAudio.playClick(1.4);
      }
      
      // Auto-transition Loading Screen after a brief delay so 100% completion is visible
      setTimeout(() => {
        // Resume / initialize Web Audio context
        if (window.PortfolioAudio) {
          window.PortfolioAudio.setMute(false); // unmute and resume context
          window.PortfolioAudio.init();
        }
        
        // Transition Loading Screen
        loadingScreen.classList.add("loaded");
        
        // Start after screen slides away
        setTimeout(() => {
          // Set up ScrollTriggers for 3D scene!
          if (window.PortfolioAvatarInstance) {
            window.PortfolioAvatarInstance.setupScrollTrigger();
          }
          // Launch Hero entry animations
          runHeroEntryAnimation();
        }, 800);
      }, 400);
    }
  }, 30);
}

// --------------------------------------------------
// 3. Custom Spring Cursor
// --------------------------------------------------
function initCustomCursor() {
  const cursor = document.querySelector(".cursor-main");
  if (!cursor) return;

  const mouse = { x: 0, y: 0 };
  const cursorTarget = { x: 0, y: 0 };
  const springFactor = 0.16; // delay/spring physics coefficient
  
  let isTrackingCustom = false;

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function update() {
    if (!isTrackingCustom) {
      // Spring math: pull target position towards actual mouse position
      cursorTarget.x += (mouse.x - cursorTarget.x) * springFactor;
      cursorTarget.y += (mouse.y - cursorTarget.y) * springFactor;
      
      cursor.style.left = `${cursorTarget.x}px`;
      cursor.style.top = `${cursorTarget.y}px`;
    }
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);

  // Selector checks for hover states
  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest("[data-cursor]");
    if (!target) return;

    const mode = target.getAttribute("data-cursor");
    
    if (mode === "disable") {
      cursor.classList.add("cursor-disable");
    } else if (mode === "icons") {
      cursor.classList.add("cursor-icons");
      
      // Lock target position to center of boundary box
      const rect = target.getBoundingClientRect();
      cursor.style.setProperty("--cursorH", `${rect.height}px`);
      
      cursorTarget.x = rect.left + rect.width / 2;
      cursorTarget.y = rect.top + rect.height / 2;
      
      cursor.style.left = `${cursorTarget.x}px`;
      cursor.style.top = `${cursorTarget.y}px`;
      
      isTrackingCustom = true;
    }
    
    // Play subtle audio tic on hover
    if (window.PortfolioAudio) {
      window.PortfolioAudio.playHover();
    }
  });

  document.addEventListener("mouseout", (e) => {
    const target = e.target.closest("[data-cursor]");
    if (!target) return;
    
    cursor.classList.remove("cursor-disable", "cursor-icons");
    isTrackingCustom = false;
  });
}

// --------------------------------------------------
// 4. GSAP Scroll Animations
// --------------------------------------------------
function initGSAPAnimations() {
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // --- Horizontal Scroll (Works/Projects) ---
  const workFlex = document.querySelector(".work-flex");
  const workContainer = document.querySelector(".work-container");
  
  if (workFlex && workContainer && window.innerWidth > 900) {
    const calculateScrollDist = () => {
      const padding = 60; // gap spacing
      return workFlex.scrollWidth - workContainer.clientWidth + padding;
    };

    gsap.to(".work-flex", {
      x: () => -calculateScrollDist(),
      ease: "none",
      scrollTrigger: {
        trigger: ".work-section",
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${calculateScrollDist()}`,
        invalidateOnRefresh: true,
        id: "workScroll"
      }
    });
  }

  // --- Career Timeline Progress Line ---
  const careerTimeline = document.querySelector(".career-timeline");
  if (careerTimeline) {
    gsap.fromTo(careerTimeline, 
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".career-container",
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1.5
        }
      }
    );
  }

  // --- Accordion Fades ---
  const aboutPara = document.querySelector(".about-me p.para");
  if (aboutPara) {
    gsap.fromTo(aboutPara, 
      { opacity: 0.1, y: 30 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          end: "top 40%",
          scrub: true
        }
      }
    );
  }

  // --- Physics Sandbox Trigger ---
  ScrollTrigger.create({
    trigger: "#physics-sandbox",
    start: "top 85%",
    onEnter: () => {
      if (skillsPhysicsInstance) {
        skillsPhysicsInstance.start();
      }
    },
    once: true
  });
}

// Hero Text Opening Animation
function runHeroEntryAnimation() {
  const timeline = gsap.timeline();
  
  timeline.fromTo(".landing-intro h2", 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
  );
  
  timeline.fromTo(".landing-intro h1", 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    "-=0.4"
  );
  
  timeline.fromTo(".landing-info", 
    { opacity: 0, x: -20 }, 
    { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
    "-=0.4"
  );
  
  timeline.fromTo(".avatar-thinking-bubble", 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    "-=0.2"
  );

  timeline.fromTo(".thinking-bubble-medium", 
    { opacity: 0, scale: 0 }, 
    { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
    "-=0.4"
  );

  timeline.fromTo(".thinking-bubble-small", 
    { opacity: 0, scale: 0 }, 
    { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
    "-=0.3"
  );

  timeline.fromTo(".thinking-bubble-tiny", 
    { opacity: 0, scale: 0 }, 
    { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
    "-=0.3"
  );
}

// --------------------------------------------------
// 5. Interactive Accordions (What I Do)
// --------------------------------------------------
function initAccordions() {
  const contents = document.querySelectorAll(".what-content");
  
  contents.forEach(content => {
    content.addEventListener("click", () => {
      // Toggle click audio switch sound
      if (window.PortfolioAudio) {
        window.PortfolioAudio.playClick(1.1);
      }

      const isActive = content.classList.contains("what-content-active");
      
      // Deactivate all accordions
      contents.forEach(c => {
        c.classList.remove("what-content-active");
        c.classList.remove("what-sibling");
      });
      
      if (!isActive) {
        // Make this one active
        content.classList.add("what-content-active");
        
        // Add sibling faded classes to others
        contents.forEach(c => {
          if (c !== content) {
            c.classList.add("what-sibling");
          }
        });
      }
    });
  });
}

// --------------------------------------------------
// 6. Navigation Controls & Audio Toggle
// --------------------------------------------------
function initNavbar() {
  const hamburger = document.querySelector(".hamburger-menu");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuLinks = document.querySelectorAll(".menu-link");
  const audioBtn = document.querySelector(".audio-toggle");
  
  // Audio Icon toggle variables
  const audioOnIcon = document.getElementById("sound-on");
  const audioOffIcon = document.getElementById("sound-off");
  
  // Initialize initial icon state based on AudioEngine defaults (Muted)
  if (audioOnIcon && audioOffIcon) {
    audioOnIcon.style.display = "none";
    audioOffIcon.style.display = "block";
  }

  // Hamburger click
  hamburger.addEventListener("click", () => {
    if (window.PortfolioAudio) window.PortfolioAudio.playClick(1.0);
    const isActive = menuOverlay.classList.toggle("active");
    
    // Hamburger line modifications
    const lines = hamburger.querySelectorAll(".hamburger-line");
    if (isActive) {
      lines[0].style.transform = "translateY(7.5px) rotate(45deg)";
      lines[1].style.transform = "scaleX(0)";
      lines[2].style.transform = "translateY(-7.5px) rotate(-45deg)";
    } else {
      lines[0].style.transform = "none";
      lines[1].style.transform = "none";
      lines[2].style.transform = "none";
    }
  });

  // Navigation Links click
  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.PortfolioAudio) window.PortfolioAudio.playClick(1.2);
      
      menuOverlay.classList.remove("active");
      
      const lines = hamburger.querySelectorAll(".hamburger-line");
      lines.forEach(l => l.style.transform = "none");
      
      // Smooth scroll to target ID
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    });
  });

  // Sound Toggle click
  audioBtn.addEventListener("click", () => {
    if (window.PortfolioAudio) {
      const isMuted = window.PortfolioAudio.toggleMute();
      
      if (isMuted) {
        audioOnIcon.style.display = "none";
        audioOffIcon.style.display = "block";
      } else {
        audioOnIcon.style.display = "block";
        audioOffIcon.style.display = "none";
        // Play success beep
        window.PortfolioAudio.playClick(1.6);
      }
    }
  });
}

// --------------------------------------------------
// 7. Interactive Physics Sandbox Bindings
// --------------------------------------------------
function initPhysicsSandbox() {
  skillsPhysicsInstance = new window.SkillsPhysicsEngine("skillsCanvas", DeveloperConfig.physicsSkills);
  
  const buttons = document.querySelectorAll(".gravity-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const direction = btn.getAttribute("data-gravity");
      
      // Toggle button active states
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      if (skillsPhysicsInstance) {
        skillsPhysicsInstance.setGravity(direction);
      }
      
      // Sound feedback
      if (window.PortfolioAudio) {
        window.PortfolioAudio.playClick(1.3);
      }
    });
  });
}

// --------------------------------------------------
// 8. Command Palette Terminal Overlay
// --------------------------------------------------
const PaletteCommands = [
  { name: "/hero", desc: "Jump back to top hero welcome", action: () => scrollToId("#hero") },
  { name: "/about", desc: "Scroll to About profile statement", action: () => scrollToId("#about") },
  { name: "/what-i-do", desc: "View Core Skillsets & Technologies accordion", action: () => scrollToId("#skills") },
  { name: "/experience", desc: "Jump down to career timeline details", action: () => scrollToId("#experience") },
  { name: "/projects", desc: "Jump to horizontal scrolling project cards", action: () => scrollToId("#projects") },
  { name: "/skills-sandbox", desc: "Try out interactive 2D gravity physics nodes", action: () => scrollToId("#physics-sandbox") },
  { name: "/contact", desc: "Jump to email contact form footer", action: () => scrollToId("#contact") },
  { name: "/gravity-flip", desc: "Invert sandbox gravity vector upwards", action: () => setSandboxGravity("up") },
  { name: "/zero-gravity", desc: "Turn sandbox gravity off completely", action: () => setSandboxGravity("zero") },
  { name: "/sound-toggle", desc: "Mute or unmute synthesized sound feedback", action: () => document.querySelector(".audio-toggle").click() },
  { name: "/secret", desc: "Deploy a digital hack matrix overlay", action: () => showSecretEgg() }
];

function scrollToId(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function setSandboxGravity(type) {
  const btn = document.querySelector(`.gravity-btn[data-gravity="${type}"]`);
  if (btn) btn.click();
}

function showSecretEgg() {
  // Easter Egg overlay
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.left = "0";
  div.style.width = "100vw";
  div.style.height = "100vh";
  div.style.backgroundColor = "rgba(7,243,129,0.06)";
  div.style.color = "var(--accent-emerald)";
  div.style.fontFamily = "var(--font-mono)";
  div.style.padding = "2rem";
  div.style.zIndex = "20000";
  div.style.pointerEvents = "none";
  div.innerHTML = "<p>> SYSTEM DETECTED PurvaS WORKBENCH...</p><p>> MATRIX SIMULATION BOOTING...</p><p>> ACCESS GRANTED. DEVELOPING HIGH-CRAFT PIXELS...</p>";
  document.body.appendChild(div);
  
  if (window.PortfolioAudio) {
    // Synthesize series of binary  sound variations
    for(let i=0; i<8; i++) {
      setTimeout(() => {
        window.PortfolioAudio.playClick(1.5 + (i * 0.1));
      }, i * 150);
    }
  }

  setTimeout(() => {
    div.remove();
  }, 3500);
}

function initCommandPalette() {
  const cmdPaletteBtn = document.getElementById("cmdPaletteBtn");
  const cmdOverlay = document.querySelector(".cmd-overlay");
  const cmdInput = document.querySelector(".cmd-input");
  const cmdResults = document.querySelector(".cmd-results");
  
  let activeIndex = 0;
  let filteredList = [...PaletteCommands];

  const togglePalette = () => {
    const isAct = cmdOverlay.classList.toggle("active");
    if (isAct) {
      cmdInput.value = "";
      filterResults("");
      setTimeout(() => cmdInput.focus(), 100);
      if (window.PortfolioAudio) window.PortfolioAudio.playClick(1.0);
    } else {
      if (window.PortfolioAudio) window.PortfolioAudio.playClick(0.9);
    }
  };

  // Click palette button or Overlay backdrop
  cmdPaletteBtn.addEventListener("click", togglePalette);
  cmdOverlay.addEventListener("click", (e) => {
    if (e.target === cmdOverlay) togglePalette();
  });

  // Short keys listener (Ctrl + K or '/')
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey && e.key === "k") || (e.key === "/" && document.activeElement !== cmdInput)) {
      e.preventDefault();
      togglePalette();
    }
  });

  // Input text filter
  cmdInput.addEventListener("input", (e) => {
    filterResults(e.target.value.toLowerCase());
  });

  function filterResults(query) {
    filteredList = PaletteCommands.filter(c => 
      c.name.includes(query) || c.desc.toLowerCase().includes(query)
    );
    
    activeIndex = 0;
    renderResults();
  }

  function renderResults() {
    cmdResults.innerHTML = "";
    
    if (filteredList.length === 0) {
      cmdResults.innerHTML = '<div style="padding: 1rem 1.8rem; font-family: var(--font-mono); font-size: 0.85rem; color: #444;">No commands found...</div>';
      return;
    }

    filteredList.forEach((cmd, index) => {
      const item = document.createElement("div");
      item.classList.add("cmd-item");
      if (index === activeIndex) item.classList.add("active");
      
      item.innerHTML = `
        <span class="cmd-item-name">${cmd.name}</span>
        <span class="cmd-item-desc">${cmd.desc}</span>
      `;
      
      item.addEventListener("click", () => {
        executeCommand(cmd);
      });

      cmdResults.appendChild(item);
    });
  }

  function executeCommand(cmd) {
    cmd.action();
    togglePalette();
  }

  // Keyboard navigation of command items (Arrow keys + Enter)
  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % filteredList.length;
      renderResults();
      if (window.PortfolioAudio) window.PortfolioAudio.playHover();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + filteredList.length) % filteredList.length;
      renderResults();
      if (window.PortfolioAudio) window.PortfolioAudio.playHover();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredList[activeIndex]) {
        executeCommand(filteredList[activeIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      togglePalette();
    }
  });
}

// --------------------------------------------------
// 9. Initializing Elements & Dynamic Layout Binding
// --------------------------------------------------
function dynamicLayoutDataBind() {
  // Bind dynamic text titles
  document.querySelector(".nav-logo").innerText = `${DeveloperConfig.profile.name}${DeveloperConfig.profile.lastName}`;
  document.querySelector(".landing-intro h1").innerHTML = `${DeveloperConfig.profile.name.toUpperCase()} <br><span>${DeveloperConfig.profile.lastName.toUpperCase()}</span>`;
  document.querySelector(".landing-info-h2").innerText = DeveloperConfig.profile.tagline1;
  document.querySelector(".landing-h2-info").innerText = DeveloperConfig.profile.tagline2;
  
  // Resume ref
  document.querySelector(".resume-button").setAttribute("href", DeveloperConfig.profile.resumeLink);
  
  // About
  document.querySelector(".about-me h3.title").innerText = DeveloperConfig.profile.aboutTitle;
  document.querySelector(".about-me p.para").innerText = DeveloperConfig.profile.aboutText;
  
  // Accordions titles & tech stacks
  const accordions = document.querySelectorAll(".what-content-in");
  // Accordion 1 - Develop
  accordions[0].querySelector("h3").innerText = DeveloperConfig.skills.develop.title;
  accordions[0].querySelector("h4").innerText = DeveloperConfig.skills.develop.description;
  accordions[0].querySelector("p").innerText = DeveloperConfig.skills.develop.details;
  const devStackContainer = accordions[0].querySelector(".what-content-flex");
  devStackContainer.innerHTML = "";
  DeveloperConfig.skills.develop.tools.forEach(tool => {
    devStackContainer.innerHTML += `<div class="what-tags">${tool}</div>`;
  });
  
  // Accordion 2 - Design
  accordions[1].querySelector("h3").innerText = DeveloperConfig.skills.design.title;
  accordions[1].querySelector("h4").innerText = DeveloperConfig.skills.design.description;
  accordions[1].querySelector("p").innerText = DeveloperConfig.skills.design.details;
  const designStackContainer = accordions[1].querySelector(".what-content-flex");
  designStackContainer.innerHTML = "";
  DeveloperConfig.skills.design.tools.forEach(tool => {
    designStackContainer.innerHTML += `<div class="what-tags">${tool}</div>`;
  });
  
  // Experience Timeline List Bind
  const careerInfoContainer = document.querySelector(".career-info");
  // Keep the timeline bar
  const timelineBar = careerInfoContainer.querySelector(".career-timeline");
  careerInfoContainer.innerHTML = "";
  careerInfoContainer.appendChild(timelineBar);
  
  DeveloperConfig.experiences.forEach(exp => {
    const box = document.createElement("div");
    box.classList.add("career-info-box");
    box.innerHTML = `
      <div class="career-info-in">
        <div class="career-role">
          <h4>${exp.position}</h4>
          <h5>${exp.company}</h5>
        </div>
        <h3>${exp.period}</h3>
      </div>
      <p>${exp.description}</p>
    `;
    careerInfoContainer.appendChild(box);
  });

  // Projects Scroll List Bind
  const projectsScrollContainer = document.querySelector(".work-flex");
  // Keep the CTA block
  const ctaBox = projectsScrollContainer.querySelector(".work-box-cta");
  projectsScrollContainer.innerHTML = "";
  
  DeveloperConfig.projects.forEach((proj, idx) => {
    const card = document.createElement("div");
    card.classList.add("work-box");
    
    let bulletsHtml = "";
    if (proj.bullets && proj.bullets.length > 0) {
      bulletsHtml = `
        <ul class="work-bullets" style="margin-top: 1rem; padding-left: 1.2rem; color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; display: flex; flex-direction: column; gap: 5px; list-style-type: square; user-select: text;">
          ${proj.bullets.map(b => `<li>${b}</li>`).join("")}
        </ul>
      `;
    }

    card.innerHTML = `
      <div class="work-info">
        <div class="work-title">
          <h3>0${idx + 1}</h3>
          <div>
            <h4>${proj.title}</h4>
            <p>${proj.category}</p>
          </div>
        </div>
        <h4>Tools and features</h4>
        <p>${proj.technologies}</p>
        ${bulletsHtml}
      </div>
      <div class="work-image" data-cursor="disable">
        <a class="work-image-in" href="${proj.link}">
          <div class="work-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z"/></svg>
          </div>
          <img src="${proj.image}" alt="${proj.title}">
        </a>
      </div>
    `;
    projectsScrollContainer.appendChild(card);
  });
  projectsScrollContainer.appendChild(ctaBox);

  // Social Links Contact Bind
  const socialSpans = document.querySelectorAll("#social span a");
  socialSpans[0].setAttribute("href", DeveloperConfig.contact.github);
  socialSpans[1].setAttribute("href", DeveloperConfig.contact.linkedin);
  socialSpans[2].setAttribute("href", DeveloperConfig.contact.twitter);
  socialSpans[3].setAttribute("href", DeveloperConfig.contact.instagram);
  
  // Footer binds
  document.querySelector(".contact-section h3").innerText = `${DeveloperConfig.profile.name} ${DeveloperConfig.profile.lastName}`;
  document.querySelector(".contact-box a[href^='mailto:']").setAttribute("href", `mailto:${DeveloperConfig.contact.email}`);
  document.querySelector(".contact-box a[href^='mailto:']").innerText = DeveloperConfig.contact.email;
  const phoneEl = document.getElementById("contact-phone");
  if (phoneEl) {
    phoneEl.setAttribute("href", `tel:${DeveloperConfig.contact.phone.replace(/\s+/g, '')}`);
    phoneEl.innerText = DeveloperConfig.contact.phone;
  }
  const locationEl = document.getElementById("contact-location");
  if (locationEl) {
    locationEl.innerText = DeveloperConfig.contact.location;
  }
  
  const footerSocials = document.querySelectorAll(".contact-box:nth-child(2) a");
  footerSocials[0].setAttribute("href", DeveloperConfig.contact.github);
  footerSocials[1].setAttribute("href", DeveloperConfig.contact.linkedin);
  footerSocials[2].setAttribute("href", DeveloperConfig.contact.twitter);
  footerSocials[3].setAttribute("href", DeveloperConfig.contact.instagram);
  
  document.querySelector(".contact-box h2 span").innerText = `${DeveloperConfig.profile.name} ${DeveloperConfig.profile.lastName}`;
  document.querySelector(".contact-box h5").innerHTML = `&copy; ${new Date().getFullYear()}`;
}

// --------------------------------------------------
// 10. Main DOM Content Loaded Core Initialization
// --------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Reset scroll to top
  window.scrollTo(0, 0);

  // Start loading the 3D Avatar immediately in the background
  if (window.Avatar3DScene) {
    window.PortfolioAvatarInstance = new window.Avatar3DScene("renderer3d");
  }

  // Bind all layout details from profile configuration
  dynamicLayoutDataBind();
  
  // Launch modules
  initNavbar();
  initPreloader();
  initCustomCursor();
  initGSAPAnimations();
  initAccordions();
  initPhysicsSandbox();
  initCommandPalette();
  initThinkingBubble();
});
