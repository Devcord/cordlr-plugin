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

## sendEmbed (message, reply, embed)
Sends a reply back mentioning the message author appending a embed to the message

**Parameters**
* `message` (object) - The Discord.js message object
* `reply` (string) - Reply text send out to the user
* `embed` (object) - [Embed object](https://discordapp.com/developers/docs/resources/channel#embed-object)

## sendFields (message, fields, *title*, *footer*, *reply*)
Sends a message back including a embed containing multiple fields

**Parameters**
* `message` (object) - The Discord.js message object
* `fields` (array) - Array of [Embed Fields](https://discordapp.com/developers/docs/resources/channel#embed-object)
* `title` (string) - Embed title (optional)
* `footer` (object) - [Embed Footer](https://discordapp.com/developers/docs/resources/channel#embed-object)
* `reply` (string) - Message attached to the embed