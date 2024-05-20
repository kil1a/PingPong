class MagicBallManager {
    _magicBallSelector = ""; // создаем переменную
    _img;
    _imgLeft;
    _imgTop;
    _ballSpeed = 15;
    _deltaX;
    _deltaY;
    _domRootElement = document.getElementsByTagName("body")[0];
    _isOutScreenWalls = false;

    /**
     * @property
     * @param isOutScreenWalls
     */
    setOutScreenWalls(isOutScreenWalls) {
        this._isOutScreenWalls = isOutScreenWalls;
    }

    /**
     * @property
     * @returns number
     */
    getBallSpeed(){
        return this._ballSpeed;
    }

    /**
     * @property
     * @param ballSpeed number
     */
    setBallSpeed(ballSpeed){
        this._ballSpeed = ballSpeed / 10;
    }

    setRandomDirection(){
        let angle = Math.random() * 2 * Math.PI; // Изменено на радианы
        this._deltaX = Math.cos(angle) * this._ballSpeed;
        this._deltaY = Math.sin(angle) * this._ballSpeed;
    }

    /**
     *
     * @param className string
     * @function
     */
    StartDom(className) { // публичный метод
        let imgs = document.getElementsByClassName(className);

        if (imgs.length !== 1) {
            console.error("MagicBallManager startDom. Wrong controllable images count");
            return;
        }

        this._img = imgs[0];
        this._imgLeft = Math.random() * (this._domRootElement.clientWidth - this._img.clientWidth); // Случайное начальное положение
        this._imgTop = Math.random() * (this._domRootElement.clientHeight - this._img.clientHeight); // Случайное начальное положение
        this.setRandomDirection();

        this._updateBallPosition();

        setInterval(() => this._MoveMagicBall(this), 100);
    }

    /**
     * @private
     * @function
     * @property _this MagicBallManager
     **/
    _MoveMagicBall(_this){
        _this._imgLeft += _this._deltaX;
        _this._imgTop += _this._deltaY;
        _this._updateBallPosition();

        if (_this._isOutScreenWalls){
            _this._MagicBallScreenBounce();
        }
    }

    _updateBallPosition() {
        const leftStyle = "left:" + this._imgLeft + "px";
        const topStyle = "top:" + this._imgTop + "px";
        this._img.setAttribute("style", leftStyle + ";" + topStyle);
    }

    /**
     * @function
     * @private
     */
    _MagicBallScreenBounce(){
        const imgWidth = this._img.clientWidth;
        const imgHeight = this._img.clientHeight;
        const maxX = this._domRootElement.clientWidth - imgWidth;
        const maxY = this._domRootElement.clientHeight - imgHeight;

        if (this._imgLeft < 0 || this._imgLeft > maxX) {
            this._deltaX *= -1;
            this._imgLeft = Math.max(0, Math.min(this._imgLeft, maxX)); // Обеспечить, чтобы мяч оставался в пределах
        }
        if (this._imgTop < 0 || this._imgTop > maxY) {
            this._deltaY *= -1;
            this._imgTop = Math.max(0, Math.min(this._imgTop, maxY)); // Обеспечить, чтобы мяч оставался в пределах
        }
    }
}

export default new MagicBallManager(); // экспортируем экземпляр класса MagicBallManager как подключаемый по умолчанию объект модуля
