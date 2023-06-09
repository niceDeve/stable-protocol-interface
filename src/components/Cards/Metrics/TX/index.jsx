import React, { useContext, useState, useEffect } from 'react';
import { Skeleton } from 'antd';

import { AuthenticateContext } from '../../../../context/Auth';
import { LargeNumber } from '../../../LargeNumber';
import { config } from '../../../../projects/config';
import { useProjectTranslation } from '../../../../helpers/translations';
import { ReactComponent as LogoIcon } from '../../../../assets/icons/icon-tx.svg';

function TX(props) {
    const auth = useContext(AuthenticateContext);
    const [t, i18n, ns] = useProjectTranslation();
    const AppProject = config.environment.AppProject;
    const [loading, setLoading] = useState(true);
    const timeSke = 1500;

    useEffect(() => {
        setTimeout(() => setLoading(false), timeSke);
    }, [auth]);

    return (
        <div className="Card CardSystemStatus">
            <h3
                className="CardTitle"
                style={{
                    fontSize: '1.4em',
                    display: 'inline-flex',
                    'align-items': 'center'
                }}
            >
                <LogoIcon
                    width="45"
                    height="45"
                    alt="Token TX"
                    style={{ marginRight: 10 }}
                />{' '}
                {t(`${AppProject}.wallets.TX.title`, { ns: ns })}
            </h3>

            <div className="CardMetricContent BProxThemeMetric">
                {!loading ? (
                    <>
                        <div>
                            <h5>
                                {t(`${AppProject}.metrics.TX.usd`, { ns: ns })}
                            </h5>
                            <span>
                                <LargeNumber
                                    amount={props.usdValue}
                                    currencyCode={'USDPrice'}
                                />
                            </span>
                            <h5 style={{ marginTop: '2em' }}>
                                {t(`${AppProject}.metrics.TX.total`, {
                                    ns: ns
                                })}
                            </h5>
                            <span className={'red space'}>
                                <LargeNumber
                                    amount={props.total}
                                    currencyCode="TX"
                                />
                            </span>
                            <h5>
                                {t(`${AppProject}.metrics.TX.availableMint`, {
                                    ns: ns
                                })}
                            </h5>
                            <span className={'red'}>
                                <LargeNumber
                                    amount={props.availableMint}
                                    currencyCode="TX"
                                />
                            </span>
                        </div>
                        <div className="separator" />
                        <div>
                            <h5>
                                {t(`${AppProject}.metrics.TX.leverage`, {
                                    ns: ns
                                })}
                            </h5>
                            <span className={'space'}>
                                <LargeNumber
                                    amount={props.leverage}
                                    currencyCode="TX"
                                />
                            </span>
                            <h5>
                                {t(`${AppProject}.metrics.TX.coverage`, {
                                    ns: ns
                                })}
                            </h5>
                            <LargeNumber
                                amount={props.coverage}
                                currencyCode="TX"
                            />
                        </div>
                    </>
                ) : (
                    <Skeleton active={true} />
                )}
            </div>
        </div>
    );
}

export default TX;
