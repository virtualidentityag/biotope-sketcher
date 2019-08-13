export const removeInvisibleNodes = (exclude: string[]) => {
    const nodes = Array.from(document.querySelectorAll('*'));

    nodes.forEach(el => {
        const excluded = exclude.map(className => el.classList.contains(className)).indexOf(true);
        if (excluded > -1) {
            return;
        }
        const calculatedStyle = getComputedStyle(el);

        if ((parseInt(calculatedStyle.height as string) <= 0 && parseInt(calculatedStyle.height as string) <= 0) 
        || Number(calculatedStyle.opacity) <= 0) {
            if(!el.parentNode) {
                return;
            }
            el.parentNode.removeChild(el);
        }
    })
}
