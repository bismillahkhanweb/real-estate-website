      // --- DATA: Properties ---
      const properties = [
        {
          id: 1,
          title: "Modern Luxury Villa",
          type: "house",
          price: "85,000,000",
          location: "DHA Phase 6, Lahore",
          beds: 5,
          baths: 6,
          area: "10 Marla",
          img: "https://picsum.photos/seed/prop1/600/400",
        },
        {
          id: 2,
          title: "Skyline Penthouse",
          type: "apartment",
          price: "45,000,000",
          location: "Bahria Town, Karachi",
          beds: 3,
          baths: 4,
          area: "4 Marla",
          img: "https://picsum.photos/seed/prop2/600/400",
        },
        {
          id: 3,
          title: "Corporate Office Space",
          type: "commercial",
          price: "120,000,000",
          location: "Blue Area, Islamabad",
          beds: 0,
          baths: 3,
          area: "2 Kanal",
          img: "https://picsum.photos/seed/prop3/600/400",
        },
        {
          id: 4,
          title: "Prime Residential Plot",
          type: "plot",
          price: "60,000,000",
          location: "CDA Scheme, Islamabad",
          beds: 0,
          baths: 0,
          area: "1 Kanal",
          img: "https://picsum.photos/seed/prop4/600/400",
        },
        {
          id: 5,
          title: "Contemporary Home",
          type: "house",
          price: "55,000,000",
          location: "Model Town, Lahore",
          beds: 4,
          baths: 5,
          area: "1 Kanal",
          img: "https://picsum.photos/seed/prop5/600/400",
        },
        {
          id: 6,
          title: "Luxury Studio Apt",
          type: "apartment",
          price: "15,000,000",
          location: "Gulberg, Lahore",
          beds: 1,
          baths: 1,
          area: "1.5 Marla",
          img: "https://picsum.photos/seed/prop6/600/400",
        },
      ];

      // --- DOM ELEMENTS ---
      const propertyGrid = document.getElementById("property-grid");
      const filterBtns = document.querySelectorAll(".filter-btn");
      const navbar = document.getElementById("navbar");
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("nav-links");
      const backToTopBtn = document.getElementById("back-to-top");

      // --- INITIALIZATION ---

      // 1. Render Properties
      function renderProperties(filter = "all") {
        propertyGrid.innerHTML = "";

        properties.forEach((property) => {
          if (filter === "all" || property.type === filter) {
            const card = document.createElement("div");
            card.className = "property-card";

            // WhatsApp Link
            const waMessage = `Hi, I am interested in ${property.title} priced at ${property.price} PKR.`;
            const waLink = `https://wa.me/?text=${encodeURIComponent(waMessage)}`;

            // Features HTML (Bed/Bath/Area)
            let featuresHtml = "";
            if (property.type !== "plot") {
              featuresHtml = `
                            <span>&#128719; ${property.beds} Beds</span>
                            <span>&#128704; ${property.baths} Baths</span>
                        `;
            } else {
              featuresHtml = `<span>&#128694; Residential</span>`;
            }
            featuresHtml += `<span>&#128694; ${property.area}</span>`;

            card.innerHTML = `
                        <div class="card-image">
                            <img src="${property.img}" alt="${property.title}">
                            <div class="price-tag">PKR ${property.price}</div>
                        </div>
                        <div class="card-content">
                            <h3>${property.title}</h3>
                            <div class="location">&#128205; ${property.location}</div>
                            <div class="features">
                                ${featuresHtml}
                            </div>
                            <a href="${waLink}" target="_blank" class="whatsapp-btn">
                                &#128242; Inquire on WhatsApp
                            </a>
                        </div>
                    `;
            propertyGrid.appendChild(card);

            // Trigger animation frame for class change
            requestAnimationFrame(() => {
              card.classList.add("visible");
            });
          }
        });
      }

      renderProperties();

      // 2. Filter Logic
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          filterBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          renderProperties(btn.dataset.filter);
        });
      });

      // 3. Sticky Navbar & Back to Top
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
          backToTopBtn.style.display = "flex";
        } else {
          navbar.classList.remove("scrolled");
          backToTopBtn.style.display = "none";
        }
      });

      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      // 4. Mobile Menu
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });

      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active");
        });
      });

      // 5. Animated Stats Counters
      const statsSection = document.getElementById("stats");
      const counters = document.querySelectorAll(".stat-item h3");
      let started = false;

      const startCounters = () => {
        counters.forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps

          let current = 0;
          const updateCount = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current);
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target + "+";
            }
          };
          updateCount();
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !started) {
            startCounters();
            started = true;
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(statsSection);

      // 6. Testimonial Auto Slider
      const slides = document.querySelectorAll(".testimonial-slide");
      let currentSlide = 0;

      const nextSlide = () => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
      };

      setInterval(nextSlide, 5000);

      // 7. Scroll Reveal Animation
      const revealElements = document.querySelectorAll(".reveal");

      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        { threshold: 0.1 },
      );

      revealElements.forEach((el) => revealObserver.observe(el));
    
