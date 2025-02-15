// ==UserScript==
// @name         🎬 Kinopoisk to Sspoisk 🚀
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Автоматически меняет кнопку на "Смотреть" и перенаправляет на sspoisk.ru
// @author       mrash4r
// @match        *://www.kinopoisk.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function modifyButton() {
        let button = document.evaluate(
            '//*[@id="__next"]/div[1]/div[2]/main/div[1]/div[2]/div/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div[2]/div/button',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        if (button && !button.dataset.modified) {
            button.innerText = "🎥 Смотреть бесплатно";
            button.style.backgroundColor = "#ff6600";
            button.style.color = "#ffffff";
            button.style.fontWeight = "bold";
            button.style.borderRadius = "8px";
            button.style.padding = "10px 20px";
            button.style.transition = "0.3s";

            button.onmouseover = () => button.style.backgroundColor = "#ff4500";
            button.onmouseout = () => button.style.backgroundColor = "#ff6600";

            button.dataset.modified = "true";
            button.addEventListener("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                let newUrl = window.location.href.replace("kinopoisk.ru", "sspoisk.ru");
                window.location.href = newUrl;
            });
        }
    }

    // Используем MutationObserver для отслеживания изменений, но не запускаем modifyButton бесконечно
    let observer = new MutationObserver(() => {
        modifyButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('load', modifyButton);
})();
