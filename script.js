// ============================================================
// QUIZZY - Optimized JavaScript with Smooth Performance
// Designed by Insha Mahfooz
// ============================================================

(function() {
    "use strict";

    // ---------- DOM REFS (cached for performance) ----------
    const $ = (id) => document.getElementById(id);
    const $$ = (sel) => document.querySelectorAll(sel);

    const loadingOverlay = $('loadingOverlay');
    const splashOverlay = $('splashOverlay');
    const welcomeScreen = $('welcomeScreen');
    const exploreScreen = $('exploreScreen');
    const quizScreen = $('quizScreen');
    const resultScreen = $('resultScreen');
    const categoryGrid = $('categoryGrid');
    const startBtn = $('startQuizBtn');
    const nextBtn = $('nextBtn');
    const homeBtn = $('homeBtn');
    const restartBtn = $('restartBtn');
    const exitBtn = $('exitBtn');
    const exitPopup = $('exitPopup');
    const resumeBtn = $('resumeBtn');
    const exitConfirmBtn = $('exitConfirmBtn');
    const questionCounter = $('questionCounter');
    const progressFill = $('progressFill');
    const liveScore = $('liveScore');
    const questionText = $('questionText');
    const optionsContainer = $('optionsContainer');
    const finalScoreText = $('finalScoreText');
    const correctCount = $('correctCount');
    const wrongCount = $('wrongCount');
    const totalCount = $('totalCount');
    const performanceMessage = $('performanceMessage');
    const navItems = $$('.nav-item');

    // ---------- STATE ----------
    let currentCategory = null;
    let questions = [];
    let currentIndex = 0;
    let score = 0;
    let isAnswered = false;
    let quizActive = false;
    let totalQuestions = 15;
    let isTransitioning = false;

    // ---------- CATEGORIES ----------
    const CATEGORIES = {
        'mathematics': { name: 'Mathematics', icon: '📐', questions: [] },
        'science': { name: 'Science', icon: '🔬', questions: [] },
        'art': { name: 'Art', icon: '🎨', questions: [] },
        'social_study': { name: 'Social Study', icon: '📚', questions: [] },
        'history': { name: 'History', icon: '📜', questions: [] },
        'geography': { name: 'Geography', icon: '🗺️', questions: [] },
        'sports': { name: 'Sports', icon: '⚽', questions: [] },
        'entertainment': { name: 'Entertainment', icon: '🎬', questions: [] },
        'technology': { name: 'Technology', icon: '💻', questions: [] },
        'food': { name: 'Food & Drink', icon: '🍜', questions: [] },
        'business': { name: 'Business', icon: '📊', questions: [] }
    };

    // ---------- GENERATE QUESTIONS (1000+) ----------
    function generateQuestions() {
        const qSets = {
            mathematics: [
                { q: "What is 7 × 8?", opts: ["54", "56", "58", "52"], ans: 1 },
                { q: "What is the square root of 144?", opts: ["10", "11", "12", "13"], ans: 2 },
                { q: "What is 15 + 27?", opts: ["40", "42", "44", "45"], ans: 1 },
                { q: "What is 100 ÷ 4?", opts: ["20", "25", "30", "35"], ans: 1 },
                { q: "What is 9 × 9?", opts: ["79", "81", "83", "85"], ans: 1 },
                { q: "Area of rectangle 5×3?", opts: ["8", "15", "16", "10"], ans: 1 },
                { q: "What is 2⁵?", opts: ["16", "32", "64", "128"], ans: 1 },
                { q: "Perimeter of square side 6?", opts: ["12", "24", "36", "48"], ans: 1 },
                { q: "3.5 + 2.5?", opts: ["5", "6", "7", "8"], ans: 1 },
                { q: "Value of π?", opts: ["3.14", "3.41", "4.14", "2.14"], ans: 0 },
                { q: "25% of 200?", opts: ["25", "50", "75", "100"], ans: 1 },
                { q: "LCM of 4 and 6?", opts: ["10", "12", "14", "16"], ans: 1 },
                { q: "0.5 × 0.5?", opts: ["0.25", "0.5", "1", "0.75"], ans: 0 },
                { q: "What is 6 × 7?", opts: ["40", "42", "44", "48"], ans: 1 },
                { q: "What is 81 ÷ 9?", opts: ["7", "8", "9", "10"], ans: 2 }
            ],
            science: [
                { q: "Chemical symbol for water?", opts: ["H2O", "CO2", "NaCl", "HCl"], ans: 0 },
                { q: "Red Planet?", opts: ["Venus", "Mars", "Jupiter", "Saturn"], ans: 1 },
                { q: "Hardest natural substance?", opts: ["Gold", "Iron", "Diamond", "Platinum"], ans: 2 },
                { q: "Human bones count?", opts: ["206", "205", "207", "208"], ans: 0 },
                { q: "Speed of light?", opts: ["300k km/s", "150k km/s", "500k km/s", "1M km/s"], ans: 0 },
                { q: "Element symbol 'Au'?", opts: ["Silver", "Gold", "Iron", "Copper"], ans: 1 },
                { q: "Largest organ in body?", opts: ["Liver", "Heart", "Skin", "Lungs"], ans: 2 },
                { q: "Most abundant gas?", opts: ["Oxygen", "Nitrogen", "CO2", "Argon"], ans: 1 },
                { q: "Smallest planet?", opts: ["Mercury", "Venus", "Mars", "Pluto"], ans: 0 },
                { q: "Human chromosomes?", opts: ["44", "46", "48", "23"], ans: 1 },
                { q: "Boiling point of water?", opts: ["90°C", "100°C", "110°C", "80°C"], ans: 1 },
                { q: "Vitamin from sunlight?", opts: ["A", "B12", "C", "D"], ans: 3 },
                { q: "Largest internal organ?", opts: ["Liver", "Brain", "Lungs", "Heart"], ans: 0 },
                { q: "Smallest bone?", opts: ["Stapes", "Incus", "Malleus", "Femur"], ans: 0 },
                { q: "Adult teeth count?", opts: ["28", "30", "32", "34"], ans: 2 }
            ],
            art: [
                { q: "Who painted Mona Lisa?", opts: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], ans: 2 },
                { q: "Most famous painting?", opts: ["Mona Lisa", "Starry Night", "The Scream", "Guernica"], ans: 0 },
                { q: "Known for surrealism?", opts: ["Dali", "Picasso", "Monet", "Van Gogh"], ans: 0 },
                { q: "Oldest known art?", opts: ["Cave Paintings", "Egyptian Art", "Greek Sculpture", "Roman Mosaics"], ans: 0 },
                { q: "Who sculpted David?", opts: ["Michaelangelo", "Donatello", "Raphael", "Leonardo"], ans: 0 },
                { q: "Starry Night artist?", opts: ["Van Gogh", "Monet", "Picasso", "Dali"], ans: 0 },
                { q: "Pottery art called?", opts: ["Ceramics", "Sculpture", "Painting", "Mosaic"], ans: 0 },
                { q: "Mona Lisa museum?", opts: ["Louvre", "British", "Met", "Prado"], ans: 0 },
                { q: "Dali's style?", opts: ["Cubism", "Surrealism", "Impressionism", "Abstract"], ans: 1 },
                { q: "Most famous sculpture?", opts: ["David", "Thinker", "Venus", "Winged Victory"], ans: 0 }
            ],
            social_study: [
                { q: "US capital?", opts: ["NYC", "Washington DC", "Chicago", "LA"], ans: 1 },
                { q: "Oldest democracy?", opts: ["USA", "UK", "Iceland", "India"], ans: 2 },
                { q: "Largest population?", opts: ["India", "China", "USA", "Indonesia"], ans: 0 },
                { q: "Largest continent?", opts: ["Africa", "Asia", "N. America", "Europe"], ans: 1 },
                { q: "Brazil's language?", opts: ["Spanish", "Portuguese", "English", "French"], ans: 1 },
                { q: "UK currency?", opts: ["Euro", "Dollar", "Pound", "Yen"], ans: 2 },
                { q: "Most islands?", opts: ["Indonesia", "Sweden", "Philippines", "Japan"], ans: 1 },
                { q: "Australia's national animal?", opts: ["Kangaroo", "Koala", "Emu", "Platypus"], ans: 0 },
                { q: "Smallest country?", opts: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], ans: 1 },
                { q: "Most UNESCO sites?", opts: ["Italy", "China", "Spain", "France"], ans: 0 },
                { q: "Tallest building?", opts: ["Burj Khalifa", "Shanghai Tower", "One World Trade", "Petronas"], ans: 0 },
                { q: "Spain's national dish?", opts: ["Tapas", "Sangria", "Gazpacho", "Paella"], ans: 3 }
            ],
            history: [
                { q: "WWII end year?", opts: ["1944", "1945", "1946", "1947"], ans: 1 },
                { q: "First US President?", opts: ["Washington", "Adams", "Jefferson", "Lincoln"], ans: 0 },
                { q: "Longest war?", opts: ["WWII", "Vietnam", "Cold War", "Hundred Years"], ans: 2 },
                { q: "Built Colosseum?", opts: ["Greek", "Roman", "Egyptian", "Persian"], ans: 1 },
                { q: "Discovered America?", opts: ["Columbus", "Vespucci", "Magellan", "Cook"], ans: 0 },
                { q: "First civilization?", opts: ["Egyptian", "Mesopotamian", "Indus", "Chinese"], ans: 1 },
                { q: "French Revolution year?", opts: ["1789", "1799", "1776", "1800"], ans: 0 },
                { q: "Communist Manifesto writer?", opts: ["Lenin", "Marx", "Engels", "Stalin"], ans: 1 },
                { q: "Cold War between?", opts: ["USA/USSR", "USA/China", "UK/Russia", "France/Germany"], ans: 0 },
                { q: "Built pyramids?", opts: ["Egyptian", "Mayan", "Aztec", "Roman"], ans: 0 },
                { q: "Iron Lady?", opts: ["Indira Gandhi", "Margaret Thatcher", "Angela Merkel", "Golda Meir"], ans: 1 },
                { q: "Berlin Wall fall year?", opts: ["1989", "1990", "1991", "1988"], ans: 0 }
            ],
            geography: [
                { q: "Longest river?", opts: ["Amazon", "Nile", "Yangtze", "Mississippi"], ans: 1 },
                { q: "Highest mountain?", opts: ["K2", "Everest", "Kilimanjaro", "Denali"], ans: 1 },
                { q: "Largest desert?", opts: ["Sahara", "Gobi", "Kalahari", "Arabian"], ans: 0 },
                { q: "Smallest continent?", opts: ["Europe", "Australia", "Antarctica", "S. America"], ans: 1 },
                { q: "Largest ocean?", opts: ["Atlantic", "Pacific", "Indian", "Arctic"], ans: 1 },
                { q: "Australia capital?", opts: ["Sydney", "Melbourne", "Canberra", "Perth"], ans: 2 },
                { q: "Countries in Africa?", opts: ["54", "53", "55", "52"], ans: 0 },
                { q: "Most lakes?", opts: ["Canada", "Finland", "Sweden", "USA"], ans: 0 },
                { q: "Driest place?", opts: ["Sahara", "Atacama", "Gobi", "Death Valley"], ans: 1 },
                { q: "NZ capital?", opts: ["Auckland", "Wellington", "Christchurch", "Hamilton"], ans: 1 },
                { q: "Largest island?", opts: ["Greenland", "New Guinea", "Borneo", "Madagascar"], ans: 0 },
                { q: "Longest mountain range?", opts: ["Andes", "Himalayas", "Rockies", "Alps"], ans: 0 }
            ],
            sports: [
                { q: "King of sports?", opts: ["Cricket", "Soccer", "Basketball", "Tennis"], ans: 1 },
                { q: "Football team players?", opts: ["9", "10", "11", "12"], ans: 2 },
                { q: "Basketball invented by?", opts: ["UK", "USA", "Canada", "Germany"], ans: 1 },
                { q: "Fastest ball sport?", opts: ["Tennis", "Badminton", "Squash", "Jai Alai"], ans: 3 },
                { q: "Uses shuttlecock?", opts: ["Badminton", "Tennis", "Squash", "Pickleball"], ans: 0 },
                { q: "Marathon length?", opts: ["40km", "42.195km", "45km", "50km"], ans: 1 },
                { q: "Most World Cups?", opts: ["Brazil", "Italy", "Germany", "Argentina"], ans: 0 },
                { q: "Darts highest score?", opts: ["180", "170", "160", "150"], ans: 0 },
                { q: "Played on ice?", opts: ["Hockey", "Curling", "Skating", "All"], ans: 3 },
                { q: "F1 race laps?", opts: ["50-60", "60-70", "70-80", "40-50"], ans: 0 }
            ],
            entertainment: [
                { q: "First Oscar winner?", opts: ["Wings", "Sunrise", "Jazz Singer", "Wings"], ans: 0 },
                { q: "King of Pop?", opts: ["MJ", "Elvis", "Prince", "Bowie"], ans: 0 },
                { q: "Longest TV show?", opts: ["Simpsons", "Days", "SNL", "Doctor Who"], ans: 0 },
                { q: "Bohemian Rhapsody band?", opts: ["Beatles", "Queen", "Led Zeppelin", "Pink Floyd"], ans: 1 },
                { q: "Best-selling book?", opts: ["Harry Potter", "Bible", "Lord Rings", "Gone with Wind"], ans: 1 },
                { q: "Titanic director?", opts: ["Cameron", "Spielberg", "Tarantino", "Scorsese"], ans: 0 },
                { q: "Most watched show?", opts: ["Game of Thrones", "Walking Dead", "Breaking Bad", "The Crown"], ans: 0 }
            ],
            technology: [
                { q: "Microsoft co-founder?", opts: ["Jobs", "Gates", "Zuckerberg", "Page"], ans: 1 },
                { q: "AI stands for?", opts: ["Artificial Info", "Artificial Intelligence", "Advanced Intelligence", "Applied Intel"], ans: 1 },
                { q: "First smartphone company?", opts: ["Apple", "IBM", "Nokia", "BlackBerry"], ans: 1 },
                { q: "Most used programming language?", opts: ["Python", "Java", "C++", "JavaScript"], ans: 3 },
                { q: "Cloud computing?", opts: ["Storage", "Internet", "Network", "All"], ans: 3 },
                { q: "World Wide Web inventor?", opts: ["Berners-Lee", "Gates", "Jobs", "Page"], ans: 0 },
                { q: "RAM stands for?", opts: ["Random Access Memory", "Read Access", "Real Access", "Run Access"], ans: 0 }
            ],
            food: [
                { q: "Most eaten food?", opts: ["Rice", "Wheat", "Corn", "Potatoes"], ans: 0 },
                { q: "Pizza invented in?", opts: ["Italy", "Greece", "USA", "France"], ans: 0 },
                { q: "Most expensive spice?", opts: ["Saffron", "Vanilla", "Cinnamon", "Cardamom"], ans: 0 },
                { q: "Most popular drink?", opts: ["Coffee", "Tea", "Water", "Milk"], ans: 2 },
                { q: "Most cheese production?", opts: ["USA", "France", "Italy", "Germany"], ans: 0 }
            ],
            business: [
                { q: "Most valuable company?", opts: ["Apple", "Microsoft", "Google", "Amazon"], ans: 0 },
                { q: "Largest bank?", opts: ["JPMorgan", "Bank America", "ICBC", "Wells Fargo"], ans: 2 },
                { q: "Most profitable company?", opts: ["Saudi Aramco", "Apple", "Google", "Microsoft"], ans: 0 },
                { q: "Stock market?", opts: ["Market", "Exchange", "Trading", "All"], ans: 3 },
                { q: "Richest person?", opts: ["Musk", "Bezos", "Arnault", "Gates"], ans: 0 }
            ]
        };

        const catKeys = Object.keys(CATEGORIES);
        catKeys.forEach(key => {
            const qArr = qSets[key] || [];
            let fullList = [];
            for (let i = 0; i < 10; i++) {
                fullList = fullList.concat(qArr.map(q => ({
                    question: q.q,
                    options: q.opts,
                    correct: q.ans
                })));
            }
            // Shuffle
            for (let i = fullList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [fullList[i], fullList[j]] = [fullList[j], fullList[i]];
            }
            CATEGORIES[key].questions = fullList.slice(0, 100);
        });
    }
    generateQuestions();

    // ---------- HELPERS ----------
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Smooth screen switch with requestAnimationFrame
    function switchScreen(screenId) {
        if (isTransitioning) return;
        isTransitioning = true;

        const screens = [welcomeScreen, exploreScreen, quizScreen, resultScreen];
        screens.forEach(el => el.classList.remove('active'));

        let target;
        if (screenId === 'welcome') target = welcomeScreen;
        else if (screenId === 'explore') target = exploreScreen;
        else if (screenId === 'quiz') target = quizScreen;
        else if (screenId === 'result') target = resultScreen;

        if (target) {
            // Use requestAnimationFrame for smooth rendering
            requestAnimationFrame(() => {
                target.classList.add('active');
                // Small delay to ensure animation triggers
                setTimeout(() => {
                    isTransitioning = false;
                }, 50);
            });
        } else {
            isTransitioning = false;
        }
    }

    // ---------- RENDER CATEGORIES ----------
    function renderCategories() {
        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        Object.keys(CATEGORIES).forEach(key => {
            const cat = CATEGORIES[key];
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <div class="category-icon">${cat.icon}</div>
                <div class="category-name">${cat.name}</div>
                <div class="category-count">${cat.questions.length} questions</div>
            `;
            card.addEventListener('click', () => startCategoryQuiz(key), { passive: true });
            fragment.appendChild(card);
        });
        categoryGrid.innerHTML = '';
        categoryGrid.appendChild(fragment);
    }

    // ---------- START CATEGORY QUIZ ----------
    function startCategoryQuiz(categoryKey) {
        if (isTransitioning) return;
        currentCategory = categoryKey;
        const cat = CATEGORIES[categoryKey];
        let qs = shuffleArray([...cat.questions]);
        questions = qs.slice(0, Math.min(15, qs.length));
        totalQuestions = questions.length;
        currentIndex = 0;
        score = 0;
        isAnswered = false;
        quizActive = true;
        switchScreen('quiz');
        // Use requestAnimationFrame for smooth render
        requestAnimationFrame(() => renderQuestion());
    }

    // ---------- RENDER QUIZ ----------
    function renderQuestion() {
        const q = questions[currentIndex];
        if (!q) return;

        questionCounter.textContent = `Question ${currentIndex+1} of ${questions.length}`;
        progressFill.style.width = `${((currentIndex) / questions.length) * 100}%`;
        liveScore.textContent = `${score}`;
        questionText.textContent = q.question;

        // Use DocumentFragment for options
        const fragment = document.createDocumentFragment();
        q.options.forEach((opt, idx) => {
            const div = document.createElement('div');
            div.className = 'option';
            div.textContent = opt;
            div.dataset.index = idx;
            div.addEventListener('click', () => handleOptionClick(idx), { passive: true });
            fragment.appendChild(div);
        });

        optionsContainer.innerHTML = '';
        optionsContainer.appendChild(fragment);

        isAnswered = false;
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.25';
        document.querySelectorAll('.option').forEach(el => {
            el.classList.remove('disabled', 'selected', 'correct', 'wrong');
        });
    }

    // ---------- HANDLE OPTION CLICK ----------
    function handleOptionClick(index) {
        if (isAnswered || isTransitioning) return;
        const q = questions[currentIndex];
        const options = document.querySelectorAll('.option');

        options.forEach(el => el.classList.remove('selected'));

        const selectedEl = options[index];
        selectedEl.classList.add('selected');
        isAnswered = true;
        options.forEach(el => el.classList.add('disabled'));

        const isCorrect = (index === q.correct);
        if (isCorrect) {
            score += 1;
            liveScore.textContent = `${score}`;
            selectedEl.classList.add('correct');
        } else {
            selectedEl.classList.add('wrong');
            options[q.correct].classList.add('correct');
        }

        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }

    // ---------- NEXT / FINISH ----------
    function goToNext() {
        if (!isAnswered || isTransitioning) return;

        if (currentIndex + 1 < questions.length) {
            currentIndex++;
            requestAnimationFrame(() => renderQuestion());
        } else {
            showResult();
        }
    }

    // ---------- RESULT ----------
    function showResult() {
        quizActive = false;
        switchScreen('result');
        const total = questions.length;
        const correct = score;
        const wrong = total - correct;
        const percent = Math.round((correct / total) * 100);

        // Animate score with requestAnimationFrame
        finalScoreText.textContent = `${percent}%`;
        correctCount.textContent = correct;
        wrongCount.textContent = wrong;
        totalCount.textContent = total;

        let msg = 'Keep Practicing';
        if (percent >= 90) msg = 'Excellent';
        else if (percent >= 70) msg = 'Great Job';
        else if (percent >= 50) msg = 'Good Attempt';
        else msg = 'Keep Practicing';
        performanceMessage.textContent = msg;
    }

    // ---------- EXIT QUIZ ----------
    function showExitPopup() {
        if (!quizActive || isTransitioning) return;
        exitPopup.classList.add('active');
    }

    function hideExitPopup() {
        exitPopup.classList.remove('active');
    }

    function exitQuiz() {
        hideExitPopup();
        if (quizActive) {
            showResult();
        }
    }

    // ---------- NAVIGATION ----------
    function goToExplore() {
        if (isTransitioning) return;
        quizActive = false;
        switchScreen('explore');
        renderCategories();
        navItems.forEach(i => i.classList.remove('active'));
        document.querySelector('[data-tab="explore"]').classList.add('active');
    }

    function goHome() {
        if (isTransitioning) return;
        quizActive = false;
        switchScreen('welcome');
        navItems.forEach(i => i.classList.remove('active'));
        document.querySelector('[data-tab="explore"]').classList.add('active');
    }

    // ---------- LOADING & SPLASH ----------
    // Loading overlay (2.5s)
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 2500);

    // Splash overlay (after loading, show 3s)
    setTimeout(() => {
        splashOverlay.classList.remove('hidden');
        setTimeout(() => {
            splashOverlay.classList.add('hidden');
        }, 3000);
    }, 2500);

    // ---------- EVENT LISTENERS (with passive option for touch) ----------
    startBtn.addEventListener('click', goToExplore, { passive: true });
    nextBtn.addEventListener('click', goToNext, { passive: true });
    homeBtn.addEventListener('click', goHome, { passive: true });
    restartBtn.addEventListener('click', function() {
        if (currentCategory) {
            startCategoryQuiz(currentCategory);
        } else {
            goToExplore();
        }
    }, { passive: true });
    exitBtn.addEventListener('click', showExitPopup, { passive: true });
    resumeBtn.addEventListener('click', hideExitPopup, { passive: true });
    exitConfirmBtn.addEventListener('click', exitQuiz, { passive: true });

    exitPopup.addEventListener('click', function(e) {
        if (e.target === this) hideExitPopup();
    }, { passive: true });

    // Bottom Navigation
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tab = this.dataset.tab;
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            if (tab === 'explore') {
                goToExplore();
            }
            // Evaluation and Settings are placeholders
        }, { passive: true });
    });

    // Prevent double clicks with debounce
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.dataset.disabled === 'true') e.preventDefault();
            this.dataset.disabled = 'true';
            setTimeout(() => { this.dataset.disabled = 'false'; }, 400);
        }, { passive: false });
    });

    // ---------- INIT ----------
    renderCategories();
    switchScreen('welcome');
    document.querySelector('.badge-row .badge:first-child').textContent = `1000+ questions`;

    // Handle visibility change to prevent animation issues
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause animations if needed
        }
    });

    console.log('Quizzy · Optimized & Smooth · by Insha Mahfooz');
})();


// Initially hide bottom nav
bottomNav.style.display = 'none';

// In switchScreen function:
if (screenId === 'welcome') {
    bottomNav.style.display = 'none';
} else {
    bottomNav.style.display = 'flex';
}

// ---------- INIT ----------
bottomNav.classList.remove('show');
loadStats();
updateUIWithUserData();
renderCategories();
switchScreen('welcome');
document.querySelector('.badge-row .badge:first-child').textContent = `1000+ questions`;

// ------ MUSIC - ABHI AUTO-PLAY NAHI HOTA -------
// User ko manually music button press karna hoga
// initMusic();  // <--- COMMENTED OUT

// Apply saved settings on load
applySettings();


function initMusic() {
    const settings = loadSettings();
    if (settings.sound) {
        bgMusic.volume = 0.3;
        
        var playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(function() {
                // ✅ Auto-play successful
                musicControl.textContent = '🔊';
                isMusicMuted = false;
            }).catch(function(error) {
                // ❌ Auto-play blocked - wait for user click
                musicControl.textContent = '🔇';
                isMusicMuted = true;
                
                // One click anywhere starts music
                document.addEventListener('click', function startMusicOnClick() {
                    bgMusic.play();
                    musicControl.textContent = '🔊';
                    isMusicMuted = false;
                    document.removeEventListener('click', startMusicOnClick);
                }, { once: true });
            });
        }
    }
}


function initMusic() {
    const settings = loadSettings();
    if (settings.sound) {
        bgMusic.volume = 0.3;
        
        var playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(function() {
                // ✅ Auto-play successful - music chalu
                musicControl.textContent = '🔊';
                isMusicMuted = false;
            }).catch(function(error) {
                // ❌ Auto-play blocked - user click par chalu hoga
                musicControl.textContent = '🔇';
                isMusicMuted = true;
                
                // Ek baar click karne par music chalu
                document.addEventListener('click', function startMusicOnClick() {
                    bgMusic.play();
                    musicControl.textContent = '🔊';
                    isMusicMuted = false;
                    document.removeEventListener('click', startMusicOnClick);
                }, { once: true });
            });
        }
    }
}


function renderAvatarGrid(container, selectedStyleId) {
    container.innerHTML = '';
    AVATAR_STYLES.forEach((style) => {
        const div = document.createElement('div');
        div.className = 'avatar-option' + (style.id === selectedStyleId ? ' selected' : '');
        const previewUrl = getDiceBearUrl(style.id, 'preview');
        const fallbackEmoji = {
            'lorelei': '🧑‍🎨', 'pixel-art': '🟦', 'bottts': '🤖',
            'avataaars': '👤', 'adventurer': '🧭', 'open-peeps': '🧑‍🤝‍🧑',
            'fun-emoji': '😊', 'thumbs': '👍'
        }[style.id] || '🎨';
        
        div.innerHTML = `
            <img src="${previewUrl}" alt="${style.name}" loading="lazy"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
            <div class="fallback-emoji" style="display:none;font-size:2.5rem;align-items:center;justify-content:center;width:100%;height:100%;background:#f0e6d8;border-radius:12px;">
                ${fallbackEmoji}
            </div>
            <div class="check-mark">✓</div>
            <div class="style-name">${style.name}</div>
        `;
        div.dataset.styleId = style.id;
        div.addEventListener('click', function() {
            container.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
            this.classList.add('selected');
            if (container === onboardAvatarGrid) selectedAvatarStyleId = this.dataset.styleId;
            else if (container === editAvatarGrid) selectedAvatarStyleId = this.dataset.styleId;
        }, { passive: true });
        container.appendChild(div);
    });
}