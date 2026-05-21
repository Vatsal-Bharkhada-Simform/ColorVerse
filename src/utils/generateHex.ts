// Function to generate random six-digit hex codes which will be used as color codes
// "padStart" assures that the generated output has 6 characters and add a padding if not. 
// "16777215" is the maximum decimal value a six-digit hex number can have.
// Hence we generate a random number in this range and convert it to hex code to get the color.

export function generateHex(): string{
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, 'F');
}