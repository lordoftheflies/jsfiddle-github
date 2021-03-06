
/**
 * Observes master map events to control the second one
 *
 * @param  {H.Map} firstMap  A HERE Map instance within the application
 *  @param  {H.Map} secondMap  A HERE Map instance within the application
 */

function synchronizeMaps(firstMap, secondMap) {
  // get view model objects for both maps, view model contains all data and
  // utility functions that're related to map's geo state
  var viewModel1 = firstMap.getViewModel(),
      viewModel2 = secondMap.getViewModel();

  // set up view change listener on interactive map
  firstMap.addEventListener('mapviewchange', function() {
    // on every view change take a "snapshot" of a current geo data for
    // interactive map and set this values to the second, non-interactive, map
    viewModel2.setCameraData(viewModel1.getCameraData());
  });
}

/**
 * Boilerplate map initialization code starts below:
 */

// initialize communication with the platform
var platform = new H.service.Platform({
  app_id: 'DemoAppId01082013GAL',
  app_code: 'AJKnXv84fjrb0KIHawS0Tg',
  useCIT: true,
  useHTTPS: true
});
var defaultLayers = platform.createDefaultLayers();

// set up containers for the map

var mapContainer = document.createElement('div');
var staticMapContainer = document.createElement('div');

mapContainer.style.height = '300px';

staticMapContainer.style.position = 'absolute';
staticMapContainer.style.width = '600px';
staticMapContainer.style.height = '300px';

document.getElementById('map').appendChild(mapContainer);
document.getElementById('panel').appendChild(staticMapContainer);

// initialize a map, this map is interactive
var map = new H.Map(mapContainer,
  defaultLayers.normal.map,{
  center: {lat: 53.430, lng: -2.961},
  zoom: 7
});

// initialize a map that will be synchronised
var staticMap = new H.Map(staticMapContainer,
  defaultLayers.normal.map,{
  center: {lat: 53.430, lng: -2.961},
  zoom: 7
});

// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
// create beahvior only for the first map
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


// Now use the map as required...
synchronizeMaps(map, staticMap);

$('head').append('<link rel="stylesheet" href="https://js.api.here.com/v3/3.0/mapsjs-ui.css" type="text/css" />');
