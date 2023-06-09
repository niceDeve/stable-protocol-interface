import React from 'react';

import { config } from '../../../../projects/config';
import { useProjectTranslation } from '../../../../helpers/translations';

function RowDetailPegOut(props) {
    const [t, i18n, ns] = useProjectTranslation();
    const AppProject = config.environment.AppProject;

    return (
        <table className={'table-in'}>
            <tbody>
                <tr className="ant-descriptions-row">
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        {' '}
                        {t(
                            `${AppProject}.fastbtc.history.columns_headers.txHash`,
                            { ns: ns }
                        )}
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {/*<span className="RenderTxHash">*/}
                        {/*    <div className="CopyableText ">*/}
                        {/*        <div>*/}
                        {/*            <img src="https://static.moneyonchain.com/moc-alphatestnet/public/images/copy.svg" className="CopyIcon"/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <button type="button" className="ant-btn ant-btn-link ant-btn-sm"> <span>0xc97e...5e72ff</span></button>*/}
                        {/*</span>*/}
                        {props.detail.transactionHash}
                    </td>
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        {t(
                            `${AppProject}.fastbtc.history.columns_headers.transferId`,
                            { ns: ns }
                        )}
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {/*<span className="RenderTxHash">*/}
                        {/*<div className="CopyableText ">*/}
                        {/*    <div>*/}
                        {/*        <img src="https://static.moneyonchain.com/moc-alphatestnet/public/images/copy.svg" className="CopyIcon"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<button type="button" className="ant-btn ant-btn-link ant-btn-sm"><span>0x4689...66b94b</span></button></span>*/}
                        {props.detail.transId}
                    </td>
                </tr>
                <tr className="ant-descriptions-row">
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        {t(
                            `${AppProject}.fastbtc.history.columns_headers.btcAmount`,
                            { ns: ns }
                        )}
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {props.detail.btcAmount}
                    </td>
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        {' '}
                        {t(
                            `${AppProject}.fastbtc.history.columns_headers.feebtc`,
                            { ns: ns }
                        )}
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {props.detail.btcFee}
                    </td>
                </tr>
                <tr className="ant-descriptions-row">
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        {t(
                            `${AppProject}.fastbtc.history.columns_headers.btcadr`,
                            { ns: ns }
                        )}
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {/*<span className="RenderTxHash">*/}
                        {/*<div className="CopyableText ">*/}
                        {/*    <div>*/}
                        {/*        <img src="https://static.moneyonchain.com/moc-alphatestnet/public/images/copy.svg" className="CopyIcon"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<button type="button" className="ant-btn ant-btn-link ant-btn-sm"><span>mpqWMK...oWH8mW</span></button></span>*/}
                        {props.detail.btcAddress}
                    </td>
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        {' '}
                        {t(
                            `${AppProject}.fastbtc.history.columns_headers.blockN`,
                            { ns: ns }
                        )}
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {props.detail.blockNumber}
                    </td>
                </tr>
                <tr className="ant-descriptions-row">
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        {t(
                            `${AppProject}.fastbtc.history.columns_headers.web3adr`,
                            { ns: ns }
                        )}
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {/*<span className="RenderTxHash">*/}
                        {/*<div className="CopyableText ">*/}
                        {/*    <div>*/}
                        {/*        <img src="https://static.moneyonchain.com/moc-alphatestnet/public/images/copy.svg" className="CopyIcon"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<button type="button" className="ant-btn ant-btn-link ant-btn-sm"><span>0x371E...eae53E</span></button></span>*/}
                        {props.detail.rskAddress}
                    </td>
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        {t(
                            `${AppProject}.fastbtc.history.columns_headers.status`,
                            { ns: ns }
                        )}
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        <span className={props.detail.statusColor}>
                            {props.detail.status}
                        </span>
                    </td>
                </tr>
                <tr className="ant-descriptions-row">
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        TX
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {/*<span className="RenderTxHash">*/}
                        {/*    <div className="CopyableText ">*/}
                        {/*        <div>*/}
                        {/*            <img src="https://static.moneyonchain.com/moc-alphatestnet/public/images/copy.svg" className="CopyIcon"/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <button type="button" className="ant-btn ant-btn-link ant-btn-sm"><span>0xc97e...5e72ff</span></button></span>*/}
                        {props.detail.transactionHash}
                    </td>
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        {' '}
                        {t(
                            `${AppProject}.fastbtc.history.columns_headers.txLastUpdated`,
                            { ns: ns }
                        )}
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {/*<span className="RenderTxHash">*/}
                        {/*    <div className="CopyableText ">*/}
                        {/*        <div>*/}
                        {/*            <img src="https://static.moneyonchain.com/moc-alphatestnet/public/images/copy.svg" className="CopyIcon"/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <button type="button" className="ant-btn ant-btn-link ant-btn-sm"><span></span></button></span>*/}
                        {props.detail.transactionHashLastUpdated}
                    </td>
                </tr>
                <tr className="ant-descriptions-row">
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        {t(
                            `${AppProject}.fastbtc.history.columns_headers.dateAdded`,
                            { ns: ns }
                        )}
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {props.detail.timestamp}
                    </td>
                    <th className="ant-descriptions-item-label__" colSpan="1">
                        {t(
                            `${AppProject}.fastbtc.history.columns_headers.dateLastUpdated`,
                            { ns: ns }
                        )}
                    </th>
                    <td className="ant-descriptions-item-content" colSpan="1">
                        {props.detail.date}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default RowDetailPegOut;
