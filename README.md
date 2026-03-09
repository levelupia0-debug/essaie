<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>GHOST_V12_EXTREME</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --term-green: #00ff41;
            --term-yellow: #ffdf00;
            --term-red: #ff3e3e;
            --term-bg: #050505;
            --insta-blue: #0095f6;
            --fb-blue: #1877f2;
        }

        body, html {
            margin: 0; padding: 0;
            background-color: var(--term-bg);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            height: 100%;
            overflow: hidden; /* Terminal ne scrolle pas globalement */
        }

        /* --- TERMINAL --- */
        #terminal-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
            padding: 10px;
            box-sizing: border-box;
            background-color: var(--term-bg);
            font-family: 'Courier New', monospace;
        }

        #history {
            flex-grow: 1;
            overflow-y: hidden;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        .log-line { 
            margin-bottom: 1px; 
            line-height: 1.1; 
            font-size: 10px; 
            word-break: break-all; 
            white-space: pre-wrap; 
            color: var(--term-green); 
        }
        .red { color: var(--term-red); font-weight: bold; }
        .yellow { color: var(--term-yellow); }
        .gray { color: #666; }
        .blue { color: #0095f6; }
        
        .input-line { 
            display: flex; 
            align-items: center; 
            margin-top: 5px; 
            background: rgba(10,10,10,0.98); 
            padding: 15px; 
            border-top: 1px solid #333; 
        }
        .prompt { margin-right: 10px; color: var(--term-green); font-weight: bold; }
        
        #user-input {
            background: transparent;
            border: none;
            color: var(--term-green);
            font-family: 'Courier New', monospace;
            font-size: 15px;
            outline: none;
            flex-grow: 1;
        }

        /* --- INSTAGRAM / FB UI --- */
        #insta-ui {
            display: none;
            background-color: #fafafa;
            height: 100vh;
            width: 100%;
            flex-direction: column;
            align-items: center;
            overflow-y: auto; /* Permet le défilement de la page */
            -webkit-overflow-scrolling: touch;
        }

        .insta-box {
            background: white;
            border: 1px solid #dbdbdb;
            max-width: 388px;
            width: 90%;
            margin-top: 44px;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            flex-shrink: 0;
        }

        .profile-pic-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 1px solid #efefef;
            margin: 24px 0 12px 0;
            overflow: hidden;
            cursor: pointer;
            background: #fafafa;
            position: relative;
        }

        .profile-pic-circle img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: center;
            max-width: none;
            width: auto;
            height: 100%;
        }

        .insta-input {
            background-color: #fafafa;
            border: 1px solid #dbdbdb;
            border-radius: 12px;
            font-size: 14px;
            padding: 14px;
            width: 100%;
            outline: none;
        }

        .recovery-option {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            border: 1px solid #dbdbdb;
            border-radius: 12px;
            margin-bottom: 8px;
            cursor: pointer;
        }

        .radio-dot {
            width: 24px;
            height: 24px;
            border: 2px solid #dbdbdb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .radio-dot.active { border-color: var(--insta-blue); }
        .radio-dot.active::after {
            content: "";
            width: 14px; height: 14px;
            background: var(--insta-blue);
            border-radius: 50%;
        }

        /* --- FACEBOOK STYLE SAVE ACCOUNT --- */
        #fb-save-box {
            background-color: white;
            width: 90%;
            max-width: 500px;
            border-radius: 8px;
            box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
            margin-top: 20px;
            margin-bottom: 40px;
            overflow: hidden;
            flex-shrink: 0;
        }

        .fb-header {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #dddfe2;
        }

        .fb-content {
            padding: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .fb-footer {
            padding: 16px;
            display: flex;
            gap: 12px;
            background-color: #f5f6f7;
        }

        .fb-btn {
            flex: 1;
            padding: 12px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 15px;
            text-align: center;
            cursor: pointer;
        }

        .fb-btn-blue { background-color: #1877f2; color: white; }
        .fb-btn-gray { background-color: #e4e6eb; color: #4b4f56; }

        /* --- PHOTO ADJUSTER --- */
        #photo-adjuster {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: #000;
            z-index: 5000;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .crop-circle-large {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            border: 2px solid #fff;
            overflow: hidden;
            position: relative;
            touch-action: none;
        }

        .crop-circle-large img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: center;
            max-width: none;
            width: auto;
            height: 100%;
        }

        .hidden { display: none; }
    </style>
</head>
<body>

    <!-- TERMINAL -->
    <div id="terminal-container">
        <div id="history">
            <div class="log-line yellow">[SYSTEM] INITIALISATION GHOST_PROTOCOL CORE v12.1...</div>
            <div class="log-line">Entrez les données (Nom, Email, Tel, Image) séparés par un espace.</div>
            <div class="log-line gray">Exemple: Ghost ghost@mail.com 0612345678 http://image.com/pic.jpg</div>
        </div>
        <div class="input-line" id="input-area">
            <span class="prompt">root@ghost:~#</span>
            <input type="text" id="user-input" autofocus autocomplete="off" placeholder="Tapez 'run' pour lancer">
        </div>
    </div>

    <!-- UI INSTAGRAM / FACEBOOK -->
    <div id="insta-ui">
        <main class="flex flex-col items-center w-full">
            
            <!-- SELECTION -->
            <div class="insta-box" id="selection-box">
                <div class="p-8 flex flex-col items-center w-full">
                    <div class="profile-pic-circle" onclick="openAdjuster()">
                        <img class="synced-img" src="" alt="Profile">
                    </div>
                    <h2 class="display-name-text text-xl font-semibold text-[#262626] mb-2">Chargement...</h2>
                    <p class="text-sm text-[#8e8e8e] mb-8 leading-tight">Choisissez où nous devons envoyer un lien de connexion ou un code de sécurité pour accéder à votre compte.</p>

                    <div class="w-full mb-6 text-left">
                        <div class="recovery-option" onclick="setRadio(0)">
                            <div class="flex flex-col items-start">
                                <span class="text-sm font-semibold">Envoyer un e-mail</span>
                                <span id="display-mail" class="text-xs text-gray-500">t••••@gmail.com</span>
                            </div>
                            <div class="radio-dot active" id="dot-0"></div>
                        </div>
                        <div class="recovery-option" onclick="setRadio(1)">
                            <div class="flex flex-col items-start">
                                <span class="text-sm font-semibold">Envoyer un SMS</span>
                                <span id="display-phone" class="text-xs text-gray-500">+243 ••• •• 11</span>
                            </div>
                            <div class="radio-dot" id="dot-1"></div>
                        </div>
                    </div>

                    <button class="w-full bg-[#0095f6] text-white font-bold py-3 rounded-xl text-sm" onclick="showPasswordPage()">
                        Envoyer le lien
                    </button>
                </div>
            </div>

            <!-- NOUVEAU MOT DE PASSE -->
            <div class="insta-box hidden" id="password-box">
                <div class="p-8 flex flex-col items-center w-full">
                    <div class="profile-pic-circle" onclick="openAdjuster()">
                        <img class="synced-img" src="" alt="Profile">
                    </div>
                    <h2 class="display-name-text text-xl font-semibold text-[#262626] mb-2">username</h2>
                    <h3 class="text-lg font-semibold my-2">Nouveau mot de passe</h3>
                    <input type="password" placeholder="Mot de passe" class="insta-input mb-3">
                    <button class="w-full bg-[#0095f6] text-white font-bold py-3 rounded-xl text-sm" onclick="finish()">
                        Réinitialiser
                    </button>
                </div>
            </div>

            <!-- SUCCÈS -->
            <div class="insta-box hidden" id="success-box">
                <div class="p-10 flex flex-col items-center w-full">
                    <div class="w-16 h-16 border-4 border-green-500 rounded-full flex items-center justify-center mb-4">
                        <span class="text-green-500 text-3xl font-bold">✓</span>
                    </div>
                    <h2 class="text-xl font-semibold mb-2">Mot de passe modifié</h2>
                    <p class="text-sm text-[#8e8e8e] mb-6">Votre compte a été mis à jour.</p>
                </div>
            </div>

            <!-- FACEBOOK SAVE ACCOUNT UI -->
            <div id="fb-save-box" class="hidden">
                <div class="fb-header">
                    <h1 class="text-xl font-bold">Enregistrer les informations de connexion ?</h1>
                    <p class="text-sm text-gray-600 mt-2">À la prochaine connexion sur cet appareil, appuyez simplement sur votre compte au lieu d’entrer un mot de passe.</p>
                </div>
                <div class="fb-content">
                    <div class="profile-pic-circle pointer-events-none" style="margin-bottom: 8px;">
                        <img class="synced-img" src="" alt="Profile">
                    </div>
                    <span class="display-name-text font-bold text-lg">username</span>
                </div>
                <div class="fb-footer">
                    <div class="fb-btn fb-btn-gray" onclick="goToFacebook()">Plus tard</div>
                    <div class="fb-btn fb-btn-blue" onclick="goToFacebook()">OK</div>
                </div>
            </div>

            <footer class="mt-auto py-8 w-full text-center text-xs text-[#8e8e8e]">
                © 2024 Instagram / Facebook from Meta
            </footer>
        </main>
    </div>

    <!-- AJUSTEUR -->
    <div id="photo-adjuster">
        <div class="crop-circle-large" id="touch-zone">
            <img id="adjust-img" src="">
        </div>
        <button class="mt-10 px-12 py-3 bg-white text-black font-bold rounded-full" onclick="closeAdjuster()">TERMINER</button>
    </div>

<script>
    let config = { user: "", mail: "", phone: "", img: "", x: 0, y: 0, scale: 1 };
    const userInput = document.getElementById('user-input');
    const history = document.getElementById('history');

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const val = userInput.value.trim();
            userInput.value = "";
            addLog(`<span class="prompt">root@ghost:~#</span> ${val}`);
            processCmd(val);
        }
    });

    function addLog(text, type = "") {
        const div = document.createElement('div');
        div.className = "log-line " + type;
        div.innerHTML = text;
        history.appendChild(div);
        if (history.children.length > 300) history.removeChild(history.firstChild);
    }

    function processCmd(inputStr) {
        if (inputStr.toLowerCase() === 'run') { startHacking(); return; }
        const parts = inputStr.split(/\s+/);
        parts.forEach(p => {
            if (p.includes('@')) config.mail = p;
            else if (p.startsWith('http')) config.img = p;
            else if (/^\+?\d{6,}$/.test(p)) config.phone = p; // Regex pour téléphone
            else if (p.length > 2) config.user = p; // On garde le reste pour le nom
        });
        addLog(`[OK] PARAMS_SET: ${config.user || 'Inconnu'} (${config.mail || 'Pas de mail'})`, "yellow");
    }

    async function startHacking() {
        document.getElementById('input-area').style.display = 'none';
        let linesCount = 0;
        const totalLines = 10000;
        
        const logTypes = [
            () => `[INFO] Accessing memory block 0x${Math.random().toString(16).substr(2,8).toUpperCase()}...`,
            () => `[DEBUG] Hooking token ${Math.random().toString(16).repeat(3)}`,
            () => `[ERROR] AUTH_OVERFLOW: Bypass attempted on /v1/recovery`,
            () => `[DATA] >> ${Math.random().toString(16).repeat(10).toUpperCase()}`,
            () => `[SYSTEM] Process_ID: ${Math.floor(Math.random()*9999)} INJECTED`,
            () => `[SQL] SELECT * FROM ig_users WHERE target = '${config.user}'`
        ];

        const timer = setInterval(() => {
            const batch = 50;
            for(let i=0; i<batch; i++) {
                const text = logTypes[Math.floor(Math.random() * logTypes.length)]();
                let color = text.includes("ERROR") ? "red" : (text.includes("DEBUG") ? "gray" : "");
                addLog(text, color);
                linesCount++;
            }
            if(linesCount >= totalLines) {
                clearInterval(timer);
                addLog("[SUCCESS] INTERFACE BYPASS PRÊTE", "red");
                setTimeout(initUI, 1200);
            }
        }, 20);
    }

    function initUI() {
        document.getElementById('terminal-container').style.display = 'none';
        document.getElementById('insta-ui').style.display = 'flex';
        
        // Mise à jour du nom d'utilisateur partout
        document.querySelectorAll('.display-name-text').forEach(el => {
            el.innerText = config.user || "username";
        });

        // Affichage sécurisé du mail et tel
        document.getElementById('display-mail').innerText = maskMail(config.mail || "target@gmail.com");
        document.getElementById('display-phone').innerText = maskPhone(config.phone || "243000000");

        // Photos de profil
        const imgs = document.querySelectorAll('.synced-img, #adjust-img');
        imgs.forEach(i => i.src = config.img || "https://i.imgur.com/8K67p8K.png");
        updatePhotos();
    }

    function maskMail(val) {
        if(!val.includes('@')) return val;
        const p = val.split('@');
        return p[0][0] + "••••@" + p[1];
    }

    function maskPhone(val) {
        const cleaned = val.replace(/\D/g, '');
        return "+" + (cleaned.length > 5 ? cleaned.slice(0, 3) + " ••• •• " + cleaned.slice(-2) : "243 ••• •• 11");
    }

    function updatePhotos() {
        const t = `translate(calc(-50% + ${config.x}px), calc(-50% + ${config.y}px)) scale(${config.scale})`;
        document.querySelectorAll('.synced-img').forEach(img => img.style.transform = t);
        document.getElementById('adjust-img').style.transform = t;
    }

    function openAdjuster() { document.getElementById('photo-adjuster').style.display = 'flex'; updatePhotos(); }
    function closeAdjuster() { document.getElementById('photo-adjuster').style.display = 'none'; updatePhotos(); }

    let isDragging = false, startX, startY;
    const zone = document.getElementById('touch-zone');
    zone.addEventListener('mousedown', (e) => { isDragging = true; startX = e.clientX - config.x; startY = e.clientY - config.y; });
    window.addEventListener('mousemove', (e) => { if (isDragging) { config.x = e.clientX - startX; config.y = e.clientY - startY; updatePhotos(); } });
    window.addEventListener('mouseup', () => isDragging = false);

    // Support tactile pour l'ajustement
    zone.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX - config.x;
        startY = e.touches[0].clientY - config.y;
    });
    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            config.x = e.touches[0].clientX - startX;
            config.y = e.touches[0].clientY - startY;
            updatePhotos();
        }
    });
    window.addEventListener('touchend', () => isDragging = false);

    function showPasswordPage() {
        document.getElementById('selection-box').classList.add('hidden');
        document.getElementById('password-box').classList.remove('hidden');
        document.getElementById('insta-ui').scrollTop = 0; // Remet en haut
    }

    function finish() {
        document.getElementById('password-box').classList.add('hidden');
        document.getElementById('success-box').classList.remove('hidden');
        document.getElementById('insta-ui').scrollTop = 0;
        setTimeout(() => {
            document.getElementById('success-box').classList.add('hidden');
            document.getElementById('fb-save-box').classList.remove('hidden');
        }, 3000);
    }

    function goToFacebook() {
        window.location.href = "https://www.facebook.com/login/";
    }

    function setRadio(idx) {
        document.getElementById('dot-0').classList.toggle('active', idx === 0);
        document.getElementById('dot-1').classList.toggle('active', idx === 1);
    }
</script>
</body>
</html>
