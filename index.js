var twoPlayerBtn =
  document.querySelector("#twoPlayerBtn");

var onePlayerBtn =
  document.querySelector("#onePlayerBtn");

var soloPlayerBtn =
  document.querySelector("#soloPlayerBtn");

var twoPlayerMode =
  document.querySelector("#twoPlayerMode");

var onePlayerMode =
  document.querySelector("#onePlayerMode");

var soloPlayerMode =
  document.querySelector("#soloPlayerMode");

var modeSwitch =
  document.querySelector(".mode-switch");

var heading =
  document.querySelector("h1");

var image1 =
  document.querySelector(".img1");

var image2 =
  document.querySelector(".img2");

var randomNumber1 = 6;

var randomNumber2 = 6;

var player1Rolled = false;

var player2Rolled = false;

var imgPlayer =
  document.querySelector(".imgPlayer");

var imgComputer =
  document.querySelector(".imgComputer");

var playerNumber = 6;

var computerNumber = 6;

var imgSolo =
  document.querySelector(".imgSolo");

var soloNumber = 6;


function trackEvent(eventName, parameters) {
  if (typeof gtag === "function") {
    gtag("event", eventName, parameters);
  }
}


twoPlayerBtn.addEventListener(
  "click",
  function () {

    twoPlayerBtn.classList.add(
      "active"
    );

    onePlayerBtn.classList.remove(
      "active"
    );

    soloPlayerBtn.classList.remove(
      "active"
    );

    modeSwitch.classList.add(
      "player-two"
    );

    modeSwitch.classList.remove(
      "player-one",
      "player-solo"
    );

    twoPlayerMode.classList.remove(
      "hidden"
    );

    onePlayerMode.classList.add(
      "hidden"
    );

    soloPlayerMode.classList.add(
      "hidden"
    );

    heading.innerHTML =
      "Dicee";

    trackEvent(
      "game_mode_selected",
      {
        mode: "2_player"
      }
    );
  }
);


onePlayerBtn.addEventListener(
  "click",
  function () {

    onePlayerBtn.classList.add(
      "active"
    );

    twoPlayerBtn.classList.remove(
      "active"
    );

    soloPlayerBtn.classList.remove(
      "active"
    );

    modeSwitch.classList.add(
      "player-one"
    );

    modeSwitch.classList.remove(
      "player-two",
      "player-solo"
    );

    onePlayerMode.classList.remove(
      "hidden"
    );

    twoPlayerMode.classList.add(
      "hidden"
    );

    soloPlayerMode.classList.add(
      "hidden"
    );

    heading.innerHTML =
      "Dicee";

    trackEvent(
      "game_mode_selected",
      {
        mode: "1_player"
      }
    );
  }
);


soloPlayerBtn.addEventListener(
  "click",
  function () {

    soloPlayerBtn.classList.add(
      "active"
    );

    twoPlayerBtn.classList.remove(
      "active"
    );

    onePlayerBtn.classList.remove(
      "active"
    );

    modeSwitch.classList.add(
      "player-solo"
    );

    modeSwitch.classList.remove(
      "player-two",
      "player-one"
    );

    soloPlayerMode.classList.remove(
      "hidden"
    );

    twoPlayerMode.classList.add(
      "hidden"
    );

    onePlayerMode.classList.add(
      "hidden"
    );

    heading.innerHTML =
      "Solo Dice";

    trackEvent(
      "game_mode_selected",
      {
        mode: "solo"
      }
    );
  }
);


function checkTwoPlayerWinner() {

  if (
    !player1Rolled ||
    !player2Rolled
  ) {
    return;
  }

  var result;

  if (
    randomNumber1 >
    randomNumber2
  ) {

    result = "player_1";

    heading.innerHTML =
      "Player 1 Wins! 🎉";

  }

  else if (
    randomNumber2 >
    randomNumber1
  ) {

    result = "player_2";

    heading.innerHTML =
      "Player 2 Wins! 🎉";

  }

  else {

    result = "draw";

    heading.innerHTML =
      "Draw!";

  }

  trackEvent(
    "game_completed",
    {
      mode: "2_player",
      result: result,
      player_1_score: randomNumber1,
      player_2_score: randomNumber2
    }
  );

  player1Rolled = false;
  player2Rolled = false;
}


function checkOnePlayerWinner() {

  var result;

  if (
    playerNumber >
    computerNumber
  ) {

    result = "player";

    heading.innerHTML =
      "You Win! 🎉";

  }

  else if (
    computerNumber >
    playerNumber
  ) {

    result = "computer";

    heading.innerHTML =
      "Computer Wins! 🤖";

  }

  else {

    result = "draw";

    heading.innerHTML =
      "Draw!";

  }

  trackEvent(
    "game_completed",
    {
      mode: "1_player",
      result: result,
      player_score: playerNumber,
      computer_score: computerNumber
    }
  );
}


function rollDice(
  image,
  callback,
  analyticsData
) {

  image.classList.remove(
    "roll"
  );

  void image.offsetWidth;

  image.classList.add(
    "roll"
  );

  var randomNumber =
    Math.floor(
      Math.random() * 6
    ) + 1;

  trackEvent(
    "dice_roll",
    {
      mode: analyticsData.mode,
      player: analyticsData.player,
      result: randomNumber
    }
  );

  setTimeout(
    function () {

      image.setAttribute(
        "src",
        "images/dice" +
          randomNumber +
          ".png"
      );

      callback(
        randomNumber
      );

    },
    300
  );
}


image1.addEventListener(
  "click",
  function () {

    rollDice(
      image1,
      function (number) {

        randomNumber1 =
          number;

        player1Rolled =
          true;

        checkTwoPlayerWinner();

      },
      {
        mode: "2_player",
        player: "player_1"
      }
    );

  }
);


image2.addEventListener(
  "click",
  function () {

    rollDice(
      image2,
      function (number) {

        randomNumber2 =
          number;

        player2Rolled =
          true;

        checkTwoPlayerWinner();

      },
      {
        mode: "2_player",
        player: "player_2"
      }
    );

  }
);


imgPlayer.addEventListener(
  "click",
  function () {

    trackEvent(
      "game_started",
      {
        mode: "1_player"
      }
    );

    rollDice(
      imgPlayer,
      function (number) {

        playerNumber =
          number;

        setTimeout(
          function () {

            rollDice(
              imgComputer,
              function (number) {

                computerNumber =
                  number;

                checkOnePlayerWinner();

              },
              {
                mode: "1_player",
                player: "computer"
              }
            );

          },
          150
        );

      },
      {
        mode: "1_player",
        player: "player"
      }
    );

  }
);


imgSolo.addEventListener(
  "click",
  function () {

    rollDice(
      imgSolo,
      function (number) {

        soloNumber =
          number;

        heading.innerHTML =
          "You rolled " +
          number +
          "! 🎲";

        trackEvent(
          "solo_game_completed",
          {
            mode: "solo",
            result: number
          }
        );

      },
      {
        mode: "solo",
        player: "solo"
      }
    );

  }
);