// Translation data
const dashboardTranslations = {
    en: {
        'Welcome': 'Welcome',
        'Logout': 'Logout',
        'Oil Trading Platform': 'Oil Trading Platform',
        'Oil Selling Calculator': 'Oil Selling Calculator',
        'Oil Amount (Barrels)': 'Oil Amount (Barrels)',
        'Enter amount': 'Enter amount',
        'Price per Barrel ($)': 'Price per Barrel ($)',
        'Enter price': 'Enter price',
        'Calculate': 'Calculate',
        'Total': 'Total',
        'Delivery Information': 'Delivery Information',
        'Delivery Day': 'Delivery Day',
        'Monday': 'Monday',
        'Tuesday': 'Tuesday',
        'Wednesday': 'Wednesday',
        'Thursday': 'Thursday',
        'Friday': 'Friday',
        'Saturday': 'Saturday',
        'Sunday': 'Sunday',
        'Every week (recurring)': 'Every week (recurring)',
        'Address': 'Address',
        'Enter full address': 'Enter full address',
        'City': 'City',
        'Zip Code': 'Zip Code',
        'Submit Order': 'Submit Order',
        'Dark': 'Dark',
        'Light': 'Light'
    },
    th: {
        'Welcome': 'ยินดีต้อนรับ',
        'Logout': 'ออกจากระบบ',
        'Old oil selling Platform': 'แพลตฟอร์มการค้าน้ำมันเก่า',
        'Oil Selling Calculator': 'เครื่องคิดเลขการขายน้ำมัน',
        'Oil Amount (Barrels)': 'ปริมาณน้ำมัน (บาร์เรล)',
        'Enter amount': 'ใส่ปริมาณ',
        'Price per Barrel (bath)': 'ราคาต่อบาร์เรล (บาท)',
        'Enter price': 'ใส่ราคา',
        'Calculate': 'คำนวณ',
        'Total': 'ทั้งหมด',
        'Delivery Information': 'ข้อมูลการจัดส่ง',
        'Delivery Day': 'วันจัดส่ง',
        'Monday': 'จันทร์',
        'Tuesday': 'อังคาร',
        'Wednesday': 'พุธ',
        'Thursday': 'พฤหัสบดี',
        'Friday': 'ศุกร์',
        'Saturday': 'เสาร์',
        'Sunday': 'อาทิตย์',
        'Every week (recurring)': 'ทุกสัปดาห์ (ซ้ำ)',
        'Address': 'ที่อยู่',
        'Enter full address': 'ใส่ที่อยู่เต็ม',
        'City': 'เมือง',
        'Zip Code': 'รหัสไปรษณีย์',
        'Submit Order': 'ส่งคำสั่งซื้อ',
        'Dark': 'มืด',
        'Light': 'สว่าง'
    }
};

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
    }
    updateThemeButton();
}

// Toggle theme
function toggleTheme() {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButton();
}

function updateThemeButton() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    const btn = document.querySelector('.theme-toggle');
    const lang = localStorage.getItem('language') || 'en';
    const darkText = dashboardTranslations[lang]['Dark'];
    const lightText = dashboardTranslations[lang]['Light'];
    btn.innerHTML = isDark ? `☀️ ${lightText}` : `🌙 ${darkText}`;
}

