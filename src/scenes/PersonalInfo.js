import React, { PureComponent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Grid,
  Link,
  TextField,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
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
  expandIcon: { // Avoid rotation of icon
    '&$expanded': {
      transform: 'unset'
    }
  },
  expanded: {}, // Avoid rotation of icon
  textLabel: {
    color: theme.palette.success.main
  },
  textInput: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.success.main
    }
  }
})

class PersonalInfo extends PureComponent {
  state = {
    currentEntry: '',
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
                {this.renderLegalName()}
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

  renderLegalName = () => (
    <Accordion expanded={this.state.currentEntry === 'LegalName'}>
      <AccordionSummary
        expandIcon={(
          <Typography>{this.state.currentEntry === 'LegalName' ? 'Cancel' : 'Edit'}</Typography>
        )}
        classes={{
          expandIcon: this.props.classes.expandIcon, // Avoid rotation of icon
          expanded: this.props.classes.expanded // Avoid rotation of icon
        }}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        onClick={() => {
          if (this.state.currentEntry === 'LegalName') {
            this.setState({ currentEntry: '' });
          } else {
            this.setState({ currentEntry: 'LegalName' });
          }
        }}
      >
        <Typography>Legal Name</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Box mb={2}>
            <Typography>Write your name as per your identity, we will use this name for your identity Verification.</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                label="First name"
                variant="outlined"
                fullWidth
                className={this.props.classes.textInput}
                InputLabelProps={{
                  classes: {
                    focused: this.props.classes.textLabel
                  }
                }}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField label="Last name" variant="outlined" fullWidth />
            </Grid>
          </Grid>
          <Box mt={2}>
            <LoadingButton
              variant="contained"
              size="large"
              title="Save"
              loading={this.state.currentEntry === 'LegalName' && this.state.loading}
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