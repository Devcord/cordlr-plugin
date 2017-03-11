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
* `embed` (object) - [Embed object](https://discordapp.com/developers/docs/resources/channel#embed-object)

## sendFields (message, fields, *title*, *footer*)
Sends a message back including a embed containing multiple fields

**Parameters**
* `message` (object) - The Discord.js message object
* `fields` (array) - Array of [Embed Fields](https://discordapp.com/developers/docs/resources/channel#embed-object)
* `title` (string) - Embed title (optional)
* `footer` (object) - [Embed Footer](https://discordapp.com/developers/docs/resources/channel#embed-object) (optional)

## sendInfo(message, info, *title*, *footer*, *type*)
Sends a info message (warning, error, success, etc.)

**Parameters**
* `message` (object) - The Discord.js message object
* `info` (string) - The info string your info should contain
* `title` (string) - The title for your info embed
* `footer` (object) - [Embed Footer](https://discordapp.com/developers/docs/resources/channel#embed-object) (optional)
* `type` (string) - A string type to switch between types (default|warning|error|success)