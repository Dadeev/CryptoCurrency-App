import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {Col, Row, Typography, Select} from 'antd';
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';
import {useGetCryptoDetailsQuery} from "../services/cryptoApi";

const {Text, Title} = Typography;
const {Option} = Select

const CryptoDetails = () => {
    const {coinId} = useParams()
    const [timePeriod, setTimePeriod] = useState()
    const {data, isFetching} = useGetCryptoDetailsQuery(coinId)

    console.log(data)
    return (
        <div>
            CryptoDetails {coinId}
        </div>
    );
};

export default CryptoDetails