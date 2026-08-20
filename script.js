document.addEventListener('DOMContentLoaded', () => {

    /* 1. Scroll-Triggered Counter Animation */
    const counters = document.querySelectorAll('.counter');
    const statBar = document.getElementById('statBar');
    let animated = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const increment = target / 50;

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    function checkScroll() {
        if (!statBar || animated) return;
        const rect = statBar.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 50) {
            animated = true;
            runCounters();
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    /* 2. Hero Address Bar Form Sync */
    const heroOrderForm = document.getElementById('heroOrderForm');
    const heroAddress = document.getElementById('heroAddress');
    const fullAddressInput = document.getElementById('fullAddress');

    if (heroOrderForm) {
        heroOrderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const addrVal = heroAddress.value.trim();
            if (addrVal !== '' && fullAddressInput) {
                fullAddressInput.value = addrVal;
            }
            const orderSection = document.getElementById('order');
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    /* 3. Plan Select Buttons */
    const selectPlanBtns = document.querySelectorAll('.select-plan-btn');
    const selectedPlanInput = document.getElementById('selectedPlanInput');

    selectPlanBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const planName = btn.getAttribute('data-plan');
            if (selectedPlanInput && planName) {
                selectedPlanInput.value = planName;
            }
        });
    });

    /* 4. Coverage Modal Controls */
    const coverageModal = document.getElementById('coverageModal');
    const openCoverageBtn = document.getElementById('openCoverageBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalQuoteBtn = document.getElementById('modalQuoteBtn');

    if (openCoverageBtn && coverageModal) {
        openCoverageBtn.addEventListener('click', () => coverageModal.classList.add('active'));
    }
    if (closeModalBtn && coverageModal) {
        closeModalBtn.addEventListener('click', () => coverageModal.classList.remove('active'));
    }
    if (modalQuoteBtn && coverageModal) {
        modalQuoteBtn.addEventListener('click', () => coverageModal.classList.remove('active'));
    }
    if (coverageModal) {
        coverageModal.addEventListener('click', (e) => {
            if (e.target === coverageModal) coverageModal.classList.remove('active');
        });
    }

    /* 5. FAQ Accordion Toggle */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const answer = button.nextElementSibling;
            const icon = button.querySelector('.icon');
            const isOpen = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const ans = item.querySelector('.faq-answer');
                if (ans) ans.style.maxHeight = null;
                const ic = item.querySelector('.icon');
                if (ic) ic.textContent = '+';
            });

            if (!isOpen) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '−';
            }
        });
    });

    /* 6. Minimal Checkout Form Validation */
    const orderForm = document.getElementById('orderForm');
    const successBanner = document.getElementById('successBanner');

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            document.querySelectorAll('.field-error').forEach(el => el.style.display = 'none');

            const address = document.getElementById('fullAddress').value.trim();
            if (address.length < 3) {
                showError('errAddress');
                isValid = false;
            }

            const name = document.getElementById('custName').value.trim();
            if (name.length < 2) {
                showError('errName');
                isValid = false;
            }

            const phone = document.getElementById('custPhone').value.trim();
            const phoneRegex = /^(98|97)\d{8}$/;
            if (!phoneRegex.test(phone)) {
                showError('errPhone');
                isValid = false;
            }

            if (isValid) {
                orderForm.reset();
                if (successBanner) {
                    successBanner.style.display = 'block';
                    successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    function showError(elementId) {
        const errEl = document.getElementById(elementId);
        if (errEl) errEl.style.display = 'block';
    }
});