// Set language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en]').forEach(el => {
        if (el.dataset[lang]) {
            el.textContent = el.dataset[lang];
        }
    });
    
    // Update select options with day names
    const dayNames = {
        en: { Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday', Thursday: 'Thursday', Friday: 'Friday', Saturday: 'Saturday', Sunday: 'Sunday' },
        th: { Monday: 'จันทร์', Tuesday: 'อังคาร', Wednesday: 'พุธ', Thursday: 'พฤหัสบดี', Friday: 'ศุกร์', Saturday: 'เสาร์', Sunday: 'อาทิตย์' }
    };
    
    const deliverySelect = document.getElementById('deliveryDay');
    if (deliverySelect) {
        const options = deliverySelect.querySelectorAll('option');
        options.forEach(option => {
            if (dayNames[lang] && dayNames[lang][option.value]) {
                option.textContent = dayNames[lang][option.value];
            }
        });
    }
    
    // Update input placeholders
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
        const placeholderAttr = `data-${lang}-placeholder`;
        if (el.getAttribute(placeholderAttr)) {
            el.placeholder = el.getAttribute(placeholderAttr);
        }
    });
    
    // Update userDisplay
    const username = localStorage.getItem('user');
    const welcomeText = dashboardTranslations[lang]['Welcome'];
    document.getElementById('userDisplay').textContent = `${welcomeText}, ${username}!`;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    updateThemeButton();
}

// Check if user is logged in
window.addEventListener('load', function() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html';
    } else {
        const username = localStorage.getItem('user');
        const lang = localStorage.getItem('language') || 'en';
        const welcomeText = dashboardTranslations[lang]['Welcome'];
        document.getElementById('userDisplay').textContent = `${welcomeText}, ${username}!`;
    }
    
    // Initialize theme and language
    initTheme();
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    
    // Add event listeners
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
});

// Initialize map using Leaflet
function initMap() {
    const defaultLocation = [40.7128, -74.0060]; // [latitude, longitude]
    const map = L.map('map').setView(defaultLocation, 12);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add marker
    L.marker(defaultLocation).addTo(map)
        .bindPopup('Current Location')
        .openPopup();
}

// Initialize map when DOM is ready
try {
    if (document.getElementById('map')) {
        initMap();
    }
} catch (e) {
    console.log('Map initialization error:', e);
}

// Oil Calculator functionality
document.getElementById('calculateBtn').addEventListener('click', function() {
    const amount = parseFloat(document.getElementById('oilAmount').value);
    const price = parseFloat(document.getElementById('pricePerBarrel').value);
    
    if (!isNaN(amount) && !isNaN(price) && amount >= 0 && price >= 0) {
        const total = (amount * price).toFixed(2);
        document.getElementById('totalAmount').textContent = `$${total}`;
        
        // Add animation
        const resultBox = document.getElementById('resultBox');
        resultBox.style.animation = 'none';
        setTimeout(() => {
            resultBox.style.animation = 'pulse 0.5s ease-out';
        }, 10);
    } else {
        alert('Please enter valid numbers for amount and price');
    }
});

// Allow Enter key to calculate
document.getElementById('oilAmount').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('calculateBtn').click();
    }
});

// Delivery form submission
document.getElementById('deliveryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const deliveryDay = document.getElementById('deliveryDay').value;
    const everyWeek = document.getElementById('everyWeek').checked;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zipcode = document.getElementById('zipcode').value;
    
    if (deliveryDay && address && city && zipcode) {
        const oilAmount = document.getElementById('oilAmount').value;
        const totalAmount = document.getElementById('totalAmount').textContent;
        
        // Create display text
        const dateDisplay = everyWeek ? `Every ${deliveryDay}` : `${deliveryDay}`;
        
        // Store order data
        const orderData = {
            day: deliveryDay,
            recurring: everyWeek,
            address: address,
            city: city,
            zipcode: zipcode,
            oilAmount: oilAmount,
            totalAmount: totalAmount,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        
        // Show success message
        alert(`Order submitted successfully!\n\nDelivery: ${dateDisplay}\nAddress: ${address}, ${city} ${zipcode}\nTotal Amount: ${totalAmount}`);
        
        // Reset form
        document.getElementById('deliveryForm').reset();
        document.getElementById('oilAmount').value = '';
        document.getElementById('totalAmount').textContent = '$0.00';
    }
});

// Auto-calculate on price change
document.getElementById('pricePerBarrel').addEventListener('change', function() {
    if (document.getElementById('oilAmount').value) {
        document.getElementById('calculateBtn').click();
    }
});

// Add pulse animation for results
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);
