export default function ColorBlock({hex, clickHandler} : {hex: string, clickHandler: () => void}){
    return (
        <div className="color-block" data-hex={hex} onClick={clickHandler} style={{backgroundColor: hex}}>
        </div>
    );
}
