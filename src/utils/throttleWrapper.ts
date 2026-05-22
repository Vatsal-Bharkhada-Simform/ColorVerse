function throttle<T, Args extends unknown[]>(
    func: (this: T, ...args: Args) => void, 
    delay: number
) {
    let lastCall = 0;
    return function (this: T, ...args: Args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            func.apply(this, args);
            lastCall = now;
        }
    };
}

export { throttle };
