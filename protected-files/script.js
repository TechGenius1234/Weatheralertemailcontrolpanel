// Initialize EmailJS with your Service ID
emailjs.init('service_tqhn6bk');

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
    emailjs.send('service_tqhn6bk', 'template_590983g', params)
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
