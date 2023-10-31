const slices = document.querySelectorAll(".slice");
let focus = document.getElementById("focus");
let stage = document.getElementById("stage");
let preview = true;

//display each slice with animation after the DOM loads
window.onload = () => {
    slices.forEach((slice, i) => {
        setTimeout(() => {
            slice.classList.add("active");
            //add opacity 1 to each slice
            slice.style.opacity = 1;
        }, (6-i) * 500);
    });
    setTimeout(() => {
        slices.forEach(s => s.classList.remove("active"));
        focus.classList.add("active");
        preview = false;
    }, 3750);
}


slices.forEach(slice => {
    slice.addEventListener("mouseover", () => {
        if (preview) return;
        slices.forEach(s => s.classList.remove("active"));
        slice.classList.add("active");
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
