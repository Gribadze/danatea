const highlight = () => {
    const headingLetters = $(".logo-heading span");
    let letterIndex = 0;
    let highlightInt = setInterval(() => {
        $(".logo-heading span.highlighted").removeClass('highlighted');
        if (letterIndex === headingLetters.length) {
            letterIndex = 0;
            clearInterval(highlightInt);
        } else {
            $(`.logo-heading span:nth-child(${++letterIndex}`).addClass('highlighted');
        }
    }, 400);
    setTimeout(hightlight, 10000);
}

$(() => {
    hightlight();
});