// ==========================================
// ADMIN DASHBOARD LOGIC (SECURE & ISOLATED)
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCVVMxamKD54P1tiUUHduqQPNVvaWM9kjM",
    authDomain: "my-web-app-b0ef5.firebaseapp.com",
    projectId: "my-web-app-b0ef5",
    storageBucket: "my-web-app-b0ef5.firebasestorage.app",
    messagingSenderId: "684795706290",
    appId: "1:684795706290:web:871525961c084436adc2ab"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Global Variables
let allPackages = [];
let allBookings = [];

// 1. Auth Guard (حماية الصفحة)
onAuthStateChanged(auth, (user) => {
    if (!user || user.email !== 'admin@konyaaltitours.com') {
        // لو مش مسجل أو مش أدمن، اطرده لصفحة الدخول
        window.location.href = 'login.html';
    } else {
        // لو أدمن، حمل البيانات
        loadPackages();
        loadBookings();
    }
});

// 2. Load Packages
async function loadPackages() {
    try {
        const snapshot = await getDocs(collection(db, "packages"));
        allPackages = [];
        snapshot.forEach(doc => { allPackages.push({ id: doc.id, ...doc.data() }); });
        renderAdminPackages();
        updateDashboardStats();
    } catch (error) { showToast(error.message, 'error'); }
}

function renderAdminPackages(filterText = "") {
    const list = document.getElementById('admin-pkg-list');
    list.innerHTML = "";
    
    // البحث (Search Logic)
    let searchVal = filterText.toLowerCase();
    if(!searchVal) searchVal = document.getElementById('search-pkg-admin')?.value.toLowerCase() || "";

    const filtered = allPackages.filter(p => p.name.toLowerCase().includes(searchVal));

    filtered.forEach(pkg => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${pkg.image}" class="admin-img-thumb"></td>
            <td>${pkg.name}</td>
            <td>$${pkg.price}</td>
            <td>
                <button class="edit-btn" onclick="openEditModal('${pkg.id}')"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deletePackage('${pkg.id}')"><i class="fas fa-trash"></i></button>
            </td>`;
        list.appendChild(row);
    });
}

// 3. Load Bookings
async function loadBookings() {
    try {
        const snapshot = await getDocs(collection(db, "bookings"));
        allBookings = [];
        snapshot.forEach(doc => { allBookings.push({ id: doc.id, ...doc.data() }); });
        allBookings.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        renderAdminBookings();
        updateDashboardStats();
    } catch (error) { showToast(error.message, 'error'); }
}

function renderAdminBookings() {
    const list = document.getElementById('admin-booking-list');
    list.innerHTML = "";
    
    // Filter & Search Logic
    const searchVal = document.getElementById('search-booking-admin')?.value.toLowerCase() || "";
    const statusFilter = document.getElementById('filter-status')?.value || "all";

    let filtered = allBookings.filter(b => {
        const matchesStatus = statusFilter === "all" || b.status === statusFilter;
        const matchesSearch = (b.name && b.name.toLowerCase().includes(searchVal)) ||
                              (b.trip && b.trip.toLowerCase().includes(searchVal));
        return matchesStatus && matchesSearch;
    });

    filtered.forEach(b => {
        const cleanPhone = b.phone ? b.phone.replace(/[^0-9]/g, '') : '';
        let statusClass = b.status === "Confirmed" ? "status-confirmed" : (b.status === "Cancelled" ? "status-cancelled" : "status-pending");
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${b.name}</td><td>${b.trip}</td><td>${b.date}</td><td><strong>${b.total}</strong></td>
            <td><span class="status-badge ${statusClass}">${b.status}</span></td>
            <td>
                <div class="action-btn-group">
                    <a href="https://wa.me/${cleanPhone}" target="_blank" class="edit-btn"><i class="fab fa-whatsapp"></i></a>
                    <button class="confirm-btn" onclick="updateBookingStatus('${b.id}', 'Confirmed')"><i class="fas fa-check"></i></button>
                    <button class="delete-btn" onclick="updateBookingStatus('${b.id}', 'Cancelled')"><i class="fas fa-times"></i></button>
                    <button class="delete-btn" style="background:#333; color:white;" onclick="deleteBooking('${b.id}')"><i class="fas fa-trash"></i></button>
                </div>
            </td>`;
        list.appendChild(row);
    });
}

// 4. Shared Functions (Helpers)
window.searchAdminPackages = () => renderAdminPackages();
window.searchAdminBookings = () => renderAdminBookings();
window.filterBookingsStatus = () => renderAdminBookings();

window.logout = async () => {
    if(confirm("Logout?")) {
        await signOut(auth);
        window.location.href = 'index.html';
    }
};

