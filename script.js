document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Останавливаем стандартное поведение формы

    // Получаем данные формы
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Ваш токен бота и ID чата
    const botToken = '6929675009:AAGo5D3GrmsEho4cO0YQAjohn50XARL3qqY';  // Замените на реальный токен
    const chatId = '5191218616';  // Замените на реальный chat ID

    // Формируем текст сообщения
    const message = `
New contact form submission:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}
Message: ${data.message}
`;

    // Отправка данных в Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.ok) {
            alert('Message sent successfully');
        } else {
            alert('Failed to send message');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message');
    });
});
// Проверяем поддержку сервис-воркеров
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
