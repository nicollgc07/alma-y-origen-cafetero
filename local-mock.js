/* ===================================================================
   ALMA & ORIGEN — MODO LOCAL (Sin Firebase)
   Sistema de autenticación simulado con localStorage
   
   USUARIOS DE PRUEBA:
   👑 Admin:   admin@almayorigen.com  /  admin123
   👤 Cliente: cliente@prueba.com    /  cliente123
   =================================================================== */

// ── Base de datos local en memoria + localStorage ─────────────────────
const LocalDB = {

  // Inicializar con usuarios de prueba
  init() {
    if (!localStorage.getItem('ao_usuarios')) {
      const usuarios = {
        'uid-admin-001': {
          uid: 'uid-admin-001',
          nombre: 'Administrador Alma',
          email: 'admin@almayorigen.com',
          password: 'admin123',
          rol: 'admin',
          activo: true,
          fechaRegistro: new Date().toISOString(),
          totalCompras: 0
        },
        'uid-cliente-001': {
          uid: 'uid-cliente-001',
          nombre: 'Juan Camilo Pérez',
          email: 'cliente@prueba.com',
          password: 'cliente123',
          rol: 'cliente',
          telefono: '3105551234',
          ciudad: 'Cali',
          activo: true,
          fechaRegistro: new Date().toISOString(),
          totalCompras: 95000
        }
      };
      localStorage.setItem('ao_usuarios', JSON.stringify(usuarios));
    }

    if (!localStorage.getItem('ao_pedidos')) {
      const pedidos = {
        'pedido-001': {
          id: 'pedido-001',
          uid: 'uid-cliente-001',
          cliente: 'Juan Camilo Pérez',
          email: 'cliente@prueba.com',
          items: [
            { name: 'Filtro Drip 10g', qty: 5, price: 3800 },
            { name: 'Café por Kilo 1kg', qty: 1, price: 48000 }
          ],
          total: 67000,
          estado: 'entregado',
          fecha: new Date(Date.now() - 86400000 * 3).toISOString()
        },
        'pedido-002': {
          id: 'pedido-002',
          uid: 'uid-cliente-001',
          cliente: 'Juan Camilo Pérez',
          email: 'cliente@prueba.com',
          items: [
            { name: 'Libra Natural 454g', qty: 2, price: 28000 }
          ],
          total: 56000,
          estado: 'pendiente',
          fecha: new Date(Date.now() - 86400000).toISOString()
        }
      };
      localStorage.setItem('ao_pedidos', JSON.stringify(pedidos));
    }

    if (!localStorage.getItem('ao_medios')) {
      localStorage.setItem('ao_medios', JSON.stringify({}));
    }

    if (!localStorage.getItem('ao_contenido')) {
      localStorage.setItem('ao_contenido', JSON.stringify({
        heroTitle:   'El Alma del Norte del Cauca en Cada Taza',
        heroDesc:    'Formulación y comercialización de café de origen de altura con identidad territorial.',
        origenTitle: 'Cafe con Raices, Dignidad y Trazabilidad',
        origenDesc:  'El Norte del Cauca es reconocido internacionalmente por sus cafes de notas dulces, acidez citrica brillante y cuerpo equilibrado.'
      }));
    }
  },

  getUsuarios()  { return JSON.parse(localStorage.getItem('ao_usuarios')  || '{}'); },
  getPedidos()   { return JSON.parse(localStorage.getItem('ao_pedidos')   || '{}'); },
  getMedios()    { return JSON.parse(localStorage.getItem('ao_medios')    || '{}'); },
  getContenido() { return JSON.parse(localStorage.getItem('ao_contenido') || '{}'); },

  saveUsuarios(data)  { localStorage.setItem('ao_usuarios',  JSON.stringify(data)); },
  savePedidos(data)   { localStorage.setItem('ao_pedidos',   JSON.stringify(data)); },
  saveMedios(data)    { localStorage.setItem('ao_medios',    JSON.stringify(data)); },
  saveContenido(data) { localStorage.setItem('ao_contenido', JSON.stringify(data)); },

  findUserByEmail(email) {
    const users = this.getUsuarios();
    return Object.values(users).find(u => u.email === email) || null;
  },

  getCurrentUser() {
    const uid = sessionStorage.getItem('ao_current_uid');
    if (!uid) return null;
    const users = this.getUsuarios();
    return users[uid] || null;
  },

  setCurrentUser(uid) {
    if (uid) sessionStorage.setItem('ao_current_uid', uid);
    else      sessionStorage.removeItem('ao_current_uid');
  }
};

// Inicializar al cargar
LocalDB.init();

