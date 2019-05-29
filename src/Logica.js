class Logica {

    constructor(app) {
        this.app = app;

        this.ciudad = this.app.loadImage("/imagenes/CiudadPixel.png");
        this.manos = this.app.loadImage("imagenes/ManosPixels2.png");
        this.apuntador = this.app.loadImage("imagenes/apuntador2.png");
        this.fondo = this.app.loadImage("imagenes/fondo.png");
        this.bala = this.app.loadImage("imagenes/bala2.png");
        this.disparo = this.app.loadImage("imagenes/disparo.png");
        this.recargaPixel = this.app.loadImage("imagenes/recargaPixel.png");
        this.jugador1 = this.app.loadImage("imagenes/jugador1.png");
        this.jugador2 = this.app.loadImage("imagenes/jugador2.png");
        this.calabera = this.app.loadImage("imagenes/calaberaPixel.png");
        this.gana1 = this.app.loadImage("imagenes/gana1.png");
        this.gana2 = this.app.loadImage("imagenes/gana2.png");

        ///////// SE REPRODUZCA AC-DC UNA SOLA VEZ /////////
        this.miniContador = 0;
        ///////// CONTADOR BALAS /////////
        this.numeroBalas = 15;
        this.numeroBalas2 = 15;
        ///////// RECARGAR /////////
        this.miniContador2 = 0;
        ///////// Tiempo de recarga /////////
        this.tiempoRecarga = null;
        this.tiempoCarga = 0;
        this.hiloRecarga = this.hiloRecarga.bind(this);

        this.meEstoyRecargado = false;
        this.estoyDisparando = false;
        this.hayEmpate = false;
        this.tiempo = 60;
        this.tiempo2 = 60;
        this.cuentame = null;
        this.cuentame2 = null;
        this.misBalas = null;
        ///////// cuenta regresiva jugador /////////
        this.inicioJugador = null;
        this.inicioJugador2 = null;
        this.meCreas = null;

        this.regresiva = 6;
        this.regresiva2 = 4;
        this.contadorKills = 0;
        this.contadorKills2 = 0;

        this.hiloTiempo = this.hiloTiempo.bind(this);
        this.hiloTiempo2 = this.hiloTiempo2.bind(this);
        this.hiloJugador = this.hiloJugador.bind(this);
        this.hiloJugador2 = this.hiloJugador2.bind(this);
        this.crearEnemigo = this.crearEnemigo.bind(this);

        this.enemigo = [];
        for (let i = 0; i < this.enemigo.length; i++) {
            this.enemigo.push(new Enemigo(this.app, this.calabera, this));
        }
    }

    preload() {
        this.app.soundFormats('wav', 'mp3');
        this.balazo = this.app.loadSound('/imagenes/balazo.wav');
        this.musica = this.app.loadSound("/imagenes/Musica.wav");
        this.recarga = this.app.loadSound("/imagenes/Recargando.wav");
        this.welcome = this.app.loadSound("/imagenes/Welcome.wav");
        this.master = this.app.loadSound("/imagenes/masterCombo.wav");
        this.extreme = this.app.loadSound("/imagenes/ExtremeCombo.wav");
        this.grito = this.app.loadSound("/imagenes/grito.mp3");
        ///////// TIPOGRAFIA /////////
        this.tipo = this.app.loadFont("/imagenes/Minecraft.ttf");
        this.app.textFont(this.tipo);
    }

    pintar() {
        this.app.background(200, 200, 20);
        this.app.image(this.fondo, 0, 0);
        this.app.image(this.ciudad, -10, 230);
        this.app.fill(0);
        this.app.rect(0, 0, 10000, 50);
        this.app.fill(255);
        this.app.image(this.bala, 1230, 5);
        this.app.textSize(37);

        for (let i = 0; i < this.enemigo.length; i++) {
            const ene = this.enemigo[i];
            ene.pintar(this.enemigo[i]);
            ene.mover(17);
        }

        if (this.estoyDisparando) {
            this.app.image(this.disparo, this.app.mouseX - 210, 220)
        }

        this.app.image(this.manos, this.app.mouseX - 540, 410);
        this.app.fill(255, 255, 255);
        //this.app.text("mouseX:" + this.app.mouseX + ", mouseY:" + this.app.mouseY, this.app.mouseX, this.app.mouseY);

        if (this.tiempo > 0) {
            this.app.text("TIEMPO: " + this.tiempo, 50, 40);
            this.app.text("x " + this.numeroBalas, 1265, 40);
        }

        this.app.imageMode(this.app.CENTER);
        this.app.image(this.apuntador, this.app.mouseX, this.app.mouseY);
        this.app.imageMode(this.app.CORNER);

        ///////// RECARGA /////////
        if (this.numeroBalas == 0) {
            this.meEstoyRecargado = true;
        }

        if (this.numeroBalas2 == 0) {
            this.meEstoyRecargado = true;
        }

        if (this.meEstoyRecargado && this.tiempoCarga < 3) {
            this.app.image(this.recargaPixel, 280, 300);
            this.miniContador2 = 1;
        } else { this.meEstoyRecargado = false }

        if (this.tiempoCarga == 3) {
            this.numeroBalas = 15;
            this.numeroBalas2 = 15
        }

        if (this.meEstoyRecargado) {
            this.estoyDisparando = false;
        }

        if (this.app.mouseIsPressed && this.numeroBalas > 0) {
            this.estoyDisparando = true;

        } else { this.estoyDisparando = false }

        if (this.app.mouseIsPressed && this.numeroBalas2 > 0) {
            this.estoyDisparando = true;
        } else { this.estoyDisparando = false }

        this.app.fill(253, 219, 0);
        this.app.text("JUGADOR 1: " + this.contadorKills, 450, 40);
        this.app.text("JUGADOR 2: " + this.contadorKills2, 770, 40);


        if (this.regresiva >= 0) {
            this.app.fill(253, 219, 0);
            this.app.textSize(100);
            this.app.text(this.regresiva, 663, 410);
            this.app.image(this.jugador1, 380, 220);
            this.estoyDisparando = false;
            this.numeroBalas = 15;
        }

        if (this.tiempo == 0) {
            this.app.fill(253, 219, 0);
            this.app.textSize(100);

            if (this.regresiva2 >= 0) {
                this.app.text(this.regresiva2, 663, 410);
                this.app.image(this.jugador2, 380, 220);
                this.estoyDisparando = false;
                this.numeroBalas2 = 15;
            }
            this.app.fill(255);
            this.app.textSize(37);
            this.app.text("TIEMPO: " + this.tiempo2, 50, 40);
            this.app.text("x " + this.numeroBalas2, 1265, 40);
        }

        if (this.tiempo2 == 0) {
            if (this.contadorKills > this.contadorKills2 && this.hayEmpate == false) {
                this.app.image(this.gana1, 280, 200);
            } else {
                if (this.hayEmpate == false) {
                    this.app.image(this.gana2, 280, 200);
                }
            }

            if (this.contadorKills == this.contadorKills2) {
                this.hayEmpate = true;
                console.log(this.hayEmpate);
                this.app.textSize(200);
                this.app.text("EMPATE", 300, 400);
            }
        }
        //console.log(this.app.mouseIsPressed);
    }

    click() {
        ///////// CONDICION BALAS /////////
        if (this.numeroBalas > 0 && this.tiempo != 0) {
            this.numeroBalas--;
            this.balazo.play();
        }
        this.miniContador++;
        if (this.numeroBalas2 > 0 && this.tiempo2 != 0) {
            this.numeroBalas2--;
            this.balazo.play();
        }
        for (let i = 0; i < this.enemigo.length; i++) {
            const miEne = this.enemigo[i];
            let meMataron = miEne.validar(this.app.mouseX, this.app.mouseY);

            if (meMataron && this.meEstoyRecargado == false && this.tiempo > 0) {
                this.enemigo.splice(i, 1);
                this.grito.play();
                this.contadorKills++;
            }

            if (meMataron && this.meEstoyRecargado == false && this.regresiva2 <= 0) {
                this.enemigo.splice(i, 1);
                this.grito.play();
                this.contadorKills2++;
            }

            if (this.contadorKills == 30) {
                this.master.play();
            }

            if (this.contadorKills2 == 30) {
                this.master.play();
            }

            if (this.contadorKills == 80) {
                this.extreme.play();
            }

            if (this.contadorKills2 == 80) {
                this.extreme.play();
            }
        }
    }

    startTiempo() {
        this.cuentame = setInterval(this.hiloTiempo, 1000);
    }

    startTiempo2() {
        this.cuentame2 = setInterval(this.hiloTiempo2, 1000);
    }

    startCarga() {
        this.tiempoRecarga = setInterval(this.hiloRecarga, 1000);
    }

    startRegresiva() {
        this.inicioJugador = setInterval(this.hiloJugador, 1000);
    }

    startRegresiva2() {
        this.inicioJugador2 = setInterval(this.hiloJugador2, 1000);
    }

    startEnemigo() {
        this.meCreas = setInterval(this.crearEnemigo, 300);
    }

    hiloTiempo() {
        if (this.regresiva < 0) {
            if (this.tiempo > 0) {
                this.tiempo--;
            }
        }
    }

    hiloTiempo2() {
        if (this.regresiva2 < 0) {
            if (this.tiempo2 > 0) {
                this.tiempo2--;
            }
        }
    }

    hiloRecarga() {
        if (this.meEstoyRecargado) {
            this.tiempoCarga++;
        }
        if (this.tiempoCarga == 1) {
            this.recarga.play();
        }
        if (this.meEstoyRecargado == false) {
            this.tiempoCarga = 0;
        }

        if (this.regresiva2 == 3) {
            this.recarga.play();
        }
    }

    hiloJugador() {
        this.regresiva--;

        if (this.regresiva == 0) {
            this.musica.play();
        }

        if (this.regresiva == 2) {
            this.welcome.play();
        }
    }

    hiloJugador2() {
        if (this.tiempo == 0) {
            this.regresiva2--;
        }
    }

    crearEnemigo() {
        if (this.regresiva < 0) {
            this.enemigo.push(new Enemigo(this.app, this.calabera, this))
        }

        if (this.tiempo2 == 0) {
            clearInterval(this.meCreas);
        }

    }
}