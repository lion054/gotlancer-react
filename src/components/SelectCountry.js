import React, { Fragment, PureComponent } from 'react';
import { TextField, withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';

import { allCountries } from 'material-ui-phone-number/src/country_data';

const styles = (theme) => ({
  country: {
    fontSize: theme.spacing(2),
    '& > span': {
      marginRight: theme.spacing(1.25),
      fontSize: theme.spacing(1.25)
    }
  }
})

class SelectCountry extends PureComponent {
  countries = allCountries.filter(country => !country.isAreaCode)

  render = () => (
    <Autocomplete
      fullWidth={this.props.fullWidth}
      options={this.countries}
      classes={{
        option: this.props.classes.country
      }}
      autoHighlight={this.props.autoHighlight}
      getOptionLabel={(option) => option.name}
      renderOption={(option) => (
        <Fragment>
          <div className={`flag ${option.iso2} margin`} />
          <div style={{ flex: 1 }}>{option.name}</div>
          <div>+{option.dialCode}</div>
        </Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={this.props.label}
          variant="outlined"
          margin={this.props.margin}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          style={{
            marginTop: 0,
            marginBottom: 0
          }}
        />
      )}
      onChange={this.props.onChange}
    />
  )
}

SelectCountry.propTypes = {
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  autoHighlight: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
};

export default withStyles(styles)(SelectCountry);