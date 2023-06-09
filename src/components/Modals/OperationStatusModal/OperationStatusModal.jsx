import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { Button } from 'antd';

import Copy from '../../Page/Copy';
import { config } from '../../../projects/config';
import { useProjectTranslation } from '../../../helpers/translations';
import './style.scss';

const OperationStatusModal = ({
    className,
    visible,
    onCancel,
    title,
    operationStatus,
    txHash
}) => {
    const [t, i18n, ns] = useProjectTranslation();
    return (
        <Modal
            className={'OperationStatusModal ' + className || ''}
            footer={null}
            visible={visible}
            onCancel={onCancel}
        >
            {
                <h1 class={'StakingOptionsModal_Title'}>
                    {title || t('global.RewardsClaimButton_Modal_Title')}
                </h1>
            }
            <div
                className="InfoContainer"
                style={{
                    padding: 45,
                    paddingLeft: '0',
                    paddingRight: '0',
                    paddingBottom: '15px'
                }}
            >
                <span className="title">
                    {t('global.RewardsClaimButton_Modal_TxStatus')}
                </span>
                <span className={`value ${operationStatus} float-right`}>
                    {t(
                        `global.RewardsClaimButton_Modal_TxStatus_${operationStatus}`
                    )}
                </span>
            </div>
            <div className="InfoContainer">
                <span className="title">
                    {t('global.RewardsClaimButton_Modal_Hash')}
                </span>
                <div className={'float-right'}>
                    <Copy
                        typeUrl={'tx'}
                        textToShow={
                            txHash !== undefined
                                ? txHash?.substring(0, 6) +
                                  '...' +
                                  txHash?.substring(
                                      txHash?.length - 4,
                                      txHash?.length
                                  )
                                : 'No Hash'
                        }
                        textToCopy={txHash}
                    />
                </div>
            </div>
            <a
                href={`${config.environment.explorerUrl}/tx/${txHash}`}
                target="_blank"
            >
                {t('global.RewardsClaimButton_Modal_ViewOnExplorer')}
            </a>
            <br />
            <br />
            <div style={{ textAlign: 'center' }}>
                <Button
                    type="primary"
                    style={{ width: 130 }}
                    onClick={onCancel}
                >
                    {t('global.RewardsClaimButton_Modal_Close', {
                        ns: 'global'
                    })}
                </Button>
            </div>
        </Modal>
    );
};

export default OperationStatusModal;
