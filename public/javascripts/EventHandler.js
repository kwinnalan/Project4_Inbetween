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
        document.getElementById('playBtn').addEventListener('click', async function() {
             document.getElementById(`playBtn`).style = "display: none";
            new GameEnviroment(1,false);
        });
    }

    static #handleBetButton() {
        document.getElementById('betBtn').addEventListener('click', async function() {
            document.getElementById(`betOrQuit`).style = "display: none";
            document.getElementById(`enterBet`).style = "dislay: block";
        });
    }



    /**
     * @returns {void}
     */
    static #handleDropArea() {
        let dropArea = document.getElementById('dropArea');
        let dragArea = document.getElementById('dragArea');

        dropArea.addEventListener('drop', function(event) {
            EventHandler.#preventDefaults(event);
            event.dataTransfer.dropEffect = 'copy';
            let files = event.dataTransfer.files;
            dragArea.style.opacity = '0.6';
            for (let file of files) {
                if (file.name.match('.csv')) {
                    let reader = new FileReader();
                    reader.onload = async function() {
                        document.getElementById(`resultText`).innerText = await EventHandler.performFetch(file);
                    }
                    reader.readAsDataURL(file)
                }
            }
        }, false);

        dropArea.addEventListener('dragover', function(event) {
            EventHandler.#preventDefaults(event);
            event.dataTransfer.dropEffect = 'copy';
            dragArea.style.opacity = '1';
        }, false);

        dropArea.addEventListener('dragleave', function(event) {
            EventHandler.#preventDefaults(event);
            event.dataTransfer.dropEffect = 'copy';
            dragArea.style.opacity = '0.6';
        }, false);

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

    /**
     * @async
     * @returns {Promise<string>}
     */
    static async performFetch(dropped) {
        let data = new FormData();
        if (dropped) {
            data.append('file', dropped);
        } else {
            let file = document.getElementById('fileUpload');
            data.append('file', file.files[0]);
        }
        try {
            const response = await fetch(document.url, {
                method: 'POST',
                body: data,
                headers: {
                    'x-requested-with': 'fetch.0'
                }
            });
            return await response.text();
        } catch(error) {
            console.log(`ERROR: ${error}`);
        }
    }
}