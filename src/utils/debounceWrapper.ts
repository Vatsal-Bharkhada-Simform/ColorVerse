function debounce(fn, delay: number){
    let lastTimer: number = 0;
    return (...args) => {
        clearTimeout(lastTimer);
        lastTimer = setTimeout(() => fn.apply(this, args), delay);
    }
}

export { debounce };
