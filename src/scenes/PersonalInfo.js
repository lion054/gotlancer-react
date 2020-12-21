import React, { PureComponent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import capitalize from 'capitalize';
import moment from 'moment';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingButton from '../components/LoadingButton';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid'
  },
  cardContent: {
    height: theme.spacing(16)
  },
  expandIcon: { // Avoid rotation of collapse icon
    '&$expanded': {
      transform: 'unset'
    }
  },
  expanded: {} // Avoid rotation of collapse icon
})

class PersonalInfo extends PureComponent {
  state = {
    currentEntry: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: null,
    loading: false
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2}>
        <Grid container>
          <Grid item md={2} />
          <Grid item md={8}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator=">">
                <Link color="inherit" href="/account_settings">Account</Link>
                <Typography variant="body2" color="textSecondary">Personal Info</Typography>
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
                          <Typography>Write your name as per your identity, we will use this name for your identity Verification.</Typography>
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
                  formattedValue: capitalize(this.state.gender),
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
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
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
              </Grid>
              <Grid item lg={6}></Grid>
            </Grid>
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Box>
      <Box mt={8} mb={8} textAlign="center">
        <Typography variant="body2" color="textSecondary">Is there any problem? we can help</Typography>
        <Link href="#" style={{ color: this.props.theme.palette.success.main }}>Contact Support</Link>
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