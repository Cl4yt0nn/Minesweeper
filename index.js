if (localStorage.getItem("flags") == null) {
    localStorage.setItem("flags",10);
}
let flagStorageCount = localStorage.getItem("flags");
document.getElementById("flags").innerHTML = "x" + flagStorageCount;
document.getElementById("flagGet").value = localStorage.getItem("flags")

let letterArr = ["a","b","c","d","e","f","g","h","i","j"];
let id = "";
let numDisp = 0;
let correctFlag = 0;
let gameOver = false;
setMines();
function setMines() {
    for (let i = 0; i != flagStorageCount; i++) {
        id = letterArr[Math.round(Math.random() * 9)] + "" + Math.round(Math.random() * 9);
        if (document.getElementById(id).className == "square mine") {
            i--;
        } else {
            if (document.getElementById(id).id == "d3" || document.getElementById(id).id == "e3" || document.getElementById(id).id == "f3" || document.getElementById(id).id == "g3" || document.getElementById(id).id == "d4" || document.getElementById(id).id == "e4" || document.getElementById(id).id == "f4" || document.getElementById(id).id == "g4" || document.getElementById(id).id == "d5" || document.getElementById(id).id == "e5" || document.getElementById(id).id == "f5" || document.getElementById(id).id == "g5" || document.getElementById(id).id == "d6" || document.getElementById(id).id == "e6" || document.getElementById(id).id == "f6" || document.getElementById(id).id == "g6") {
                i--;
            } else {
                document.getElementById(id).className = "square mine";
            }
        }
    }
}

function numDisplay(a,n) {
    if (gameOver == false) {
        let selected = document.getElementById(letterArr[a] + n);
        if (selected.innerHTML == "") {
            if (selected.className == "square mine") {
                alert("You stepped on a mine. Game Over.");
                for (let q = 0; q < document.getElementsByClassName("square mine").length; q++) {
                    document.getElementsByClassName("square mine")[q].innerHTML = '<i class="fa-solid fa-land-mine-on" style="color:red !important;"></i>';
                }
                gameOver = true;
            } else {
                if (selected.innerHTML != '<i class="fa-solid fa-flag"></i>') {
                    if (n != 0) {
                        //Up
                        if (document.getElementById(letterArr[a] + "" + (n-1)).className == "square mine") {
                            numDisp++;
                        }
                    }
                    if (n != 9) {
                        //Down
                        if (document.getElementById(letterArr[a] + "" + (n+1)).className == "square mine") {
                            numDisp++;
                        }
                    }
                    if (a != 0) {
                        //Left
                        if (document.getElementById(letterArr[a-1] + "" + n).className == "square mine") {
                            numDisp++;
                        }
                    }
                    if (a != 9) {
                        //Right
                        if (document.getElementById(letterArr[a+1] + "" + n).className == "square mine") {
                            numDisp++;
                        }
                    }
                    if (n != 0 && a != 0) {
                        //Up Left
                        if (document.getElementById(letterArr[a-1] + (n-1)).className == "square mine") {
                            numDisp++;
                        }
                    }
                    if (n != 9 && a != 0) {
                        //Down Left
                        if (document.getElementById(letterArr[a-1] + "" + (n+1)).className == "square mine") {
                            numDisp++;
                        }
                    }
                    if (n != 0 && a != 9) {
                        //Up Right
                        if (document.getElementById(letterArr[a+1] + "" + (n-1)).className == "square mine") {
                            numDisp++;
                        }
                    }
                    if (n != 9 && a != 9) {
                        //Down Right
                        if (document.getElementById(letterArr[a+1] + "" + (n+1)).className == "square mine") {
                            numDisp++;
                        }
                    }
                    if (numDisp == 0) {
                        selected.style.color = "#737373";
                    } else if (numDisp == 1) {
                        selected.style.color = "#289bcc";
                    } else if (numDisp == 2) {
                        selected.style.color = "#41cc28";
                    } else if (numDisp == 3) {
                        selected.style.color = "#cc2828";
                    } else if (numDisp == 4) {
                        selected.style.color = "#7528cc";
                    } else if (numDisp == 5) {
                        selected.style.color = "#bccc28";
                    } else if (numDisp >= 6) {
                        selected.style.color = "#cc289b";
                    }
                    if (numDisp == 0) {
                        //ADD IF STATEMENTS THAT CHECK IF THE SQUARE HAS BEEN UNCOVERED OR NOT AT THE BEGINNING OF THE FUNCTION
                        if (n != 0) {
                            //Up
                            setTimeout(numDisplay,1,a,(n-1));
                        }
                        if (n != 9) {
                            //Down
                            setTimeout(numDisplay,2,a,(n+1));
                        }
                        if (a != 0) {
                            //Left
                            setTimeout(numDisplay,3,(a-1),n);
                        }
                        if (a != 9) {
                            //Right
                            setTimeout(numDisplay,4,(a+1),n);
                        }
                        if (n != 0 && a != 0) {
                            //Up Left
                            setTimeout(numDisplay,5,(a-1),(n-1));
                        }
                        if (n != 9 && a != 0) {
                            //Down Left
                            setTimeout(numDisplay,5,(a-1),(n+1));
                        }
                        if (n != 0 && a != 9) {
                            //Up Right
                            setTimeout(numDisplay,7,(a+1),(n-1));
                        }
                        if (n != 9 && a != 9) {
                            //Down Right
                            setTimeout(numDisplay,8,(a+1),(n+1));
                        }
                    }
                    selected.innerHTML = numDisp;
                    numDisp = 0;
                    checkForDub();
                }
            }
        }
    }
}

