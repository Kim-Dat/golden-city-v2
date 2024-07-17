document.addEventListener("DOMContentLoaded", () => {
    const totalPages = 10; 
    let currentPage = 1;

    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageNumbersContainer = document.getElementById("pageNumbers");

    if (prevBtn && nextBtn && prevPageBtn && nextPageBtn && pageNumbersContainer) {
        const updatePagination = () => {
            pageNumbersContainer.innerHTML = "";

 
            if (currentPage > 4) {
                const firstPageBtn = document.createElement("button");
                firstPageBtn.className = "pagination-btn";
                firstPageBtn.textContent = "1";
                firstPageBtn.addEventListener("click", () => {
                    currentPage = 1;
                    updatePagination();
                });
                pageNumbersContainer.appendChild(firstPageBtn);

            
                const ellipsis = document.createElement("span");
                ellipsis.className = "pagination-btn ellipsis";
                ellipsis.textContent = "...";
                pageNumbersContainer.appendChild(ellipsis);
            }


            const startPage = Math.max(2, currentPage - 2);
            const endPage = Math.min(totalPages - 1, currentPage + 2);

            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = document.createElement("button");
                pageBtn.className = "pagination-btn page-number";
                pageBtn.textContent = i;
                if (i === currentPage) {
                    pageBtn.classList.add("active");
                }
                pageBtn.addEventListener("click", () => {
                    currentPage = i;
                    updatePagination();
                });
                pageNumbersContainer.appendChild(pageBtn);
            }

        
            if (currentPage < totalPages - 3) {
                const ellipsis = document.createElement("span");
                ellipsis.className = "pagination-btn ellipsis";
                ellipsis.textContent = "...";
                pageNumbersContainer.appendChild(ellipsis);

                const lastPageBtn = document.createElement("button");
                lastPageBtn.className = "pagination-btn";
                lastPageBtn.textContent = totalPages;
                lastPageBtn.addEventListener("click", () => {
                    currentPage = totalPages;
                    updatePagination();
                });
                pageNumbersContainer.appendChild(lastPageBtn);
            }

          
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === totalPages;
        };

        const goToPage = (page) => {
            currentPage = Math.max(1, Math.min(totalPages, page));
            updatePagination();
        };

        prevBtn.addEventListener("click", () => goToPage(1));
        nextBtn.addEventListener("click", () => goToPage(totalPages));
        prevPageBtn.addEventListener("click", () => goToPage(currentPage - 1));
        nextPageBtn.addEventListener("click", () => goToPage(currentPage + 1));

        updatePagination();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Scroll header
    const nav = document.querySelector(".nav");
    const header = document.querySelector("header");

    if (nav && header) {
        document.addEventListener("scroll", () => {
            const scrollPosition = window.scrollY > 100;
            if (scrollPosition) {
                nav.style.height = "64px";
                header.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)";
            } else {
                nav.style.height = "80px";
                header.style.boxShadow = "none";
            }
        });
    }

    // Tooltip
    const tooltipTriggers = document.querySelectorAll(".tooltip-trigger");
    const tooltipContents = document.querySelectorAll(".tooltip-content");

    tooltipTriggers.forEach((trigger, index) => {
        const content = tooltipContents[index];
        if (trigger && content) {
            content.style.display = "none";

            trigger.addEventListener("click", function (event) {
                event.stopPropagation();
                content.style.display = content.style.display === "none" ? "block" : "none";
            });

            content.addEventListener("click", function (event) {
                event.stopPropagation();
                content.style.display = "none";
            });
        }
    });

    document.addEventListener("click", function (event) {
        tooltipContents.forEach((content) => {
            if (!content.previousElementSibling.contains(event.target) && !content.contains(event.target)) {
                content.style.display = "none";
            }
        });
    });

    // Modal
    const modal = document.querySelector(".modal");
    const openModalButton = document.querySelector(".open-modal");
    const closeButton = document.querySelector(".close-button");

    if (modal && openModalButton && closeButton) {
        openModalButton.addEventListener("click", () => {
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
        });

        function closeModal() {
            modal.classList.remove("show");
            modal.classList.add("hide");
            setTimeout(() => {
                modal.style.display = "none";
                modal.classList.remove("hide");
            }, 300);
        }

        closeButton.addEventListener("click", closeModal);

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Drawer
    const openDrawerButton = document.getElementById("openDrawer");
    const closeDrawerButton = document.getElementById("closeDrawer");
    const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("overlay");

    if (openDrawerButton && closeDrawerButton && drawer && overlay) {
        openDrawerButton.addEventListener("click", function () {
            drawer.classList.add("open");
            overlay.classList.add("visible");
        });

        closeDrawerButton.addEventListener("click", function () {
            drawer.classList.remove("open");
            overlay.classList.remove("visible");
        });

        overlay.addEventListener("click", function () {
            drawer.classList.remove("open");
            overlay.classList.remove("visible");
        });
    }

    // Custom select
    function initializeCustomSelect(selectElement) {
        const selectBtn = selectElement.querySelector(".select-btn");
        const selectOptions = selectElement.querySelector(".select-options");
        const options = selectElement.querySelectorAll(".option");

        if (selectBtn && selectOptions) {
            selectBtn.addEventListener("click", () => {
                selectOptions.classList.toggle("show");
            });

            options.forEach((option) => {
                option.addEventListener("click", () => {
                    selectBtn.textContent = option.textContent;
                    options.forEach((opt) => opt.classList.remove("selected"));
                    option.classList.add("selected");
                    selectOptions.classList.remove("show");
                });
            });
        }
    }

    document.querySelectorAll(".custom-select").forEach(initializeCustomSelect);

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".custom-select")) {
            document.querySelectorAll(".select-options.show").forEach((selectOptions) => {
                selectOptions.classList.remove("show");
            });
        }
    });

    // Slider
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll(".carousel-item");
        const carouselInner = document.querySelector(".carousel-inner");

        if (carouselInner) {
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }
            const offset = -currentSlide * 100;
            carouselInner.style.transform = `translateX(${offset}%)`;
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    setInterval(nextSlide, 3000);

    showSlide(currentSlide);
});
