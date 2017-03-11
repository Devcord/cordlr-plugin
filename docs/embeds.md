# Embed Functions

## embedField(name, *value*, *inline*)
Returns a embed field object

**Parameters**
* `name` (string) - Field Name
* `value` (string) - Field value (optional)
* `inline` (bool) - Turn inline on / off (optional)

## embedAuthor (name, *url*, *icon*, *proxyIcon*)
Returns a embed author object

**Parameters**
* `name` (string) - Author name
* `url` (string) - URL to author (optional)
* `icon` (string) - URL to icon image (optional)
* `proxyIcon` (string) - URL to proxy icon image (optional)

## embedFooter (text, *icon*, *proxyIcon*)
Returns a embed footer object

**Parameters**
* `text` (string) - Footer string
* `icon` (string) - URL to icon image (optional)
* `proxyIcon` (string) - URL to proxy icon image (optional)

## embedProvider (name, *url*)
Returns a embed provider object

**Parameters**
* `name` (string) - Provider name
* `url` (string) - Provider URL (optional)

## embedImage (url, *proxyUrl*, *height*, *width*)
Returns a embed image object

**Parameters**
* `url` (string) - Image URL
* `proxyUrl` (string) - Proxy Image URL (optional)
* `height` (int) - Image height (optional)
* `width` (int) - Image width (optional)

## embedVideo (url, *height*, *width*)
Returns a embed video object

**Parameters**
* `url` (string) - Video URL
* `height` (int) - Video height (optional)
* `width` (int) - Video width (optional)