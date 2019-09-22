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
    `Sometimes E2E issues are a PITA :brainpain: I'm here for some LMAO :joy:`, 
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
  if (handleChuckNorris(message)) {
    chuckJoke();
  } else if (handleYoMomma(message)) {
    yoMommaJoke();
  } else if (handleDad(message)) {
    dadJoke();
  } else if (handleHelp(message)) {
    runHelp();
  }
};

function handleChuckNorris(message) {
  if (message.includes(' Chuck Norris')) {
    return true;
  } else if (message.includes(' chuck norris')) {
    return true;
  } else if (message.includes(' chucknorris')) {
    return true;
  } else if (message.includes(' ChuckNorris')) {
    return true;
  }
}

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

function handleYoMomma(message) {
  if (message.includes(' Yo Momma')) {
    return true;
  } else if (message.includes(' yo momma')) {
    return true;
  } else if (message.includes(' Yo Mama')) {
    return true;
  } else if (message.includes(' yo mama')) {
    return true;
  } else if (message.includes(' yomama')) {
    return true;
  }
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

function handleDad(message) {
  if (message.includes(' Dad')) {
    return true;
  } else if (message.includes(' dad')) {
    return true;
  } else if (message.includes(' DAD')) {
    return true;
  } else if (message.includes('daddy')) {
    return true;
  } else if (message.includes('Daddy')) {
    return true;
  }
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

function handleHelp(message) {
  if (message.includes('Help')) {
    return true;
  } else if (message.includes('help')) {
    return true;
  } else if (message.includes('halp')) {
    return true;
  } else if (message.includes('Halp')) {
    return true;
  } else if (message.includes('HELP')) {
    return true;
  } else if (message.includes('HALP')) {
    return true;
  }
}

function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  jokeBot.postMessageToChannel(
    'bot-development', 
    `Type a message asking for a 'Chuck Norris', 'Yo Momma' or 'Dad' joke and I'll generate one :robot_face: \nI'm a proof of concept for other more practical uses :slightly_smiling_face:`, 
    params
  );
}
