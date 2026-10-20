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
            const addrVal = heroAddress ? heroAddress.value.trim() : '';
            if (fullAddressInput) {
                fullAddressInput.value = addrVal;
                const orderSection = document.getElementById('order');
                if (orderSection) {
                    orderSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.location.href = `contact.html?addr=${encodeURIComponent(addrVal)}`;
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

    /* 7. Interactive Kathmandu Broadband Speed Test Simulator */
    const startSpeedTestBtn = document.getElementById('startSpeedTestBtn');
    const gaugeProgress = document.getElementById('gaugeProgress');
    const speedValue = document.getElementById('speedValue');
    const downResult = document.getElementById('downResult');
    const upResult = document.getElementById('upResult');
    const pingResult = document.getElementById('pingResult');
    const testStatusText = document.getElementById('testStatusText');

    let isTesting = false;
    const maxGaugeDash = 251.2; // Circumference of semicircle (r=80)

    function updateGauge(val, maxVal = 250) {
        if (!gaugeProgress || !speedValue) return;
        const clamped = Math.min(Math.max(val, 0), maxVal);
        const percent = clamped / maxVal;
        const offset = maxGaugeDash * (1 - percent);
        gaugeProgress.style.strokeDashoffset = offset;
        speedValue.innerText = Math.round(val);
    }

    if (startSpeedTestBtn) {
        startSpeedTestBtn.addEventListener('click', () => {
            if (isTesting) return;
            isTesting = true;
            startSpeedTestBtn.disabled = true;
            startSpeedTestBtn.style.opacity = '0.6';
            testStatusText.innerText = 'Pinging Maitidevi Relay...';
            downResult.innerText = '--';
            upResult.innerText = '--';
            pingResult.innerText = '--';
            updateGauge(0);

            // Phase 1: Ping (ms)
            setTimeout(() => {
                const simulatedPing = Math.floor(Math.random() * 8) + 18; // 18-25 ms
                pingResult.innerText = simulatedPing;
                testStatusText.innerText = 'Testing Download Throughput...';

                // Phase 2: Download Speed climb
                let currentSpeed = 0;
                const targetDown = Math.floor(Math.random() * 25) + 215; // 215-240 Mbps
                const downInterval = setInterval(() => {
                    const step = Math.ceil((targetDown - currentSpeed) / 7) + 3;
                    currentSpeed += step;
                    if (currentSpeed >= targetDown) {
                        currentSpeed = targetDown;
                        clearInterval(downInterval);
                        downResult.innerText = targetDown;
                        testStatusText.innerText = 'Testing Upload Throughput...';

                        // Phase 3: Upload Speed
                        setTimeout(() => {
                            let currentUp = 0;
                            const targetUp = Math.floor(Math.random() * 10) + 35; // 35-45 Mbps
                            updateGauge(0);
                            const upInterval = setInterval(() => {
                                const upStep = Math.ceil((targetUp - currentUp) / 6) + 2;
                                currentUp += upStep;
                                if (currentUp >= targetUp) {
                                    currentUp = targetUp;
                                    clearInterval(upInterval);
                                    upResult.innerText = targetUp;

                                    // Complete
                                    setTimeout(() => {
                                        updateGauge(targetDown);
                                        testStatusText.innerHTML = '✔ <span style="color:#00e676">Optimization Complete</span> (LEO Link Active)';
                                        startSpeedTestBtn.disabled = false;
                                        startSpeedTestBtn.style.opacity = '1';
                                        startSpeedTestBtn.innerText = 'RUN TEST AGAIN';
                                        isTesting = false;
                                    }, 400);
                                } else {
                                    updateGauge(currentUp, 60);
                                }
                            }, 50);
                        }, 500);
                    } else {
                        updateGauge(currentSpeed, 250);
                    }
                }, 40);
            }, 600);
        });
    }

    /* 8. URL Parameter Handler for Order / Contact Page */
    if (selectedPlanInput || fullAddressInput) {
        const urlParams = new URLSearchParams(window.location.search);
        const planParam = urlParams.get('plan');
        if (planParam && selectedPlanInput) {
            for (let i = 0; i < selectedPlanInput.options.length; i++) {
                if (selectedPlanInput.options[i].value.toLowerCase().includes(planParam.toLowerCase())) {
                    selectedPlanInput.selectedIndex = i;
                    break;
                }
            }
        }
        const addrParam = urlParams.get('addr');
        if (addrParam && fullAddressInput) {
            fullAddressInput.value = addrParam;
        }
    }

    /* 9. Interactive Coverage Area Checker (coverage.html) */
    const coverageAreaSelect = document.getElementById('coverageAreaSelect');
    const coverageResultCard = document.getElementById('coverageResultCard');
    const areaNameSpan = document.getElementById('areaNameSpan');
    const areaStatusSpan = document.getElementById('areaStatusSpan');
    const areaLatencySpan = document.getElementById('areaLatencySpan');
    const areaRelaySpan = document.getElementById('areaRelaySpan');

    if (coverageAreaSelect && coverageResultCard) {
        coverageAreaSelect.addEventListener('change', () => {
            const val = coverageAreaSelect.value;
            if (!val) {
                coverageResultCard.style.display = 'none';
                return;
            }

            const dataMap = {
                'maitidevi': { name: 'Maitidevi / Setopul', status: 'Online (Optimal - HQ Direct Line)', latency: '18 ms', relay: 'Primary Maitidevi Ground Gateway' },
                'thamel': { name: 'Thamel / Lazimpat', status: 'Online (Strong Unobstructed Sky)', latency: '21 ms', relay: 'LEO Grid Beam 04' },
                'baneshwor': { name: 'New Baneshwor / Tinkune', status: 'Online (Full Direct Line-of-Sight)', latency: '19 ms', relay: 'LEO Grid Beam 07' },
                'patan': { name: 'Patan / Lalitpur City', status: 'Online (High-Elevation Relay)', latency: '22 ms', relay: 'LEO Grid Beam 09' },
                'bhaktapur': { name: 'Bhaktapur Valley Basin', status: 'Online (East Valley Expansion)', latency: '24 ms', relay: 'LEO Grid Beam 12' },
                'other': { name: 'Outer Kathmandu Ring Road', status: 'Testing In Progress (Phase 2 Pre-order)', latency: '28 ms (Est.)', relay: 'Secondary Relay Gateway' }
            };

            const info = dataMap[val];
            if (info) {
                if (areaNameSpan) areaNameSpan.innerText = info.name;
                if (areaStatusSpan) areaStatusSpan.innerText = info.status;
                if (areaLatencySpan) areaLatencySpan.innerText = info.latency;
                if (areaRelaySpan) areaRelaySpan.innerText = info.relay;
                coverageResultCard.style.display = 'block';
            }
        });
    }
});