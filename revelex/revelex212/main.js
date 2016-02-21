
  var cruiseData; // delete me before send to client
  $.ajax({
      method: 'GET',
      url: 'rvlx-test.json',
      beforeSend: function () {
        console.log('getting content');
      }
    })
    .done(function (data) {
      cruiseData = data[0]; // delete me before send to client
      renderHTML(data[0]);
      calcCost() //Add lowest radio values on page load
    })
    .fail(function (err) {
      console.error('Error ' + err.message);
    });

  function renderHTML(data){
    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var combined = $.map(data.sailings, function(obj, i) {

      return $.extend({}, obj, $.grep(data.cruise_lines, function(cruise) {
        //Join on ID
        return obj.sailing_cruise_line_id === cruise.cruise_line_id
      })[0]);
    });
    
    console.log(combined);

    var html    = template(combined);
    $('.content').append( html );
  }

  //Set lowest sailing price label
  Handlebars.registerHelper('lowest', function(prices) {
    var lowest = _.min(_.pluck(prices, 'sailing_price'));
    return lowest
  });

  //Set checked if lowest
  Handlebars.registerHelper ("setChecked", function (prices) {
    var lowest = _.min(_.pluck(prices, 'sailing_price'));
    //console.log(lowest);
    if ( this.sailing_price == lowest ) {
      return "checked"
    } else {
      return "";
    }
  });

  //Calculate Radio on change
  $(document).on('change', '.form__input--radio', calcCost);

  //Add Comma to thousands
  function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }

  function calcCost() {
    //console.log('calcCost');
    var total = 0;
    $('.form__input--radio').each(function () {
      if ($(this).is(':checked')) {
        //console.log('cost : ' + $(this).data('cruise-cost'));
        total += $(this).data('cruise-cost');
        //console.log('total during : ' + total);
      }
    });

    //console.log('total final : ' + total);
    //console.log('\n\n\n');
    var totalComma = commaSeparateNumber(total);
    //console.log(totalComma);
    $('.total').text( totalComma );
  }




