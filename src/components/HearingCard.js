import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import Link from './LinkWithLang';
import FormatRelativeTime from '../utils/FormatRelativeTime';
import Icon from '../utils/Icon';
import LabelList from './LabelList';
import getAttr from '../utils/getAttr';
import {getHearingURL, getHearingMainImageURL} from '../utils/hearing';
import moment from 'moment';
import config from '../config';

const HearingCard = ({hearing, language, className = ''}) => {
  const backgroundImage = getHearingMainImageURL(hearing);
  const cardImageStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'url(/assets/images/default-image.svg)',
  };

  // FIXME: Should there be direct linking to hearing using certain language?
  const translationAvailable = !!getAttr(hearing.title, language, {exact: true});
  const expiresSoon = moment(hearing.close_at).diff(moment(), 'weeks') < 1;
  const availableInLanguageMessages = {
    fi: 'Kuuleminen saatavilla suomeksi',
    sv: 'Hörandet tillgängligt på svenska',
    en: 'Questionnaire available in English',
  };
  const commentCount = hearing.n_comments ? (
    <div className="hearing-card-comment-count">
      <Icon name="comment-o" />&nbsp;{hearing.n_comments}
    </div>
  ) : null;
  return (
    <div className={`hearing-card ${className}`}>
      {!translationAvailable && (
        <Link to={{path: getHearingURL(hearing)}} className="hearing-card-notice">
          <div className="hearing-card-notice-content">
            <FormattedMessage id="hearingTranslationNotAvailable" />
            {config.languages.map(
              lang =>
                (getAttr(hearing.title, lang, {exact: true}) ? (
                  <div className="language-available-message">{availableInLanguageMessages[lang]}</div>
                ) : null)
            )}
          </div>
        </Link>
      )}
      <Link to={{path: getHearingURL(hearing)}} className="hearing-card-image" style={cardImageStyle}>
        {commentCount}
      </Link>
      <div className="hearing-card-content">
        <div className={`hearing-card-time ${expiresSoon ? 'expires' : ''}`}>
          <FormatRelativeTime messagePrefix="timeClose" timeVal={hearing.close_at} />
        </div>
        <h4 className="hearing-card-title">
          <Link to={{path: getHearingURL(hearing)}}>{getAttr(hearing.title, language)}</Link>
        </h4>
        <div className="hearing-card-labels">
          <LabelList className="hearing-list-item-labellist" labels={hearing.labels} language={language} />
        </div>
      </div>
    </div>
  );
};

HearingCard.propTypes = {
  className: PropTypes.string,
  hearing: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  language: PropTypes.string,
};

export default HearingCard;
