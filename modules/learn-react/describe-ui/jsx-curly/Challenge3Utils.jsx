export function getImageUrl(baseUrl, person) {
    return baseUrl + person.imageId + person.imageSize + '.jpg'
}