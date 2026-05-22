function debounce<T, Args extends unknown[]>(
    fn: (this: T, ...args: Args) => void, 
    delay: number
){
    let lastTimer: number = 0;
    return function (this: T, ...args: Args){
        clearTimeout(lastTimer);
        lastTimer = setTimeout(() => fn.apply(this, args), delay);
    }
}

export { debounce };
