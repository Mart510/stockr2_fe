import { createClient } from '@supabase/supabase-js'

interface ticker {
    ticker_id: string,
    ticker: string,
    ticker_name: string,
    logo_url: string,
    description: string,
    api_source: string,
    last_called_at: string,
    latest_price: spotPrice[]
    daily_summary: dailySummary

}

interface spotPrice {
    price: number,
    pricelog_id: string ,
    logged_at: string,
    logged_at_posix: number
}

interface dailySummary {
    id: string,
    count: number,
    source: string,
    volume: number,
    last_id: number,
    row_num: number,
    first_id: number,
    ask_price: number,
    bid_price: number,
    logged_at: string,
    low_price: number,
    open_time: string,
    ticker_id: string,
    close_time: string,
    high_price: number,
    last_price: number,
    open_price: number,
    ask_quantity: number,
    price_change: number,
    quote_volume: number,
    last_quantity: number,
    logged_at_posix: number,
    open_time_posix: number,
    prev_close_price: number,
    weighted_avg_price: number,
    price_change_percent: number
}

const initializeSupabase = () => {

    const dbUrl = import.meta.env.VITE_DB_URL
    const dbKey = import.meta.env.VITE_DB_KEY

    if (!dbUrl || !dbKey) {
        throw new Error('Missing environment variables: DB_URL or DB_KEY')
    }

    const supabase = createClient(dbUrl, dbKey)
    return supabase
}
const supabase = initializeSupabase()

const getLatest = async (): Promise<ticker[]> => {
    const { data, error } = await supabase.rpc("getLatest")
    if (error) {
        console.error('Error fetching throw')
        throw new Error('Error fetching latest ticker data')
    }
    return data
}

const getLatestByTicker = async (ticker: string): Promise<ticker> => {
    const { data, error } = await supabase.rpc("getTickerData", { input_ticker: ticker })
    if (error) {
        console.error('Error fetching latest:', error)
        throw new Error('Error fetching latest ticker data')
    }
    return data[0]
}

export {getLatest, getLatestByTicker}
export type { ticker, spotPrice, dailySummary }
