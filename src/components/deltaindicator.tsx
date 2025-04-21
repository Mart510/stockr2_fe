import React, { useEffect, useState } from 'react';

const DeltaIndicator = ({ delta, className }: { delta: number, className?: string }): React.ReactElement => {
    const [isDoubleArrow, setIsDoubleArrow] = useState(false);

    useEffect(() => {
        setIsDoubleArrow(true);

        const timer = setTimeout(() => {
            setIsDoubleArrow(false);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, [delta]);

    // Define the arrows
    const upArrow = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={className} fill="currentColor">
            <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
        </svg>
    );

    const downArrow = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={className} fill="currentColor">
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
        </svg>
    );

    const doubleUpArrow = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={className} fill="currentColor">
            <path d="m296-224-56-56 240-240 240 240-56 56-184-183-184 183Zm0-240-56-56 240-240 240 240-56 56-184-183-184 183Z"/>
        </svg>
    );

    const doubleDownArrow = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={className} fill="currentColor">
            <path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z"/>
        </svg>
    );

    // Choose the correct icon based on delta value
    const deltaIcon = delta > 0
        ? isDoubleArrow ? doubleUpArrow : upArrow
        : delta < 0
        ? isDoubleArrow ? doubleDownArrow : downArrow
        : null;

    return (
        <div>
            {deltaIcon}
        </div>
    );
};

export default DeltaIndicator;
