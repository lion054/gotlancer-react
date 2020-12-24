import React, { Fragment, PureComponent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
import moment from 'moment';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoadingButton from '../../components/LoadingButton';
import { allCountries } from 'material-ui-phone-number/src/country_data';
import '../../../node_modules/material-ui-phone-number/src/styles.less';
import '../../../node_modules/material-ui-phone-number/src/flags.png';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  expandIcon: { // Avoid rotation of collapse icon
    '&$expanded': {
      transform: 'unset'
    }
  },
  expanded: {}, // Avoid rotation of collapse icon
  country: {
    fontSize: theme.spacing(2),
    '& > span': {
      marginRight: theme.spacing(1.25),
      fontSize: theme.spacing(1.25)
    }
  },
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid'
  },
  cardIcon: {
    width: theme.spacing(8),
    height: theme.spacing(7)
  }
})

class PersonalInfo extends PureComponent {
  state = {
    currentEntry: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: null,
    country: '',
    street: '',
    aptSuite: '',
    city: '',
    county: '',
    postCode: '',
    loading: false
  }

  countries = allCountries.filter(country => !country.isAreaCode)

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item md={2} />
          <Grid item md={8}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
                <Link color="inherit" href="/account_settings">Account</Link>
                <Typography color="textSecondary">Personal Info</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5" color="textPrimary">Personal Info</Typography>
            </Box>
            <Grid container>
              <Grid item lg={6}>
                {this.renderEntry({
                  id: 'LegalName',
                  title: 'Legal name',
                  formattedValue: this.state.firstName + ' ' + this.state.lastName,
                  details: (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box mb={2}>
                          <Typography>Write your name as per your identity, we will use this name for your identity verification.</Typography>
                        </Box>
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          variant="outlined"
                          label="First name"
                          value={this.state.firstName}
                          onChange={e => this.setState({ firstName: e.target.value })}
                          fullWidth
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          variant="outlined"
                          label="Last name"
                          value={this.state.lastName}
                          onChange={e => this.setState({ lastName: e.target.value })}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  )
                })}
                {this.renderEntry({
                  id: 'Gender',
                  title: 'Gender',
                  formattedValue: this.state.gender,
                  details: (
                    <Box width="100%">
                      <TextField
                        select
                        variant="outlined"
                        label="Gender"
                        value={this.state.gender}
                        onChange={e => this.setState({ gender: e.target.value })}
                        fullWidth
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </TextField>
                    </Box>
                  )
                })}
                {this.renderEntry({
                  id: 'DateOfBirth',
                  title: 'Date of birth',
                  formattedValue: this.state.dateOfBirth && moment(this.state.dateOfBirth).format('MMMM D, YYYY'),
                  details: (
                    <Box width="100%">
                      <KeyboardDatePicker
                        format="MM/DD/YYYY"
                        clearable
                        disableFuture
                        value={this.state.dateOfBirth}
                        onChange={(m) => {
                          if (m) {
                            console.log(m.toDate());
                            this.setState({ dateOfBirth: m.toDate() });
                          } else {
                            this.setState({ dateOfBirth: null });
                          }
                        }}
                        fullWidth
                      />
                    </Box>
                  )
                })}
                {this.renderEntry({
                  id: 'Address',
                  title: 'Address',
                  formattedValue: this.state.firstName + ' ' + this.state.lastName,
                  details: (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box mb={2}>
                          <Typography>Use a permanent address where you can receive mail.</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Autocomplete
                          fullWidth
                          options={this.countries}
                          classes={{
                            option: this.props.classes.country
                          }}
                          autoHighlight
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
                              label="Choose a country"
                              variant="outlined"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                              }}
                            />
                          )}
                          onChange={(value) => console.log(value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          label="Street address"
                          value={this.state.street}
                          onChange={e => this.setState({ street: e.target.value })}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          label="Flat, suite. (optional)"
                          value={this.state.aptSuite}
                          onChange={e => this.setState({ aptSuite: e.target.value })}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label="City/Town"
                          value={this.state.city}
                          onChange={e => this.setState({ city: e.target.value })}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label="County"
                          value={this.state.county}
                          onChange={e => this.setState({ county: e.target.value })}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label="Postcode"
                          value={this.state.postCode}
                          onChange={e => this.setState({ postCode: e.target.value })}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  )
                })}
              </Grid>
              <Grid item lg={2} />
              <Grid item lg={4}>
                <Card className={this.props.classes.card}>
                  <CardContent>
                    <img alt="" className={this.props.classes.cardIcon} src={require('../../assets/images/account-settings/personal-info.svg')} />
                    <Typography variant="subtitle2">Let's make your account more secure</Typography>
                    <Typography variant="body2">Your account security: Medium</Typography>
                    <Typography variant="body2">We’re always working on ways to increase safety in our community. That’s why we look at every account to make sure it’s as secure as possible.</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )

  getExpandIcon(id) {
    let color = this.props.theme.palette.action.disabled;
    if (this.state.currentEntry === '') {
      color = this.props.theme.palette.success.main;
    } else if (this.state.currentEntry === id) {
      color = this.props.theme.palette.success.main;
    }
    return (
      <Typography variant="body2" style={{ color }}>{this.state.currentEntry === id ? 'Cancel' : 'Edit'}</Typography>
    );
  }

  renderEntry = ({ id, title, formattedValue, details }) => (
    <Accordion expanded={this.state.currentEntry === id}>
      <AccordionSummary
        expandIcon={this.getExpandIcon(id)}
        classes={{
          expandIcon: this.props.classes.expandIcon, // Avoid rotation of collapse icon
          expanded: this.props.classes.expanded // Avoid rotation of collapse icon
        }}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        onClick={() => {
          if (this.state.currentEntry === id) {
            this.setState({ currentEntry: '' });
          } else {
            this.setState({ currentEntry: id });
          }
        }}
      >
        <Box>
          <Typography variant="subtitle1">{title}</Typography>
          {this.state.currentEntry !== id && (
            <Typography variant="body1">{formattedValue}</Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box width="100%">
          {details}
          <Box mt={2}>
            <LoadingButton
              variant="contained"
              size="large"
              title="Save"
              loading={this.state.currentEntry === id && this.state.loading}
              onClick={() => {
                this.setState({ loading: true });
                setTimeout(() => this.setState({ loading: false, currentEntry: '' }), 3000);
              }}
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(PersonalInfo);