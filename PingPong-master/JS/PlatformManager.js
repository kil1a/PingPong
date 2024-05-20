class PlatformManager {
    /**
     *
     * @type {string}
     * @private
     */
    _playerPlatformId = undefined;
    /**
     *
     * @type {HTMLImageElement}
     * @private
     */
    _playerPlatform = undefined;
    /**
     *
     * @type {string}
     * @private
     */
    _opponentPlatformId = undefined;
    /**
     *
     * @type {HTMLImageElement}
     * @private
     */
    _opponentPlatform = undefined;
    /**
     *
     * @type {string}
     * @private
     */
    _targetId = undefined;
    /**
     *
     * @type {HTMLImageElement}
     * @private
     */
    _opponentTarget = undefined;
    /**
     *
     * @param {MouseEvent} event
     * @param {PlatformManager} _this
     * @private
     */
    _onMouseMove(event, _this){
        const topStyle = "top:" + (event.pageY - (150/2)) + "px"
        _this._playerPlatform.setAttribute("style", topStyle);
        //console.log("onMouseMove", event);
    }

    /**
     *
     * @param {MouseEvent} event
     * @param {PlatformManager} _this
     * @private
     */
    _opponentMove(_this){
        let targetTop = _this._opponentTarget.getAttribute("style");
        const topIndex = targetTop.indexOf("top:");
        const pxIndex = targetTop.indexOf("px", topIndex)
        targetTop = targetTop.slice(topIndex + 4, pxIndex)
        targetTop = Number(targetTop)
        const topStyle = "top:" + (targetTop + (50/2) - (150/2)) + "px"// центрируем панель относсительно центра шарика
        _this._opponentPlatform.setAttribute("style", topStyle);
        console.log("_opponentMove");
    }
    /**
     *
     * @param {string} id
     * @function
     */
    AddPlayerPlatform(id) {
        this._playerPlatformId = id;
        this._playerPlatform = document.getElementById(id);
    }

    /**
     *
     * @param {string} id
     * @function
     */
    AddOpponentPlatform(id) {
        this._opponentPlatformId = id;
        this._opponentPlatform = document.getElementById(id);
    }

    /**
     *
     * @param {string} id
     * @function
     */
    AddOpponentTarget(id) {
        this._targetId = id;
        this._opponentTarget = document.getElementById(id);
    }

    RegisterPageEvents(){
        document.getRootNode() // получить коренвой элемент DOM модели
            .addEventListener("mousemove", // подписываемся на событие mouemove
            /**
             * @param {MouseEvent} event
             */
            (event) => // анонимная(стрелочная) функция
                this._onMouseMove(event, this)// вызов _onMouseMove с замыканием на this
            )
    }


    StartOpponent() {
        setInterval(this._opponentMove, 500, this);
    }


}

export default new PlatformManager();