import { Row, Col, Tooltip, Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import _ from 'lodash/core';
import React, { Fragment, useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthenticateContext } from '../../../Context/Auth';
import { LargeNumber } from '../../LargeNumber';
import { useTranslation } from "react-i18next";
import { set_doc_usd } from "../../../Helpers/helper";
import convertHelper from '../../../Lib/convertHelper';
import { getPriceFields } from '../../../Lib/price';
import BalanceItem from '../../BalanceItem/BalanceItem';
import InformationModal from '../../Modals/InformationModal';
import './style.scss';
const BigNumber = require('bignumber.js');

export default function AmountCard(props) {
    const [t, i18n] = useTranslation(["global", 'moc']);
    const auth = useContext(AuthenticateContext);
    if (!auth) return null;
    const {
        tokenName = '',
        color = '',
        titleName = '' } = props;

    const priceFields = getPriceFields();
    const mocStates = {
        fields: {
            ...priceFields,
            reservePrecision: 1,
            priceVariation: 1,
            commissionRates: 1,
            lastUpdateHeight: 1,
            isDailyVariation: 1
        }
    }
    const mocState = props.StatusData;
    let mocStatePrices;
    if (mocState?.length) {
        [mocStatePrices] = mocStates;
    }
    const convertToken = convertHelper(
        _.pick(mocStatePrices, Object.keys(priceFields).concat(['reservePrecision']))
    );

    const getBalance = () => {
        if (auth.userBalanceData) {
            switch (tokenName) {
                case 'STABLE':
                    return auth.userBalanceData['docBalance'];
                case 'RISKPRO':
                    return auth.userBalanceData['bproBalance'];
                case 'RISKPROX':
                    return auth.userBalanceData['bprox2Balance'];
            }
        } else {
            switch (tokenName) {
                case 'stable':
                    return (0).toFixed(2)
                case 'riskpro':
                    return (0).toFixed(6)
                case 'riskprox':
                    return (0).toFixed(6)
            }
        }
    };
    const getBalanceUSD = () => {
        if (auth.userBalanceData) {
            switch (tokenName) {
                case 'STABLE':
                    return Number(auth.userBalanceData['docBalance']).toFixed(2);
                case 'RISKPRO':
                    return auth.contractStatusData["bproPriceInUsd"];
                case 'RISKPROX':
                    return new BigNumber(auth.contractStatusData['bitcoinPrice'] * auth.userBalanceData['bprox2Balance']).toFixed(4);
            }
        }
        else {
            return (0).toFixed(2)
        }
    };
    const convertTo = convertToCurrency => convertToken(tokenName, convertToCurrency, getBalance());
    // const converToUSD = convertToCurrency => convertToken(tokenName, convertToCurrency, getBalanceUSD());

    const pre_label = t(`MoC.Tokens_${tokenName.toUpperCase()}_name`, { ns: 'moc' })

    return (
        <Fragment>
            <div className="Card CardAmount">
                <Row>
                    <Col span={22}>
                        <h3 className="CardTitle">{t("global.TokenSummary_Amount", { ns: 'global', tokenName: pre_label })}</h3>
                    </Col>
                    <Col span={2}>
                        <InformationModal currencyCode={tokenName} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img
                            width={56}
                            src={window.location.origin + `/Moc/icon-${tokenName}.svg`}
                            alt="icon-wallet"
                        />
                    </Col>
                </Row>
                <Row className="tokenAndBalance">
                    <div className="priceContainer">
                        <LargeNumber amount={getBalance()} currencyCode={tokenName} />
                        <div className="WalletCurrencyPrice">
                            <BalanceItem
                                amount={convertTo('RESERVE')}
                                currencyCode="RESERVE" />
                            <BalanceItem
                                amount={convertTo('USD')}
                                currencyCode="USD" />
                        </div>
                    </div>

                </Row>
            </div>
        </Fragment>
    )
}