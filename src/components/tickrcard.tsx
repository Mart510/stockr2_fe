import React, { useState } from 'react';
import dayjs from 'dayjs';
import Divider from './divider';
import DeltaDisplay from './deltadisplay';
import { ticker } from '../supabase';

interface TickrCardProps extends ticker {
    onClick: () => void;
}

const TickrCard = ({
    ticker,
    ticker_name,
    logo_url,
    description,
    last_called_at,
    latest_price,
    daily_summary,
    onClick,
}: TickrCardProps): React.ReactElement => {
    const [showSummary, setShowSummary] = useState(false);

    const toggleSummary = (e: React.MouseEvent) => {
        e.stopPropagation(); // So it doesn't trigger the card's onClick
        setShowSummary(prev => !prev);
    };

    const latestPriceSorted = [...latest_price].sort((a, b) => {
        return b.logged_at_posix - a.logged_at_posix;
    });

    const latestPrice: number = Number(latestPriceSorted[0].price.toFixed(4));

    const priceDelta = (latestPrice: number, secondLatestPrice: number): number => {
        if (latestPrice > secondLatestPrice) return 1;
        if (latestPrice < secondLatestPrice) return -1;
        return 0;
    };

    const latestDelta = priceDelta(latestPrice, latestPriceSorted[1].price);
    const lastUpdateParsed = dayjs(last_called_at);
    const lastUpdateFormatted = lastUpdateParsed.format('HH:mm:ss');

    return (
        <div
            className="w-full md:w-1/4 h-fit md:h-100 p-2 md:p-4 rounded-2xl bg-white/5 backdrop-blur-[3px] border border-white/20 bg-opacity-20 shadow-lg text-white flex flex-col gap-1 hover:scale-101 transition-all duration-1000 ease-in-out hover:shadow-2xl hover:bg-white/20 hover:bg-opacity-20"
            onClick={onClick}
        >
            {showSummary ? (
            <div className="flex flex-col gap-2 p-2">
                <h2 className="text-xl font-bold">Daily Summary</h2>
                {daily_summary ? (
                <div className="text-sm font-mono flex flex-col gap-1">
                    <span>Open: {daily_summary.open_price}</span>
                    <span>Close: {daily_summary.last_price}</span>
                    <span>High: {daily_summary.high_price}</span>
                    <span>Low: {daily_summary.low_price}</span>
                    <span>Change: {daily_summary.price_change}</span>
                    <span>% Change: {daily_summary.price_change_percent?.toFixed(2)}%</span>
                    <span>Volume: {daily_summary.volume}</span>
                    <span>Logged at: {dayjs(daily_summary.logged_at).format("YYYY-MM-DD HH:mm:ss")}</span>
                </div>
                ) : (
                <p className="text-sm font-mono text-red-400">No summary data available.</p>
                )}
            </div>
            ) : (
                <>
                    <div className='flex flex-row gap-2 p-1 md:p-2 justify-between'>
                        <img
                            src={logo_url}
                            alt={`Logo for cryptocurrency ${ticker_name}`}
                            className='h-12 md:h-18 m-1'
                        />
                        <div className='ml-auto flex flex-col text-right max-w-full flex-1'>
                            <div className="h-[160px] flex flex-col gap-1 mb-4">
                                <h2 className='text-2xl font-bold'>{ticker_name}</h2>
                                <Divider />
                                <h3 className='font-mono'>Price pair: <strong>{ticker}</strong></h3>
                                <p className='text-xs font-mono line-clamp-4 text-ellipsis w-full'>
                                    {description}
                                </p>
                            </div>
                            <div className="mt-auto">
                                <Divider />
                                <p className='text-sm font-mono'>Last updated: {lastUpdateFormatted}</p>
                            </div>
                        </div>
                    </div>
                    <DeltaDisplay latestDelta={latestDelta} latestPrice={latestPrice} />
                </>
            )}

            <button
                onClick={(e) => {
                    onClick(); 
                    toggleSummary(e);
                }}
                className='mt-auto border-2 border-white/20 rounded-xl p-2 text-sm font-mono bg-white/10 hover:bg-white/20 hover:bg-opacity-20 transition-all duration-1000 ease-in-out hover:scale-110'
            >
                {showSummary ? 'Back to Details' : 'Daily Summary'}
            </button>
        </div>
    );
};

export default TickrCard;
export type { TickrCardProps };
