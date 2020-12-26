import React, { PureComponent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight, CloudUpload, Delete } from '@material-ui/icons';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoadingButton from '../../components/LoadingButton';

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
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid'
  },
  cardIcon: {
    width: theme.spacing(8),
    height: theme.spacing(7)
  },
  fileUpload: {
    color: theme.palette.success.main
  }
})

class VerifyIdentity extends PureComponent {
  state = {
    currentEntry: '',
    loading: false
  }

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
                <Typography color="textSecondary">Verify identity</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5" color="textPrimary">Verify identity</Typography>
            </Box>
            <Grid container>
              <Grid item lg={6}>
                {this.renderEntry({
                  id: 'Document',
                  title: 'Document Verification',
                  formattedValue: 'Not verified',
                  details: (
                    <Box>
                      <Box mb={2}>
                        <Typography variant="body2" color="textSecondary">Verify your account and staty secured your account and get more facility from Gtoalancer</Typography>
                      </Box>
                      <Box mb={2}>
                        <Button variant="outlined" startIcon={<CloudUpload />}>Upload File</Button>
                      </Box>
                      <Divider />
                      <Box mt={2}>
                        <Typography variant="body2" color="textSecondary">1 file uploaded</Typography>
                      </Box>
                      <Box mt={2} display="flex">
                        <MenuItem className={this.props.classes.fileUpload}>Your_uploaded_file_here</MenuItem>
                        <IconButton color="inherit">
                          <Delete />
                        </IconButton>
                      </Box>
                      <Box mb={2} display="flex">
                        <MenuItem className={this.props.classes.fileUpload}>Your_uploaded_file_here</MenuItem>
                        <IconButton color="inherit">
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  ),
                  buttonTitle: 'Submit Now',
                  buttonClicked: () => {}
                })}
                {this.renderEntry({
                  id: 'Video',
                  title: 'Video Verification',
                  formattedValue: 'Verify your account and staty secured your account and get more facility from Gtoalancer',
                  details: (
                    <div></div>
                  ),
                  buttonTitle: 'Submit Now',
                  buttonClicked: () => {}
                })}
              </Grid>
              <Grid item lg={2} />
              <Grid item lg={4}>
                <Card elevation={0} className={this.props.classes.card}>
                  <CardContent>
                    <img alt="" className={this.props.classes.cardIcon} src={require('../../assets/images/account-settings/verify-identity.svg')} />
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

  renderEntry = ({ id, title, formattedValue, details, buttonTitle, buttonClicked }) => (
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
              title={buttonTitle}
              loading={this.state.currentEntry === id && this.state.loading}
              onClick={buttonClicked}
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
)(VerifyIdentity);