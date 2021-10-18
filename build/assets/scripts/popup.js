// popup show and hide

let listButtons = document.querySelectorAll('.promotions__popup-link');
let popupContainer = document.getElementById('promotions__popup');
// console.log(popupContainer);
listButtons.forEach(function (item){
    let id = item.dataset.stockId;
    let data = new FormData();
    data.append('ID',id);
    item.addEventListener('click', () => {
        fetch('/api/get_stocks.php',{
            method:'POST',
            body: data
        }).then(response => response.text())
            .then(result => popupContainer.innerHTML = result);
        console.log(popupContainer);
    })

})


document.addEventListener('DOMContentLoaded', () => {

    const popupLinks = document.querySelectorAll('.promotions__popup-link');
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding')

    let unlock = true;

    const timeout = 800;

    if (popupLinks && body && lockPadding && unlock && timeout) {
        if(popupLinks.length > 0) {
            for(let index = 0; index < popupLinks.length; index++) {
                const popupLink = popupLinks[index];
                popupLink.addEventListener("click", function (e) {
                    const popupName = popupLink.getAttribute('href').replace('#', '');
                    const currentPopup = document.getElementById(popupName);
                    popupOpen(currentPopup);
                    e.preventDefault;
                });
            }
        };

        function popupOpen(currentPopup) {
            if (currentPopup && unlock) {
                const popupActive = document.querySelector('.promotions__popup._active');
                if(popupActive) {
                    popupClose(popupActive, false);
                } else {
                    bodyLock();
                }
                currentPopup.classList.add('_active');
                currentPopup.addEventListener("click", function (e) {
                    if(!e.target.closest('.promotions__popup-content')) {
                        popupClose(e.target.closest('.promotions__popup'));
                    }
                })
            }
        };

        const popupCloseIcon = document.querySelectorAll('.close-popup');

        if(popupCloseIcon.length > 0) {
        	for(let index = 0; index < popupCloseIcon.length; index++) {
        		const el = popupCloseIcon[index];

        		el.addEventListener("click", function (e) {
        			popupContainer.classList.remove('_active')
        			e.preventDefault;
        		})

        	}
        };

        function popupClose (popupActive, doUnlock = true) {
            if (unlock) {
                popupActive.classList.remove('_active');
                if (doUnlock) {
                    bodyUnlock();
                }
            }
        };

        function bodyLock() {
            const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

            if(lockPadding.length > 0) {
                for(let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = lockPaddingValue;
                }
            }
            body.style.paddingRight = lockPaddingValue;
            body.classList.add('_lock');

            unlock = false;
            setTimeout(function () {
                unlock = true;
            }, timeout);
        };

        function bodyUnlock() {
            setTimeout(function() {
                if (lockPadding.length > 0) {
                    for(let index = 0; index < lockPadding.length; index++) {
                        const el = lockPadding[index];
                        el.style.paddingRight = '0px';
                    }
                }
                body.style.paddingRight = '0px';
                body.classList.remove('_lock');
            }, timeout);

            unlock = false;
            setTimeout(function () {
                unlock = true;
            }, timeout);
        };

        document.addEventListener('keydown', function (e) {
            if (e.key === "Escape") {
                const popupActive = document.querySelector('.promotions__popup._active');
                popupClose(popupActive);
            }
        });
    };
});
