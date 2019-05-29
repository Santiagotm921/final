new p5(function (app) {

   let logica;

   app.setup = function () {

      logica = new Logica(app);
      logica.preload();
      app.createCanvas(1366, 768);

      logica.startTiempo();
      logica.startTiempo2();
      logica.startCarga();
      logica.startRegresiva();
      logica.startRegresiva2();
      logica.startEnemigo();

   }

   app.draw = function () {
      logica.pintar();
   }

   app.mousePressed = function () {
      logica.click();
      
   }
});

