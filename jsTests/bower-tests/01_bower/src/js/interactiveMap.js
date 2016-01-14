var InteractiveMap = (function (options) {
console.log( 'started maybe i should call init')

  var _config = {
    map: {
      div: '#map',
      lat: 25.798305,
      lng: -80.185966,
      zoom: 12,
      styles : [{"featureType":"water","stylers":[{"color":"#4eab9a"}]},{"featureType":"landscape","stylers":[{"color":"#fef4d0"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#e0d6b5"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#e99d47"},{"visibility":"simplified"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]}]
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

    console.log('what', _config.map );
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
      resetMap();
    });


    $locationArea.on('click', '.loc', function(e){
      console.log('id' + $(this).attr('id'));
      console.log('top' + $(this).attr('data-scroll-top'));
      console.log('map index : ', map.markers[$(this).attr('id')]);

      var $index = $(this).attr('id');

      position = map.markers[$index].getPosition();

      lat = position.lat();
      lng = position.lng();

      map.setCenter(lat, lng);
      map.setZoom(15);

    });

  }

  function updateDirectory( marker, i) {
    //console.log(marker);
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
    //console.log('toppong : ' +  (id.offset().top - 115));

    id.attr('data-scroll-top', topping);

    if (!isOpen) openCloseInfoBar();
  }

  function openCloseInfoBar() {
    ( isOpen ) ? mapAdjustTL.reverse().timeScale(4) : mapAdjustTL.play().timeScale(2);
    isOpen = !isOpen;
    //resetMap();
  }

  function resetMap(){
    map.setZoom(12);
    console.log(_config.map);
    console.log(options.map.lat, options.map.lng);
    //lat: ,
    //    lng: -80.185966,
    map.setCenter(25.798305, -80.185966 )
  }

  function removeMarkers() {
    map.removeMarkers();
    deleteDirectory();
    allMarkers = [];
  }



  init( options );

  return {
    makeMap: init,
    addMarkers: loadFile,
    removeMarkers: removeMarkers
  }
});