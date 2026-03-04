const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/bookings', (req, res) => {
    console.log('Received booking data:', req.body);
    // In a real application, you would save this to a database
    setTimeout(() => {
        res.status(200).json({ success: true, message: 'Booking received successfully' });
    }, 800); // Simulate network delay
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
