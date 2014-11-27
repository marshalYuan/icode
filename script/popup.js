var init;

init = function() {
  var convert;
  convert = function(e) {
    var content, wrapper;
    content = document.getElementById('content').value;
    wrapper = document.getElementById('qrcode_wrapper');
    wrapper.textContent = "";
    new QRCode(wrapper, {
      text: content,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    e.preventDefault();
    return false;
  };
  return document.querySelector('form button').addEventListener('click', convert, false);
};

(function(document) {
  return document.addEventListener('DOMContentLoaded', init, false);
})(document);
