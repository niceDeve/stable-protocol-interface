import React, { useContext, useState, useEffect } from 'react';
import { AuthenticateContext } from '../../../../Context/Auth';
import { useTranslation } from "react-i18next";
import { Skeleton } from 'antd';
import { LargeNumber } from '../../../LargeNumber';
import {config} from '../../../../Config/config';

function MOC(props) {
    const auth = useContext(AuthenticateContext);
    
    const [t, i18n] = useTranslation(["global", 'moc', 'rdoc']);
    const ns = config.environment.AppProject.toLowerCase();
    const AppProject = config.environment.AppProject;
    const [loading, setLoading] = useState(true);
    const timeSke= 1500

    useEffect(() => {
        setTimeout(() => setLoading(false), timeSke)
    },[auth]);

    return (
        <div className="Card CardSystemStatus">
            <h3 className="CardTitle" style={{ fontSize: '1.4em' }}>
                <img
                    width={45}
                    src={auth.urlBaseFull+"icon-tg.svg" }
                    alt=""
                    style={{ marginRight: 10 }}
                /> {t(`${AppProject}.metrics.Moc.title`, { ns: ns })}
            </h3>

            <div className="CardMetricContent MocThemeMetric">
                {!loading
                    ? <div>
                        <h5>{t(`${AppProject}.metrics.Moc.price`, { ns: ns })}</h5>
                        <LargeNumber amount={props.mocPrice} currencyCode="USDPrice" tooltip="topLeft"/>
                    </div>
                : <Skeleton active={true} />}
            </div>
        </div>
    );
}

export default MOC;
