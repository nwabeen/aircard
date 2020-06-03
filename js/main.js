
var wallpaperQRzone = new Image();
wallpaperQRzone.crossOrigin = "Anonymous";
var ImageData;
var __awesome_qr_base_path = "js/vendor/awesome-qr"; 
var sx = 362;
var sy = 840;
var sWidth = 400;
var meCard = `MECARD:N:Doe,John;TEL:021345678;EMAIL:john.doe@example.com;;`;
var c;
var ctx;
function updateMeCard() {
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var name = document.getElementById("name").value;
    var fname = NameParse.parse(name).firstName;
    var lname = NameParse.parse(name).lastName;
    meCard = `MECARD:N:${lname},${fname};TEL:${phone};EMAIL:${email};;`;
    generateQR();
}
  function saveCanvas() {
    var cvsImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    window.location.href=cvsImage; 
}
function generateQR() {
    var imageCropped = new Image();
    imageCropped.crossOrigin = "Anonymous";
          require([__awesome_qr_base_path + '/awesome-qr'], function (AwesomeQR) {

                imageCropped.onload = () => {
                  AwesomeQR.create({
                  text: meCard,
                  size: sWidth,
                  margin: 0,
                  autoColor: false,
                  dotScale: 0.2,
                  colorDark: "#212121",
                  backgroundImage:imageCropped, 
                  bindElement: "qrcode",
                  });
                }
                imageCropped.src = wallpaperQRzone.src;  
          });
    }
    var qrResult = document.getElementById("qrcode")
    qrResult.onload = function() {
    ctx.drawImage(qrResult, sx, sy);
  }
window.onload = function() {
  
      /***********************************/
    /****---------- CANVAS ----------***/
    /***********************************/
  
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    var wallpaper = new Image();  
    wallpaper.src = 'img/wallpaper.png';

    wallpaper.addEventListener('load', function() {
    ctx.drawImage(wallpaper, 0, 0);
    }, false);
        
    wallpaper.onload = function(){
        ImageData = ctx.getImageData(sx, sy, sWidth, sWidth);
        // https://media.prod.mdn.mozit.cloud/attachments/2012/07/09/980/e236f95da8b16024a9be65484b533023/Canvas_drawimage.jpg
        wallpaperQRzone.src = getImageURL(ImageData, sWidth, sWidth);
        function getImageURL(imgData, width, height) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            ctx.putImageData(imgData, 0, 0);
            return canvas.toDataURL(); //image URL
        }
    }
    generateQR();
}