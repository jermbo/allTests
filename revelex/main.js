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
    calcCost();
  })
  .fail(function (err) {
    console.error('Error ' + err.message);
  });


function renderHTML(data) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  var combined = $.map(data.sailings, function (obj, i) {

    return $.extend({}, obj, $.grep(data.cruise_lines, function (cruise) {
      return obj.sailing_cruise_line_id === cruise.cruise_line_id
    })[0]);
  });

  var html = template(combined);
  $('.content').append(html);
}


Handlebars.registerHelper('lowestPrice', function (prices) {
  return _.min(_.pluck(prices, 'sailing_price'));
});

Handlebars.registerHelper("setChecked", function (prices) {
  var lowest = _.min(_.pluck(prices, 'sailing_price'));
  if (this.sailing_price == lowest) {
    return "checked"
  } else {
    return "";
  }
});

$(document).on('change', '.form__input--radio', calcCost);

function calcCost() {
  console.log('calcCost');
  var total = 0;
  $('.form__input--radio').each(function () {
    if ($(this).is(':checked')) {
      console.log('cost : ' + $(this).data('cruise-cost'));
      total += $(this).data('cruise-cost');
      console.log('total during : ' + total);
    }
  });

  console.log('total final : ' + total);
  console.log('\n\n\n');

  $('.total').text( total );
}