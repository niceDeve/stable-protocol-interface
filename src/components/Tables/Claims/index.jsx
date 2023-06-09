import React, { useContext, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import classnames from 'classnames';

import RowDetail from '../RowDetailClaim';
import api from '../../../services/api';
import { myParseDate, readJsonClaims, dateFU } from '../../../helpers/helper';
import { config } from '../../../projects/config';
import { AuthenticateContext } from '../../../context/Auth';
import { useProjectTranslation } from '../../../helpers/translations';
import { ReactComponent as LogoIconTG } from './../../../assets/icons/icon-tg.svg';

import './style.scss';

export default function Claims(props) {
    const [current, setCurrent] = useState(1);
    const [bordered, setBordered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ position: 'bottom' });
    const [size, setSize] = useState('default');
    const [expandable, setExpandable] = useState({
        expandedRowRender: (record) => <p>{record.description}</p>
    });

    const [title, setTitle] = useState(undefined);
    const [showHeader, setShowHeader] = useState(true);
    const [hasData, setHasData] = useState(true);
    const [tableLayout, setTableLayout] = useState(undefined);
    const [top, setTop] = useState('none');
    const [bottom, setBottom] = useState('bottomRight');
    const [yScroll, setYScroll] = useState(undefined);
    const [xScroll, setXScroll] = useState(undefined);

    const [t, i18n, ns] = useProjectTranslation();
    const AppProject = config.environment.AppProject;
    const auth = useContext(AuthenticateContext);

    const { accountData = {} } = auth;
    const [currencyCode, setCurrencyCode] = useState('MOC');
    const [dataJson, setDataJson] = useState([]);
    const [callTable, setCallTable] = useState(false);
    const [totalTable, setTotalTable] = useState(0);
    const [currentHash, setCurrentHash] = useState(true);
    const [timer, setTimer] = useState(100);

    const transactionsList = (skip, call_table) => {
        if (auth.isLoggedIn) {
            const datas = {
                address: accountData.Owner,
                limit: 20,
                skip: (skip - 1 + (skip - 1)) * 10
            };
            setTimeout(() => {
                try {
                    api(
                        'get',
                        config.environment.api.incentives +
                            'claims/' +
                            accountData.Owner,
                        datas
                    )
                        .then((response) => {
                            setDataJson(response);
                            setTotalTable(response.total);
                            if (call_table) {
                                setCallTable(call_table);
                            }
                        })
                        .catch((response) => {
                            console.log(response);
                            if (call_table) {
                                setCallTable(call_table);
                            }
                        });
                } catch (error) {
                    console.error({ error });
                    console.log(error);
                }
            }, 500);
        }
    };

    const columns = [
        {
            title: '',
            dataIndex: 'info'
        },

        {
            title: t(`${AppProject}.operations.columns.event`, { ns: ns }),
            dataIndex: 'event'
        },
        {
            title: t(`${AppProject}.operations.columns.type`, { ns: ns }),
            dataIndex: 'asset'
        },
        {
            title: t(`${AppProject}.operations.columns.mocAmount`, { ns: ns }),
            dataIndex: 'amount'
        },
        {
            title: t(`${AppProject}.operations.columns.date`, { ns: ns }),
            dataIndex: 'date'
        },
        {
            title: t(`${AppProject}.operations.columns.status`, { ns: ns }),
            dataIndex: 'status'
        }
    ];

    useEffect(() => {
        if (accountData.Owner !== undefined) {
            if (currentHash) {
                transactionsList(current);
            }
        }
    }, [accountData.Owner]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentHash) {
                transactionsList(current);
            }
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    var data = [];

    const onChange = (page) => {
        if (accountData !== undefined) {
            setCurrent(page);
            data_row(page);
            transactionsList(page, true);
        }
    };

    const data_row_coins2 = [];
    var json_end = [];
    const data_row = (set_current) => {
        /*******************************sort descending by date lastUpdatedAt***********************************/
        if (dataJson !== undefined) {
            dataJson.sort((a, b) => {
                return (
                    myParseDate(dateFU(b.creation)) -
                    myParseDate(dateFU(a.creation))
                );
            });
        }
        /*******************************end sort descending by date lastUpdatedAt***********************************/
        if (dataJson !== undefined) {
            json_end = dataJson;
        }
        /*******************************extraer datos del json con el json seteado por limit y skip***********************************/
        data = [];

        json_end.forEach((data_j) => {
            const datas_response = readJsonClaims(data_j, t, i18n);
            moment.locale(i18n.language);
            const date_formated = (
                <span>
                    {moment
                        .unix(datas_response['creation'])
                        .format('YYYY-MM-DD HH:mm:ss')}
                </span>
            ); // <span><Moment format={(i18n.language === "en") ? date.DATE_EN : date.DATE_ES} unix>{datas_response['creation']}</Moment></span>
            const amount_set = datas_response['mocs'];

            const detail = {
                event:
                    datas_response['address'] === config.transfer[0].address
                        ? config.transfer[0].title
                        : 'CLAIM',
                created: date_formated,
                gas_fee: '--',
                asset: datas_response['set_asset'],
                confirmation: '--',
                address: '--',
                amount: amount_set,
                gas_cost: datas_response['gas_cost'],
                sent_hash: datas_response['sent_hash'],
                truncate_sent_hash: datas_response['truncate_sent_hash'],
                hash:
                    datas_response['hash'] != '--'
                        ? datas_response['hash']
                        : '--',
                truncate_hash:
                    datas_response['truncate_hash'] != '--'
                        ? datas_response['truncate_hash']
                        : '--',
                status: datas_response['state'],
                block: '--',
                detail: '--',
                transaction: '--',
                moc_price: '--'
            };

            data_row_coins2.push({
                key: data_j.hash,
                info: '',
                event:
                    datas_response['address'] === config.transfer[0].address
                        ? config.transfer[0].title
                        : 'CLAIM',
                asset: datas_response['set_asset'],
                amount: amount_set,
                wallet: datas_response['wallet_value_main'],
                date: date_formated,
                status: datas_response['state'],
                detail: detail
            });
        });
        data_row_coins2.forEach((element, index) => {
            const asset = [
                {
                    image: (
                        <LogoIconTG
                            className="uk-preserve-width uk-border-circle"
                            alt="avatar"
                            width={32}
                            height={32}
                        />
                    ),
                    color: '',
                    txt: 'CLAIM'
                }
            ];
            data_row_coins2[index].detail.asset = 'MOC';

            data.push({
                key: element.key,
                info: '',
                event: (
                    <span
                        className={classnames('event-action', asset[0].color)}
                    >
                        {element.event}
                    </span>
                ),
                asset: asset[0].image,
                amount: (
                    <span className="display-inline CurrencyTx">
                        {element.amount}
                    </span>
                ),
                date: <span>{element.date}</span>,
                status: <span>{element.status}</span>,
                description: <RowDetail detail={element.detail} />
            });
        });
        /*******************************end extraer datos del json con el json seteado por limit y skip***********************************/
    };

    data_row(current);

    const scroll = {};
    if (yScroll) {
        scroll.y = 240;
    }
    if (xScroll) {
        scroll.x = '100vw';
    }

    const tableColumns = columns.map((item) => ({ ...item }));

    if (xScroll === 'fixed') {
        tableColumns[0].fixed = true;
        tableColumns[tableColumns.length - 1].fixed = 'right';
    }

    const state = {
        bordered,
        loading,
        pagination,
        size,
        expandable,
        title,
        showHeader,
        scroll,
        hasData,
        tableLayout,
        top,
        bottom,
        yScroll,
        xScroll
    };

    return (
        <>
            <div className="title">
                <h1>{t(`${AppProject}.operations.title`, { ns: ns })}</h1>
                <Tooltip
                    color={'#404040'}
                    placement="topLeft"
                    title={t(`${AppProject}.operations.tooltip.text`, {
                        ns: ns
                    })}
                    className="Tooltip"
                >
                    <InfoCircleOutlined className="Icon" />
                </Tooltip>
            </div>
            <Table
                {...state}
                expandable={{
                    expandedRowRender: (record) => (
                        <p style={{ margin: 0 }}>{record.description}</p>
                    ),
                    expandIcon: ({ expanded, onExpand, record }) =>
                        expanded ? (
                            <UpCircleOutlined
                                onClick={(e) => onExpand(record, e)}
                            />
                        ) : (
                            <DownCircleOutlined
                                onClick={(e) => onExpand(record, e)}
                            />
                        )
                }}
                pagination={{
                    pageSize: 20,
                    position: [top, bottom],
                    defaultCurrent: 1,
                    onChange: onChange,
                    total: totalTable
                }}
                columns={tableColumns}
                dataSource={
                    hasData ? (auth.isLoggedIn == true ? data : null) : null
                }
                scroll={scroll}
            />
        </>
    );
}
