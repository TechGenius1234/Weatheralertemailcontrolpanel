// Firebase configuration (already initialized in previous steps)

// Initialize EmailJS with your Service ID (replace with your actual values)
emailjs.init('YOUR_EMAILJS_USER_ID');

// Function to fetch weather data
function fetchWeatherData() {
    const apiKey = '918d4762593f410095f10042240207'; // Your OpenWeatherMap API key
    const city = 'Kelowna';
    const countryCode = 'CA';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            return {
                weatherDescription: data.weather[0].description,
                temperature: data.main.temp,
                humidity: data.main.humidity
            };
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            return null;
        });
}

// Function to send weather alert email
function sendWeatherAlertEmail(weatherDescription, temperature, humidity) {
    const params = {
        to_email: 'recipient@example.com', // Replace with recipient's email address
        from_name: 'Weather Alert Service',
        message: `
            Weather Alert for Kelowna, BC:
            Description: ${weatherDescription}
            Temperature: ${temperature} K
            Humidity: ${humidity}%
        `
    };

    // Send email using EmailJS
    emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', params)
        .then(function(response) {
            console.log('Email sent:', response);
            alert('Weather alert email sent successfully!');
        }, function(error) {
            console.error('Error sending email:', error);
            alert('Failed to send weather alert email. Please try again later.');
        });
}

// Fetch weather data and send email alert button click handler
document.getElementById('sendWeatherAlert').addEventListener('click', async () => {
    const weatherData = await fetchWeatherData();
    if (weatherData) {
        sendWeatherAlertEmail(weatherData.weatherDescription, weatherData.temperature, weatherData.humidity);
    }
});
