import React, { useContext, useState, useEffect } from 'react';
import {  Skeleton } from 'antd';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Tooltip as TooltipRecharts } from 'recharts';
import { AuthenticateContext } from '../../../../Context/Auth';
import { useTranslation } from "react-i18next";
import { LargeNumber } from '../../../LargeNumber';
import { formatVisibleValue, formatLocalMap2, adjustPrecision } from '../../../../Lib/Formats';
import BigNumber from 'bignumber.js';
import { config } from '../../../../Config/config';

const AppProject = config.environment.AppProject;
const BalancePieColors = config.home.walletBalancePie.colors;

function Reserve(props) {
    const auth = useContext(AuthenticateContext);
    const { accountData, convertToken } = auth;
    const [t, i18n] = useTranslation(["global", 'moc','rdoc']);
    const ns = config.environment.AppProject.toLowerCase();
    const AppProject = config.environment.AppProject;
    const [loading, setLoading] = useState(true);
    const timeSke= 1500;
    const totalRISKPROInUSD = convertToken("TC", "USD", props.totalRISKPRO);
    const totalRISKPROXInUSD = convertToken("TX", "USD", props.totalRISKPROX);
    const totalUSD = totalRISKPROInUSD ? totalRISKPROInUSD?.plus(totalRISKPROXInUSD?.plus(props.totalSTABLE)) : 0;
    const totalRBTC = convertToken("TP", "RESERVE", totalUSD);

    useEffect(() => {
        setTimeout(() => setLoading(false), timeSke)
    },[auth]);

    /*
    const setRbtc = () => {
        if (auth.userBalanceData && accountData.Balance) {
            const b0BproAmount = (auth.contractStatusData['b0BproAmount'] / 1000000000000000000).toFixed(6);
            const docAvailableToRedeem = (auth.contractStatusData['docAvailableToRedeem'] / 1000000000000000000000).toFixed(5);
            return { b0BproAmount: b0BproAmount, docAvailableToRedeem: docAvailableToRedeem }
        } else {
            return { b0BproAmount: 0, docAvailableToRedeem: 0 }
        }
    };*/

    /*
    const getPie = () => {
        if (auth.userBalanceData && accountData.Balance) {
            const data = [
                { name: 'Group A', value: Number(setRbtc()['docAvailableToRedeem']), set1: ' RBTC', set2: ' DOC', class: 'STABLE' },
                { name: 'Group B', value: Number(setRbtc()['b0BproAmount']), set1: ' RBTC', set2: ' BPRO', class: 'RISKPRO' }
            ];

            return data;
        }
    };*/

    const toShow = ({ totalSTABLE, totalRISKPRO, totalRISKPROX }) => {
        return [
          {
            currencyCode: "TC",
            balance: totalRISKPRO,
          },
          {
            currencyCode: "TX",
            balance: totalRISKPROX
          },
          {
            currencyCode: "TP",
            balance: totalSTABLE
          }
        ]
    };

    const tokensToShow = toShow({ totalSTABLE: props.totalSTABLE, totalRISKPRO: props.totalRISKPRO, totalRISKPROX: props.totalRISKPROX });

    let totalBalance = new BigNumber(0);
    let balancesData = tokensToShow.map(({balance, currencyCode}) => {
        const balanceInReserve = convertToken(currencyCode, "RESERVE", balance);
        const balanceInReserveInEther = adjustPrecision(
            balanceInReserve,
            "RESERVE").value;
        totalBalance = totalBalance.plus(balance);
        return {
            reserveValue: balanceInReserveInEther.toNumber(),
            currencyCode: currencyCode,
            balance
        }
    });
    balancesData = balancesData.filter(({balance}) => new BigNumber(balance).gt(0));
    if(totalBalance.eq(0)) {
        balancesData.push({
            currencyCode: "EMPTY",
            reserveValue: 1
        });
    }

    const CustomTooltip = ({payload}) => {
        const data = payload && payload[0];
        if(!data) {
            return null;
        }
        return (<div className="pieChartTooltip">
            {data.payload.currencyCode !== "EMPTY" ? <>
            <div>
            {data.payload.reserveValue.toFixed(6)} {t(`${AppProject}.Tokens_RESERVE_code`, {ns: ns})}
            </div>
            <div className={`${data.payload.currencyCode}`}>
            {formatVisibleValue(data.payload.balance, data.payload.currencyCode, formatLocalMap2[i18n.languages[0]])}{' '}
            {t(`${AppProject}.Tokens_${data.payload.currencyCode}_code`, {ns: ns})}
            </div> </>
            : <div>{t(`global.TotalBalanceCard_noFunds`)}</div>
            }
        </div>)

    }

    return (
        <div className="Card CardSystemStatus">
            <h3 className="CardTitle" style={{ fontSize: '1.4em' }}>
                <img
                    width={45}
                    src={auth.urlBaseFull+"icon-reserve.svg"}
                    alt=""
                    style={{ marginRight: 10 }}
                /> {t(`${AppProject}.Tokens_RESERVE_name`, { ns: ns })}
            </h3>

            <div className="CardMetricContent">
                {!loading
                    ? <>
                        <div>
                            <h3 style={{ textAlign: 'center' }}>{t(`${AppProject}.metrics.infoRBTC.title`, { ns: ns })}</h3>
                            <div style={{ height: 180, width: 180, margin: '0 auto' }} className="PieChart">
                                <ResponsiveContainer style={{ marginLeft: '0 !important' }}>
                                    <PieChart>
                                        <Pie
                                            data={balancesData}
                                            innerRadius={40}
                                            outerRadius={90}
                                            fill={['#fff']}
                                            paddingAngle={1}
                                            dataKey="reserveValue"
                                        >
                                            {balancesData.map((entry, index) => <Cell key={index} fill={BalancePieColors[index % BalancePieColors.length]} className={`piePiece ${entry.currencyCode}-${AppProject}`}/>)}
                                        </Pie>
                                        <TooltipRecharts content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <LargeNumber amount={totalRBTC} currencyCode={"RESERVE"} includeCurrency={true} />
                            </div>
                            <h3 style={{ textAlign: 'center' }}>
                                <LargeNumber amount={totalUSD} currencyCode="USD" includeCurrency={true} />
                            </h3>
                        </div>
                        <div className="separator" style={{ height: 220 }} />
                        <div style={{ marginLeft: 30 }}>
                        <h3>{t(`${AppProject}.metrics.infoRBTC.priceRBTC`, { ns: ns })}</h3>
                        <LargeNumber amount={props.rbtcPrice} currencyCode={"USDPrice"} includeCurrency={true} />
                        <h3>{t(`${AppProject}.metrics.infoRBTC.interest`, { ns: ns })}</h3>
                        <LargeNumber amount={props.b0BTCInrateBag} currencyCode={"RESERVE"} includeCurrency={true} />
                        <h3>{t(`${AppProject}.metrics.infoRBTC.EMA`, { ns: ns })}</h3>
                        <LargeNumber amount={props.EMA} currencyCode={"USDPrice"} includeCurrency={true} />
                        <h3>{t(`${AppProject}.metrics.infoRBTC.targetCoverage`, { ns: ns })}</h3>
                        <LargeNumber amount={props.targetCoverage} currencyCode={"RESERVE"} includeCurrency={false} />
                        </div></>
                    : <Skeleton active={true} />}
            </div>
        </div>
    );
}

export default Reserve;
