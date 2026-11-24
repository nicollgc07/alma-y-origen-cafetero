/* ===================================================================
   ALMA & ORIGEN — CONFIGURACIÓN FIREBASE
   
   ⚠️  IMPORTANTE: Reemplaza estos valores con los de tu proyecto en:
       https://console.firebase.google.com → proyectos-5d5fc → Configuración
   =================================================================== */

const firebaseConfig = {
  apiKey:            "REEMPLAZA_CON_TU_API_KEY",
  authDomain:        "proyectos-5d5fc.firebaseapp.com",
  projectId:         "proyectos-5d5fc",
  storageBucket:     "proyectos-5d5fc.appspot.com",
  messagingSenderId: "REEMPLAZA_CON_TU_SENDER_ID",
  appId:             "REEMPLAZA_CON_TU_APP_ID"
};

// Inicializar Firebase (evitar doble inicialización)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

