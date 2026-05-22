import { useEffect, useState, type MouseEvent, type ReactElement, type UIEvent } from "react";
import ColorBlock from "../components/ColorBlock";
import { generateHex } from "../utils/generateHex";
import { useNavigate } from "react-router";
import { throttle } from "../utils/throttleWrapper";
import PreviewTooltip from "../components/PreviewTooltip";
import { debounce } from "../utils/debounceWrapper";

type ToolTipInfo = {
    x: number,
    y: number,
    belowElement: HTMLElement | null,
    hex: string | null
}

export default function Content(){
    const navigate = useNavigate();
    
    const [blocks, setBlocks] = useState<ReactElement[]>([]);
    const [renderCount, setRenderCount] = useState(0);
    const [tooltipInfo, setTooltipInfo] = useState<ToolTipInfo>({
        x: -1,
        y: -1,
        belowElement: null,
        hex: "#FFFFFF"
    });
    
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
    const handleScroll = (e: UIEvent) => {
        const element = e.currentTarget;

        // If the scrolled content exceeds a calculated threshold, add new blocks
        if(element.scrollTop > element.scrollHeight * (1 - (1/((renderCount || 1)*2 + 1)))){
            setRenderCount(() => renderCount+1);
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        const element: HTMLElement | null = e.target as HTMLElement;
        if(element === tooltipInfo.belowElement) return;
        setTooltipInfo({
            x: e.clientX, 
            y: e.clientY, 
            belowElement: element,
            hex: element?.getAttribute("data-hex")
        });
    }
    
    return (
        <main className="content__grid" onScroll={throttle(handleScroll, 300)} onMouseMove={debounce(handleMouseMove, 50)}>
            {(tooltipInfo.x !== -1 && tooltipInfo.y !== -1) ? <PreviewTooltip x={tooltipInfo.x} y={tooltipInfo.y} hex={tooltipInfo.hex || ""} /> : null}
            {blocks}
        </main>
    )
}
