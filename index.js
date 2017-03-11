const hexToDec = require('hex-to-dec');

class CordlrPlugin {
  
  /**
   * Creates an instance of CordlrPlugin.
   * 
   * @param {object} bot
   * @param {object} config 
   * 
   * @memberOf CordlrPlugin
   */
  constructor (bot, config) {
    this.bot = bot
    this.config = config
  }

  /**
   * Sends a message reply to the retrieved message
   * 
   * @param {object} message
   * @param {string} reply 
   * 
   * @memberOf CordlrPlugin
   */
  sendReply (message, reply) {
    message.reply(reply)
  }

  /**
   * Sends a reply as a PM to the message author
   * 
   * @param {object} message 
   * @param {string} reply 
   * 
   * @memberOf CordlrPlugin
   */
  sendPrivateReply (message, reply) {
    const author = message.author
    author.sendMessage(reply)
  }

  /**
   * Sends a embed message as a reply to the retrieved message
   * 
   * @param {object} message 
   * @param {object} embed
   * 
   * @memberOf CordlrPlugin
   */
  sendEmbed (message, embed) {
    const channel = message.channel

    channel.sendEmbed(embed)
  }

  /**
   * Sends a embed containing multiple fields as a response to the channel
   * 
   * @param {object} message 
   * @param {array} fields 
   * @param {string} [title=null] 
   * @param {object} [footer=null] 
   * 
   * @memberOf CordlrPlugin
   */
  sendFields (message, fields, title = null, footer = null) {
    const channel = message.channel

    channel.sendEmbed({
      title: title,
      footer: footer,
      fields: fields
    })
  }

  /**
   * Sends a info embed for warnings, errors and success messages
   * 
   * @param {object} message 
   * @param {string} info 
   * @param {string} [title='Info'] 
   * @param {object} [footer=null] 
   * @param {string} [type='default'] 
   * 
   * @memberOf CordlrPlugin
   */
  sendInfo (message, info, title = 'Info', footer = null, type = 'default') {
    const channel = message.channel
    let color = null
    
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
    }

