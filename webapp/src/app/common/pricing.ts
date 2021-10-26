export interface Pricing {
    id: string;
    name: string;
    // row1: string;
    // row2: string;
    // row3: string;
    // row4: string;
}

export interface Header {
    id: string;
    name: string;
    name1: string;
    name2: string;
    name3: string;
    name4: string;
    name5: string;
    name6: string;
    name7: string;
}

export const header: Header[] = [
    {name: 'Features / Plans Price', name1: 'Price', name2: 'No. of Custom Strategies you can create', name3: 'No. of Tradebullz you can use', name4: 'No. of Thirdparty Triggers supported per day', name5: 'No. of strategies you can deploy', name6: 'Paper Trading Executions allowed while deploying', name7: 'Trading Execution notifications', id: '1'},
    {name: 'Free Trial (valid for 15days)', name1: '₹ 0',  name2: '2', name3: 'X', name4: '5', name5: '1', name6: 'Y', name7: 'X', id: '2'},
    {name: 'Starter', name1: '₹ 300',  name2: '5', name3: '1', name4: '20', name5: '2', name6: 'Y', name7: 'Email', id: '3'},
    {name: 'Basic', name1: '₹ 500',  name2: '10', name3: '2', name4: '50', name5: '5', name6: 'Y', name7: 'Email', id: '4'},
    //{name: 'Premium', name2: '₹ 1000', id: '5'},
    // {name: '', id: '6'}
]

export const Price: Pricing[] = [
    {name: 'Adani Ports and Special Economic Zone Ltd', id: 'ADANIPORTS'},
    {name: 'SBI Life Insurance Company Ltd', id: 'SBILIFE'},
    {name: 'IndusInd Bank Ltd', id: 'INDUSINDBK'},
    {name: 'Kotak Mahindra Bank Ltd', id: 'KOTAKBANK'},
    {name: 'Bajaj Finserv Ltd', id: 'BAJAJFINSV'},
    {name: 'Bharti Airtel Ltd', id: 'BHARTIARTL'},
]

