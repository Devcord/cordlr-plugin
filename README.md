# Cordlr Plugin

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

More examples in the documentation (coming soon)

## Short Docs

#### sendReply

**Parameters**
* `message` - Discord Message Object
* `reply` - Reply string

```js
CordlrPlugin.sendReply(message, 'My message')
```

---

#### sendPrivateReply

**Parameters**
* `message` - Discord Message Object
* `reply` - Reply string

```js
CordlrPlugin.sendPrivateReply(message, 'My private message')
```

---

#### sendEmbeds

**Parameters**
* `message` - Discord Message Object
* `reply` - Reply string
* `embeds` - Array containing Discord embed objects

```js
CordlrPlugin.sendReply(message, 'My message', [
  {
    // embed data (see Discord API)
  },
  {
    // embed data (see Discord API)
  }
])
```
