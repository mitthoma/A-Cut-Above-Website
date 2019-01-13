//animating page elements with animate.css

let scrollpos = window.scrollY


const header = document.querySelector(".stylist")
const header_height = header.offsetHeight

const header2 = document.querySelector(".stylist2")
const header2_height = header2.offsetHeight

const header3 = document.querySelector(".stylist3")
const header3_height = header3.offsetHeight

const header4 = document.querySelector(".table-striped")
const header4_height = header4.offsetHeight


const add_class_on_scroll = () => header.classList.add("fadeInLeft")
const remove_class_on_scroll = () => header.classList.remove("fadeInLeft")

const add_class2_on_scroll = () => header2.classList.add("fadeInUp")
const remove_class2_on_scroll = () => header2.classList.remove("fadeInUp")

const add_class3_on_scroll = () => header3.classList.add("fadeInRight")
const remove_class3_on_scroll = () => header3.classList.remove("fadeInRight")

const add_class4_on_scroll = () => header4.classList.add("fadeInUp")
const remove_class4_on_scroll = () => header4.classList.remove("fadeInUp")



window.addEventListener('scroll', function() { 
  scrollpos = window.scrollY;

  if (scrollpos >= header_height) { add_class_on_scroll() }
  else { remove_class_on_scroll() }

  console.log(scrollpos);
})

window.addEventListener('scroll', function() { 
  scrollpos = window.scrollY;

  if (scrollpos >= header2_height) { add_class2_on_scroll() }
  else { remove_class2_on_scroll() }

  console.log(scrollpos);
})

window.addEventListener('scroll', function() { 
  scrollpos = window.scrollY;

  if (scrollpos >= header3_height) { add_class3_on_scroll() }
  else { remove_class3_on_scroll() }

  console.log(scrollpos);
})

window.addEventListener('scroll', function() { 
  scrollpos = window.scrollY;

  if (scrollpos >= header4_height) { add_class4_on_scroll() }
  else { remove_class4_on_scroll() }

  console.log(scrollpos);
})




//smooth page scrolling -- jump.js
//full source code on Github

initSmoothScrolling();

function initSmoothScrolling() {
  if (isCssSmoothSCrollSupported()) {
    document.getElementById('css-support-msg').className = 'supported';
    return;
  }

  var duration = 400;

  delegatedLinkHijacking();
  //directLinkHijacking();

  function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);

    function onClick(e) {
      if (!isInPageLink(e.target))
        return;

      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
        callback: function() {
          setFocus(e.target.hash);
        }
      });
    }
  }

  function directLinkHijacking() {
    [].slice.call(document.querySelectorAll('a'))
      .filter(isInPageLink)
      .forEach(function(a) {
        a.addEventListener('click', onClick, false);
      });

    function onClick(e) {
      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
      });
    }

  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' &&
      n.hash.length > 0 &&
      stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function isCssSmoothSCrollSupported() {
    return 'scrollBehavior' in document.documentElement.style;
  }

  // Adapted from:
  // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }

}

function jump(target, options) {
  var
    start = window.pageYOffset,
    opt = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad
    },
    distance = typeof target === 'string' ?
    opt.offset + document.querySelector(target).getBoundingClientRect().top :
    target,
    duration = typeof opt.duration === 'function' ?
    opt.duration(distance) :
    opt.duration,
    timeStart, timeElapsed;

  requestAnimationFrame(function(time) {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration)
      requestAnimationFrame(loop)
    else
      end();
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function')
      opt.callback();
  }

  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

}
