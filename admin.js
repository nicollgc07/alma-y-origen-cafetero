/* ===================================================================
   ALMA & ORIGEN — ADMIN PANEL LOGIC
   =================================================================== */

const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();

let allClientes = [];
let allPedidos  = [];

// ── Verificar acceso admin ──────────────────────────────────────────
auth.onAuthStateChanged(async (user) => {
  if (!user) { window.location.href = 'login.html'; return; }
  const snap = await db.collection('usuarios').doc(user.uid).get();
  if (!snap.exists || snap.data().rol !== 'admin') {
    alert('Acceso denegado. Solo administradores.');
    window.location.href = 'index.html'; return;
  }
  const nombre = snap.data().nombre || user.email;
  document.getElementById('adminUserName').textContent    = nombre;
  document.getElementById('adminAvatarLetter').textContent = nombre.charAt(0).toUpperCase();
  cargarDashboard();
  cargarClientes();
  cargarPedidos();
  cargarContenido();
  cargarMedios();
});

// ── Navegación entre paneles ────────────────────────────────────────
window.showPanel = function(id, linkEl) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(a => a.classList.remove('active'));
  document.getElementById('panel-' + id)?.classList.add('active');
  if (linkEl) linkEl.classList.add('active');
  const titles = { dashboard:'Dashboard', clientes:'Clientes', pedidos:'Pedidos', contenido:'Editar Contenido', medios:'Imágenes / Videos' };
  const subs   = { dashboard:'Resumen general del sitio y el negocio', clientes:'Todos los clientes registrados', pedidos:'Control de pedidos y estado', contenido:'Modifica textos del sitio web', medios:'Sube y gestiona imágenes y videos' };
  document.getElementById('adminPageTitle').textContent = titles[id] || id;
  document.getElementById('adminPageSub').textContent   = subs[id]   || '';
};

// ── Cerrar sesión ────────────────────────────────────────────────────
window.cerrarSesionAdmin = async function() {
  await auth.signOut();
  window.location.href = 'login.html';
};

// ═══════════════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════════════
async function cargarDashboard() {
  const [clientesSnap, pedidosSnap] = await Promise.all([
    db.collection('usuarios').where('rol','==','cliente').get(),
    db.collection('pedidos').get()
  ]);
  const totalVentas    = pedidosSnap.docs.reduce((s,d) => s + (d.data().total||0), 0);
  const pendientes     = pedidosSnap.docs.filter(d => d.data().estado === 'pendiente').length;
  document.getElementById('statClientes').textContent  = clientesSnap.size;
  document.getElementById('statPedidos').textContent   = pedidosSnap.size;
  document.getElementById('statVentas').textContent    = '$' + totalVentas.toLocaleString('es-CO');
  document.getElementById('statPendientes').textContent = pendientes;

  // Últimos 5 pedidos
  const ultimos = pedidosSnap.docs.sort((a,b) => (b.data().fecha?.toMillis()||0) - (a.data().fecha?.toMillis()||0)).slice(0,5);
  renderPedidosTable('dashRecentOrders', ultimos, true);
}

// ═══════════════════════════════════════════════════════════════════
//  CLIENTES
// ═══════════════════════════════════════════════════════════════════
async function cargarClientes() {
  const snap = await db.collection('usuarios').where('rol','==','cliente').orderBy('fechaRegistro','desc').get();
  allClientes = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderClientes(allClientes);
}