// ── Mock Firebase global (misma API que Firebase real) ───────────────
window.firebase = {
  apps: ['local'],

  auth: () => ({
    currentUser: LocalDB.getCurrentUser(),

    onAuthStateChanged(callback) {
      const user = LocalDB.getCurrentUser();
      setTimeout(() => callback(user ? { uid: user.uid, email: user.email } : null), 50);
    },

    async signInWithEmailAndPassword(email, password) {
      const user = LocalDB.findUserByEmail(email);
      if (!user)              throw { code: 'auth/user-not-found' };
      if (user.password !== password) throw { code: 'auth/wrong-password' };
      LocalDB.setCurrentUser(user.uid);
      return { user: { uid: user.uid, email: user.email, updateProfile: async()=>{} } };
    },

    async createUserWithEmailAndPassword(email, password) {
      if (LocalDB.findUserByEmail(email)) throw { code: 'auth/email-already-in-use' };
      if (password.length < 6) throw { code: 'auth/weak-password' };
      const uid = 'uid-' + Date.now();
      LocalDB.setCurrentUser(uid);
      return { user: { uid, email, updateProfile: async()=>{} } };
    },

    async signOut() {
      LocalDB.setCurrentUser(null);
    }
  }),

  firestore: () => {
    const firestoreAPI = {
      collection(colName) {
        return {
          _col: colName,

          doc(docId) {
            return {
              async get() {
                let data = null;
                if (colName === 'usuarios') {
                  data = LocalDB.getUsuarios()[docId] || null;
                } else if (colName === 'pedidos') {
                  data = LocalDB.getPedidos()[docId] || null;
                } else if (colName === 'siteContent') {
                  data = LocalDB.getContenido();
                } else if (colName === 'medios') {
                  data = LocalDB.getMedios()[docId] || null;
                }
                return { exists: !!data, data: () => data, id: docId };
              },
              async set(newData, opts) {
                if (colName === 'usuarios') {
                  const u = LocalDB.getUsuarios();
                  u[docId] = opts?.merge ? { ...(u[docId]||{}), ...newData } : newData;
                  LocalDB.saveUsuarios(u);
                } else if (colName === 'siteContent') {
                  const c = LocalDB.getContenido();
                  LocalDB.saveContenido({ ...c, ...newData });
                }
              },
              async update(partial) {
                if (colName === 'usuarios') {
                  const u = LocalDB.getUsuarios();
                  if (u[docId]) {
                    Object.keys(partial).forEach(k => {
                      if (partial[k]?.isIncrement) u[docId][k] = (u[docId][k]||0) + partial[k].val;
                      else u[docId][k] = partial[k];
                    });
                    LocalDB.saveUsuarios(u);
                  }
                } else if (colName === 'pedidos') {
                  const p = LocalDB.getPedidos();
                  if (p[docId]) { p[docId] = { ...p[docId], ...partial }; LocalDB.savePedidos(p); }
                }
              }
            };
          },

          async add(newData) {
            const id = colName.slice(0,3) + '-' + Date.now();
            newData.id = id;
            newData.fecha = new Date().toISOString();
            if (colName === 'pedidos') {
              const p = LocalDB.getPedidos(); p[id] = newData; LocalDB.savePedidos(p);
            } else if (colName === 'medios') {
              const m = LocalDB.getMedios(); m[id] = newData; LocalDB.saveMedios(m);
            }
            return { id };
          },

          where(field, op, val) {
            return {
              where(f2, o2, v2) { return this; },
              orderBy(f, dir) { return this; },
              limit(n) { return this; },
              async get() {
                let items = [];
                const data = colName === 'usuarios' ? LocalDB.getUsuarios()
                           : colName === 'pedidos'   ? LocalDB.getPedidos()
                           : LocalDB.getMedios();
                items = Object.values(data).filter(item => {
                  if (op === '==') return item[field] === val;
                  return true;
                });
                return {
                  size: items.length,
                  docs: items.map(item => ({
                    id: item.uid || item.id || item.uid,
                    data: () => item,
                    exists: true
                  }))
                };
              }
            };
          },

          orderBy(field, dir) { return this.where(null,null,null); },
          limit(n) { return this; },

          async get() {
            const data = colName === 'usuarios' ? LocalDB.getUsuarios()
                       : colName === 'pedidos'   ? LocalDB.getPedidos()
                       : LocalDB.getMedios();
            const items = Object.values(data);
            return {
              size: items.length,
              docs: items.map(item => ({
                id: item.uid || item.id,
                data: () => item,
                exists: true
              }))
            };
          }
        };
      }
    };
    return firestoreAPI;
  },

  storage: () => ({
    ref(path) {
      return {
        async put(file) {
          return { ref: { getDownloadURL: async () => URL.createObjectURL(file) } };
        },
        async getDownloadURL() {
          return '#local-file';
        }
      };
    }
  }),

  firestore: (() => {
    const fn = () => window.firebase._firestoreInstance || (window.firebase._firestoreInstance = window.firebase._buildFirestore());
    fn.FieldValue = {
      serverTimestamp: () => ({ _type: 'timestamp', value: new Date().toISOString() }),
      increment: (val) => ({ isIncrement: true, val })
    };
    return fn;
  })()
};

