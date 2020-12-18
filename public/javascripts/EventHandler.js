"use strict";
import GameEnviroment from "./GameEnviroment.js";
/**
 * Event handling class
 */

export default class EventHandler {

    /**
     * @constructor
     */
    constructor() {

        EventHandler.#handlePlayButton();
        EventHandler.#handleBetButton();

    }

    /**
     * @returns {void}
     */

    static #handlePlayButton() {
        document.getElementById('playBtn').addEventListener('click', async function () {
            document.getElementById(`playBtn`).style = "display: none";
            new GameEnviroment(1, false);
        });
    }

    static #handleBetButton() {
        document.getElementById('betBtn').addEventListener('click', async function () {
            document.getElementById(`betOrQuit`).style = "display: none";
            document.getElementById(`enterBet`).style = "dislay: block";
        });
    }


    /**
     * For disabling enter key
     * @returns {void}
     */
    // static #stopEnterKey() {
    //     document.addEventListener('keypress', function(event) {
    //         const theKey = event.key;
    //         if (theKey.length > 1) {
    //             if (theKey === 'Enter') {
    //                 EventHandler.#preventDefaults(event);
    //             }
    //         }
    //     });
    // }

    /**
     * For disabling default browser drag/drop behavior
     * @returns {void}
     */
    static #preventDefaults(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}