const { createReadStream } = require('fs');
const pako = require('pako');

export const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Function to compress base64 image data
export const compressImageData = (base64Image) => {
    // Convert base64 image to Uint8Array
    const uint8Array = Uint8Array.from(atob(base64Image), c => c.charCodeAt(0));
    // Compress the Uint8Array using pako
    const compressedUint8Array = pako.deflate(uint8Array);
    // Convert compressed Uint8Array back to base64
    const compressedImage = btoa(String.fromCharCode.apply(null, compressedUint8Array));
    return compressedImage;
}

