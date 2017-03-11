# Role Functions

## getRoles(message)
Retrieves all roles from the guild

**Parameters**
* `message` (object) - The Discord.js message object

## getRoleByName(message, roleName)
Retrieves a role via the role name. Returns false if no role is found.

**Parameters**
* `message` (object) - The Discord.js message object
* `roleName` (string) - The requested role name

## getRoleMembers(message, roleName)
Retrieves a collection of role members for the requested role. Returns false if role does not exist

**Parameters**
* `message` (object) - The Discord.js message object
* `roleName` (string) - The requested role name

## roleHasPermissions(message, roleName, permissions, *explicit*)
Returns a boolean respective to if the requested role has a set of permissions

**Parameters**
* `message` (object) - The Discord.js message object
* `roleName` (string) - The requested role name
* `permissions` (array) - Array containing the requested permissions

## setRoleColor(message, roleName, color)
Sets a color for a specific role

**Parameters**
* `message` (object) - The Discord.js message object
* `roleName` (string) - The requested role name
* `color` (string) - The color code in HEX

## setRoleName(message, roleName, name)
Sets a new name for a specific role

**Parameters**
* `message` (object) - The Discord.js message object
* `roleName` (string) - The requested role name
* `name` (string) - The color name

## setRoleVisibility(message, roleName, visibility)
Sets the visibility in the sidebar for a specific role

**Parameters**
* `message` (object) - The Discord.js message object
* `roleName` (string) - The requested role name
* `visible` (boolean) - The visibility for the user sidebar

## setRolePermissions(message, roleName, permissions)
Sets the permissions for a specific role

**Parameters**
* `message` (object) - The Discord.js message object
* `roleName` (string) - The requested role name
* `permissions` (array) - A array containing permission names