function renderClientes(lista) {
  const wrap = document.getElementById('clientesTable');
  if (!lista.length) { wrap.innerHTML = '<div class="admin-empty">No hay clientes registrados aún.</div>'; return; }
  wrap.innerHTML = `
    <table class="admin-table">
      <thead><tr>
        <th>Nombre</th><th>Email</th><th>Teléfono</th><th>Ciudad</th>
        <th>Registro</th><th>Compras</th><th>Acciones</th>
      </tr></thead>
      <tbody>
        ${lista.map(c => `
          <tr>
            <td><span class="admin-avatar-sm">${(c.nombre||'?').charAt(0)}</span> ${c.nombre||'-'}</td>
            <td>${c.email||'-'}</td>
            <td>${c.telefono||'-'}</td>
            <td>${c.ciudad||'-'}</td>
            <td>${c.fechaRegistro ? new Date(c.fechaRegistro.toMillis()).toLocaleDateString('es-CO') : '-'}</td>
            <td><strong>$${(c.totalCompras||0).toLocaleString('es-CO')}</strong></td>
            <td>
              <button class="admin-btn-sm" onclick="verPedidosCliente('${c.id}','${c.nombre||''}')">Ver pedidos</button>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

window.filtrarClientes = function() {
  const q = document.getElementById('clienteSearch').value.toLowerCase();
  renderClientes(allClientes.filter(c =>
    (c.nombre||'').toLowerCase().includes(q) ||
    (c.email||'').toLowerCase().includes(q) ||
    (c.ciudad||'').toLowerCase().includes(q)
  ));
};

window.verPedidosCliente = async function(uid, nombre) {
  const snap = await db.collection('pedidos').where('uid','==',uid).orderBy('fecha','desc').get();
  const pedidos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  const html = `
    <h2 style="color:#C5A059; font-family:'Cinzel',serif; margin-bottom:16px;">Pedidos de ${nombre}</h2>
    ${!pedidos.length ? '<p style="color:#7a6a5a;">Sin pedidos aún.</p>' :
      pedidos.map(p => `
        <div class="admin-pedido-detail">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:#F5ECD7;">${p.id.slice(0,8).toUpperCase()}</strong>
            <span class="admin-estado-badge estado-${p.estado||'pendiente'}">${p.estado||'pendiente'}</span>
          </div>
          <div style="color:#BBA98A; font-size:0.85rem; margin:6px 0;">
            ${p.fecha ? new Date(p.fecha.toMillis()).toLocaleString('es-CO') : 'Sin fecha'} |
            Total: <strong style="color:#C5A059;">$${(p.total||0).toLocaleString('es-CO')}</strong>
          </div>
          <ul style="color:#9a8a7a; font-size:0.82rem; padding-left:16px;">
            ${(p.items||[]).map(i => `<li>${i.name} x${i.qty} — $${(i.price*i.qty).toLocaleString('es-CO')}</li>`).join('')}
          </ul>
        </div>`).join('')}`;
  mostrarModal(html);
};

// ═══════════════════════════════════════════════════════════════════
//  PEDIDOS
// ═══════════════════════════════════════════════════════════════════
async function cargarPedidos() {
  const estado = document.getElementById('pedidoFiltroEstado')?.value || '';
  let query = db.collection('pedidos').orderBy('fecha','desc');
  if (estado) query = db.collection('pedidos').where('estado','==',estado).orderBy('fecha','desc');
  const snap = await query.get();
  allPedidos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderPedidosTable('pedidosTable', snap.docs, false);
}
window.cargarPedidos = cargarPedidos;

function renderPedidosTable(containerId, docs, compact) {
  const wrap = document.getElementById(containerId);
  if (!docs.length) { wrap.innerHTML = '<div class="admin-empty">No hay pedidos.</div>'; return; }
  wrap.innerHTML = `
    <table class="admin-table">
      <thead><tr>
        <th>ID</th><th>Cliente</th><th>Fecha</th>
        <th>Total</th><th>Estado</th><th>Acciones</th>
      </tr></thead>
      <tbody>
        ${docs.map(d => { const p = { id: d.id, ...d.data() }; return `
          <tr>
            <td><code style="color:#C5A059; font-size:0.78rem;">${p.id.slice(0,8).toUpperCase()}</code></td>
            <td>${p.cliente||p.email||'-'}</td>
            <td>${p.fecha ? new Date(p.fecha.toMillis()).toLocaleDateString('es-CO') : '-'}</td>
            <td><strong>$${(p.total||0).toLocaleString('es-CO')}</strong></td>
            <td><span class="admin-estado-badge estado-${p.estado||'pendiente'}">${p.estado||'pendiente'}</span></td>
            <td style="display:flex; gap:6px;">
              <button class="admin-btn-sm" onclick="verDetallePedido('${p.id}')">Ver</button>
              ${!compact ? `<select class="admin-estado-sel" onchange="cambiarEstado('${p.id}', this.value)">
                <option value="">Cambiar...</option>
                <option value="confirmado">Confirmado</option>
                <option value="enviado">Enviado</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>` : ''}
            </td>
          </tr>`;}).join('')}
      </tbody>
    </table>`;
}

window.cambiarEstado = async function(pedidoId, nuevoEstado) {
  if (!nuevoEstado) return;
  await db.collection('pedidos').doc(pedidoId).update({ estado: nuevoEstado });
  cargarPedidos();
  cargarDashboard();
};

window.verDetallePedido = async function(pedidoId) {
  const snap = await db.collection('pedidos').doc(pedidoId).get();
  const p = { id: snap.id, ...snap.data() };
  const html = `
    <h2 style="color:#C5A059; font-family:'Cinzel',serif; margin-bottom:16px;">Pedido #${p.id.slice(0,8).toUpperCase()}</h2>
    <div class="admin-detail-grid">
      <div><span>Cliente:</span><strong>${p.cliente||'-'}</strong></div>
      <div><span>Email:</span><strong>${p.email||'-'}</strong></div>
      <div><span>Fecha:</span><strong>${p.fecha ? new Date(p.fecha.toMillis()).toLocaleString('es-CO') : '-'}</strong></div>
      <div><span>Estado:</span><span class="admin-estado-badge estado-${p.estado||'pendiente'}">${p.estado||'pendiente'}</span></div>
    </div>
    <h4 style="color:#F5ECD7; margin:16px 0 8px;">Productos</h4>
    <ul style="color:#BBA98A; padding-left:16px; font-size:0.9rem;">
      ${(p.items||[]).map(i => `<li>${i.name} × ${i.qty} = <strong style="color:#C5A059;">$${(i.price*i.qty).toLocaleString('es-CO')}</strong></li>`).join('')}
    </ul>
    <div style="border-top:1px solid rgba(197,160,89,0.2); margin-top:16px; padding-top:12px; text-align:right;">
      <strong style="color:#C5A059; font-size:1.1rem;">Total: $${(p.total||0).toLocaleString('es-CO')} COP</strong>
    </div>`;
  mostrarModal(html);
};

// ═══════════════════════════════════════════════════════════════════
//  EDITAR CONTENIDO
// ═══════════════════════════════════════════════════════════════════
async function cargarContenido() {
  try {
    const snap = await db.collection('siteContent').doc('textos').get();
    if (snap.exists) {
      const d = snap.data();
      document.getElementById('heroTitle').value    = d.heroTitle    || '';
      document.getElementById('heroDesc').value     = d.heroDesc     || '';
      document.getElementById('origenTitle').value  = d.origenTitle  || '';
      document.getElementById('origenDesc').value   = d.origenDesc   || '';
      actualizarPreview();
    }
  } catch(e) {}
}

['heroTitle','heroDesc','origenTitle','origenDesc'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', actualizarPreview);
});

