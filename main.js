
let container = document.getElementById("container");
let searchbtn = document.getElementsByClassName("search-btn")[0];
let infocontains = document.getElementById('info-contains');
let inputsearch = document.getElementById("search-input");
let sound = new Audio();
let holds;
searchbtn.addEventListener("click", () => {
    holds = inputsearch.value;
    let arr=new Array();
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${holds}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            infocontains.innerHTML = ` <div class="word">
        <h4>${holds}</h4>
        <button class="btn" onclick="playSound()"><i class="fas fa-volume-up"></i></button>
        </div>
        <div class="details">
            <p class="details-pera">${data[0].meanings[0].partOfSpeech || ""}</p>
            <p class="details-pera1">${data[0].phonetic || ""}</p>
        </div>
        <div class="meaning">
            <p class="meaning-pera">${data[0].meanings[0].definitions[0].definition}</p>
           <div class="synonyms-pera">
            <p class="synonyms"><span>${data[0].meanings[0].synonyms}</span></p>
           </div>
            </div>
        <div class="sentence">
            <p class="sentence-pera">${data[0].meanings[0].definitions[0].example ||""}</p>
        </div>`; 
        for(let i in data[0].phonetics){
            arr[i]=data[0].phonetics[i].audio;
         //   console.log(data[0].phonetics[i].audio);
        }
           for(let i in data[0].phonetics){
            sound.setAttribute("src", `${data[0].phonetics[i].audio || data[0].phonetics[1].audio}`);
            console.log(sound)   
           }
        })
        .catch(() => {
              if (inputsearch.value == '') {
                 infocontains.innerHTML = `<p class='error'>Field cannot be empty!</p>`;
             }
             else {
                  infocontains.innerHTML = `<p class='error'>please check spelling!</p>`;
             }
          })
        inputsearch.value='';
});
function playSound() {
    sound.play();
}