// Construir instancia Firestore
window.firebase._buildFirestore = function() {
  return {
    collection(colName) {
      return window.firebase.firestore().collection ? window.firebase.firestore().collection(colName) : null;
    }
  };
};

// Re-exponer firestore correctamente
window.firebase._firestoreInst = null;
const _origFirestoreFn = function() {
  const data = {
    collection(colName) {
      return {
        doc(docId) {
          return {
            async get() {
              let d = null;
              if (colName === 'usuarios')    d = LocalDB.getUsuarios()[docId]  || null;
              if (colName === 'pedidos')     d = LocalDB.getPedidos()[docId]   || null;
              if (colName === 'siteContent') d = LocalDB.getContenido();
              if (colName === 'medios')      d = LocalDB.getMedios()[docId]    || null;
              return { exists: !!d, data: () => d, id: docId };
            },
            async set(nd, opts) {
              if (colName === 'usuarios') {
                const u = LocalDB.getUsuarios();
                u[docId] = opts?.merge ? { ...(u[docId]||{}), ...nd } : nd;
                LocalDB.saveUsuarios(u);
              }
              if (colName === 'siteContent') {
                LocalDB.saveContenido({ ...LocalDB.getContenido(), ...nd });
              }
            },
            async update(partial) {
              if (colName === 'usuarios') {
                const u = LocalDB.getUsuarios();
                if (u[docId]) {
                  Object.keys(partial).forEach(k => {
                    if (partial[k]?.isIncrement) u[docId][k] = (u[docId][k]||0) + partial[k].val;
                    else u[docId][k] = partial[k];
                  });
                  LocalDB.saveUsuarios(u);
                }
              }
              if (colName === 'pedidos') {
                const p = LocalDB.getPedidos();
                if (p[docId]) { p[docId] = {...p[docId],...partial}; LocalDB.savePedidos(p); }
              }
            }
          };
        },
        async add(nd) {
          const id = colName.slice(0,3) + '-' + Date.now();
          nd.id = id; nd.fecha = new Date().toISOString();
          if (colName === 'pedidos') { const p=LocalDB.getPedidos(); p[id]=nd; LocalDB.savePedidos(p); }
          if (colName === 'medios')  { const m=LocalDB.getMedios();  m[id]=nd; LocalDB.saveMedios(m);  }
          return { id };
        },
        where(field, op, val) {
          const self = this;
          const filters = [[field,op,val]];
          const q = {
            where(f2,o2,v2) { filters.push([f2,o2,v2]); return q; },
            orderBy() { return q; },
            limit() { return q; },
            async get() {
              const rawData = colName==='usuarios' ? LocalDB.getUsuarios()
                            : colName==='pedidos'  ? LocalDB.getPedidos()
                            : LocalDB.getMedios();
              let items = Object.values(rawData);
              filters.forEach(([f,o,v]) => {
                if (f && o==='==') items = items.filter(i => i[f]===v);
              });
              return {
                size: items.length,
                docs: items.map(i => ({ id: i.uid||i.id, data:()=>i, exists:true }))
              };
            }
          };
          return q;
        },
        orderBy() { return this.where(null,null,null); },
        limit(n) { return this; },
        async get() {
          const rawData = colName==='usuarios' ? LocalDB.getUsuarios()
                        : colName==='pedidos'  ? LocalDB.getPedidos()
                        : LocalDB.getMedios();
          const items = Object.values(rawData);
          return {
            size: items.length,
            docs: items.map(i => ({ id: i.uid||i.id, data:()=>i, exists:true }))
          };
        }
      };
    }
  };
};
_origFirestoreFn.FieldValue = {
  serverTimestamp: () => new Date().toISOString(),
  increment: (v) => ({ isIncrement:true, val:v })
};
window.firebase.firestore = _origFirestoreFn;

window.firebase.storage = () => ({
  ref(path) {
    return {
      async put(file) { return {}; },
      async getDownloadURL() { return URL.createObjectURL ? URL.createObjectURL(new Blob()) : '#'; }
    };
  }
});

console.log('%c🔑 MODO LOCAL ACTIVO', 'background:#C5A059;color:#18110D;padding:4px 10px;border-radius:4px;font-weight:bold;');
console.log('%c👑 Admin:   admin@almayorigen.com  /  admin123', 'color:#C5A059');
console.log('%c👤 Cliente: cliente@prueba.com    /  cliente123', 'color:#BBA98A');

