import { useState } from 'react';
import { Row, Col, Tooltip, Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { config } from './../../../Config/config';

import { getKeyThenIncreaseKey } from 'antd/lib/message';

export default function InformationModal({ currencyCode }) {

  const [t, i18n] = useTranslation(["global", 'moc','rdoc']);
  const ns = config.environment.AppMode === 'MoC' ? 'moc' : 'rdoc';
  const appMode = config.environment.AppMode;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
      setTimeout(function(){
          document.querySelector('.ant-modal-close-x').style.color="#6c6d6f";
      }, 200);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getKey = (s) => {
    return (s.substring(0, 8))
  }

  const pre_label = t(`${appMode}.Tokens_${currencyCode.toUpperCase()}_name`, { ns: ns })

    // document.querySelectorAll('.rlogin-modal-hitbox')[0].addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); })


  const TokenInformationContent = ({ token }) => (
    <Row>
      <Col span={24}>
        <hr className='FactSheetLine' />
        <p className='FactSheet'>{`${t(`${appMode}.TokenInformationContent.${token}.factSheet`, { ns: ns })}`}</p>
          <p>{token}</p>
        <h4 className='FactSheetTitle' dangerouslySetInnerHTML={{ __html: t(`${appMode}.TokenInformationContent.${token}.title`, { ns: ns, returnObjectTrees: false }) }} />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <ul>
          {
            t(`${appMode}.TokenInformationContent.${token}.characteristics.left`, { ns: ns, returnObjects: true }).map(eachcharacteristic => (
              <li key={getKey(eachcharacteristic)} className='Characteristic'>{eachcharacteristic}</li>
            ))
          }
        </ul>
      </Col>
      <Col xs={24} sm={24} md={12}>
        <ul>
          {
            t(`${appMode}.TokenInformationContent.${token}.characteristics.right`, { ns: ns, returnObjects: true }).map(eachcharacteristic => (
              <li key={getKey(eachcharacteristic)} className='Characteristic'>{eachcharacteristic}</li>
            ))
          }
        </ul>
      </Col>
    </Row>
  )

  return (
    <div>
      <Tooltip placement="topRight" title={`${t(`${appMode}.tokenInformationTooltip`, { ns: ns })} ${pre_label}`} className='Tooltip'>
        <InfoCircleOutlined className="Icon" onClick={showModal} />
      </Tooltip>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} width='70%'
        bodyStyle={{ paddingTop: 35, paddingLeft: 50, paddingRight: 50 }}
      >
        <TokenInformationContent token={currencyCode} />
      </Modal>
    </div >
  )
}