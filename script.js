// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем на весь экран
tg.ready();  // Сообщаем, что приложение готово

// ============================================
// 🛒 МАССИВ ТОВАРОВ - ЛЕГКО РЕДАКТИРОВАТЬ
// ============================================
// 💡 ИЗМЕНЯЙ НАЗВАНИЯ, ЦЕНЫ, ОПИСАНИЯ ЗДЕСЬ:
const products = [
    {
        id: 1,
        name: "Товар 1",                // 🔧 Меняй название
        price: 100,                     // 💰 Меняй цену
        description: "Описание товара 1",// 📝 Меняй описание
        image: "🪴",                     // 🖼️ Можно заменить на эмодзи или URL картинки
    },
    {
        id: 2,
        name: "Товар 2",                // 🔧
        price: 200,                     // 💰
        description: "Описание товара 2",// 📝
        image: "📱",                     // 🖼️
    },
    // ➕ Добавляй новые товары по аналогии
    // {
    //     id: 3,
    //     name: "Товар 3",
    //     price: 350,
    //     description: "Описание третьего товара",
    //     image: "🎧",
    // },
];

// ============================================
// Функция отрисовки карточек товаров
// ============================================
function renderProducts() {
    const container = document.getElementById('products-grid');
    container.innerHTML = ''; // Очистка

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Изображение (эмодзи/заглушка)
        const imgDiv = document.createElement('div');
        imgDiv.className = 'product-image';
        imgDiv.textContent = product.image;

        // Блок информации
        const infoDiv = document.createElement('div');
        infoDiv.className = 'product-info';

        const nameEl = document.createElement('div');
        nameEl.className = 'product-name';
        nameEl.textContent = product.name;

        const descEl = document.createElement('div');
        descEl.className = 'product-description';
        descEl.textContent = product.description;

        const priceRow = document.createElement('div');
        priceRow.className = 'product-price-row';

        const priceEl = document.createElement('span');
        priceEl.className = 'product-price';
        priceEl.textContent = `${product.price} ₽`; // Цена выводится динамически

        const buyBtn = document.createElement('button');
        buyBtn.className = 'buy-button';
        buyBtn.textContent = 'Купить';
        
        // ============================================
        // 🎯 ОБРАБОТКА НАЖАТИЯ "КУПИТЬ"
        // ============================================
        buyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Вибрация (если поддерживается)
            if (tg.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('medium');
            }

            // ============================================
            // 💳 ЗДЕСЬ БУДЕТ ПОДКЛЮЧЕНИЕ TELEGRAM PAYMENTS
            // TODO: реализовать оплату через Telegram
            // ============================================
            
            // Отправляем данные о товаре в бота (backend)
            // 💡 Передаём price и id для обработки
            const orderData = {
                action: 'purchase',
                product_id: product.id,
                product_name: product.name,
                price: product.price,      // 💰 Цена передаётся в бекенд
                currency: 'RUB',
                // TODO: добавить параметры для оплаты
            };

            // Отправка данных в бота (web_app_data)
            tg.sendData(JSON.stringify(orderData));

            // Показать уведомление (опционально)
            tg.showAlert(`Заказ: ${product.name} на сумму ${product.price} ₽ отправлен!`);
        });

        // Собираем структуру
        priceRow.appendChild(priceEl);
        priceRow.appendChild(buyBtn);

        infoDiv.appendChild(nameEl);
        infoDiv.appendChild(descEl);
        infoDiv.appendChild(priceRow);

        card.appendChild(imgDiv);
        card.appendChild(infoDiv);

        container.appendChild(card);
    });
}

// Запускаем отрисовку при загрузке
document.addEventListener('DOMContentLoaded', renderProducts);

// Обработка закрытия (опционально)
tg.onEvent('viewportChanged', () => {
    tg.expand();
});

// Экспорт для отладки (необязательно)
console.log('Mini App запущен, товаров:', products.length);