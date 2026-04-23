let allChampionsObj;
let championsArray;
let currentChampionInputed;

fetch("https://ddragon.leagueoflegends.com/cdn/16.8.1/data/en_US/champion.json")
.then(response => {
    if (!response.ok) {
        throw new Error("Doslo je do greske");
    } 
    return response.json();
})
.then(data => {
    //console.log(data);
    allChampionsObj = data;
    //console.log(allChampionsObj);
    championsArray = Object.values(allChampionsObj.data);
    console.log(championsArray);
}).catch(error => {
    console.error("Greska, error");
});

function getSelectedChampion(selectedChampion) {
    let found = false;
    championsArray.forEach(champ => {
        if (champ.name == `${selectedChampion}`) {
            found = true;
            console.log(champ);
            document.getElementById("myH1").textContent = (`You picked ${selectedChampion}!`);
            //document.getElementById("h1Container").style.backdropFilter = "sepia(90%)";
            document.getElementById("myH1").style.color = "white";
            let nameTemp = document.getElementById("name");
            document.getElementById("champPick").style.color = "white";
            document.getElementById("champPick").style.backgroundColor = "hsla(0, 0%, 0%, 0.5)"; 
            nameTemp.textContent = champ.name;
            nameTemp.style.display = "block";
            nameTemp.style.color = "white";
            //postaviti blur, stilizovati tekst i slicno
            let titleTemp = document.getElementById("title");
            titleTemp.textContent = champ.title.charAt(0).toUpperCase() + champ.title.slice(1);;
            titleTemp.style.display = "block";
            titleTemp.style.color = "white";
            let blurbTemp = document.getElementById("blurb");
            blurbTemp.textContent = champ.blurb;
            blurbTemp.style.display = "block";
            blurbTemp.style.color = "white";
            let bodyTemp = document.body;
            bodyTemp.style.backgroundImage = `url("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg")`;
        }
    });
    if (!found) {
        document.getElementById("myH1").textContent = "That champion doesn't exist!";
        document.getElementById("myH1").style.color = "red";
        document.getElementById("name").style.display = "none";
        document.getElementById("title").style.display = "none";
        document.getElementById("blurb").style.display = "none";
        document.body.style.backgroundImage = `url("misc/death.png")`;
    }
}

function prepareText() {
    let inputContents = document.getElementById("championName");
    currentChampionInputed = inputContents.value;
    const temp = document.getElementById("championName");
    temp.value = "";
    temp.placeholder = "Pick another one!";
    currentChampionInputed = currentChampionInputed.trim().toLowerCase();
    let currentChampion = currentChampionInputed.charAt(0).toUpperCase() + currentChampionInputed.slice(1);
    let findApostrophe = currentChampion.indexOf("'");
    findApostrophe = Number(findApostrophe);
    if (findApostrophe >= 0) {
        let firstHalfApostorphe = currentChampion.slice(0, findApostrophe);
        let secondHalfApostrophe = currentChampion.slice(findApostrophe + 1).charAt(0).toUpperCase() + currentChampion.slice(findApostrophe + 1).slice(1);
        currentChampion = firstHalfApostorphe + "'" + secondHalfApostrophe;
    }
    let findSpace = currentChampion.indexOf(" ");
    if (findSpace >= 0) {
        let firstHalfSpace = currentChampion.slice(0, findSpace);
        let secondHalfSpace = currentChampion.slice(findSpace + 1).charAt(0).toUpperCase() + currentChampion.slice(findSpace + 1).slice(1);
        currentChampion = firstHalfSpace + " " + secondHalfSpace;
    }
    let firstThree = currentChampion.slice(0, 3);
    switch (firstThree) {
        case "Leb":
            currentChampion = currentChampion.slice(0, 2) + currentChampion.charAt(2).toUpperCase() + currentChampion.slice(3);
            break;
        case "Nun":
            currentChampion = currentChampion.slice(0, 7) + currentChampion.charAt(7).toUpperCase() + currentChampion.slice(8);
            break;
        case "Jar":
            currentChampion = currentChampion.slice(0, 8) + currentChampion.charAt(8).toUpperCase();
            break;
        case "Dr ":
            currentChampion = currentChampion.slice(0,2) + "." + currentChampion.slice(2);
            break;
        default:
            break;
    }
    console.log(currentChampion);
    getSelectedChampion(currentChampion);
    //za slike se gleda Bel'Veth->Belveth, tj id a ne name
}