export const Price100: Pricing[] = [
    {name: 'ACC Ltd', id: 'ACC'},
    {name: 'Abbott India Ltd', id: 'ABBOTINDIA'},
    {name: 'Adani Green Energy Ltd', id: 'ADANIGREEN'},
    {name: 'Adani Ports and Special Economic Zone Ltd', id: 'ADANIPORTS'},
    {name: 'Adani Transmission Ltd', id: 'ADANITRANS'},
    {name: 'Alkem Laboratories Ltd', id: 'ALKEM'},
    {name: 'Ambuja Cements Ltd', id: 'AMBUJACEM'},
    {name: 'Asian Paints Ltd', id: 'ASIANPAINT'},
    {name: 'Aurobindo Pharma Ltd', id: 'AUROPHARMA'},
    {name: 'Avenue Supermarts Ltd', id: 'DMART'},
    {name: 'Axis Bank Ltd', id: 'AXISBANK'},
    {name: 'Bajaj Auto Ltd', id: 'BAJAJ-AUTO'},
    {name: 'Bajaj Finance Ltd', id: 'BAJFINANCE'},
    {name: 'Bajaj Finserv Ltd', id: 'BAJAJFINSV'},
    {name: 'Bajaj Holdings & Investment Ltd', id: 'BAJAJHLDNG'},
    {name: 'Bandhan Bank Ltd', id: 'BANDHANBNK'},
    {name: 'Bank of Baroda', id: 'BANKBARODA'},
    {name: 'Berger Paints India Ltd', id: 'BERGEPAINT'},
    {name: 'Bharat Petroleum Corporation Ltd', id: 'BPCL'},
    {name: 'Bharti Airtel Ltd', id: 'BHARTIARTL'},
    {name: 'Bharti Infratel Ltd', id: 'INFRATEL'},
    {name: 'Biocon Ltd', id: 'BIOCON'},
    {name: 'Bosch Ltd', id: 'BOSCHLTD'},
    {name: 'Britannia Industries Ltd', id: 'BRITANNIA'},
    {name: 'Cadila Healthcare Ltd', id: 'CADILAHC'},
    {name: 'Cipla Ltd', id: 'CIPLA'},
    {name: 'Coal India Ltd', id: 'COALINDIA'},
    {name: 'Colgate Palmolive (India) Ltd', id: 'COLPAL'},
    {name: 'Container Corporation of India Ltd', id: 'CONCOR'},
    {name: 'DLF Ltd', id: 'DLF'},
    {name: 'Dabur India Ltd', id: 'DABUR'},
    {name: 'Divis Laboratories Ltd', id: 'DIVISLAB'},
    {name: 'Dr Reddys Laboratories Ltd', id: 'DRREDDY'},
    {name: 'Eicher Motors Ltd', id: 'EICHERMOT'},
    {name: 'GAIL (India) Ltd', id: 'GAIL'},
    {name: 'General Insurance Corporation of India', id: 'GICRE'},
    {name: 'Godrej Consumer Products Ltd', id: 'GODREJCP'},
    {name: 'Grasim Industries Ltd', id: 'GRASIM'},
    {name: 'HCL Technologies Ltd', id: 'HCLTECH'},
    {name: 'HDFC Asset Management Company Ltd', id: 'HDFCAMC'},
    {name: 'HDFC Bank Ltd', id: 'HDFCBANK'},
    {name: 'HDFC Life Insurance Company Ltd', id: 'HDFCLIFE'},
    {name: 'Havells India Ltd', id: 'HAVELLS'},
    {name: 'Hero MotoCorp Ltd', id: 'HEROMOTOCO'},
    {name: 'Hindalco Industries Ltd', id: 'HINDALCO'},
    {name: 'Hindustan Petroleum Corporation Ltd', id: 'HINDPETRO'},
    {name: 'Hindustan Unilever Ltd', id: 'HINDUNILVR'},
    {name: 'Hindustan Zinc Ltd', id: 'HINDZINC'},
    {name: 'Housing Development Finance Corporation Ltd', id: 'HDFC'},
    {name: 'ICICI Bank Ltd', id: 'ICICIBANK'},
    {name: 'ICICI Lombard General Insurance Company Ltd', id: 'ICICIGI'},
    {name: 'ICICI Prudential Life Insurance Company Ltd', id: 'ICICIPRULI'},
    {name: 'ITC Ltd', id: 'ITC'},
    {name: 'Indian Oil Corporation Ltd', id: 'IOC'},
    {name: 'Indraprastha Gas Ltd', id: 'IGL'},
    {name: 'IndusInd Bank Ltd', id: 'INDUSINDBK'},
    {name: 'Info Edge (India) Ltd', id: 'NAUKRI'},
    {name: 'Infosys Ltd', id: 'INFY'},
    {name: 'InterGlobe Aviation Ltd', id: 'INDIGO'},
    {name: 'JSW Steel Ltd', id: 'JSWSTEEL'},
    {name: 'Kotak Mahindra Bank Ltd', id: 'KOTAKBANK'},
    {name: 'Larsen & Toubro Infotech Ltd', id: 'LTI'},
    {name: 'Larsen & Toubro Ltd', id: 'LT'},
    {name: 'Lupin Ltd', id: 'LUPIN'},
    {name: 'Mahindra & Mahindra Ltd', id: 'M&M'},
    {name: 'Marico Ltd', id: 'MARICO'},
    {name: 'Maruti Suzuki India Ltd', id: 'MARUTI'},
    {name: 'Motherson Sumi Systems Ltd', id: 'MOTHERSUMI'},
    {name: 'Muthoot Finance Ltd', id: 'MUTHOOTFIN'},
    {name: 'NMDC Ltd', id: 'NMDC'},
    {name: 'NTPC Ltd', id: 'NTPC'},
    {name: 'Nestle India Ltd', id: 'NESTLEIND'},
    {name: 'Oil & Natural Gas Corporation Ltd', id: 'ONGC'},
    {name: 'Oracle Financial Services Software Ltd', id: 'OFSS'},
    {name: 'Petronet LNG Ltd', id: 'PETRONET'},
    {name: 'Pidilite Industries Ltd', id: 'PIDILITIND'},
    {name: 'Piramal Enterprises Ltd', id: 'PEL'},
    {name: 'Power Finance Corporation Ltd', id: 'PFC'},
    {name: 'Power Grid Corporation of India Ltd', id: 'POWERGRID'},
    {name: 'Procter & Gamble Hygiene & Health Care Ltd', id: 'PGHH'},
    {name: 'Punjab National Bank', id: 'PNB'},
    {name: 'Reliance Industries Ltd', id: 'RELIANCE'},
    {name: 'SBI Cards and Payment Services Ltd', id: 'SBICARD'},
    {name: 'SBI Life Insurance Company Ltd', id: 'SBILIFE'},
    {name: 'Shree Cement Ltd', id: 'SHREECEM'},
    {name: 'Siemens Ltd', id: 'SIEMENS'},
    {name: 'State Bank of India', id: 'SBIN'},
    {name: 'Sun Pharmaceutical Industries Ltd', id: 'SUNPHARMA'},
    {name: 'Tata Consultancy Services Ltd', id: 'TCS'},
    {name: 'Tata Consumer Products Ltd', id: 'TATACONSUM'},
    {name: 'Tata Motors Ltd', id: 'TATAMOTORS'},
    {name: 'Tata Steel Ltd', id: 'TATASTEEL'},
    {name: 'Tech Mahindra Ltd', id: 'TECHM'},
    {name: 'Titan Company Ltd', id: 'TITAN'},
    {name: 'Torrent Pharmaceuticals Ltd', id: 'TORNTPHARM'},
    {name: 'UPL Ltd', id: 'UPL'},
    {name: 'UltraTech Cement Ltd', id: 'ULTRACEMCO'},
    {name: 'United Breweries Ltd', id: 'UBL'},
    {name: 'United Spirits Ltd', id: 'MCDOWELL-N'},
    {name: 'Wipro Ltd', id: 'WIPRO'}
];




