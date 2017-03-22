const hexToDec = require('hex-to-dec');

module.exports = class CordlrPlugin {
  
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
   * Checks if the bot has a role(s) with the permission
   * Use it with this.bot.on('ready', () => {})
   * 
   * @param {string} permission 
   * @returns {boolean}
   */
  checkBotPermission (permission) {
    // TODO This does not support multiple server
    // FIXME This does not support multiple servers
    const guilds = this.bot.guilds.array()
    return guilds[0].members.get(this.bot.user.id).hasPermission(permission)
  }

  /**
   * Check if the bot has a role(s) with the permissions
   * Use it with this.bot.on('ready', () => {})
   * 
   * @param {array} permissions 
   * @returns {boolean}
   */
  checkBotPermissions (permissions) {
    // TODO This does not support multiple server
    // FIXME This does not support multiple servers
    const guilds = this.bot.guilds.array()
    return guilds[0].members.get(this.bot.user.id).hasPermissions(permissions)
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
   * Converts a hexadecimal color to a decimal integer
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

  /**
   * ---------- Hooks ------------
   */

  /**
   * Emitted whenever a guild member changes - i.e. new role, removed role, nickname
   * 
   * @param {function} callback (oldMember, newMember)
   * 
   * @memberOf CordlrPlugin
   */
  onMemberUpdate (callback) {
    this.bot.on('guildMemberUpdate', (oldMember, newMember) => {
      return callback(oldMember, newMember)
    })
  }

  /**
   * Emitted whenever a guild is updated - e.g. name change.
   * 
   * @param {function} callback (oldGuild, newGuild)
   * 
   * @memberOf CordlrPlugin
   */
  onGuildUpdate(callback) {
    this.bot.on('guildUpdate', (oldGuild, newGuild) => {
      return callback(oldGuild, newGuild)
    })
  }

  /**
   * Emitted whenever a message is deleted
   * 
   * @param {function} callback (message)
   * 
   * @memberOf CordlrPlugin
   */
  onMessageDelete(callback) {
    this.bot.on('messageDelete', (message) => {
      return callback(message)
    })
  }

  /**
   * Emitted whenever a message is updated - e.g. embed or content change.
   * 
   * @param {function} callback (oldMessage, newMessage) 
   * 
   * @memberOf CordlrPlugin
   */
  onMessageUpdate(callback) {
    this.bot.on('messageUpdate', (oldMessage, newMessage) => {
      return callback(oldMessage, newMessage)
    })
  }

  /**
   * Emitted whenever a reaction is added to a message.
   * 
   * @param {function} callback (messageReaction, user)
   * 
   * @memberOf CordlrPlugin
   */
  onReactionAdded(callback) {
    this.bot.on('messageReactionAdd', (massageReaction, user) => {
      return callback(massageReaction, user)
    })
  }

  /**
   * Emitted whenever a reaction is removed from a message.
   * 
   * @param {function} callback (messageReaction, user) 
   * 
   * @memberOf CordlrPlugin
   */
  onReactionRemoved(callback) {
    this.bot.on('messageReactionRemove', (messageReaction, user) => {
      return callback(messageReaction, user)
    })
  }

  /**
   * Emitted whenever a role is created.
   * 
   * @param {function} callback (role) 
   * 
   * @memberOf CordlrPlugin
   */
  onRoleCreate(callback) {
    this.bot.on('roleCreate', (role) => {
      return callback(role)
    })
  }

  /**
   * Emitted whenever a guild role is deleted.
   * 
   * @param {function} callback (role) 
   * 
   * @memberOf CordlrPlugin
   */
  onRoleDelete(callback) {
    this.bot.on('roleDelete', (role) => {
      return callback(role)
    })
  }

  /**
   * Emitted whenever a guild role is updated.
   * 
   * @param {function} callback (oldRole, newRole)
   * 
   * @memberOf CordlrPlugin
   */
  onRoleUpdate(callback) {
    this.bot.on('roleUpdate', (oldRole, newRole) => {
      return callback(oldRole, newRole)
    })
  }

  /**
   * Emitted whenever a user's details (e.g. username) are changed.
   * 
   * @param {function} callback (oldUser, newUser) 
   * 
   * @memberOf CordlrPlugin
   */
  onUserUpdate(callback) {
    this.bot.on('userUpdate', (oldUser, newUser) => {
      return callback(oldUser, newUser)
    })
  }

  /**
   * Emitted whenever a member is banned from a guild.
   * 
   * @param {function} callback (guild, user)
   * 
   * @memberOf CordlrPlugin
   */
  onUserBanned(callback) {
    this.bot.on('guildBanAdd', (guild, user) => {
      return callback(guild, user)
    })
  }

  /**
   * Emitted whenever a member is unbanned from a guild.
   * 
   * @param {function} callback (guild, user)
   * 
   * @memberOf CordlrPlugin
   */
  onUserUnbanned(callback) {
    this.bot.on('guildBanRemove', (guild, user) => {
      return callback(guild, user)
    })
  }

  /**
   * Emitted whenever the Client encounters a serious connection error
   * 
   * @param {function} callback (error)
   * 
   * @memberOf CordlrPlugin
   */
  onError(callback) {
    this.bot.on('error', (error) => {
      return callback(error)
    })
  }

  /**
   * Emitted whenever a channel is updated - e.g. name change, topic change.
   * 
   * @param {function} callback (oldChannel, newChannel) 
   * 
   * @memberOf CordlrPlugin
   */
  onChannelUpdate(callback) {
    this.bot.on('channelUpdate', (oldChannel, newChannel) => {
      return callback(oldChannel, newChannel)
    })
  }

  /**
   * Emitted whenever the pins of a channel are updated. 
   * Due to the nature of the WebSocket event, 
   * not much information can be provided easily here - you need to 
   * manually check the pins yourself.
   * 
   * @param {function} callback (channel, time) 
   * 
   * @memberOf CordlrPlugin
   */
  onChannelPinsUpdate(callback) {
    this.bot.on('channelPinsUpdate', (channel, time) => {
      return callback(channel, time)
    })
  }

  /**
   * Emitted whenever a channel is deleted.
   * 
   * @param {function} callback (channel)
   * 
   * @memberOf CordlrPlugin
   */
  onChannelDelete(callback) {
    this.bot.on('channelDelete', (channel) => {
      return callback(channel)
    })
  }

  /**
   * Emitted whenever a channel is created.
   * 
   * @param {function} callback (channel) 
   * 
   * @memberOf CordlrPlugin
   */
  onChannelAdded(callback) {
    this.bot.on('channelCreate', (channel) => {
      return callback(channel)
    })
  }
}
