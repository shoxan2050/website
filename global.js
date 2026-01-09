/* global.js */
import { auth, db } from "./firebase.js";
import { onAuthStateChanged, updatePassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { ref, get, update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const translations = {
    uz: {
        welcome: "Xush kelibsiz",
        settings: "Sozlamalar",
        theme: "Mavzu",
        language: "Tizim tili",
        default: "Standart",
        black: "Qora",
        white: "Oq",
        changePass: "Parolni o'zgartirish",
        logout: "Chiqish",
        save: "Saqlash",
        cancel: "Bekor qilish",
        newPass: "Yangi parol",
        success: "Muvaffaqiyatli saqlandi",
        error: "Xatolik yuz berdi"
    },
    ru: {
        welcome: "Добро пожаловать",
        settings: "Настройки",
        theme: "Тема",
        language: "Язык системы",
        default: "Стандартная",
        black: "Черная",
        white: "Белая",
        changePass: "Изменить пароль",
        logout: "Выйти",
        save: "Сохранить",
        cancel: "Отмена",
        newPass: "Новый пароль",
        success: "Успешно сохранено",
        error: "Произошла ошибка"
    },
    en: {
        welcome: "Welcome",
        settings: "Settings",
        theme: "Theme",
        language: "System Language",
        default: "Default",
        black: "Black",
        white: "White",
        changePass: "Change Password",
        logout: "Logout",
        save: "Save",
        cancel: "Cancel",
        newPass: "New Password",
        success: "Successfully saved",
        error: "An error occurred"
    }
};

let currentLang = 'uz';

export function initAccountWidget() {
    // Create HTML structure
    const widget = document.createElement('div');
    widget.className = 'account-widget';
    widget.innerHTML = `
        <div class="account-icon" id="accIcon">?</div>
        <div class="account-dropdown" id="accDrop">
            <div class="profile-info">
                <div class="profile-name" id="profName">...</div>
                <div class="profile-email" id="profEmail">...</div>
            </div>
            <div class="menu-item" id="openSettings">
                <span>⚙️</span> <span data-i18n="settings">Sozlamalar</span>
            </div>
            <div class="menu-item" id="globalLogout">
                <span>🔙</span> <span data-i18n="logout">Chiqish</span>
            </div>
        </div>
    `;
    document.body.appendChild(widget);

    // Create Modal structure
    const modal = document.createElement('div');
    modal.className = 'settings-modal';
    modal.id = 'settingsModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header" data-i18n="settings">Sozlamalar</div>
            
            <div class="setting-group">
                <label class="setting-label" data-i18n="theme">Mavzu</label>
                <select id="themeSelect">
                    <option value="default" data-i18n="default">Standart</option>
                    <option value="black" data-i18n="black">Qora</option>
                    <option value="white" data-i18n="white">Oq</option>
                </select>
            </div>

            <div class="setting-group">
                <label class="setting-label" data-i18n="language">Tizim tili</label>
                <select id="langSelect">
                    <option value="uz">O'zbekcha</option>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                </select>
            </div>

            <div id="passArea" style="display:none; margin-top:20px; border-top:1px solid var(--panel-border); padding-top:15px;">
                <label class="setting-label" data-i18n="newPass">Yangi parol</label>
                <input type="password" id="newPassword" placeholder="...">
                <button class="btn-primary" id="confirmPass" data-i18n="save">Saqlash</button>
            </div>

            <button class="btn-primary" id="showPassArea" data-i18n="changePass">Parolni o'zgartirish</button>
            <button class="btn-secondary" id="closeSettings" data-i18n="cancel">Yopish</button>
            <button class="btn-primary" id="saveSettings" data-i18n="save">Saqlash</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Elements
    const accIcon = document.getElementById('accIcon');
    const accDrop = document.getElementById('accDrop');
    const openSettings = document.getElementById('openSettings');
    const closeSettings = document.getElementById('closeSettings');
    const settingsModal = document.getElementById('settingsModal');
    const globalLogout = document.getElementById('globalLogout');
    const themeSelect = document.getElementById('themeSelect');
    const langSelect = document.getElementById('langSelect');
    const saveSettings = document.getElementById('saveSettings');
    const showPassArea = document.getElementById('showPassArea');
    const passArea = document.getElementById('passArea');
    const confirmPass = document.getElementById('confirmPass');
    const newPassword = document.getElementById('newPassword');

    // Toggle Dropdown
    accIcon.onclick = (e) => {
        e.stopPropagation();
        accDrop.classList.toggle('active');
    };

    window.onclick = () => {
        accDrop.classList.remove('active');
    };

    // Modal Actions
    openSettings.onclick = () => {
        settingsModal.classList.add('active');
        accDrop.classList.remove('active');
    };

    closeSettings.onclick = () => {
        settingsModal.classList.remove('active');
        passArea.style.display = 'none';
        showPassArea.style.display = 'block';
    };

    showPassArea.onclick = () => {
        passArea.style.display = 'block';
        showPassArea.style.display = 'none';
    };

    globalLogout.onclick = async () => {
        localStorage.removeItem('ownerMode');
        await auth.signOut();
        location.href = '/login';
    };

    // Firebase Integration
    onAuthStateChanged(auth, async (user) => {
        if (!user) return;

        const snap = await get(ref(db, "users/" + user.uid));
        if (snap.exists()) {
            const data = snap.val();
            document.getElementById('profName').textContent = `${data.firstName} ${data.lastName}`;
            document.getElementById('profEmail').textContent = data.email;
            accIcon.textContent = data.firstName[0].toUpperCase();

            // Apply saved settings
            const settings = data.settings || {};
            applyTheme(settings.theme || 'default');
            applyLanguage(settings.language || 'uz');

            themeSelect.value = settings.theme || 'default';
            langSelect.value = settings.language || 'uz';

            // Also update any page headers that say "Welcome"
            updatePageWelcome();
        }
    });

    saveSettings.onclick = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const theme = themeSelect.value;
        const lang = langSelect.value;

        await update(ref(db, `users/${user.uid}/settings`), {
            theme,
            language: lang
        });

        applyTheme(theme);
        applyLanguage(lang);
        settingsModal.classList.remove('active');
        alert(translations[lang].success);
    };

    confirmPass.onclick = async () => {
        const user = auth.currentUser;
        const pass = newPassword.value;
        if (!user || !pass || pass.length < 6) {
            alert("Min 6 chars");
            return;
        }

        try {
            await updatePassword(user, pass);
            alert(translations[currentLang].success);
            passArea.style.display = 'none';
            showPassArea.style.display = 'block';
            newPassword.value = '';
        } catch (error) {
            alert(translations[currentLang].error + ": " + error.message);
        }
    };
}

function applyTheme(theme) {
    document.body.classList.remove('theme-black', 'theme-white');
    if (theme === 'black') document.body.classList.add('theme-black');
    if (theme === 'white') document.body.classList.add('theme-white');
}

function applyLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    updatePageWelcome();
}

function updatePageWelcome() {
    const welcomeElements = [
        document.getElementById('title'), // major
        document.getElementById('mainTitle'), // teacher/student if added
        ...document.querySelectorAll('h1') // fallback
    ];

    welcomeElements.forEach(el => {
        if (el && (el.textContent.includes('Assalom') || el.textContent.includes('Yuklanmoqda') || el.textContent.includes('Welcome') || el.textContent.includes('Xush kelibsiz'))) {
            el.textContent = translations[currentLang].welcome + "!";
        }
    });
}
