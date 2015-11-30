/*
 *  jfloatable  -  Floating never was so easy!
 *  ***********************************************************************
 *  Author:       Rob Cataneo - http://github.com/rottgoth
 *  Version:      1.0
 *  Source Code:  Github - https://github.com/rottgoth/jfloatable
 */

function jFloatable(selector, options) {
  var settings = {},
      defaults = {
        marginTop: 10,
        marginBottom: 10
      },
      windowListening = false,
      windowTop = 0;

  // function to update all elements on scroll
  function onScroll(event) {
    windowTop = this.scrollTop;
    var elements = window.document.querySelectorAll(selector);
    for(var i = 0, length = elements.length; i < length; i++) {
      var element = elements[i];
      floatElement.bind(element)();
    }
  }

  // function to add absolute position to element
  function positionAbsolute(element, top, left) {
    element.style.position = 'absolute';
    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }

  // function to add fixed position to element
  function positionFixed(element, top, left) {
    element.style.top = top + 'px';
    element.style.left = left + 'px';
    element.style.marginTop = '0';
    element.style.marginBottom = '0';
    element.style.marginLeft = '0';
    element.style.marginRight = '0';
    element.style.position = 'fixed';
  }

  // function to remove floating properties
  function clearElement(element) {
    element.style.marginLeft = '';
    element.style.marginRight = '';
    element.style.marginTop = '';
    element.style.marginBottom = '';
    element.style.position = '';
    element.style.top = '';
    element.style.left = '';
  }

  // function to handle each element position
  function floatElement() {
    var parentElement, parentTop, parentBottom, bottomOffset, bottomLimit, settingsLeft, settingsTop, settingsBottom;

    settingsLeft = parseInt(this.getAttribute('data-jf-left'));
    settingsTop = parseInt(this.getAttribute('data-jf-top'));
    settingsBottom = parseInt(this.getAttribute('data-jf-bottom'));

    parentElement = this.parentElement;
    parentTop = parentElement.offsetTop + settingsTop;
    parentBottom = parseInt(parentElement.offsetTop + parentElement.offsetHeight);

    bottomOffset = parentBottom - this.offsetHeight - settingsBottom;
    bottomLimit = bottomOffset - settingsTop;

    if (windowTop >= parentTop && windowTop < bottomLimit) {
      positionFixed(this, settingsTop, settingsLeft);
    } else if (windowTop >= bottomLimit) {
      positionAbsolute(this, bottomOffset, settingsLeft);
    } else {
      clearElement(this);
    }
  }

  // add initial attributes for each element
  function setup(element) {
    options = options || {};
    settings.marginTop = options.marginTop || defaults.marginTop;
    settings.marginBottom = options.marginBottom || defaults.marginBottom;

    element.setAttribute('data-jf-left', element.offsetLeft);
    element.setAttribute('data-jf-top', settings.marginTop);
    element.setAttribute('data-jf-bottom', settings.marginBottom);
  }

  // initial function to bind scrolling and setup elements
  return function() {
    if (typeof window !== 'undefined' && window) {
      if (!windowListening) {
        window.addEventListener('scroll', onScroll.bind(window.document.body), false);
        windowListening = true;
      }
      var elements = window.document.querySelectorAll(selector);
      for(var i = 0, length = elements.length; i < length; i++) {
        var element = elements[i];
        setup(element);
      }

      return {
        selector: selector,
        elements: elements
      };
    } else {
      throw new Error("jFloatable is only available to be used in the DOM");
    }
  }();
}

if (typeof module !== 'undefined' && module) {
  module.exports = jFloatable;
}

