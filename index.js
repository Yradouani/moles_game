$(document).ready(function () {
    const holes = [...document.querySelectorAll('.hole')];
    let score = 0;
    let timer = null;
    let durationOfGame = null;
    let gameOver = false;
    let decompte = 20;
    let timerInterval;
    const sound = new Audio("assets/assets_smash.mp3");
    const music = new Audio("assets/music.mp3");
    music.loop = true;
    const finalMusic = new Audio("assets/end.mp3");

    let userInfos = JSON.parse(localStorage.getItem("userInfos")) || [];


    $(music).on('canplaythrough', () => {
        music.play();
    });
    $(document).ready(function () {
        $('#exampleModal').modal('show');
    });
    $('#submit').click(function () {

        let name = $('#name').val();
        let error = document.querySelector("#error");
        if (name !== "") {
            $(document).ready(function () {
                $('#exampleModal').modal('hide');
            });
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
            console.log($('#name').val())
            $('#gamer-name').text(name);
            function displayGame() {
                document.querySelector("#oldgame").innerHTML = "";
                if (userInfos !== []) {
                    console.log(userInfos.length)
                    let length = userInfos.length
                    for (let i = userInfos.length - 1; (i >= (userInfos.length - 6)) && i >= 0; i--) {
                        if (userInfos[i].name == name) {
                            document.querySelector("#oldgame").innerHTML += `
                            Date de la partie : ${userInfos[i].date}<br/>
                            Score : ${userInfos[i].score}<br/>
                            Heure : ${userInfos[i].time}<br/><br/><br/>
                          `;
                        }
                    }
                }
            }
            function countdown() {
                $('#timer').text(decompte);
                if (decompte === 0) {
                    clearInterval(timerInterval);
                    endOfParty();
                } else {
                    decompte--;
                }
            }

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
            if ($("#rejouer")) {
                $("#rejouer").click(function () {
                    $("#dialog").dialog("close");
                    score = 0;
                    $("h1 span").text(score);
                    gameOver = false;
                    decompte = 20;
                    timerInterval = setInterval(countdown, 1000);
                    random();
                    displayGame();
                    endOfParty();
                })
            }
            if ($("#quitter")) {
                $("#quitter").click(function () {
                    finalMusic.play();
                    $("#dialog").dialog("option", "title", "Nouveau titre");
                    $("#dialog").html("<p class='final_text'>Au revoir et à bientôt pour de nouvelles aventures !</p>");
                    $("#dialog").dialog("option", "buttons", {});
                })
            }
            $("#dialog").dialog({
                autoOpen: false,
                modal: true,
            });

            // Appeler la fonction endOfParty()
            function endOfParty() {
                if ($(".mole")) {
                    $(".mole").remove();
                }

                if (decompte === 0) {
                    gameOver = true;
                    clearTimeout(timer);
                    $("#finalscore").text(score);
                    $("#dialog").dialog("open");
                    let unformatedDate = new Date
                    let day = unformatedDate.getDate();
                    let month = unformatedDate.getMonth() + 1;
                    let year = unformatedDate.getFullYear().toString().slice(-2);

                    let hours = unformatedDate.getHours();
                    let minutes = unformatedDate.getMinutes();
                    let seconds = unformatedDate.getSeconds();
                    let gameInfos = {
                        name: name,
                        score: score,
                        date: `${day}/${month}/${year}`,
                        time: `${hours}:${minutes}:${seconds}`
                    };
                    userInfos.push(gameInfos)
                    localStorage.setItem("userInfos", JSON.stringify(userInfos));
                }
            }

            timerInterval = setInterval(countdown, 1000);
            displayGame()
            random()
            endOfParty()

        } else {
            error.innerHTML = "Entrer votre nom de joueur pour commencer la partie !"
            error.style.color = "black"
        }
    })
});
