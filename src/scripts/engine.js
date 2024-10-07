const emojis = [
  '🇧🇷','🇧🇷','🇯🇵','🇯🇵','🇿🇦','🇿🇦','🇳🇴','🇳🇴','🇨🇦','🇨🇦','🇷🇴','🇷🇴','🇯🇲','🇯🇲','🇬🇧','🇬🇧'];

let openCards = [

];

let tentativas = 0;

let shuffleEmojis = emojis.sort( () => (Math.random() > 0.5) ? 2 : -1 )

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement('div')
  box.className = 'item'  
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  document.querySelector('.game').appendChild(box)
}

function playSound(soundName) {
  let audio = new Audio(`./src/audios/${soundName}.m4a`);
  audio.volume = 1;  
  audio.play();
}

function handleClick() {
  if (openCards.length < 2 && !this.classList.contains("boxOpen")) {
    this.classList.add("boxOpen");
    openCards.push(this)
  }

  if (openCards.length === 2) {
    tentativas += 1;
    setTimeout(checkMatch, 500);
  }
  document.querySelector('span').innerHTML = tentativas
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch")
    openCards[1].classList.add("boxMatch")
    playSound('ierrr')
  } else {
    openCards[0].classList.remove("boxOpen")
    openCards[1].classList.remove("boxOpen")
    playSound('errou')
  }

  openCards = []

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    alert("Você venceu com " + tentativas + " tentativas.")
  }
}
