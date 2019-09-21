const SlackBot = require('slackbots');
const axios = require('axios');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const jokeBot = new SlackBot({
  token: process.env.TOKEN,
  name: 'jokeBot'
});

jokeBot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  }

  jokeBot.postMessageToChannel(
    'bot-development', 
    `Sometimes E2E errors are a PITA, I'm here for some LMAO`, 
    params
  );
});

jokeBot.on('error', (error) => console.log(error));

jokeBot.on('message', (data) => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

function handleMessage(message) {
  if (message.includes(' Chuck Norris')) {
    chuckJoke();
  } else if (message.includes(' Yo Momma')) {
    yoMommaJoke();
  } else if (message.includes(' Dad')) {
    dadJoke();
  } else if (message.includes(' Help')) {
    runHelp();
  }
};

function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random').then(response => {
    const joke = response.data.value.joke;

    const params = {
      icon_emoji: ':laughing:'
    };
  
    jokeBot.postMessageToChannel(
      'bot-development', 
      joke, 
      params
    );
  })
}

function yoMommaJoke() {
  axios.get('http://api.yomomma.info').then(response => {
    const joke = response.data.joke;

    const params = {
      icon_emoji: ':laughing:'
    };
  
    jokeBot.postMessageToChannel(
      'bot-development', 
      joke, 
      params
    );
  })
}

function dadJoke() {
  axios.get('https://icanhazdadjoke.com', { headers: { "Accept": "text/plain" } }).then(response => {
    const joke = response.data;

    const params = {
      icon_emoji: ':laughing:'
    };
  
    jokeBot.postMessageToChannel(
      'bot-development', 
      joke, 
      params
    );
  })
}

function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  jokeBot.postMessageToChannel(
    'bot-development', 
    `Type @jokeBot with either 'Chuck Norris', 'Yo Momma' or 'Dad' for a joke.`, 
    params
  );
}