window.switchAdminTab = (tab) => {
    document.querySelectorAll('.admin-tab-content').forEach(el => el.style.display = 'none');
    document.getElementById(`tab-${tab}`).style.display = 'block';
    document.querySelectorAll('.admin-nav li').forEach(li => li.classList.remove('active'));
    // Simple logic
    const idx = tab === 'dashboard' ? 0 : (tab === 'packages' ? 1 : 2);
    document.querySelectorAll('.admin-nav li')[idx].classList.add('active');
};

function updateDashboardStats() {
    document.getElementById('stat-pkg-count').innerText = allPackages.length;
    document.getElementById('stat-confirmed-count').innerText = allBookings.filter(b => b.status === "Confirmed").length;
    document.getElementById('stat-pending-count').innerText = allBookings.filter(b => b.status === "Pending").length;
}

// 5. Action Functions (Add, Edit, Delete)
window.deletePackage = async (id) => {
    if(confirm("Delete permanently?")) {
        toggleLoading(true);
        try { await deleteDoc(doc(db, "packages", id)); loadPackages(); showToast("Deleted", "success"); } 
        catch(e) { showToast(e.message, 'error'); } finally { toggleLoading(false); }
    }
};

window.updateBookingStatus = async (id, newStatus) => {
    toggleLoading(true);
    try { await updateDoc(doc(db, "bookings", id), { status: newStatus }); loadBookings(); } 
    finally { toggleLoading(false); }
};

window.deleteBooking = async (id) => {
    if(confirm("Delete booking?")) {
        toggleLoading(true);
        try { await deleteDoc(doc(db, "bookings", id)); loadBookings(); } 
        finally { toggleLoading(false); }
    }
};

// Add Package Form
document.getElementById('add-package-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    toggleLoading(true);
    try {
        const file = document.getElementById('pkg-image-file').files[0];
        let imageUrl = "https://via.placeholder.com/400"; 
        if (file) imageUrl = await compressImage(file); // Compress Function Below
        
        await addDoc(collection(db, "packages"), {
            name: document.getElementById('pkg-name').value,
            price: Number(document.getElementById('pkg-price').value),
            duration: document.getElementById('pkg-duration').value,
            desc: document.getElementById('pkg-desc').value,
            dates: document.getElementById('pkg-dates').value.split(','),
            plan: document.getElementById('pkg-plan').value.split('\n'),
            image: imageUrl, createdAt: new Date().toISOString()
        });
        showToast("Added!", 'success');
        window.closeModal('add-package-modal'); loadPackages();
    } catch (e) { showToast(e.message, 'error'); } finally { toggleLoading(false); }
});

// Edit Logic
window.openEditModal = (id) => {
    const pkg = allPackages.find(p => p.id === id);
    if (!pkg) return;
    document.getElementById('edit-pkg-id').value = pkg.id;
    document.getElementById('edit-pkg-old-image').value = pkg.image;
    document.getElementById('edit-pkg-name').value = pkg.name;
    document.getElementById('edit-pkg-price').value = pkg.price;
    document.getElementById('edit-pkg-duration').value = pkg.duration;
    document.getElementById('edit-pkg-desc').value = pkg.desc;
    document.getElementById('edit-pkg-dates').value = pkg.dates ? pkg.dates.join(', ') : '';
    document.getElementById('edit-pkg-plan').value = pkg.plan ? pkg.plan.join('\n') : '';
    window.openModal('edit-package-modal');
};

document.getElementById('edit-package-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    toggleLoading(true);
    try {
        const id = document.getElementById('edit-pkg-id').value;
        const file = document.getElementById('edit-pkg-file').files[0];
        let imageUrl = document.getElementById('edit-pkg-old-image').value;
        if(file) imageUrl = await compressImage(file);

        await updateDoc(doc(db, "packages", id), {
            name: document.getElementById('edit-pkg-name').value,
            price: Number(document.getElementById('edit-pkg-price').value),
            duration: document.getElementById('edit-pkg-duration').value,
            desc: document.getElementById('edit-pkg-desc').value,
            dates: document.getElementById('edit-pkg-dates').value.split(','),
            plan: document.getElementById('edit-pkg-plan').value.split('\n'),
            image: imageUrl
        });
        showToast("Updated!", 'success');
        window.closeModal('edit-package-modal'); loadPackages();
    } catch(e) { showToast(e.message, 'error'); } finally { toggleLoading(false); }
});

// Helpers
window.openModal = (id) => document.getElementById(id)?.classList.add('active');
window.closeModal = (id) => document.getElementById(id)?.classList.remove('active');

function toggleLoading(show) { document.getElementById('loading-overlay').style.display = show ? 'flex' : 'none'; }
function showToast(msg, type) { /* ... same toast logic ... */ alert(msg); } // Simplified for admin

const compressImage = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader(); reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image(); img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const w = Math.min(800, img.width);
                const h = img.height * (w / img.width);
                canvas.width = w; canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            }
        }
    });
};