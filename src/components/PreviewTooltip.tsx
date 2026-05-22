export default function PreviewTooltip({x, y, hex}: {x: number, y: number, hex: string}){
    return (
        <div className="hover-tooltip" style={{position: "fixed", top: y, left: x, transition: "all .3s ease"}}>
            <span className="color" style={{backgroundColor: hex}}></span>
            {hex}
        </div>
    );
}
