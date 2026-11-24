/* ===================================================================
   ALMA & ORIGEN — SISTEMA DE AUTENTICACIÓN Y ROLES
   Firebase Auth + Firestore
   =================================================================== */

// ─── Configuración Firebase ───────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyD-PLACEHOLDER-reemplaza-con-tu-apikey",
  authDomain: "proyectos-5d5fc.firebaseapp.com",
  projectId: "proyectos-5d5fc",
  storageBucket: "proyectos-5d5fc.appspot.com",
  messagingSenderId: "PLACEHOLDER",
  appId: "PLACEHOLDER"
};

// Inicializar Firebase (si no está ya inicializado)
if (!firebase.apps || !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db   = firebase.firestore();

// ─── Estado global del usuario ────────────────────────────────────────────────
window.AlmaAuth = {
  user: null,
  role: null,  // 'admin' | 'cliente'
  profile: null
};

// ─── Observador de sesión ────────────────────────────────────────────────────
auth.onAuthStateChanged(async (user) => {
  if (user) {
    // Cargar perfil desde Firestore
    const snap = await db.collection('usuarios').doc(user.uid).get();
    if (snap.exists) {
      window.AlmaAuth.user    = user;
      window.AlmaAuth.role    = snap.data().rol;
      window.AlmaAuth.profile = snap.data();
    }
    updateNavbar(user, window.AlmaAuth.role);
  } else {
    window.AlmaAuth.user    = null;
    window.AlmaAuth.role    = null;
    window.AlmaAuth.profile = null;
    updateNavbar(null, null);
  }
});

// ─── Actualizar barra de navegación según sesión ─────────────────────────────
function updateNavbar(user, role) {
  const btn = document.getElementById('authNavBtn');
  if (!btn) return;

  if (user) {
    const nombre = window.AlmaAuth.profile?.nombre || user.email;
    btn.innerHTML = `
      <div class="auth-user-pill" id="authUserPill">
        <span class="auth-avatar">${nombre.charAt(0).toUpperCase()}</span>
        <span class="auth-name">${nombre.split(' ')[0]}</span>
        <div class="auth-dropdown" id="authDropdown">
          ${role === 'admin'
            ? `<a href="admin.html" class="auth-drop-item">⚙️ Panel Admin</a>`
            : `<a href="perfil.html" class="auth-drop-item">👤 Mi Perfil</a>
               <a href="mis-pedidos.html" class="auth-drop-item">📦 Mis Pedidos</a>`
          }
          <button class="auth-drop-item auth-drop-logout" onclick="cerrarSesion()">🚪 Cerrar Sesión</button>
        </div>
      </div>`;
    // Toggle dropdown
    setTimeout(() => {
      const pill = document.getElementById('authUserPill');
      if (pill) pill.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('authDropdown')?.classList.toggle('open');
      });
    }, 100);
  } else {
    btn.innerHTML = `<a href="login.html" class="btn-auth-nav">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
      Ingresar</a>`;
  }

  // Cerrar dropdown al hacer clic afuera
  document.addEventListener('click', () => {
    document.getElementById('authDropdown')?.classList.remove('open');
  });
}

// ─── Cerrar sesión ────────────────────────────────────────────────────────────
window.cerrarSesion = async function() {
  await auth.signOut();
  window.location.href = 'index.html';
};

// ─── Registro de nuevo usuario ────────────────────────────────────────────────
window.registrarUsuario = async function(nombre, email, password, rol = 'cliente') {
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  await cred.user.updateProfile({ displayName: nombre });
  await db.collection('usuarios').doc(cred.user.uid).set({
    uid: cred.user.uid,
    nombre,
    email,
    rol,
    fechaRegistro: firebase.firestore.FieldValue.serverTimestamp(),
    activo: true,
    totalCompras: 0,
    pedidos: []
  });
  return cred.user;
};

// ─── Iniciar sesión ───────────────────────────────────────────────────────────
window.iniciarSesion = async function(email, password) {
  const cred = await auth.signInWithEmailAndPassword(email, password);
  const snap = await db.collection('usuarios').doc(cred.user.uid).get();
  return { user: cred.user, rol: snap.data()?.rol || 'cliente' };
};

// ─── Guardar pedido en Firestore ──────────────────────────────────────────────
window.guardarPedido = async function(items, total) {
  if (!window.AlmaAuth.user) {
    window.location.href = 'login.html?redirect=compra';
    return;
  }
  const pedido = {
    uid: window.AlmaAuth.user.uid,
    cliente: window.AlmaAuth.profile?.nombre || '',
    email: window.AlmaAuth.user.email,
    items,
    total,
    estado: 'pendiente',
    fecha: firebase.firestore.FieldValue.serverTimestamp()
  };
  const ref = await db.collection('pedidos').add(pedido);
  // Actualizar contador en perfil de usuario
  await db.collection('usuarios').doc(window.AlmaAuth.user.uid).update({
    totalCompras: firebase.firestore.FieldValue.increment(total),
    ultimoPedido: firebase.firestore.FieldValue.serverTimestamp()
  });
  return ref.id;
};

