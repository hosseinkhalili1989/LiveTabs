# LiveTabs
## Table of content
["Description"] (#description)
["Goals"] (#goals)
["Technologies"] (#technologies)
["Setup"] (#setup)


## Description 
LiveTabs is a Javascript library that allows you to create and manage tabs dynamically on the fly. This library gives the ability to your application to act like browser tabs, making dynamic tabs.
## Goals
LiveTabs is made by love to enrich web applications. It was first used in an RSS reader application called apaland.com to show different news in tabs at the same time.

### To use LiveTabs properly, do one of these:
1. create some links dynamically (eg. list of registered users) and each link/button can create a dynamic tab (eg. containing their profile info or settings). This can enable you to compare or check info immediately.
2. create a list of links that they will create dynamic tabs ( which can't be very exciting)

## Technologies
LiveTabs is created with:
+ Javascript 
+ Bootstrap 
+ HTML and CSS 

## Setup
To use LiveTabs do the following steps:
### Note : You should create dynamic links so that creating dynamic tabs becomes meaningful!

1. download suitable version of the LiveTab file ( LiveTabs.esm.js or LiveTabs.js )

* First method :

```HTML
<script src="LiveTabs.js"></script>

```

* Second method :
```javascript
import { LiveTabs } from LiveTabs.js
```
2. Make an instance of `LiveTabs` and set the `config`.
* `tabcontainer` is the div that holds the tabs.
* `tabContentContainer` is the div that holds the content related to each tab
* make a new instance of `LiveTabs`, pass the `config` and the name of the variable as a string for the second parameter 

```javascript
const config = {
    //name of the Tab div
    tabContainer :'liveTabs_Tabs',

    //name of the content div
    tabContentContainer:'LiveTabsContainer'
}
        

const NewTabs = new LiveTabs( config ,'NewTabs');
    
```
3. Prepare HTML codes for Tabs and contents related to the tabs. The id of the divs must match the `config` variable.

```HTML
<!--Tabs will be placed here-->
<ul class="nav nav-tabs" id="liveTabs_Tabs">
</ul>

<!--content of the tabs will be here-->
<div id="LiveTabsContainer">
</div> 
```
4. Create your links and use `createTab ( title , tabId , callback )` method. It takes 3 parameters . The first param is the title of the tab, the second param is a unique number given to each tab and its corresponding container, the third param is an optional callback function to run after the tab is created.You can use the callback function to populate the container with content taken from server or other contents.

### Note : You can create the links dynamically so that they create dynamic tabs or have some links and use them to create dynamic tabs.

```javascript
/*
* @param {string} title title of the tab
* @param {integer} tabId unique number for each tab
* @param {function} callback a callback function
*/


NewTabs.createTab( title , tabId , callback)

//example 1:
NewTabs.createTab('Title', 1 , ajaxContent('aboutPage' ,1 ));

//example 2:
 <li class="list-group-item"><a href="#" onclick="NewTabs.createTab('Trending Now!', 2 ,function(){ document.getElementById(config.tabContentContainer+2).text = 'Trending Now!';})">What's trending Now</a></li>
```
