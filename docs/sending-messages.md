# Sending Messages

## sendReply (message, reply)
Sends a reply back mentioning the message author

**Parameters**
* `message` (object) - The Discord.js message object
* `reply` (string) - Reply text send out to the user

## sendPrivateReply (message, reply)
Sends a reply back to the message author in private chat

**Parameters**
* `message` (object) - The Discord.js message object
* `reply` (string) - Reply text send out to the user

## sendEmbeds (message, reply, embeds)
Sends a reply back mentioning the message author appending embeds to the message

**Parameters**
* `message` (object) - The Discord.js message object
* `reply` (string) - Reply text send out to the user
* `embeds` (array) - Array of [embed objects](https://discordapp.com/developers/docs/resources/channel#embed-object)