/*
    jfloatable Plugin  -  Floating never was so easy!
    ***********************************************************************
    Author:       Roberto Cataneo - http://github.com/rottgoth
    Version:      0.1.beta
    License:      GPL - http://www.opensource.org/licenses/gpl-license.php
    Source Code:  Github - https://github.com/rottgoth/jfloatable

*/

(function($){
 $.fn.jfloatable = function(options) {

  var defaults = {
   container: '',
   marginTop: 0,
   marginBottom: 0
  };

  var options = $.extend(defaults, options);

  $(window).scroll(function(){
    var window_top = $(window).scrollTop();
    $('[floatable=true]').each(function(){
      $(this).data('window_top',  window_top);
      $(this).data('current_img_bottom', parseInt($(this).offset().top + $(this).height() + options.marginBottom));
      $(this).data('current_img_top', parseInt($(this).offset().top - options.marginTop));

      if($(this).data('parent').hasClass("floatable-top")) {
        if($(this).data('window_top') >= $(this).data('image_top')) {
          $(this).data('parent').removeClass('floatable-top');
          $(this).addClass('floatable-fixed');
          $(this).css({'position': 'fixed', 'top': '0'});
        } else {
          $(this).removeClass('floatable-fixed');
          $(this).data('parent').addClass('floatable-top');
          $(this).css({'position': 'absolute', 'top': '0', 'bottom': 'auto'});
          $(this).data('parent').css({'position': 'absolute', 'top': '0', 'bottom': 'auto'});
        }
      } else {
        if($(this).data('parent').hasClass('floatable-bottom')) {
          if($(this).data('window_top') < $(this).data('current_img_top')) {
            $(this).data('parent').removeClass('floatable-bottom');
            $(this).addClass('floatable-fixed');
            $(this).css({'position': 'fixed', 'top': '0', 'bottom': 'auto'});
          }
        } else {
          if($(this).data('window_top') < $(this).data('image_top')) {
            $(this).data('parent').addClass('floatable-top');
            $(this).data('parent').removeClass('floatable-bottom');
            $(this).removeClass('floatable-fixed');
            $(this).css({'position': 'absolute', 'top': '0', 'bottom': 'auto'}); //maybe add bottom
            $(this).data('parent').css({'position': 'absolute', 'top': '0', 'bottom': 'auto'});
          } else {
            if($(this).data('bottom_limit') <= $(this).data('current_img_bottom')) {
              $(this).data('parent').addClass('floatable-bottom');
              $(this).data('parent').removeClass('floatable-top');
              $(this).removeClass('floatable-fixed');
              $(this).css({'position': 'absolute', 'top': 'auto', 'bottom': '0'});
              $(this).data('parent').css({'position': 'absolute', 'top': 'auto', 'bottom': '0'});
            }
          }
        }
      }
    });
  });

  return this.each(function() {

    obj = $(this);
    obj.css({'margin-top': options.marginTop, 'margin-bottom': options.marginBottom, 'left': 'auto', 'rigth': 'auto'});
    parent = $('<div class="floating-container" style="position:absolute"></div>');
    $(obj).before(parent);
    parent.append($(obj));
    parent.addClass('floatable-top');
    if(options.container == '' || obj.closest(options.container).length == 0) {
      container = $(parent).parent();
    } else {
      container = obj.closest(options.container);
    }
    container.css({'position': 'relative'});
    obj.data('parent',parent);
    obj.data('container',container);
    
    obj.data('bottom_limit', parseInt($(container).offset().top + $(container).height()));
    obj.data('image_top', parseInt($(obj).offset().top - options.marginTop));
    if((obj.data('bottom_limit') - obj.data('image_top')) > $(obj).height()) {
      obj.attr('floatable','true');
    }

  });
 };
})(jQuery);
