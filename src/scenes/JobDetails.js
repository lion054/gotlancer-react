import React, { PureComponent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  colors,
  fade,
  withStyles,
  withTheme
} from '@material-ui/core';
import {
  AttachFile,
  AttachMoney,
  CheckCircle,
  ChevronRight,
  CreditCard,
  DesktopMac,
  Email,
  Favorite,
  FavoriteBorder,
  PeopleAlt,
  PhoneAndroid,
  Stars,
  WatchLater
} from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import moment from 'moment';
import faker from 'faker';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ChipContainer from '../components/ChipContainer';
import { CompactCard, formatCurrency } from '../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  outerMargin: {
    margin: theme.spacing(-2),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(-1)
    }
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  },
  saveIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  sideIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1)
  }
});

export const RedButton = withStyles((theme) => ({
  text: {
    color: colors.red[500],
    '&:hover': {
      backgroundColor: fade(colors.red[500], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  outlined: {
    color: colors.red[500],
    border: `1px solid ${fade(colors.red[500], 0.5)}`,
    '&:hover': {
      border: `1px solid ${colors.red[500]}`,
      backgroundColor: fade(colors.red[500], theme.palette.action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  contained: {
    color: theme.palette.common.white,
    backgroundColor: colors.red[500],
    '&:hover': {
      backgroundColor: colors.red[700],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: colors.red[500]
      }
    }
  },
  disabled: {}
}))(Button);

class JobDetails extends PureComponent {
  state = {
    id: faker.random.number({ min: 100000, max: 1000000 }),
    details: faker.lorem.paragraphs(3),
    attachments: [],
    skills: [],
    saved: false,
    address: {
      country: {
        iso2: 'us',
        name: 'United States'
      }
    }
  }

  componentDidMount() {
    const attachments = [];
    for (let i = 0; i < 3; i++) {
      attachments.push(`File-${moment(new Date()).unix()}.png`);
    }
    const skills = [{
      title: 'HTML',
      backgroundColor: this.props.theme.palette.divide,
      color: this.props.theme.palette.text.primary
    },{
      title: 'CSS',
      backgroundColor: this.props.theme.palette.divide,
      color: this.props.theme.palette.text.primary
    },{
      title: 'PHP',
      backgroundColor: this.props.theme.palette.divide,
      color: this.props.theme.palette.text.primary
    }];
    this.setState({ attachments, skills });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mx={2} my={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box className={this.props.classes.outerMargin}>
              <Grid container>
                <Grid item md={9} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardHeader
                        title="Project Details"
                        titleTypographyProps={{
                          variant: 'subtitle2'
                        }}
                      />
                      <Divider />
                      <CardContent>
                        <Typography variant="body2">{this.state.details}</Typography>
                        <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">Project ID: {this.state.id}</Typography>
                          <RedButton variant="text">Report as spam</RedButton>
                        </Box>
                      </CardContent>
                    </CompactCard>
                  </Box>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardHeader
                        title="Attachments"
                        titleTypographyProps={{
                          variant: 'subtitle2'
                        }}
                      />
                      <Divider />
                      <CardContent>
                        <List disablePadding>
                          {this.state.attachments.map((file, index) => (
                            <ListItem key={index} disableGutters>
                              <ListItemIcon>
                                <AttachFile />
                              </ListItemIcon>
                              <ListItemText
                                primary={file}
                                primaryTypographyProps={{
                                  variant: 'body2'
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </CompactCard>
                  </Box>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardHeader
                        title="Category and Skills"
                        titleTypographyProps={{
                          variant: 'subtitle2'
                        }}
                      />
                      <Divider />
                      <CardContent>
                        <Typography variant="body1">Category and Sub-Category</Typography>
                        <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
                          <Typography variant="body2">IT and Website</Typography>
                          <Typography variant="body2">Frontend Developer</Typography>
                        </Breadcrumbs>
                        <Box mt={2} mb={1}>
                          <Typography variant="body1">Skills</Typography>
                        </Box>
                        <ChipContainer chips={this.state.skills} readOnly />
                      </CardContent>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box flex={1} mr={1}>
                            <Button fullWidth variant="contained" onClick={() => this.props.history.push('/apply_job')}>Apply Now</Button>
                          </Box>
                          <IconButton
                            className={this.props.classes.saveIcon}
                            onClick={() => this.setState({ saved: !this.state.saved })}
                          >
                            {this.state.saved ? (
                              <Favorite color="secondary" />
                            ) : (
                              <FavoriteBorder color="disabled" />
                            )}
                          </IconButton>
                        </Box>
                        <Box my={2} textAlign="center">
                          <Typography variant="h6">{formatCurrency(300)}</Typography>
                          <Typography variant="body2">Client Budget</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <WatchLater className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">Apply before 6 d, 23 hrs</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <PeopleAlt className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">23 users already applied</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <AttachMoney className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">$86.50 avarage bids</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <WatchLater className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">Need in 7days</Typography>
                        </Box>
                      </CardContent>
                    </CompactCard>
                  </Box>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardContent>
                        <Box mb={2}>
                          <Typography variant="h6">Bid credit</Typography>
                        </Box>
                        <Box mb={1}>
                          <Typography variant="body2">Your available bids</Typography>
                        </Box>
                        <Box mb={2} color={this.props.theme.palette.success.main}>
                          <Typography variant="body2">53</Typography>
                        </Box>
                        <Button fullWidth variant="outlined">Buy bid credit</Button>
                      </CardContent>
                    </CompactCard>
                  </Box>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardContent>
                        <Box mb={2}>
                          <Typography variant="h6">Employer Verification</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <Email className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.success.main} />
                          <Typography variant="body2">Email Vertification</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <CheckCircle className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">KYC Verification</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <CreditCard className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.success.main} />
                          <Typography variant="body2">Payment Verification</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <PhoneAndroid className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">Mobile Verification</Typography>
                        </Box>
                      </CardContent>
                    </CompactCard>
                  </Box>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardContent>
                        <Box mb={2}>
                          <Typography variant="h6">About Employer</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <Box className={this.props.classes.sideIcon} position="relative">
                            <Box
                              className={`flag ${this.state.address.country.iso2} margin`}
                              position="absolute"
                              top={5}
                              left={1}
                              style={{
                                transform: 'scale(1.4)',
                                transformOrigin: 'center left'
                              }}
                            />
                          </Box>
                          <Typography variant="body2">{this.state.address.country.name}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <DesktopMac className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">23 Projects Completed</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <WatchLater className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">Member since Jun 24, 2020</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <Stars className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Box display="flex" flexWrap="wrap">
                            <Rating name="read-only" value={5} readOnly size="small" />
                            <Typography variant="body2">&nbsp;(0 reviews)</Typography>
                          </Box>
                        </Box>
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
}

export default compose(
  withRouter,
  withStyles(styles),
  withTheme
)(JobDetails);