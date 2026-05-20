import ColorBlock from "../components/ColorBlock";
import { generateHex } from "../utils/generateHex";
import { useNavigate } from "react-router";

export default function Content(){
    const navigate = useNavigate();

    const blocks = [];

    const x = window.innerWidth;
    const y = window.innerHeight;
    const blockSideLength = 50;
    const blockCount = ((x/blockSideLength) * (y/blockSideLength)) * 5;
    
    for(let i = 0 ; i < blockCount ; i++){
        const hexCode = generateHex();
        blocks.push(<ColorBlock hex={hexCode} clickHandler = {() => navigate(`/palette/${hexCode}`)} />);
    }
    
    return (
        <main className="content__grid">
            {blocks}
        </main>
    )
}