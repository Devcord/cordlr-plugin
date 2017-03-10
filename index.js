class CordlrPlugin {
  constructor (bot, config) {
    this.bot = bot
    this.config = config
  }

  sendReply (message, reply) {
    message.reply(reply)
  }

  sendPrivateReply (message, reply) {
    // TODO: Add reply functionality for responding via private message
  }

  sendEmbeds (message, reply, embeds) {
    // TODO: Add reply functionality with embeds
  }
}

module.exports = CordlrPlugin
