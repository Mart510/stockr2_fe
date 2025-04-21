import { useState, useEffect } from 'react';
import { getLatest, getLatestByTicker, ticker } from './supabase';
import TickrCard from './components/tickrcard';


function App() {
  const [tickers, setTickers] = useState<ticker[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching tickers on mount...");
      const data = await getLatest();
      console.log("Fetched tickers:", data);
      setTickers(data || []);
    };

    fetchData();

    // Refresh every 5 minutes
    const interval = setInterval(() => {
      console.log("Fetching tickers on interval...");
      fetchData();
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleCardClick = async (ticker: string) => {
    console.log(`Fetching latest data for ${ticker}...`);
    try {
      const updatedTicker = await getLatestByTicker(ticker);
      setTickers((prevTickers) =>
        prevTickers.map((tickerObj) =>
          tickerObj.ticker === updatedTicker.ticker ? updatedTicker : tickerObj
        )
      );
    } catch (error) {
      console.error(`Error fetching data for ${ticker}:`, error);
    }
  };

  return (
    <main className="flex h-full flex-col items-center justify-center max-w-7xl mx-auto mb-40 sm:mb-0">
      <div className="mx-6 mt-12 mb-6 bg-gradient-to-b from-black/80 to-black bg-clip-text text-center text-2xl font-extrabold text-transparent dark:from-white dark:to-[#AAAAAA]">
        <h1 className='text-3xl md:text-7xl'>Coin watcher</h1>
        <p className='mx-6 text-center font-mono text-lg md:text-xl text-[#666666] dark:text-[#888888]'>5-Minute Market Updates</p>
      </div>

      <div id='ticker-cards-container' className='flex flex-col items-center justify-center md:flex-row md:items-start gap-2'>
        {tickers.map((tickerObj, ticker_id) => (
          <TickrCard
            key={ticker_id}
            ticker_id={String(ticker_id)}
            ticker={tickerObj.ticker}
            ticker_name={tickerObj.ticker_name}
            logo_url={tickerObj.logo_url}
            description={tickerObj.description}
            last_called_at={tickerObj.last_called_at}
            latest_price={tickerObj.latest_price}
            daily_summary={tickerObj.daily_summary}
            api_source={tickerObj.api_source}
            onClick={() => handleCardClick(tickerObj.ticker)}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
