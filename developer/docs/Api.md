//console.log(api.core.features())
//console.log(api.core.componentList())
//console.log(api.core.componentSchema())
//console.log(api.construct.alias("navbar", api.core.componentSchema().files.main))


# Api
Access Kitsune api to make development easier.

## Contents

*1.0: Construct
*1.1: Core


## 1.0 Construct

###alias.js
Alias is an interpolation method Kitsune uses for contructing files that a component requires, a schema can be loaded as the second peramiter via the api.core.componentSchema.js

Syntax:
```
@{namespace}, prefix_schema
```

## 1.1 Core
####getRoot.js - [string]
return the root path of this project

####Features.js
Returns a boolean based on the settings for features in load.json, performing actions based on this value

####componentList.js
Return an array of all components that should be loaded into your build.

####componentSchema.js - [function] - peram or no peram
Return the entire list of current component schema which Kitsune uses to install components against. Nameing conventions are very important and so is your document workflow, frameworks should work with you and not make you learn a new convention.
