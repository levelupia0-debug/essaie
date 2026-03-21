importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js');

// La même configuration que ton application principale
const firebaseConfig = {
    apiKey: "AIzaSyA3JgvNu5p-43037jvm4WRDaJHI9ES7uGM",
    authDomain: "levelup-ia.firebaseapp.com",
    projectId: "levelup-ia",
    storageBucket: "levelup-ia.firebasestorage.app",
    messagingSenderId: "229420004282",
    appId: "1:229420004282:web:6735f059a947f0936ae383",
    measurementId: "G-MSRDY2574K"
};

// Initialisation de Firebase en arrière-plan
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Gère les notifications reçues quand l'application est fermée
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Message reçu en arrière-plan ', payload);
    
    const notificationTitle = payload.notification.title || 'Level IA';
    const notificationOptions = {
        body: payload.notification.body,
        icon: './icon.png' // L'image locale PNG que tu as uploadée sur ton GitHub
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// =========================================================================
// LIGNE MAGIQUE OBLIGATOIRE POUR QUE CHROME VALIDE L'INSTALLATION DE LA PWA
// =========================================================================
self.addEventListener('fetch', function(event) {
    // Un simple écouteur vide suffit pour débloquer l'installation PWA !
});
