import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';

import FormControl from 'react-bootstrap/lib/FormControl';

import InputBase from './InputBase';

/*
* Text Input component with basic validation support.
* You can pass a validation function as a validate prop.
* If validate function returns a non empty string it will
* be shown as an error message.
 */
class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      value: this.props.value,
    };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onBlur(event) {
    this.props.onBlur(event);
  }

  onChange(event) {
    const value = event.target.value;
    this.setState({value});
    this.validate(value);
  }

  /*
  * Call the passed validation function and assign
  * valid return value to error state.
   */
  validate(value) {
    if (!this.props.validate) {
      return;
    }
    const error = this.props.validate(value);
    if (typeof error === "string") {
      this.setState({error});
    }
  }

  getPlaceholder() {
    const {formatMessage} = this.props.intl;
    if (this.props.placeholderId) {
      return formatMessage({id: this.props.placeholderId});
    }
    return "";
  }

  render() {
    return (
      <InputBase
        error={this.state.error}
        labelId={this.props.labelId}
        maxLength={this.props.maxLength}
        name={this.props.name}
        validate={this.props.validate}
        value={this.state.value}
        required={this.props.required}
      >
        <FormControl
          defaultValue={this.props.value}
          maxLength={this.props.maxLength}
          name={this.props.name}
          onBlur={this.onBlur}
          onChange={this.onChange}
          placeholder={this.getPlaceholder()}
          type="text"
        />
      </InputBase>
    );
  }
}


TextInput.propTypes = {
  intl: intlShape.isRequired,
  labelId: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  placeholderId: PropTypes.string,
  validate: PropTypes.func,
  value: PropTypes.string,
};

export default injectIntl(TextInput);
