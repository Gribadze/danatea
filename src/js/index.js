const highlight = (element) => {
    element.addClass('highlighted');
    setTimeout(() => element.removeClass('highlighted'), 800);
    // let highlightInt = setInterval(() => {
    //     $(".logo-heading span.highlighted").removeClass('highlighted');
    //     if (letterIndex === headingLetters.length) {
    //         letterIndex = 0;
    //         clearInterval(highlightInt);
    //     } else {
    //         $(`.logo-heading span:nth-child(${++letterIndex}`).addClass('highlighted');
    //     }
    // }, 400);
    // setTimeout(hightlight, 10000);
}

$(() => {
    const logoHeadingLetters = $(".logo-heading span");
    const brandHeadingLetters = $(".brand-heading span");
    
    const loopLogoHeading = () => {
        for(let i = 1; i <= logoHeadingLetters.length; i++) {
            setTimeout(() => {
                highlight($(`.logo-heading span:nth-child(${i})`))
            }, i*200);
        }
    };
    loopLogoHeading();
    setInterval(loopLogoHeading, 8000);
    
    const loopBrandHeading = () => {
        for(let i = 1; i <= brandHeadingLetters.length; i++) {
            setTimeout(() => {
                highlight($(`.brand-heading span:nth-child(${i})`))
            }, i*200);
        }
    };
    loopBrandHeading();
    setInterval(loopBrandHeading, 8000);
    
});