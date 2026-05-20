import { useEffect, useRef, useState, type UIEventHandler } from "react";
import ColorBlock from "../components/ColorBlock";
import { generateHex } from "../utils/generateHex";
import { useNavigate } from "react-router";

export default function Content(){
    const navigate = useNavigate();
    
    const [blocks, setBlocks] = useState([]);
    const [renderCount, setRenderCount] = useState(0);
    const renderRef = useRef(false);
    
    const x = window.innerWidth;
    const y = window.innerHeight;
    const blockSideLength = 50;
    const blockCount = Math.floor((x/blockSideLength) * (y/blockSideLength)) * 4;
    
    useEffect(() => {
        function renderBlocks(){
            const tempBlocks = [];
            for(let i = 0 ; i < blockCount ; i++){
                const hexCode = generateHex();
                tempBlocks.push(<ColorBlock key={((renderCount*blockCount)+i+Date.now().toString())} hex={hexCode} clickHandler = {() => navigate(`/palette/${hexCode}`)} />);
            }
            setBlocks(prevBlocks => {
                return [...prevBlocks, ...tempBlocks];
            });
            return tempBlocks;
        }
        renderBlocks();
    }, [renderCount, blockCount, navigate]);

    const handleScroll:UIEventHandler<HTMLElement> = (e) => {
        const element = e.currentTarget;
        if(element.scrollTop > element.scrollHeight * (1 - (1/((renderCount || 1) + 1))/2) && !renderRef.current){
            setRenderCount(() => renderCount+1);

            renderRef.current = true;

            setTimeout(() => {
                renderRef.current = false;
            }, 300);
        }
    }
    
    return (
        <main className="content__grid" onScroll={handleScroll}>
            {blocks}
        </main>
    )
}