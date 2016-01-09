(function () {


  this.Modal = function (opts) {

    this.closeButton = null;
    this.modal = null;
    this.overlay = null;


    var defaults = {
      className: '',
      closeButton: true,
      content: '',
      maxWidth: 600,
      minWidth: 250,
      overlay: true,
      tweenTime: 0.35,
      tweenType: 'scaleUp',
      easeType: 'Back.easeOut',
      buttonText: {
        confirm: 'Confirm',
        deny : 'Deny',
        cancel : 'Cancel'
      }
    };

    if (opts && typeof opts === 'object') {
      this.options = extendDefaults(defaults, opts);
    }
  };

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }


  Modal.prototype.open = function () {

    console.log(this.options);
    _buildOut.call(this);

  };


  function _buildOut() {

    var $body = $('body');
    var content;
    var contentHolder;
    var docFrag;

    if (typeof this.options.content === 'string') {
      content = this.options.content;
    } else {
      content = this.options.content.innerHTML;
    }

    docFrag = $('<div/>').addClass('doc ' + this.options.className).append(content);
    docFrag.css({
      'max-width': this.options.maxWidth + 'px',
      'min-width': this.options.minWidth + 'px'
    });

    if (this.options.closeButton === true) {
      var close = $('<button/>').addClass('close--button').text('x');
      docFrag.append(close);
    }

    if (this.options.overlay === true) {
      var overlay = $('<div/>').addClass('overlay ' + this.options.className);
      $body.append(overlay);
      TweenMax.from(overlay, this.options.tweenTime - 0.1, {opacity: 0, ease: Linear.easeNone})
    }


    $body.append(docFrag);
    switch (this.options.tweenType) {
      case 'scaleUp' :
        TweenMax.from(docFrag, this.options.tweenTime, {scale: 0, opacity: 0, ease: this.options.easeType});
        break;
      case 'scaleDown' :
        TweenMax.from(docFrag, this.options.tweenTime, {scale: 5, opacity: 0, ease: this.options.easeType});
        break;
      case 'fromLeft' :
        TweenMax.from(docFrag, this.options.tweenTime, {left: -500, ease: this.options.easeType});
        break;
      case 'fromRight' :
        TweenMax.from(docFrag, this.options.tweenTime, {left: '100%', ease: this.options.easeType});
        break;
      case 'fromTop' :
        TweenMax.from(docFrag, this.options.tweenTime, {top: -500, ease: this.options.easeType});
        break;
      case 'fromBottom' :
        TweenMax.from(docFrag, this.options.tweenTime, {top: '100%', ease: this.options.easeType});
        break;
    }

  }

})();
