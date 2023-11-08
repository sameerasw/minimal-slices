const slices = document.querySelectorAll(".slice");
let focus = document.getElementById("focus");
let stage = document.getElementById("stage");
let preview = true;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;
let text = document.getElementById("splash-text");

//display each slice with animation after the DOM loads
function animateSlices() {
    slices.forEach((slice, i) => {
        setTimeout(() => {
            slice.classList.add("active");
            //add opacity 1 to each slice
            slice.style.opacity = 1;
        }, (6-i) * 150);
    });
    setTimeout(() => {
        slices.forEach(s => s.classList.remove("active"));
        focus.classList.add("active");
        preview = false;
    }, 1500);
}

function textanimate (word) {
    let iterations = 0;
    const duration = 500 / word.length;

    //if the new word is the same as the old one, do nothing
    // if (text.innerText === word) return;

    //count and set the word length
    text.innerText = word.toUpperCase();

    clearInterval(interval);

    interval = setInterval(() => {
        text.innerText = text.innerText
        .split("")
        .map((letter,index) => {
            if(index < iterations){
                return word[index];
            }

            let final = letters[Math.floor(Math.random() * 26)];

            return final;

        })
        .join("");

        if (iterations > word.length) {
            clearInterval(interval);
            text.style.opacity = 1.0;
        } else {
            text.style.opacity = 0.5;
        }

        iterations += 1;
    } , duration);
}


slices.forEach(slice => {
    slice.addEventListener("mouseover", () => {
        if (preview) return;
        slices.forEach(s => s.classList.remove("active"));
        slice.classList.add("active");
        textanimate(slice.dataset.value,0);
    });
    
    slice.addEventListener("mouseout", () => {
        if (preview) return;
        slice.classList.remove("active");
        focus.classList.add("active");
    });

    slice.addEventListener("click", () => {
        if (!preview) {
            preview = true;
            stage.classList.add("clicked");
            //add inactive class to all but clicked slice
            slices.forEach(s => s.classList.add("inactive"));
            slice.classList.remove("inactive");
        } else {
            preview = false;
            stage.classList.remove("clicked");
            slices.forEach(s => s.classList.remove("inactive"));
            focus.classList.add("active");
        }
    });
});

window.onload = () => {
    textanimate("SAMEERA SANDAKELUM",7);

    //start animation after 2 seconds
    animateSlices();
}