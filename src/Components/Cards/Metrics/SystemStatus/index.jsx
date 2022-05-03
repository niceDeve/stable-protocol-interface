import React from 'react';
import {CheckOutlined, CheckCircleFilled} from '@ant-design/icons';

const iconCheckColor = '#09c199';

function SystemStatus() {
    return (
        <div className="Card CardSystemStatus">
            <h3 className="CardTitle">System Status</h3>
            <div className="CardMetricContent" style={{marginTop: 0, alignItems: 'center', justifyItems: 'center'}}>
                <div>
                    <div className="CardMetricContent" style={{alignItems: 'center', justifyItems: 'center', marginTop: 0}}>
                        <CheckCircleFilled style={{marginLeft: 30, fontSize: 30, color: 'rgb(0, 166, 81)'}} />
                        <div style={{color: 'rgb(0, 166, 81)', fontWeight: 500, marginLeft: 10}}>Fully <br/> Operational</div>
                    </div>
                    <h5 style={{marginLeft: 70}}>The system is in optimum status</h5>
                </div>
                <div>
                    <h3>Global Coverage</h3>
                    <span style={{color: 'rgb(0, 166, 81)'}}>4.2303</span>
                </div>
            </div>
            <h3 className="CardTitle" style={{marginTop: 50}}>System Operations</h3>
            <div className="CardMetricContent" style={{marginTop: 10}}>
                <div>
                    <h3><CheckOutlined style={{color: iconCheckColor}} /> Mint DoC</h3>
                    <h3><CheckOutlined style={{color: iconCheckColor}} /> Redeem DoC</h3>
                </div>
                <div className="separator" style={{height: 100}} />
                <div>
                    <h3><CheckOutlined style={{color: iconCheckColor}} /> Mint BPro</h3>
                    <h3><CheckOutlined style={{color: iconCheckColor}} /> Redeem BPro</h3>
                    <h3><CheckOutlined style={{color: iconCheckColor}} /> Mint BTCx</h3>
                    <h3><CheckOutlined style={{color: iconCheckColor}} /> Redeem BTCx</h3>
                </div>
            </div>
        </div>
    )
}

export default SystemStatus
