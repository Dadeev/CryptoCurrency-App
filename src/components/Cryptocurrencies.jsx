import React, {useEffect, useState} from 'react';
import millify from "millify";
import {Link} from 'react-router-dom'
import {Card, Row, Col, Input, Spin} from "antd";

import {useGetCryptosQuery} from "../services/cryptoApi";

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100;
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const searchHandler = (e) => {
        setSearchTerm(e.currentTarget.value)
    }

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [cryptosList, searchTerm])

    if (isFetching) return <Spin/>


    return (
        <>
            {!simplified &&
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurrencies' onChange={searchHandler}/>
                </div>}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                        <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                            <Card title={`${currency.rank}. ${currency.name}`} hoverable
                                  extra={<img className='crypto-image' src={currency.iconUrl}/>}>
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {currency.change}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Cryptocurrencies