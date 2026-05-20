export default function ColorBlock({hex, clickHandler}){
    return (
        <div className="color-block" onClick={clickHandler} style={{backgroundColor: hex}}>
        </div>
    );
}