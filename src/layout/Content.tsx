import { useEffect, useRef, useState, type ReactElement, type UIEventHandler } from "react";
import ColorBlock from "../components/ColorBlock";
import { generateHex } from "../utils/generateHex";
import { useNavigate } from "react-router";

export default function Content(){
    const navigate = useNavigate();
    
    const [blocks, setBlocks] = useState<ReactElement[]>([]);
    const [renderCount, setRenderCount] = useState(0);

    // Ref to store boolean flag across re-renders
    const renderRef = useRef(false);
    
    const x = window.innerWidth;
    const y = window.innerHeight;
    const blockSideLength = 50;

    // Calculate the number of blocks needed to create a carousel having four times the viewport height.
    const blockCount = Math.floor((x/blockSideLength) * (y/blockSideLength)) * 4;
    
    // Initial render
    // Add new color blocks to the carousel if "renderCount" changes.
    useEffect(() => {
        function renderBlocks(){
            const tempBlocks: ReactElement[] = [];
            for(let i = 0 ; i < blockCount ; i++){
                const hexCode = generateHex();              // Generate a unique hash(color)
                tempBlocks.push(<ColorBlock key={((renderCount*blockCount)+i+Date.now().toString())} hex={hexCode} clickHandler = {() => navigate(`/palette/${hexCode}`)} />);
            }
            setBlocks(prevBlocks => {
                return [...prevBlocks, ...tempBlocks];      // Append new blocks to the previous ones
            });
            return tempBlocks;
        }
        renderBlocks();
    }, [renderCount, blockCount, navigate]);

    // Handler to manage infinite scrolling
    const handleScroll:UIEventHandler<HTMLElement> = (e) => {
        const element = e.currentTarget;
        // If the scrolled content exceeds a calculated threshold, add new blocks
        if(element.scrollTop > element.scrollHeight * (1 - (1/((renderCount || 1)*2 + 1))) && !renderRef.current){
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