    channel.sendEmbed({
      title: title,
      footer: footer,
      color: color,
      description: info
    })
  }

  /**
   * Returns an embedField
   * 
   * @param {string} name 
   * @param {string} [value=''] 
   * @param {boolean} [inline=false] 
   * @returns {object}
   * 
   * @memberOf CordlrPlugin
   */
  embedField (name, value = '', inline = false) {
    return {
      name: name,
      value: value,
      inline: inline
    }
  }

  /**
   * Returns an embedAuthor
   * 
   * @param {string} name 
   * @param {string} [url=null] 
   * @param {string} [icon=null] 
   * @param {string} [proxyIcon=null] 
   * @returns {object}
   * 
   * @memberOf CordlrPlugin
   */
  embedAuthor (name, url = null, icon = null, proxyIcon = null) {
    return {
      name: name,
      url: url,
      icon_url: icon,
      proxy_icon_url: proxyIcon
    }
  }

  /**
   * Returns an embedFooter
   * 
   * @param {string} text 
   * @param {string} [icon=null] 
   * @param {string} [proxyIcon=null] 
   * @returns {object}
   * 
   * @memberOf CordlrPlugin
   */
  embedFooter (text, icon = null, proxyIcon = null) {
    return {
      text: text,
      icon_url: icon,
      proxy_icon_url: proxyIcon
    }
  }
  
  /**
   * Returns an embedProvider
   * 
   * @param {string} name 
   * @param {string} [url=null] 
   * @returns {object}
   * 
   * @memberOf CordlrPlugin
   */
  embedProvider (name, url = null) {
    return {
      name: name,
      url: url
    }
  }

  /**
   * Returns an embedImage
   * 
   * @param {string} url 
   * @param {string} proxyUrl 
   * @param {number} [height=100] 
   * @param {number} [width=100] 
   * @returns {object}
   * 
   * @memberOf CordlrPlugin
   */
  embedImage (url, proxyUrl, height = 100, width = 100) {
    return {
      url: url,
      proxy_url: proxyUrl,
      height: height,
      width: width
    }
  }

  /**
   * Returns a videoEmbed
   * 
   * @param {string} url 
   * @param {number} [height=100] 
   * @param {number} [width=100] 
   * @returns {object}
   * 
   * @memberOf CordlrPlugin
   */
  embedVideo (url, height = 100, width = 100) {
    return {
      url: url,
      height: height,
      width: width
    }
  }

  /**
   * Retrieves roles for the message
   * 
   * @param {object} message 
   * @returns {array}
   * 
   * @memberOf CordlrPlugin
   */
  getRoles (message) {
    const guild = message.guild
    return guild.roles
  }

  /**
   * Retrieves a role by its name
   * 
   * @param {object} message
   * @param {string} name 
   * @returns {object}
   * 
   * @memberOf CordlrPlugin
   */
  getRoleByName (message, name) {
    const roles = this.getRoles(message)
    for (const role of roles) {
      if (role[1].name === name) {
        return role
      }
    }

    return false
  }

  /**
   * Retrieves a list of members assigned to a role
   * 
   * @param {object} message
   * @param {string} roleName 
   * @returns {array}
   * 
   * @memberOf CordlrPlugin
   */
  getRoleMembers (message, roleName) {
    const role = this.getRoleByName(message, roleName)
    if (role) {
      return role[1].members
    }

    return false
  }

  /**
   * Returns boolean for the permissions checked for a role
   * 
   * @param {object} message
   * @param {string} roleName 
   * @param {array} permissions 
   * @param {boolean} [explicit=false] 
   * @returns {boolean}
   * 
   * @memberOf CordlrPlugin
   */
  roleHasPermissions (message, roleName, permissions, explicit = false) {
    const role = this.getRoleByName(message, roleName)
    if (role) {
      return role[1].hasPermissions(permissions, explicit)
    }

    return false
  }

  /**
   * Sets a color to this role
   * 
   * @param {object} message
   * @param {string} roleName 
   * @param {string} color 
   * @returns {objectPromise}
   * 
   * @memberOf CordlrPlugin
   */
  setRoleColor (message, roleName, color) {
    const role = this.getRoleByName(message, roleName)
    if (role) {
      return role[1].setColor(color)
    }

    return false
  }

  /**
   * Sets a new name for this role
   * 
   * @param {object} message
   * @param {string} roleName 
   * @param {string} newName 
   * @returns {objectPromise} 
   * 
   * @memberOf CordlrPlugin
   */
  setRoleName (message, roleName, newName) {
    const role = this.getRoleByName(message, roleName)
    if (role) {
      return role[1].setName(newName)
    }

    return false
  }

  /**
   * Sets the visibility for the role in the sidebar
   * 
   * @param {object} message
   * @param {string} roleName 
   * @param {boolean} visible 
   * @returns {objectPromise}
   * 
   * @memberOf CordlrPlugin
   */
  setRoleVisibility (message, roleName, visible) {
    const role = this.getRoleByName(message, roleName)
    if (role) {
      return role[1].setHoist(visible)
    }

    return false
  }

  /**
   * Sets role permissions via array of permission strings
   * 
   * @param {object} message
   * @param {string} roleName 
   * @param {array} permissions 
   * @returns {objectPromise}
   * 
   * @memberOf CordlrPlugin
   */
  setRolePermissions (message, roleName, permissions) {
    const role = this.getRoleByName(message, roleName)
    if (role) {
      return role[1].setPermissions(permissions)
    }

    return false
  }

  /**
   * Changes the bot clients username
   * 
   * @param {string} username 
   * @returns {objectPromise}
   * 
   * @memberOf CordlrPlugin
   */
  botChangeUsername (username) {
    const client = this.bot.user
    if (client) {
      return client.setUsername(username)
    }

    return false
  }

  /**
   * Changes the bot clients game
   * 
   * @param {string} gameTitle
   * @returns {objectPromise}
   * 
   * @memberOf CordlrPlugin
   */
  botChangeGame (gameTitle) {
    const client = this.bot.user
    if (client) {
      return client.setGame(gameTitle)
    }

    return false
  }

  /**
   * Sets the bot client to AFK
   * 
   * @param {boolean} [isAfk=false] 
   * @returns {objectPromise}
   * 
   * @memberOf CordlrPlugin
   */
  botSetAfk (isAfk = false) {
    const client = this.bot.user
    if (client) {
      return client.setAFK(isAfk)
    }

    return false
  }

  /**
   * Sets the bots Avatar to Base64 image or a BufferResolvable
   * 
   * @param {any} avatar 
   * @returns 
   * 
   * @memberOf CordlrPlugin
   */
  botSetAvatar (avatar) {
    const client = this.bot.user
    if (client) {
      return client.setAvatar(avatar)
    }

    return false
  }

  /**
   * Converts a hexadecimal color to a decimal interger
   * 
   * @param {string} color 
   * @returns {int}
   * 
   * @memberOf CordlrPlugin
   */
  colorToDecimal (color) {
    const hexValue = color.replace('#', '')
    return hexToDec(hexValue)
  }
}

module.exports = CordlrPlugin
