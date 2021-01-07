import React, { Fragment, PureComponent } from 'react';
import {
  Avatar,
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Tooltip,
  Typography,
  fade,
  withStyles,
  withTheme,
  withWidth,
} from '@material-ui/core';
import {
  Add,
  AttachMoney,
  Check,
  CheckCircle,
  Create,
  Email,
  Favorite,
  Phone,
  Room,
  Star,
  TurnedIn,
  WatchLater
} from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import pluralize from 'pluralize';
import moment from 'moment';
import faker from 'faker';
import { compose } from 'redux';

import 'material-ui-phone-number/src/styles.less';
import 'material-ui-phone-number/src/flags.png';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChangeAvatar from './ChangeAvatar';
import ChangeHourlyRate from './ChangeHourlyRate';
import ChangeSummary from './ChangeSummary';
import ChangeAvailability from './ChangeAvailability';
import AddEducation from './AddEducation';
import AddEmployment from './AddEmployment';
import AddCertification from './AddCertification';
import ChangeTitle from './ChangeTitle';
import CompactPagination from '../../components/CompactPagination';
import { CompactCard, formatCurrency } from '../../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  container: {
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2)
    }
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
  avatar: {
    [theme.breakpoints.only('xl')]: {
      width: theme.spacing(20),
      height: theme.spacing(20)
    },
    [theme.breakpoints.only('lg')]: {
      width: theme.spacing(18),
      height: theme.spacing(18)
    },
    [theme.breakpoints.only('md')]: {
      width: theme.spacing(16),
      height: theme.spacing(16)
    },
    [theme.breakpoints.only('sm')]: {
      width: theme.spacing(14),
      height: theme.spacing(14)
    },
    [theme.breakpoints.only('xs')]: {
      width: theme.spacing(12),
      height: theme.spacing(12)
    }
  },
  pencil: {
    [theme.breakpoints.only('xl')]: {
      width: 36,
      height: 36,
      borderRadius: 18
    },
    [theme.breakpoints.only('lg')]: {
      width: 34,
      height: 34,
      borderRadius: 17
    },
    [theme.breakpoints.only('md')]: {
      width: 32,
      height: 32,
      borderRadius: 16
    },
    [theme.breakpoints.only('sm')]: {
      width: 30,
      height: 30,
      borderRadius: 15
    },
    [theme.breakpoints.only('xs')]: {
      width: 28,
      height: 28,
      borderRadius: 14
    },
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: fade(theme.palette.background.default, 0.75)
    }
  },
  status: {
    boxSizing: 'border-box',
    [theme.breakpoints.only('xl')]: {
      width: 36,
      height: 36,
      borderRadius: 18
    },
    [theme.breakpoints.only('lg')]: {
      width: 34,
      height: 34,
      borderRadius: 17
    },
    [theme.breakpoints.only('md')]: {
      width: 32,
      height: 32,
      borderRadius: 16
    },
    [theme.breakpoints.only('sm')]: {
      width: 30,
      height: 30,
      borderRadius: 15
    },
    [theme.breakpoints.only('xs')]: {
      width: 28,
      height: 28,
      borderRadius: 14
    },
    border: `solid 5px ${theme.palette.background.default}`,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  progress: {
    height: theme.spacing(1)
  },
  progressThumb: {
    backgroundColor: theme.palette.success.main
  },
  progressText: {
    width: 52,
    textAlign: 'right'
  },
  hour: {
    display: 'inline-block',
    width: 60,
    color: theme.palette.success.main
  },
  score: {
    [theme.breakpoints.only('xs')]: {
      position: 'relative',
      top: -3
    },
    marginRight: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0, 0.5),
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    fontSize: 12
  },
  skill: {
    marginRight: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
    fontSize: 12
  },
  reviewAvatar: {
    width: 64,
    height: 64,
    marginRight: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      marginRight: theme.spacing(1)
    }
  },
  emptyContent: {
    minHeight: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class Profile extends PureComponent {
  state = {
    avatar: faker.image.image(),
    address: {
      country: {
        iso2: 'in',
        name: 'India'
      },
      city: 'Kolkata'
    },
    summary: faker.lorem.paragraphs(10),
    exhibitions: [],
    reviews: [],
    avatarOpened: false,
    hourlyRateOpened: false,
    summaryOpened: false,
    availabilityOpened: false,
    educationOpened: false,
    employmentOpened: false,
    certificationOpened: false,
    titleOpened: false,
    workOpened: false
  }

  componentDidMount() {
    const exhibitions = [];
    for (let i = 0; i < 8; i++) {
      exhibitions.push({
        avatar: faker.image.image()
      });
    }
    const reviews = [];
    for (let i = 0; i < 3; i++) {
      reviews.push({
        avatar: faker.image.image(),
        name: faker.name.findName(),
        title: faker.lorem.sentence(5),
        score: faker.random.float({ min: 0, max: 5 }, 1),
        budget: faker.random.number({ min: 100, max: 300 }),
        comment: faker.lorem.sentence(),
        location: faker.address.country(),
        createdAt: faker.date.past()
      });
    }
    this.setState({ exhibitions, reviews });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box className={this.props.classes.container}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Grid container>
              <Grid item md={3} xs={12}>
                {(this.props.width === 'xs' || this.props.width === 'sm') && this.renderAbout()}
                {this.renderSideBar()}
              </Grid>
              <Grid item md={9} xs={12}>
                {(this.props.width === 'md' || this.props.width === 'lg' || this.props.width === 'xl') && this.renderAbout()}
                {this.renderSummary()}
                {this.renderPortfolio()}
                {this.renderReviews()}
                {this.renderExperiences()}
                {this.renderEducations()}
                {this.renderCertifications()}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
      <ChangeAvatar
        open={this.state.avatarOpened}
        onClose={() => this.setState({ avatarOpened: false })}
      />
      <ChangeHourlyRate
        open={this.state.hourlyRateOpened}
        onClose={() => this.setState({ hourlyRateOpened: false })}
      />
      <ChangeSummary
        open={this.state.summaryOpened}
        onClose={() => this.setState({ summaryOpened: false })}
      />
      <ChangeAvailability
        open={this.state.availabilityOpened}
        onClose={() => this.setState({ availabilityOpened: false })}
      />
      <AddEducation
        open={this.state.educationOpened}
        onClose={() => this.setState({ educationOpened: false })}
      />
      <AddEmployment
        open={this.state.employmentOpened}
        onClose={() => this.setState({ employmentOpened: false })}
      />
      <AddCertification
        open={this.state.certificationOpened}
        onClose={() => this.setState({ certificationOpened: false })}
      />
      <ChangeTitle
        open={this.state.titleOpened}
        onClose={() => this.setState({ titleOpened: false })}
      />
    </div>
  )

  renderSideBar = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardContent>
          {(this.props.width === 'md' || this.props.width === 'lg' || this.props.width === 'xl') && (
            <Box textAlign="center" md={4}>
              {this.renderAvatar()}
            </Box>
          )}
          <Box>
            <Typography variant="body2">Success Rate</Typography>
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <LinearProgress variant="determinate" value={80} classes={{
                  root: this.props.classes.progress,
                  barColorPrimary: this.props.classes.progressThumb
                }} />
              </Box>
              <Typography variant="body1" className={this.props.classes.progressText}>80%</Typography>
            </Box>
            <Box>
              <Typography variant="body2" component="span" className={this.props.classes.hour}>40 hrs</Typography>
              <Box mr={1} component="span">
                <Typography variant="body2" component="span">Available weekly</Typography>
              </Box>
              <Tooltip title="Edit Availability">
                <IconButton
                  style={{
                    border: `solid 1px ${this.props.theme.palette.divider}`,
                    padding: 7
                  }}
                  onClick={() => this.setState({ availabilityOpened: true })}
                >
                  <Create />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Typography variant="body2" component="span" className={this.props.classes.hour}>1 hour</Typography>
              <Typography variant="body2" component="span">Respond time</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={3} mb={1}>
              <Box flex={1}>
                <Typography variant="body2" component="span">Certificate</Typography>
              </Box>
              <Button variant="outlined">Get Certificate</Button>
            </Box>
          </Box>
          <Divider />
          <Box>
            <Box>
              <Typography variant="body2">PHP</Typography>
              <Box display="flex" alignItems="center">
                <Box flex={1}>
                  <LinearProgress variant="determinate" value={90} classes={{
                    root: this.props.classes.progress,
                    barColorPrimary: this.props.classes.progressThumb
                  }} />
                </Box>
                <Typography variant="body1" className={this.props.classes.progressText}>90%</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2">HTML</Typography>
              <Box display="flex" alignItems="center">
                <Box flex={1}>
                  <LinearProgress variant="determinate" value={82} classes={{
                    root: this.props.classes.progress,
                    barColorPrimary: this.props.classes.progressThumb
                  }} />
                </Box>
                <Typography variant="body1" className={this.props.classes.progressText}>82%</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2">Adobe Illustrator</Typography>
              <Box display="flex" alignItems="center">
                <Box flex={1}>
                  <LinearProgress variant="determinate" value={70} classes={{
                    root: this.props.classes.progress,
                    barColorPrimary: this.props.classes.progressThumb
                  }} />
                </Box>
                <Typography variant="body1" className={this.props.classes.progressText}>70%</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2">Photoshop</Typography>
              <Box display="flex" alignItems="center">
                <Box flex={1}>
                  <LinearProgress variant="determinate" value={100} classes={{
                    root: this.props.classes.progress,
                    barColorPrimary: this.props.classes.progressThumb
                  }} />
                </Box>
                <Typography variant="body1" className={this.props.classes.progressText}>100%</Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box mt={3} mb={3}>
            <Box display="flex" alignItems="center">
              <Avatar>
                <Phone />
              </Avatar>
              <Box flex={1} ml={1} mr={1}>
                <Typography variant="body2">Mobile Verification</Typography>
              </Box>
              <Tooltip title="Verify Mobile">
                <IconButton style={{ border: `solid 1px ${this.props.theme.palette.divider}`, padding: 7 }}>
                  <Add htmlColor={this.props.theme.palette.success.main} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <Avatar style={{ backgroundColor: this.props.theme.palette.success.main }}>
                <Email />
              </Avatar>
              <Box flex={1} ml={1} mr={1}>
                <Typography variant="body2">Email Verification</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <Avatar style={{ backgroundColor: this.props.theme.palette.success.main }}>
                <Check />
              </Avatar>
              <Box flex={1} ml={1} mr={1}>
                <Typography variant="body2">KYC Verification</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <Avatar>
                <AttachMoney />
              </Avatar>
              <Box flex={1} ml={1} mr={1}>
                <Typography variant="body2">Payment Verification</Typography>
              </Box>
              <Tooltip title="Add Payment Method">
                <IconButton style={{ border: `solid 1px ${this.props.theme.palette.divider}`, padding: 7 }}>
                  <Add htmlColor={this.props.theme.palette.success.main} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Divider />
          <Box mt={3} mb={3}>
            <Box display="flex" alignItems="center">
              <Box width={40} height={40} position="relative">
                <Box
                  className={`flag ${this.state.address.country.iso2} margin`}
                  position="absolute"
                  top={15}
                  left={5}
                  style={{
                    transform: 'scale(2)',
                    transformOrigin: 'center left'
                  }}
                />
              </Box>
              <Box flex={1} ml={1}>
                <Typography variant="body2">{this.state.address.city}, {this.state.address.country.name}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <WatchLater style={{
                width: 40,
                height: 40,
                color: this.props.theme.palette.primary.main
              }} />
              <Box flex={1} ml={1} mr={1}>
                <Typography variant="body2">It’s curently 4:25 PM here</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <TurnedIn style={{
                width: 40,
                height: 40,
                color: this.props.theme.palette.warning.main
              }} />
              <Box flex={1} ml={1} mr={1}>
                <Typography variant="body2">Joined, Sep 13, 2013</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <Favorite style={{
                width: 40,
                height: 40,
                color: this.props.theme.palette.secondary.main
              }} />
              <Box flex={1} ml={1} mr={1}>
                <Typography variant="body2">0 Recomandations</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CompactCard>
    </Box>
  )

  renderAbout = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardContent>
          <Box className={this.props.classes.outerMargin}>
            <Grid container>
              {(this.props.width === 'xs' || this.props.width === 'sm') && (
                <Grid item xs={4}>
                  <Box className={this.props.classes.innerPadding}>
                    {this.renderAvatar()}
                    <Box mt={2}>
                      {this.renderHourlyRate()}
                    </Box>
                  </Box>
                </Grid>
              )}
              <Grid item md={12} xs={8}>
                <Box className={this.props.classes.innerPadding}>
                  <Box mb={0.5} display={this.props.width === 'xs' ? 'block' : 'flex'}>
                    <Box display="flex" alignItems="center" component="span">
                      <Box mr={2} color={this.props.theme.palette.success.main}>
                        <Typography variant="body1">Greg Prickril</Typography>
                      </Box>
                      <Box ml={1} mr={1}>
                        <CheckCircle htmlColor={this.props.theme.palette.success.main} />
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" component="span">
                      <Box ml={1} mr={1}>
                        <Star htmlColor={this.props.theme.palette.warning.main} />
                      </Box>
                      <Box ml={1} mr={1} color={this.props.theme.palette.warning.main}>
                        <Typography variant="body2">HIGHTEST RATED</Typography>
                      </Box>
                    </Box>
                    {(this.props.width === 'md' || this.props.width === 'lg' || this.props.width === 'xl') && (
                      <Fragment>
                        <span style={{ flex: 1 }} />
                        {this.renderHourlyRate()}
                      </Fragment>
                    )}
                  </Box>
                  <Box display="flex" alignItems="center" mb={0.5}>
                    <Box mr={1}>
                      <Typography variant="body1">MEAN Stack (Angular | Vue.js | Laravel | Node)</Typography>
                    </Box>
                    <Tooltip title="Edit Title">
                      <IconButton
                        style={{
                          border: `solid 1px ${this.props.theme.palette.divider}`,
                          padding: 7
                        }}
                        onClick={() => this.setState({ titleOpened: true })}
                      >
                        <Create />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box display={this.props.width === 'xs' ? 'block' : 'flex'} alignItems="center" mt={0.5} mb={0.5}>
                    {this.renderScore(4.9)}
                    <Box ml={1} flex={1}>
                      <Typography variant="body2">({pluralize('review', 10, true)})</Typography>
                    </Box>
                    {(this.props.width === 'md' || this.props.width === 'lg' || this.props.width === 'xl') && this.renderActionButtons()}
                  </Box>
                  <Box>
                    <span className={this.props.classes.skill}>Augmented Reality (AR)</span>
                    <span className={this.props.classes.skill}>Virtual Reality (VR)</span>
                    <span className={this.props.classes.skill}>Unity3D</span>
                    <Tooltip title="Add Skill">
                      <IconButton style={{ border: `solid 1px ${this.props.theme.palette.divider}`, padding: 7 }}>
                        <Add htmlColor={this.props.theme.palette.success.main} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {(this.props.width === 'xs' || this.props.width === 'sm') && (
            <Fragment>
              <Box mt={2} mb={2}>
                <Divider />
              </Box>
              <Box textAlign="center">
                {this.renderActionButtons()}
              </Box>
            </Fragment>
          )}
        </CardContent>
      </CompactCard>
    </Box>
  )

  renderSummary = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardHeader
          title={(
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">Summary</Typography>
              <IconButton onClick={() => this.setState({ summaryOpened: true })}>
                <Create />
              </IconButton>
            </Box>
          )}
        />
        <Divider />
        <CardContent>
          <Typography variant="body2">{this.state.summary}</Typography>
        </CardContent>
      </CompactCard>
    </Box>
  )

  renderPortfolio = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardHeader
          title="Portfolio"
          titleTypographyProps={{
            variant: 'subtitle1'
          }}
          action={(
            <Box mt={1}>
              <Button variant="contained">Add New</Button>
            </Box>
          )}
        />
        <Divider />
        <CardContent style={{ paddingTop: 0 }}>
          <Grid container>
            {this.state.exhibitions.map((exhibition, index) => (
              <Grid key={index} item md={3} sm={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <img alt="" src={exhibition.avatar} style={{ borderRadius: 4, width: '100%' }} />
                  <Box display="flex">
                    <Button style={{ color: this.props.theme.palette.success.main }}>Edit</Button>
                    <Divider orientation="vertical" flexItem />
                    <Button color="secondary">Delete</Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Divider />
          <CompactPagination />
        </CardContent>
      </CompactCard>
    </Box>
  )

  renderReviews = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardHeader
          title="Reviews"
          titleTypographyProps={{
            variant: 'subtitle1'
          }}
        />
        <Divider />
        <CardContent>
          <Box className={this.props.classes.outerMargin} pb={2}>
            <Grid container>
              <Grid item md={4} xs={12}>
                <Box className={this.props.classes.innerPadding} textAlign="center" mt={1}>
                  <Typography variant="body2">Average Rating</Typography>
                  <Typography variant="h3">4.9</Typography>
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <Typography variant="body2">{pluralize('review', 10, true)}</Typography>
                </Box>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box className={this.props.classes.innerPadding} display="flex">
                  <Divider orientation="vertical" flexItem />
                  <Box ml={1} flex={1}>
                    <Box display="flex" alignItems="center" m={1}>
                      <Box flex={1}>
                        <Typography variant="body2">Awesome freelancer</Typography>
                      </Box>
                      <Rating name="read-only" value={5} readOnly size="small" />
                    </Box>
                    <Box display="flex" alignItems="center" m={1}>
                      <Box flex={1}>
                        <Typography variant="body2">Pretty good</Typography>
                      </Box>
                      <Rating name="read-only" value={4} readOnly size="small" />
                    </Box>
                    <Box display="flex" alignItems="center" m={1}>
                      <Box flex={1}>
                        <Typography variant="body2">Could've been better</Typography>
                      </Box>
                      <Rating name="read-only" value={3} readOnly size="small" />
                    </Box>
                    <Box display="flex" alignItems="center" m={1}>
                      <Box flex={1}>
                        <Typography variant="body2">Needs improvement</Typography>
                      </Box>
                      <Rating name="read-only" value={2} readOnly size="small" />
                    </Box>
                    <Box display="flex" alignItems="center" m={1}>
                      <Box flex={1}>
                        <Typography variant="body2">Unsatisfactory</Typography>
                      </Box>
                      <Rating name="read-only" value={1} readOnly size="small" />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <List disablePadding>
            {this.state.reviews.map((review, index) => {
              switch (this.props.width) {
                case 'sm':
                case 'xs':
                  return this.renderMobileReview(review, index);
                default:
                  return this.renderDesktopReview(review, index);
              }
            })}
          </List>
          <CompactPagination />
        </CardContent>
      </CompactCard>
    </Box>
  )

  renderDesktopReview = (review, index) => (
    <ListItem key={index} disableGutters divider>
      <Avatar src={review.avatar} className={this.props.classes.reviewAvatar} />
      <Box flex={1}>
        <Typography variant="body1" color="primary">{review.title}</Typography>
        <Box display="flex" alignItems="center">
          {this.renderScore(4.9)}
          <Box ml={1}>
            <Typography variant="body2">{formatCurrency(review.budget)}</Typography>
          </Box>
        </Box>
        <Box mt={1} mb={1}>
          <Typography variant="body1">&ldquo;{review.comment}&rdquo;</Typography>
        </Box>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography variant="body2" color="primary">{review.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box mr={0.5}>
                <Room />
              </Box>
              <Typography variant="body2">{review.location}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" style={{ textTransform: 'capitalize' }}>{moment(review.createdAt).fromNow()}</Typography>
          </Grid>
        </Grid>
      </Box>
    </ListItem>
  )

  renderMobileReview = (review, index) => (
    <ListItem key={index} disableGutters divider>
      <Box>
        <Box display="flex">
          <Avatar src={review.avatar} className={this.props.classes.reviewAvatar} />
          <Box>
            <Typography variant="body1" color="primary">{review.title}</Typography>
            <Box display="flex" alignItems="center">
              {this.renderScore(4.9)}
              <Box ml={1}>
                <Typography variant="body2">{formatCurrency(review.budget)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt={1} mb={1}>
          <Typography variant="body1">&ldquo;{review.comment}&rdquo;</Typography>
        </Box>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography variant="body2" color="primary">{review.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box mr={0.5}>
                <Room />
              </Box>
              <Typography variant="body2">{review.location}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" style={{ textTransform: 'capitalize' }}>{moment(review.createdAt).fromNow()}</Typography>
          </Grid>
        </Grid>
      </Box>
    </ListItem>
  )

  renderExperiences = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardHeader
          title={(
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Typography variant="subtitle1">Experiences</Typography>
              </Box>
              <Button variant="contained" onClick={() => this.setState({ employmentOpened: true })}>Add New</Button>
            </Box>
          )}
        />
        <Divider />
        <CardContent>
          <Box className={this.props.classes.emptyContent}>
            <Typography variant="body1">No work experience added</Typography>
          </Box>
        </CardContent>
      </CompactCard>
    </Box>
  )

  renderEducations = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardHeader
          title={(
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Typography variant="subtitle1">Educations</Typography>
              </Box>
              <Button variant="contained" onClick={() => this.setState({ educationOpened: true })}>Add New</Button>
            </Box>
          )}
        />
        <Divider />
        <CardContent>
          <Box className={this.props.classes.emptyContent}>
            <Typography variant="body1">No work experience added</Typography>
          </Box>
        </CardContent>
      </CompactCard>
    </Box>
  )

  renderCertifications = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardHeader
          title={(
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Typography variant="subtitle1">Certifications</Typography>
              </Box>
              <Button variant="contained" onClick={() => this.setState({ certificationOpened: true })}>Add New</Button>
            </Box>
          )}
        />
        <Divider />
        <CardContent>
          <Box className={this.props.classes.emptyContent}>
            <Typography variant="body1">No work experience added</Typography>
          </Box>
        </CardContent>
      </CompactCard>
    </Box>
  )

  renderAvatar = () => (
    <Box display="inline-block" position="relative">
      <Avatar src={this.state.avatar} className={this.props.classes.avatar} />
      <Tooltip title="Edit Photo">
        <IconButton className={this.props.classes.pencil} onClick={() => this.setState({ avatarOpened: true })}>
          <Create />
        </IconButton>
      </Tooltip>
      <div className={this.props.classes.status} style={{ backgroundColor: this.props.theme.palette.success.main }} />
    </Box>
  )

  renderScore = (value) => (
    <Fragment>
      <span className={this.props.classes.score}>{value}</span>
      <Rating name="read-only" value={value} readOnly size="small" />
    </Fragment>
  )

  renderHourlyRate = () => (
    <Box display={this.props.width === 'xs' ? 'block' : 'flex'} alignItems="center">
      {this.props.width !== 'xs' && (
        <Box bgcolor={this.props.theme.palette.success.main} display="inline-flex">
          <AttachMoney htmlColor={this.props.theme.palette.common.white} />
        </Box>
      )}
      <Box
        ml={this.props.width === 'xs' ? 0 : 1}
        mr={this.props.width === 'xs' ? 0 : 1}
        component="span"
        display="inline-block"
      >
        <Typography variant="body1">$75 USD/hr</Typography>
      </Box>
      <Tooltip title="Edit Hourly Rate">
        <IconButton
          style={{
            border: `solid 1px ${this.props.theme.palette.divider}`,
            padding: 7
          }}
          onClick={() => this.setState({ hourlyRateOpened: true })}
        >
          <Create />
        </IconButton>
      </Tooltip>
    </Box>
  )

  renderActionButtons = () => (
    <Box>
      <Box mr={1} component="span">
        <Button variant="contained">Hire me</Button>
      </Box>
      <Button variant="outlined">Contact</Button>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(Profile);