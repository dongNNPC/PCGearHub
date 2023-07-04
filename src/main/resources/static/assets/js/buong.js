/*js icon menu bar*/
function myFunction(x) {
    x.classList.toggle("change");
}

// ?jquery mobile
 (function($) {
          var $main_nav = $('#main-nav');
          var $toggle = $('.toggle');

          var defaultData = {
            maxWidth: false,
            customToggle: $toggle,
            // navTitle: 'All Categories',
            levelTitles: true,
            pushContent: '#container'
          };

          // add new items to original nav
          $main_nav.find('li.add').children('a').on('click', function() {
            var $this = $(this);
            var $li = $this.parent();
            var items = eval('(' + $this.attr('data-add') + ')');

            $li.before('<li class="new"><a>'+items[0]+'</a></li>');

            items.shift();

            if (!items.length) {
              $li.remove();
            }
            else {
              $this.attr('data-add', JSON.stringify(items));
            }

            Nav.update(true);
          });

          // call our plugin
          var Nav = $main_nav.hcOffcanvasNav(defaultData);

          // demo settings update

          const update = (settings) => {
            if (Nav.isOpen()) {
              Nav.on('close.once', function() {
                Nav.update(settings);
                Nav.open();
              });

              Nav.close();
            }
            else {
              Nav.update(settings);
            }
          };

          $('.actions').find('a').on('click', function(e) {
            e.preventDefault();

            var $this = $(this).addClass('active');
            var $siblings = $this.parent().siblings().children('a').removeClass('active');
            var settings = eval('(' + $this.data('demo') + ')');

            update(settings);
          });

          $('.actions').find('input').on('change', function() {
            var $this = $(this);
            var settings = eval('(' + $this.data('demo') + ')');

            if ($this.is(':checked')) {
              update(settings);
            }
            else {
              var removeData = {};
              $.each(settings, function(index, value) {
                removeData[index] = false;
              });

              update(removeData);
            }
          });
        })(jQuery);


        // end mobile
   $(".click-search").click(function (e) {
        e.preventDefault();
        $(this).parent().find('.nav-search').toggleClass('open');
     });

  
/*js home slider banner*/
$('#slider-home').owlCarousel({
    loop:true,
    margin:0,
    dots:false,
    nav:true,
    autoplay:true,
    autoplayTimeout:5000,
    autoplaySpeed:1500,
      navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});
 $('.slider-large').owlCarousel({
        items:1,
        loop:true,
        center:false,
        margin:10,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        nav:true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplaySpeed:1500,
       
    });
   $('.slider-small').owlCarousel({
        items:5,
        loop:true,
        center:false,
        margin:0,
        URLhashListener:true,
        autoplayHoverPause:true,
        startPosition: 'URLHash'
    });
   $('.slider-logo').owlCarousel({
      loop:true,
      margin:10,
      autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1000,
      nav:true,
       navText: ['<img src="images/prev.png" alt="">', '<img src="images/next.png" alt="">'],
      responsive:{
          0:{
              items:2
          },
          600:{
              items:3
          },
          1000:{
              items:8
          }
      }
  });


$('#product-sale-home').owlCarousel({
    loop:true,
    margin:0,
    dots:false,
    nav:true,
    autoplay:true,
    autoplayTimeout:5000,
    autoplaySpeed:1500,
      navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    responsive:{
        0:{
            items:2
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
});
 $(document).ready(function () {
  $(window).scroll(function () {
      if ($(this).scrollTop() != 0) {
          $('#btn-top').fadeIn();
      }
      else {
          $('#btn-top').fadeOut();
      }
  });
  $('#btn-top').click(function () {
      $('body,html').animate({scrollTop: 0}, 800);
  })
});
   $('.slider-large1').owlCarousel({
        items:1,
        loop:true,
        center:false,
        margin:10,
        nav:false,
       
    });
   $('.slider-small1').owlCarousel({
        items:4,
        loop:true,
        center:false,
        margin:10,
        URLhashListener:true,
        autoplayHoverPause:true,
        startPosition: 'URLHash'
    });
