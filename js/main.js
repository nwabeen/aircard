
          var wallpaperQRzone = new Image();
          wallpaperQRzone.crossOrigin = "Anonymous";
          var ImageData;
          var __awesome_qr_base_path = "js/vendor/awesome-qr"; 
          var sx = 160;
          var sy = 500;
          var sWidth = 400;
          var meCard = `MECARD:N:Doe,John;TEL:021345678;EMAIL:john.doe@example.com;;`;
          var c;
          var ctx;
          var actualDevice = "iPhone 6, 6s, 7, 8";
          var wallpaperFromDevice = "img/iphone8.jpg";
          var saveButton = document.getElementById("saveButton");
          var selectiPhone = document.getElementById("iphone-select");

              el("uploadedImage").addEventListener("change", readImage, false);
              saveButton.addEventListener("click",function() {
            saveCanvas("canvas")
            }, false);
            selectiPhone.addEventListener("change",function() {
          deviceFromRes(selectiPhone.value);
          setSize();
          displayCanvas();
          generateQR();
          }, false);
          function updateMeCard() {
              var email = document.getElementById("email").value;
              var phone = document.getElementById("phone").value;
              var name = document.getElementById("name").value;
              var fname = NameParse.parse(name).firstName;
              var lname = NameParse.parse(name).lastName;
              meCard = `MECARD:N:${lname},${fname};TEL:${phone};EMAIL:${email};;`;
              generateQR();
          }
          var iOSver = iOSversion();
          var isiOS = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

          function saveCanvas(idCanvas) {
              const nomFile = "aircard.jpeg";
              const canvas = document.getElementById(idCanvas);
              let dataImage;
                  if (canvas.msToBlob) {
                dataImage = canvas.msToBlob();
                // affiche l'invite d'enregistrement
                window.navigator.msSaveBlob(dataImage, nomFile);
              }
            
              else {
                const lien = document.createElement("A");
                dataImage = canvas.toDataURL("image/jpeg");
        
           

                if (iOSver[0] <= 13) {
                 lien.target = "_blank";

                  
                 }
                if(iOSver[0] >= 13 || !isiOS) {
                  lien.download = nomFile;
                  dataImage = dataImage.replace("image/jpeg", "image/octet-stream");
                 }
                 lien.href = dataImage;

                console.dir(dataImage);
                document.body.appendChild(lien);
                lien.click();
                document.body.removeChild(lien);
                 }

          }
          function deviceFromRes(res) {
            switch (res) {
              case '750 1334':
                  actualDevice = "iPhone 6, 6s, 7, 8";
                  wallpaperFromDevice = "img/iphone8.jpg";
                  break;
              case '1242 2208':
                  actualDevice = " iPhone 6+,6s+,7+,8+";
                  wallpaperFromDevice = "img/iphone8+.jpg";
                  break;
              case '1125 2436':
                  actualDevice = " iPhone 11 Pro, X, Xs";
                  wallpaperFromDevice = "img/iphoneX.jpg";
                  break;
              case '828 1792':
                  actualDevice = " iPhone 11, Xr";
                  wallpaperFromDevice = "img/iphone11.jpg";

                  break;
              case '1242 2688':
                  actualDevice = " iPhone 11 Pro Max, Xs Max";
                  wallpaperFromDevice = "img/iphone11promax.jpg";
                  break;
              break;
              default:
              actualDevice = "iPhone 6, 6s, 7, 8";
              wallpaperFromDevice = "img/iphone8.jpg";

              }

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
              setSize();
              displayCanvas();
          generateQR();
            }
                /***********************************/
              /****---------- CANVAS ----------***/
              /***********************************/
              

              function setSize() {
                var selectedIPhone = document.getElementById("iphone-select").value.split(" ");
                console.log(selectedIPhone);
                var resx = selectedIPhone[0];
                var resy = selectedIPhone[1];
                      var canvas = document.getElementById("canvas");  
                canvas.width = resx;
                canvas.height = resy;
              }

              function displayCanvas() {
                    c = document.getElementById("canvas");
                    ctx = c.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    var wallpaper = new Image();  
                    wallpaper.src = wallpaperFromDevice;

                    wallpaper.addEventListener('load', function() {
                    ctx.drawImage(wallpaper, 0, 0);
                    }, false);
                        wallpaper.onload = function(){
                    cutCanvas();
                    }
              }
           
          function cutCanvas() {
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
              function el(id){return document.getElementById(id);} // Get elem by ID

              function readImage() {
                if ( this.files && this.files[0] ) {
                  var FR= new FileReader();
                  FR.onload = function(e) {
                     var img = new Image();
                     img.addEventListener("load", function() {
                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                     ctx.drawImage(img, 0, 0);
                    generateQR();
                    cutCanvas();
                     });
                     img.src = e.target.result;
                  };       
                  FR.readAsDataURL( this.files[0] );
                }
              }

              function iOSversion() {
                if (/iP(hone|od|ad)/.test(navigator.platform)) {
                  // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
                  var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                  return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
                }
                else { return false; }
                }

            