export function generateHex(): string{
    return Array(6).fill(0).reduce((prev: string) => {
        prev = prev + Math.floor(Math.random() * 16).toString(16);
        return prev;
    }, "#");
}

console.log(generateHex())