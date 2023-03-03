$(document).ready(function () {
    const holes = [...document.querySelectorAll('.hole')];
    let score = 0;
    const sound = new Audio("assets/assets_smash.mp3");
    const music = new Audio("assets/music.mp3");


    window.addEventListener('mousemove', e => {
        $(".cursor").css("top", e.pageY + 'px');
        $(".cursor").css("left", e.pageX + 'px');
    })
    window.addEventListener('mousedown', () => {
        $(".cursor").addClass('active');
    })
    window.addEventListener('mouseup', () => {
        $(".cursor").removeClass('active');
    })
    $(window).on('load', function () {
        music.play();
    })


    function random() {
        const i = Math.floor(Math.random() * holes.length);
        const time = Math.floor(Math.random() * (1500 - 250 + 1) + 250)
        const hole = holes[i];
        let timer = null;

        const newImg = $("<img>")
        newImg.addClass('mole')
        newImg.attr('src', './assets/57098-transformed.png');

        newImg.click(function () {
            score += 1
            sound.play()
            $("h1 span").text(score);
            newImg.attr('src', './assets/transformed.png');
            newImg.css("width", "100%")
            clearTimeout(timer)
            setTimeout(() => {
                newImg.remove();
                random()
            }, time)
        })

        $(hole).append(newImg)

        timer = setTimeout(() => {
            newImg.remove();
            random()
        }, time)
    }
    function endOfParty() {
        let durationOfGame = setTimeout(() => {
            $(window).dialog({
                modal: true,
                buttons: {
                    Rejouer: function () {
                        $(this).dialog("close");
                        score = 0;
                        $("h1 span").text(score);
                        random();
                        endOfParty();
                    },
                    Quitter: function () {
                        $(this).dialog("close");
                    }
                }
            });
        }, 20000);
    }
    random()
    endOfParty()
});
