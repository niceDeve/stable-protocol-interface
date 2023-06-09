import { notification } from 'antd';
import React from 'react';
import { config } from '../../../projects/config';

import IconCopy from './../../../assets/icons/copy-verde.png';

export default function CopyModal(props) {
    const { textToShow = '', textToCopy = '', fastBTC = false } = props;

    const onClick = () => {
        navigator.clipboard.writeText(textToCopy);
        notification.open({
            message: 'Copied',
            description: `${textToCopy} to clipboard`,
            placement: 'bottomRight'
        });
    };

    return (
        <>
            <span
                style={{ display: fastBTC && 'flex', fontSize: '12px' }}
                className={'copy-txt'}
            >
                <a
                    className=""
                    href={`${config.environment.explorerUrl}/address/${textToCopy}`}
                    target="_blank"
                >
                    {textToShow}
                </a>
            </span>
            &nbsp;&nbsp;&nbsp;
            <img
                onClick={onClick}
                width={15}
                height={17}
                src={IconCopy}
                alt=""
                style={{ marginRight: 10, cursor: 'pointer', marginTop: -10 }}
            />
        </>
    );
}
