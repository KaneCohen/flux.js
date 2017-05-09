# Flux.js

Bring color temeperature management to the web. Adjust website color palette according to how light or dark it is  
outside for the user. When night comes it is much better if screen is adjusted to a warmer color temperature so it  
wouldn't be blindingly bright at 11PM.

## Example

View live [example here](https://kanecohen.github.io/fluxjs).

## How to use

Install library either via npm `npm install flux.js` and load it via `var Flux = require('flux.js');`.  

Download minified library from [github](https://raw.githubusercontent.com/KaneCohen/flux.js/master/dist/flux.min.js) and inject it into your page.
Injected script will make Flux library available as a global class.
````html
<script src="flux.min.js"></script>
````

Initialize and immediately adjust color temperature of the page.

````js
var flux = new Flux().adjustTemperature();
````

Live color adjustment. Every minute Flux will try to detect change in day lighting - if that happens it will adjust  
page color temperature accordingly.

````js
var flux = new Flux();
setInterval(function() {
  flux.adjustTemperature();
}, 60000);
````
