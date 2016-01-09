var interactiveMap = (function () {

  var _config = {
    map: {
      div: '#map',
      lat: 25.798305,
      lng: -80.185966,
      zoom: 12
    },
    buttonContainer: '.legend'
  };

  var map;
  var $locationArea;
  var allMarkers = [];

  var isOpen = false;

  var mapAdjustTL = new TimelineMax({paused: true});
  mapAdjustTL.to('#map-canvas', 1, {width: '73%', ease: Back.easeOut}, 'start')
    .from('.map-info', 1, {width: 0, autoAlpha: 0, ease: Back.easeOut}, 'start');


  function init(options) {
    _config = _.merge(_config, options);


    $locationArea = $(_config.directoryDiv);
    map = new GMaps(_config.map);
  }

  function loadFile(file) {
    console.log(file);
    $.ajax({
        url: file,
        dataType: 'json',
        type: 'GET'
      })
      .done(function (data) {
        addMarker(data);
      })
      .fail(function (error) {
        console.log('Error : ', error);
      });
  }

  function addMarker(data) {
    _.times(data.length, function (i) {
      var geoSplit = data[i].geolocation.split(',');
      var desc = '<h3>' + data[i].name + '</h3>';
      desc += '<p>Address : ' + data[i].address + '</p>';
      desc += ( data[i].phone != '') ? '<p>Phone : ' + data[i].phone + '</p>' : '';
      desc += ( data[i].website != '' ) ? '<p>Website : <a href="http://' + data[i].website + '" target="_blank">View Website</a></p>' : '';
      var singleMarker = map.addMarker({
        lat: geoSplit[0],
        lng: geoSplit[1],
        title: data[i].name,
        index : i,
        click: function (e) {
          updateDirectory(this, i);

        },
        infoWindow: {
          content: desc
        }
      });
      addToDirectory(desc, i);
      allMarkers.push(singleMarker);
    });

  }

  function updateDirectory( marker, i) {
    console.log(marker);
    $locationArea.children().removeClass('map-active');
    var $newLoc = $('#'+marker.index );
    $newLoc.addClass('map-active');
    var top = $newLoc.attr('data-scroll-top' ),
      move = parseInt( top ) - $newLoc.height();
    TweenLite.to($locationArea, 1.5, { scrollTo:{ y: move }, ease: Strong.easeOut } );
  }

  function deleteDirectory() {
    $locationArea.children().remove();
    openCloseInfoBar();
  }

  function addToDirectory(desc, i) {
    var newDesc = '<div class="loc" id="' + i + '">';
    newDesc += desc;
    newDesc += '</div>';
    $locationArea.append(newDesc);

    var id = $('#' + i),
      topping = (id.offset().top - 115);
    console.log('toppong : ' +  (id.offset().top - 115));

    id.attr('data-scroll-top', topping);

    if (!isOpen) openCloseInfoBar();
  }

  function openCloseInfoBar() {
    ( isOpen ) ? mapAdjustTL.reverse().timeScale(4) : mapAdjustTL.play().timeScale(2);
    isOpen = !isOpen;
    //resetMap();
  }


  function removeMarkers() {
    map.removeMarkers();
    deleteDirectory();
    allMarkers = [];
  }

  return {
    makeMap: init,
    addMarkers: loadFile,
    removeMarkers: removeMarkers
  }
})();