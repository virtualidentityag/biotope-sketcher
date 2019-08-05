export const fixPseudoElements = () => {
    // Hide old pseudo-elements during render
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");

    style.type = "text/css";
    style.appendChild(
        document.createTextNode(
            ".before-reset::before, .after-reset::after { content: none !important; }"
        )
    );
    head.appendChild(style);

    const allElements = document.querySelectorAll("body *");
    const pseudoElements = document.querySelectorAll("body .span-as-pseudo");

    // Remove old spans as pseudo-elements to handle multiple screen sizes
    if (pseudoElements) {
        Array.from(pseudoElements).map(el => el.remove());
    }

    allElements.forEach((element) => {
        // Remove reset so we can get the screen sizes pseudo-element styles
        if (element.className && typeof element.className === "string") {
            element.className = element.className.replace("before-reset", "");
            element.className = element.className.replace("after-reset", "");
        }

        const elementBeforeStyles = window.getComputedStyle(element, ":before");
        const elementAfterStyles = window.getComputedStyle(element, ":after");
        const elementBeforeContent = elementBeforeStyles.content;
        const elementAfterContent = elementAfterStyles.content;
        let newSpan;

        if (elementBeforeContent && elementBeforeContent !== "none") {
            newSpan = document.createElement("span");
            newSpan.className = "span-as-pseudo";
            newSpan.setAttribute("style", elementBeforeStyles.cssText);
            newSpan.innerHTML = elementBeforeContent.split('"').join("");
            element.className += " before-reset";
            element.prepend(newSpan);
        }

        if (elementAfterContent && elementAfterContent !== "none") {
            newSpan = document.createElement("span");
            newSpan.className = "span-as-pseudo";
            newSpan.setAttribute("style", elementAfterStyles.cssText);
            newSpan.innerHTML = elementAfterContent.split('"').join("");
            element.className += " after-reset";
            element.appendChild(newSpan);
        }
    });
};

export const fixVideoPoster = () => {
    const AllPageVideos: any[] = [].slice.call(document.querySelectorAll('video'));
    console.log('AllPageVid', AllPageVideos)
    AllPageVideos.forEach(element => {
        console.log('element', element)
        element.setAttribute('style', `
      background: url(${element.poster});
    `);
    });
};