addEventListener('contextmenu', (event)=>{
    event.preventDefault();
});

let filledTileCount = 0;
let flagCount = flagStorageCount;
function func(t) {
    if (gameOver == false) {
        if (document.getElementById(t).innerHTML == '') {
            if (flagCount != 0) {
                document.getElementById(t).style.color = "red !important";
                document.getElementById(t).innerHTML = '<i class="fa-solid fa-flag"></i>';
                flagCount--;
            }
        } else if (document.getElementById(t).innerHTML == '<i class="fa-solid fa-flag"></i>') {
            document.getElementById(t).innerHTML = '';
            document.getElementById(t).style.color = "#737373";
            flagCount++;
        }
        document.getElementById("flags").innerHTML = " x" + flagCount;
        if (flagCount == 0) {
            for (let u = 0; u != flagStorageCount; u++) {
                if (document.getElementsByClassName("square mine")[u].innerHTML == '<i class="fa-solid fa-flag"></i>') {
                    correctFlag++;
                }
            }
            checkForDub();
        }
    }
}

function checkForDub() {
    if (correctFlag == flagStorageCount) {
        filledTileCount = 0;
        for (let m = 0; m < 100; m++) {
            if (document.getElementsByClassName("square")[m].innerHTML != "") {
                filledTileCount++;
                if (filledTileCount == 100) {
                    alert("You Won!");
                    gameOver = true;
                }
            }
        }
    } else {
        correctFlag = 0;
    }
}
let settingsOpen = false;
function openSettings() {
    if (settingsOpen == false) {
        document.getElementsByClassName("gamegrid")[0].style.display = "none";
        document.getElementById("settingsMenu").style.display = "grid";
        settingsOpen = true;
    } else {
        document.getElementsByClassName("gamegrid")[0].style.display = "grid";
        document.getElementById("settingsMenu").style.display = "none";
        settingsOpen = false;
    }
}

let classCleared = false;
addEventListener('click',(event)=>{
    if (classCleared == false) {
        for (let o = 3; o != -1; o--) {
            document.getElementsByClassName("begGlow")[o].className = "square";
        }
        classCleared = true;
    }
});

let hoveredId = undefined;
addEventListener('mousemove',(event)=>{
    let h = document.elementFromPoint(event.clientX,event.clientY);
    if (h.className == "fa-solid fa-flag") {
        hoveredId = h.parentElement.id;
    } else {
        hoveredId = h.id;
    }
});
addEventListener('keydown',(event)=>{
    if (event.key == "F" || event.key == "f") {
        func(hoveredId);
    }
});

function updateFlagCount() {
    let count = Number(document.getElementById("flagGet").value);
    if (count < 1) {
        count = 1;
    } else if (count > 84) {
        count = 84;
    }
    localStorage.setItem("flags",count);
    location.reload();
}
