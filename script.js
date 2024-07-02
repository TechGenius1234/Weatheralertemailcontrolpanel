const apiKey = '918d4762593f410095f10042240207'; // Your OpenWeatherMap API key
const city = 'Kelowna';
const countryCode = 'CA';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}`;

// Initialize EmailJS with your Service ID
emailjs.init('YOUR_EMAILJS_USER_ID');

function fetchWeatherDataAndSendEmail() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;

            // Example: Send email if weather condition is 'Rain'
            if (weatherDescription.includes('rain')) {
                sendWeatherAlertEmail(weatherDescription, temperature, humidity);
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

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
        }, function(error) {
            console.error('Error sending email:', error);
        });
}

// Fetch weather data and send email alerts if conditions are met
fetchWeatherDataAndSendEmail();
