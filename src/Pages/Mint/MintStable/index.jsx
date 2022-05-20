import MintCard from '../../../Components/Cards/MintCard';
import AmountCard from '../../../Components/Cards/AmountCard';
import YourAddressCard from '../../../Components/Cards/YourAddressCard';
import { Row, Col, Switch } from 'antd';
import React, { Fragment } from 'react';
import ListOperations from "../../../Components/Tables/ListOperations";
import {useTranslation} from "react-i18next";
import MintOrRedeemToken from '../../../Components/MintOrRedeemToken/MintOrRedeemToken';

export default function Mint(props) {
    const data_row_coins = [];

    data_row_coins.push({
        key: 0,
        info: '',
        event: 'DOC',
        asset: 'DOC',
        platform: '+ 0.00',
        wallet: '-0.000032',
        date: '2022-04-18 18:23',
        status: {txt:'Confirmed',percent:100},
    });
    data_row_coins.push({
        key: 1,
        info: '',
        event: 'DOC',
        asset: 'DOC',
        platform: '+ 0.00',
        wallet: '-0.000032',
        date: '2022-04-18 18:23',
        status: {txt:'Confirmed',percent:100},
    });

    const [t, i18n]= useTranslation(["global",'moc'])

    return (
        <Fragment>
            <h1 className="PageTitle">{t("MoC.wallets.STABLE.title", { ns: 'moc' })}</h1>
            <h3 className="PageSubTitle">Manage your DoCs</h3>
            <Row gutter={15}>
                <Col xs={24} md={12} xl={5}>
                    <AmountCard tokenName="stable" titleName="DoC"/>
                </Col>
                <Col xs={24} md={12} xl={4}>
                    <YourAddressCard height="23.4em" tokenToSend="STABLE" currencyOptions={['RESERVE', 'STABLE']} />
                </Col>
                <Col xs={24} xl={15}>
                    {/*<MintOrRedeemToken
                        token={'STABLE'}
                        StatusData={props.Auth.contractStatusData}
                    /> */}
                    <MintCard
                        token={'STABLE'}
                        currencyOptions={['RESERVE', 'STABLE']}
                        StatusData={props.Auth.contractStatusData}
                        UserBalanceData={props.Auth.userBalanceData}
                        color="#00a651"
                        AccountData={props.Auth.accountData}
                    />
                </Col>
            </Row>
            <div className="Card WalletOperations">
                <ListOperations token={'STABLE'}></ListOperations>
            </div>
        </Fragment>
    );
}
