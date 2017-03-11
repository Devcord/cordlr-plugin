const hexToDec = require('hex-to-dec');

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

  sendEmbed (message, reply, embeds) {
    message.reply(reply, {
      embed: embed
    })
  }

  sendFields (message, fields, title = null, footer = null, reply = null) {
    const channel = message.channel

    channel.sendEmbed({
      embed: {
        title: title,
        footer: footer,
        fields: fields
      }
    }, reply)
  }

  sendInfo (message, info, title = 'Info', footer = null, type = 'default') {
    const channel = message.channel
    
    switch (type) {
      case 'warning':
        color = this.colorToDecimal('#fff83d')
        break
      case 'error':
        color = this.colorToDecimal('#fc5246')
        break
      case 'success':
        color = this.colorToDecimal('#36c17e')
        break
      default:
        color = this.colorToDecimal('#7289DA')

      channel.sendEmbed({
        title: title,
        footer: footer,
        color: color,
        description: info
      })
    }
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

  getRoles (message) {
    const guild = message.guild
    return guild.roles
  }

  getRoleByName (name) {
    const roles = this.getRoles(message)
    for (role of roles) {
      if (role.name === name) {
        return role
      }
    }

    return false
  }

  getRoleMembers (roleName) {
    const role = this.getRoleByName(roleName)
    if (role) {
      return role.members
    }

    return false
  }

  roleHasPermissions (roleName, permissions, explicit = false) {
    const role = this.getRoleByName(roleName)
    if (role) {
      return role.hasPermissions(permissions, explicit)
    }

    return false
  }

  setRoleColor (roleName, color) {
    const role = this.getRoleByName(roleName)
    if (role) {
      return role.setColor(color)
    }

    return false
  }

  setRoleName (roleName, newName) {
    const role = this.getRoleByName(roleName)
    if (role) {
      return role.setName(newName)
    }

    return false
  }

  setRoleVisibility (roleName, visible) {
    const role = this.getRoleByName(roleName)
    if (role) {
      return role.setHoist(visible)
    }

    return false
  }

  setRolePermissions (roleName, permissions) {
    const role = this.getRoleByName(roleName)
    if (role) {
      return role.setPermissions(permissions)
    }

    return false
  }

  colorToDecimal (color) {
    const hexValue = color.replace('#', '')
    return hexToDec(hexValue)
  }
}

module.exports = CordlrPlugin
