
import React from 'react';
import { useTranslation } from "react-i18next";
import { config } from '../../../Config/config';


function RowDetail(props) {
    const [t, i18n] = useTranslation(["global", 'moc']);

    return (

        <table>
            <tbody>
                <tr className="ant-descriptions-row">
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.event', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">{props.detail.event}     </td>
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.created', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">{props.detail.created}</td>
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.detail', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">
                        <div>{props.detail.details} </div>
                    </td>
                </tr>
                <tr className="ant-descriptions-row">
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.asset', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">{props.detail.asset}    </td>
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.confirmation', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">{props.detail.confirmation}   </td>
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.address', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">{props.detail.address}  </td>
                </tr>
                <tr className="ant-descriptions-row">
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.platform', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">
                        {props.detail.platform}
                    </td>
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.platform_fee', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {props.detail.platform_fee}
                    </td>
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.block', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">{props.detail.block}     </td>
                </tr>
                <tr className="ant-descriptions-row">
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.wallet', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">
                        {props.detail.wallet}
                    </td>
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.interests', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1"><span>{props.detail.interests}    </span></td>
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.tx', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">
                        <a className="ant-descriptions-a" href={`${config.explorerUrl}/tx/${props.detail.tx_hash}`} target="_blank">
                            <span>{props.detail.tx_hash_truncate}         </span>
                        </a>
                    </td>
                </tr>
                <tr className="ant-descriptions-row">
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.leverage', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1"><span>{props.detail.leverage}      </span></td>
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.gas', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">
                        {props.detail.gas_fee}
                    </td>
                    <th className="ant-descriptions-item-label-th ant-descriptions-border-bottom" colSpan="1">{t('MoC.operations.columns_detailed.reserve_price', { ns: 'moc' })}</th>
                    <td className="ant-descriptions-item-content ant-descriptions-border-bottom" colSpan="1">
                        {props.detail.price}
                    </td>
                </tr>
            </tbody>
        </table>

    )
}


export default RowDetail