function actualizarPreview() {
  document.getElementById('prevHeroTitle').textContent  = document.getElementById('heroTitle')?.value   || '';
  document.getElementById('prevHeroDesc').textContent   = document.getElementById('heroDesc')?.value    || '';
  document.getElementById('prevOrigenTitle').textContent = document.getElementById('origenTitle')?.value || '';
  document.getElementById('prevOrigenDesc').textContent  = document.getElementById('origenDesc')?.value  || '';
}

window.guardarContenido = async function() {
  const status = document.getElementById('contenidoStatus');
  status.textContent = 'Guardando...';
  status.style.color = '#C5A059';
  try {
    await db.collection('siteContent').doc('textos').set({
      heroTitle:   document.getElementById('heroTitle').value,
      heroDesc:    document.getElementById('heroDesc').value,
      origenTitle: document.getElementById('origenTitle').value,
      origenDesc:  document.getElementById('origenDesc').value,
      updatedAt:   firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    status.textContent = '✅ Guardado con éxito';
    status.style.color = '#2ecc71';
    setTimeout(() => status.textContent = '', 3000);
  } catch(e) {
    status.textContent = '❌ Error al guardar';
    status.style.color = '#e74c3c';
  }
};

// ═══════════════════════════════════════════════════════════════════
//  MEDIOS — IMÁGENES Y VIDEOS
// ═══════════════════════════════════════════════════════════════════
window.previewImg = function(input) {
  if (!input.files[0]) return;
  const url = URL.createObjectURL(input.files[0]);
  document.getElementById('imgPreview').style.display   = 'block';
  document.getElementById('imgPreviewSrc').src = url;
};

window.previewVid = function(input) {
  if (!input.files[0]) return;
  const url = URL.createObjectURL(input.files[0]);
  document.getElementById('vidPreview').style.display   = 'block';
  document.getElementById('vidPreviewSrc').src = url;
};

window.subirImagen = async function() {
  const file    = document.getElementById('imgFile').files[0];
  const seccion = document.getElementById('imgSeccion').value;
  const status  = document.getElementById('imgStatus');
  if (!file) { status.textContent = '⚠️ Selecciona una imagen.'; status.style.color = '#e67e22'; return; }

  status.textContent = '⬆️ Subiendo...';
  status.style.color = '#C5A059';
  try {
    const ref = storage.ref(`medios/imagenes/${seccion}/${Date.now()}_${file.name}`);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    // Registrar en Firestore
    await db.collection('medios').add({ tipo:'imagen', seccion, url, nombre:file.name, fecha: firebase.firestore.FieldValue.serverTimestamp() });
    status.textContent = '✅ Imagen subida con éxito';
    status.style.color = '#2ecc71';
    cargarMedios();
    setTimeout(() => status.textContent = '', 4000);
  } catch(e) {
    status.textContent = '❌ Error: ' + e.message;
    status.style.color = '#e74c3c';
  }
};

window.subirVideo = async function() {
  const file   = document.getElementById('vidFile').files[0];
  const titulo = document.getElementById('vidTitulo').value;
  const desc   = document.getElementById('vidDesc').value;
  const status = document.getElementById('vidStatus');
  if (!file) { status.textContent = '⚠️ Selecciona un video.'; status.style.color = '#e67e22'; return; }

  status.textContent = '⬆️ Subiendo (puede tardar)...';
  status.style.color = '#C5A059';
  try {
    const ref = storage.ref(`medios/videos/${Date.now()}_${file.name}`);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    await db.collection('medios').add({ tipo:'video', url, titulo, descripcion: desc, nombre: file.name, fecha: firebase.firestore.FieldValue.serverTimestamp() });
    status.textContent = '✅ Video subido con éxito';
    status.style.color = '#2ecc71';
    cargarMedios();
    setTimeout(() => status.textContent = '', 4000);
  } catch(e) {
    status.textContent = '❌ Error: ' + e.message;
    status.style.color = '#e74c3c';
  }
};

async function cargarMedios() {
  const snap = await db.collection('medios').orderBy('fecha','desc').limit(20).get();
  const wrap = document.getElementById('mediosGaleria');
  if (!snap.size) { wrap.innerHTML = '<div class="admin-empty">No hay medios subidos aún.</div>'; return; }
  wrap.innerHTML = snap.docs.map(d => {
    const m = d.data();
    return m.tipo === 'imagen'
      ? `<div class="admin-media-item">
           <img src="${m.url}" alt="${m.nombre}" loading="lazy">
           <div class="admin-media-label">${m.seccion} • ${m.nombre?.substring(0,20)}</div>
         </div>`
      : `<div class="admin-media-item">
           <video src="${m.url}" muted style="width:100%;border-radius:6px;"></video>
           <div class="admin-media-label">🎬 ${(m.titulo||m.nombre||'').substring(0,24)}</div>
         </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════════════════
//  MODAL
// ═══════════════════════════════════════════════════════════════════
function mostrarModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').style.display = 'flex';
}
window.cerrarModal = function() {
  document.getElementById('modalOverlay').style.display = 'none';
};

