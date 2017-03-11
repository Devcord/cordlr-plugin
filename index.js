class CordlrPlugin {
  constructor (bot, config) {
    this.bot = bot
    this.config = config
  }

  sendReply (message, reply) {
    message.reply(reply)
  }

  sendPrivateReply (message, reply) {
    const author = message.author
    author.sendMessage(reply)
  }

  sendEmbeds (message, reply, embeds) {
    message.reply(reply, {
      embeds: embeds
    })
  }

  embedField (name, value = '', inline = false) {
    return {
      name: name,
      value: value,
      inline: inline
    }
  }

  embedAuthor (name, url = null, icon = null, proxyIcon = null) {
    return {
      name: name,
      url: url,
      icon_url: icon,
      proxy_icon_url: proxyIcon
    }
  }

  embedFooter (text, icon = null, proxyIcon = null) {
    return {
      text: text,
      icon_url: icon,
      proxy_icon_url: proxyIcon
    }
  }
  
  embedProvider (name, url = null) {
    return {
      name: name,
      url: url
    }
  }

  embedImage (url, proxyUrl, height = 100, width = 100) {
    return {
      url: url,
      proxy_url: proxyUrl,
      height: height,
      width: width
    }
  }

  embedVideo (url, height = 100, width = 100) {
    return {
      url: url,
      height: height,
      width: width
    }
  }
}

module.exports = CordlrPlugin
