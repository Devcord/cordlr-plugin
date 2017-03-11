# Role Functions

## getRoles(message)
Retrieves all roles from the guild

**Parameters**
* `message` (object) - The Discord.js message object

## getRoleByName(roleName)
Retrieves a role via the role name. Returns false if no role is found.

**Parameters**
* `roleName` (string) - The requested role name

## getRoleMembers(roleName)
Retrieves a collection of role members for the requested role. Returns false if role does not exist

**Parameters**
* `roleName` (string) - The requested role name

## roleHasPermissions(roleName, permissions, *explicit*)
Returns a boolean respective to if the requested role has a set of permissions

**Parameters**
* `roleName` (string) - The requested role name
* `permissions` (array) - Array containing the requested permissions

## setRoleColor(roleName, color)
Sets a color for a specific role

**Parameters**
* `roleName` (string) - The requested role name
* `color` (string) - The color code in HEX

## setRoleName(roleName, name)
Sets a new name for a specific role

**Parameters**
* `roleName` (string) - The requested role name
* `name` (string) - The color name

## setRoleVisibility(roleName, visibility)
Sets the visibility in the sidebar for a specific role

**Parameters**
* `roleName` (string) - The requested role name
* `visible` (boolean) - The visibility for the user sidebar

## setRolePermissions(roleName, permissions)
Sets the permissions for a specific role

**Parameters**
* `roleName` (string) - The requested role name
* `permissions` (array) - A array containing permission names
