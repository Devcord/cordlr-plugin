# Cordlr Plugin

[![Join the chat at https://gitter.im/Devcord/cordlr-plugin](https://badges.gitter.im/Devcord/cordlr-plugin.svg)](https://gitter.im/Devcord/cordlr-plugin?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Installation

```js
npm i cordlr-plugin --save
```

## Usage

Reply to a message
```js
const CordlrPlugin = require('cordlr-plugin')

class MyPlugin extends CordlrPlugin {
  constructor (bot, config) {
    super(bot, config)

    // Bot meta data
  }

  myFunction (message, args, flags) {
    this.sendReply(message, 'My reply')
  }
}
```

Reply to a message via private message
```js
const CordlrPlugin = require('cordlr-plugin')

class MyPlugin extends CordlrPlugin {
  constructor (bot, config) {
    super(bot, config)

    // Bot meta data
  }

  sendMeAPrivateMessage (message, args, flags) {
    this.sendPrivateReply(message, 'My private reply')
  }
}
```

More examples in the [documentation](docs/)
