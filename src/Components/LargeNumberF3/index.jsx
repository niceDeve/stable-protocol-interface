import { Tooltip } from 'antd';
import NumericLabel from 'react-pretty-numbers';
import { adjustPrecision } from '../../Helpers/Formats';
import {useTranslation} from "react-i18next";
import { config } from '../../Config/config';

const LargeNumberF3 = ({ amount, currencyCode, includeCurrency, numericLabelParams, className }) => {

  const [t, i18n]= useTranslation(["global",'moc','rdoc']);
  const ns = config.environment.AppProject.toLowerCase();
    const AppProject = config.environment.AppProject;
  if (amount !== null && amount !== '' && !Number.isNaN(amount)) {
    const { value, decimals } = adjustPrecision(amount, currencyCode);
    const params = Object.assign(
      {
          commafy: true,
          justification: "L",
          locales: i18n.languages[0],
          precision: decimals,
          shortFormat: true,
          shortFormatMinValue: 1000000,
          shortFormatPrecision: decimals,
          title: "",
          cssClass:['value_usd']
      },
      numericLabelParams
    );



    return (<>
            { !isNaN(value) &&

            <><NumericLabel {... {params }}>{value.toString()}</NumericLabel>
                <span className={'number-label'}>{includeCurrency && ` ${t(`${AppProject}.Tokens_${currencyCode}_code`, {ns: ns })}`}</span></>

            }</>
    );
  }

  return (
    <Tooltip title={t(`${AppProject}.general.invalidValueDescription`, {ns: ns})}>
      {t(`${AppProject}.general.invalidValuePlaceholder`, {ns: ns})}
    </Tooltip>
  )
};


export { LargeNumberF3 };

