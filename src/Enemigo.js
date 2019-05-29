class Enemigo {

    constructor(app, imageEnemigo, logica) {
        this.app = app;
        this.imageEnemigo = imageEnemigo;
        this.logica = logica;
        this.x = this.app.random(-100, 0);
        this.y = this.app.random(52, 700);
        this.velocidad = 0
    }

    pintar(i) {
        this.app.image(i.imageEnemigo, this.x, this.y);
    }

    mover(velocidad) {
        this.x += velocidad;
    }

    validar(unX, unY) {
        let resultado = this.app.dist(this.x + 30, this.y, unX, unY) < 120;
        if (resultado) {
            return true
        } else { return false }
    }

}