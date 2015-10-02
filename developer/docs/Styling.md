#Kitsune + Stylus

###load.json
load.json found at the root of your Kitsune folder is the most important file in your entire project, load.json automates the installation of components, tells Kitsune about what needs to be unpacked into a new Component, controls the dev server, enables build proccesses, specifies which components introduce font-face fonts or icons and much much more. But first what makes up component?

By default Kitsune components are listed in the load.json under the components key array:


```
"component_list":[
	"utility",
	"button",
	"dropdown",
	"form",
	"grid",
	"hero",
	"icons",
	"modal",
	"navbar",
	"notify",
	"reset",
	"tables",
	"typography",
	"icons"
]
```

Installing new Kitsune components is easy, just add another namespace to 'components_list' array. Behind the scenes Kitsune will read your current component schema which is also found in load.json, Kitsune follows your instructions and unpacks some usefull files, Because Kitsune likes organized code your new component will automatically be included into the kitsune.styl and prefixed with the correct namespace.

!* Important! *!
Load order is important, It is highly discoraged to link two components together in such a way that they depend on each others styl. If components have to rely on each other prefix your component name with an ' _component ' because components are loaded and included Alphabetically.

###Components expands:
Kitsune just followed the install schema and unpacked the following files, this schema can be changed easly inside load.json.
- example
- scripts
- @{component}_main.styl
- @{component}_readme.md
- @{component}_schema.json

##Example (optional)
The Example dir gives you a chance to mockup your component in its own self contained environment, Its good practice to create a html file in here and so that other developers can preview this component without other components on the page. The built in dev server can also be routed to view this sandboxed component on its own dedicated url.

##Scripts
To make components as interchangeable as posible, Unlike other frameworks, Kitsune looks at components as not only html and css but also data (json), scripts and fonts per component. If a component uses scripts place them in here, its good practice to share your components with your scripts by using the @{component}_schema.json that is unpacked by default.

##@{component}_file
The Kitsune js Api can be read about in the Api section, a notable function is the alias constructor, All components are aliased so that Kitsune can read the install schema, when you see @{component} this could actually be a reference to any component such as; navbar, button ect, or any custom namespace that was added to the component list.

##@_main.styl
Its a really good idea to use the @_main.styl like an index.js file like you would in node, use Stylus to @import all dependencies of this component into the @_main.styl. Dependencies could include:
- Mixin files
- Json vars and settings for both js and styl
- Even more .styl files
- Libraries from locals

##@_readme.md
Its a readme for your component, its alot like this readme but with less waffles.

##@_schema.json
Schemas in other words are Blueprints, your @_schema is a local schema for this component, you can put pretty much anything inside of it, Its a good idea to use Stylus's built in function:
```
json(...)
```
json allows you to include your schema into your @_main.styl, all your settings inside your @_schema.json can now be accessed by stylus.

Note: in the future we will add a special key that allows your js to see this schema. Its kind of like a common space.
