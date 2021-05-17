function filter(event) {

    event.preventDefault();
    let distance = document.querySelector('#distance').value;
    if (distance === "default_label") {
        distance = "*";
    }
    let toolType= document.querySelector('#typeFilter').value;
    if (toolType === "default_label") {
        toolType = "*";
    }
    let toolCat= document.querySelector('#categoryFilter').value;
    if (toolCat === "default_label") {
        toolCat = "*";
    }

    console.log(`type: ${toolType}, cat: ${toolCat}, dist: ${distance}`);
    const redirectUrl = `/search/type/${toolType}/category/${toolCat}/distance/${distance}`;
    window.location.replace(redirectUrl);
}

document
    .querySelector('#apply_filters')
    .addEventListener('click', filter);