import LogUtils from "../utils/LogUtils";

export function InitialImageObj(height, width, type, fileName, fileSize, imagePath, imageUri, imageIsVertical, imageOriginalRotation, imageData) {
    this.height = height ? height : null,
        this.width = width ? width : null,
        this.type = type ? type : null,
        this.fileName = fileName ? fileName : null,
        this.fileSize = fileSize ? fileSize : null,
        this.path = imagePath ? imagePath : null,
        this.uri = imageUri ? imageUri : null,
        this.isVertical = imageIsVertical ? imageIsVertical : null,
        this.originalRotation = imageOriginalRotation ? imageOriginalRotation : null,
        this.data = imageData ? imageData : null
}

export function ImageObj(imageObj) {
    this.height = imageObj.height ? imageObj.height : null,
        this.width = imageObj.width ? imageObj.width : null,
        this.type = imageObj.type ? imageObj.type : null,
        this.fileName = imageObj.fileName ? imageObj.fileName : null,
        this.fileSize = imageObj.fileSize ? imageObj.fileSize : null,
        this.path = imageObj.path ? imageObj.path : null,
        this.uri = imageObj.uri ? imageObj.uri : null,
        this.isVertical = imageObj.isVertical ? imageObj.isVertical : null,
        this.originalRotation = imageObj.originalRotation != null ? imageObj.originalRotation : null,
        this.data = imageObj.data ? imageObj.data : null
}