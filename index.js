$(document).ready(function () {
    const holes = [...document.querySelectorAll('.hole')];
    let score = 0;
    let timer = null;
    let durationOfGame = null;
    let gameOver = false;
    const sound = new Audio("assets/assets_smash.mp3");
    const music = new Audio("assets/music.mp3");
    music.loop = true;
    const finalMusic = new Audio("assets/end.mp3");


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
    // $(window).on('load', function () {
    //     music.play();
    // })
    $(music).on('canplaythrough', () => {
        music.play();
    });


    function random() {
        if (gameOver) {
            return;
        }
        const i = Math.floor(Math.random() * holes.length);
        const time = Math.floor(Math.random() * (1500 - 550 + 1) + 550)
        const hole = holes[i];

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
            if (!gameOver) {
                random()
            }
        }, time)

    }
    // Créer la div dialog
    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Rejouer: {
                text: "Rejouer",
                class: "custom-button",
                click: function () {
                    $(this).dialog("close");
                    score = 0;
                    $("h1 span").text(score);
                    gameOver = false;
                    random();
                    endOfParty();
                },
            },
            Quitter: {
                text: "Quitter",
                class: "custom-button",
                click: function () {
                    finalMusic.play();
                    $(this).dialog("option", "title", "Nouveau titre");
                    $(this).html("<p class='final_text'>Au revoir et à bientôt pour de nouvelles aventure !</p>");
                    $(this).dialog("option", "buttons", {});
                },
            },
        }

    });

    // Appeler la fonction endOfParty()
    function endOfParty() {
        if ($(".mole")) {
            $(".mole").remove();
        }
        durationOfGame = setTimeout(() => {
            gameOver = true;
            clearTimeout(timer);
            $("#finalscore").text(score);
            $("#dialog").dialog("open");
        }, 20000);

    }

    random()
    endOfParty()
});
