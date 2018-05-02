export const getWidthHeight = () => {
    let image = document.querySelector(".world-map");
    let theCSSpropWidth = window.getComputedStyle(image,null).getPropertyValue("width");
    let imageWidth = parseInt(theCSSpropWidth);
    let varHeight = imageWidth/2;
    let suffix = 'px';
    document.documentElement.style.setProperty("--height", varHeight + suffix);
    let theCSSpropHeight = window.getComputedStyle(image,null).getPropertyValue("height");
    let imageHeight = parseInt(theCSSpropHeight);
    let listHeight = imageHeight - 100;
    document.documentElement.style.setProperty("--listHeight", listHeight + suffix);
    let heightDevider = imageHeight/100;
    let widthDevider = imageWidth/100;
    return { heightDevider, widthDevider }
}

