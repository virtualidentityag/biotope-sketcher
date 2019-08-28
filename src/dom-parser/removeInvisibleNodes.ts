export const removeInvisibleNodes = (exclude: string[] = []) => {
    const nodes = Array.from(document.querySelectorAll('body *'));

    nodes.forEach(el => {
        const excluded = exclude.map(className => el.classList.contains(className)).indexOf(true);
        if (excluded > -1) {
            return;
        }
        const { height, opacity } = getComputedStyle(el);

        if (parseInt(height as string) <= 0 || Number(opacity) <= 0) {
            if(!el.parentNode) {
                return;
            }
            el.parentNode.removeChild(el);
        }
    })
}

export const removeNodes = (list: string[] = []) => {
    list.forEach(selector => {
        document.querySelectorAll(selector).forEach(node =>{
            if (!node.parentNode) {
                return;
            }
            node.parentNode.removeChild(node);
        })
    })
}
