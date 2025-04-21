import DeltaIndicator from './deltaindicator';

const DeltaDisplay = ({ latestDelta, latestPrice }: { latestDelta: number, latestPrice: number }) => {

    const colorClass = latestDelta > 0
        ? 'fill-green-500'
        : latestDelta < 0
        ? 'fill-red-500'
        : 'fill-gray-500';

    const textColorClass = latestDelta > 0
    ? 'text-green-500'
    : latestDelta < 0
    ? 'text-red-500'
    : 'text-gray-500';

    return (
        <div className="flex flex-row justify-between p-1 sm:p-2 mt-auto">
            <DeltaIndicator delta={latestDelta} className={`${colorClass} h-8 w-8`} />
            <div className={`text-right font-bold ${textColorClass}`}>
                <p>Latest Price:</p>
                <strong>{latestPrice}</strong>
            </div>
        </div>
    );
};

export default DeltaDisplay;
