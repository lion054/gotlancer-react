import React, { PureComponent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  CardContent,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AttachFile, ChevronRight } from '@material-ui/icons';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FileUpload from '../../components/FileUpload';
import PlaceholderSelect from '../../components/PlaceholderSelect';
import LoadingButton from '../../components/LoadingButton';
import { CompactCard } from '../../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  expandIcon: { // Avoid rotation of collapse icon
    '&$expanded': {
      transform: 'unset'
    }
  },
  expanded: {}, // Avoid rotation of collapse icon
  cardIcon: {
    width: theme.spacing(8),
    height: theme.spacing(7)
  }
})

class VerifyIdentity extends PureComponent {
  state = {
    currentEntry: '',
    uploadedFiles: [{
      name: 'Front-side.png',
      status: 'Rejected'
    },{
      name: 'Back-side.png',
      status: 'Rejected'
    }],
    loading: false
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mx={2} my={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
                <Link href="/settings">Settings</Link>
                <Typography color="textSecondary">Verify identity</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5">Verify identity</Typography>
            </Box>
            <Box m={-2}>
              <Grid container>
                <Grid item md={6} sm={8} xs={12}>
                  <Box p={2}>
                    {this.renderEntry({
                      id: 'Document',
                      title: 'Document Verification',
                      formattedValue: 'Not verified',
                      upperBody: (
                        <Box>
                          <Typography variant="body2">Verify your account and staty secured your account and get more facility from Gtoalancer</Typography>
                          <Box mt={2} mb={1}>
                            <Typography variant="subtitle2">Select ID type</Typography>
                          </Box>
                          <PlaceholderSelect
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            placeholder="Select one"
                          >
                            <MenuItem value="0">Passport</MenuItem>
                            <MenuItem value="1">Driving License</MenuItem>
                          </PlaceholderSelect>
                          <Box mt={2} mb={1}>
                            <Typography variant="subtitle2">Upload front and back side of your government ID proof</Typography>
                          </Box>
                          <FileUpload />
                        </Box>
                      ),
                      buttonTitle: 'Resubmit',
                      buttonClicked: () => {},
                      lowerBody: (
                        <List disablePadding>
                          <ListItem disableGutters divider>
                            <ListItemText
                              primary="Uploaded Files"
                              primaryTypographyProps={{
                                variant: 'subtitle2'
                              }}
                            />
                            <ListItemSecondaryAction>
                              <Typography variant="subtitle2">Status</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          {this.state.uploadedFiles.map((file, index) => (
                            <ListItem key={index} disableGutters divider>
                              <ListItemIcon>
                                <AttachFile />
                              </ListItemIcon>
                              <ListItemText
                                primary={file.name}
                                primaryTypographyProps={{
                                  variant: 'body2'
                                }}
                              />
                              <ListItemSecondaryAction>
                                <Typography variant="body2" color="secondary">{file.status}</Typography>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                      )
                    })}
                    {this.renderEntry({
                      id: 'Video',
                      title: 'Video Verification',
                      formattedValue: 'Verify your account and staty secured your account and get more facility from Gtoalancer',
                      upperBody: (
                        <div></div>
                      ),
                      buttonTitle: 'Submit Now',
                      buttonClicked: () => {}
                    })}
                  </Box>
                </Grid>
                <Grid item md={3} />
                <Grid item md={3} sm={4} xs={12}>
                  <Box p={2}>
                    <CompactCard>
                      <CardContent>
                        <img alt="" className={this.props.classes.cardIcon} src={require('../../assets/images/settings/verify-identity.svg')} />
                        <Typography variant="subtitle2">Let's make your account more secure</Typography>
                        <Typography variant="body2">Your account security: Medium</Typography>
                        <Typography variant="body2">We’re always working on ways to increase safety in our community. That’s why we look at every account to make sure it’s as secure as possible.</Typography>
                      </CardContent>
                    </CompactCard>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={2} />
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

  renderEntry = ({ id, title, formattedValue, upperBody, buttonTitle, buttonClicked, lowerBody }) => (
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
          {upperBody}
          <Box mt={2}>
            <LoadingButton
              variant="contained"
              size="large"
              title={buttonTitle}
              loading={this.state.currentEntry === id && this.state.loading}
              onClick={buttonClicked}
            />
          </Box>
          {!!lowerBody && (
            <Box mt={2}>
              {lowerBody}
            </Box>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(VerifyIdentity);