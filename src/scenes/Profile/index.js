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
import ChipContainer from '../../components/ChipContainer';
import ChangeAvatar from './ChangeAvatar';
import ChangeHourlyRate from './ChangeHourlyRate';
import ChangeSummary from './ChangeSummary';
import ChangeAvailability from './ChangeAvailability';
import AddEducation from './AddEducation';
import AddEmployment from './AddEmployment';
import AddCertification from './AddCertification';
import ChangeTitle from './ChangeTitle';
import CompactPagination from '../../components/CompactPagination';
import { CompactCard, GreenButton, formatCurrency } from '../../global';

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
    border: `solid 5px ${theme.palette.common.white}`,
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
  sideIcon: {
    width: 32,
    height: 32
  },
  sideIconButton: {
    border: `solid 1px ${theme.palette.divider}`,
    padding: 5
  },
  hour: {
    display: 'inline-block',
    width: 60,
    color: theme.palette.success.main
  },
  score: {
    marginRight: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0, 0.5),
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
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
    tasks: [{
      title: 'PHP',
      completed: 90
    },{
      title: 'HTML',
      completed: 82
    },{
      title: 'Adobe Illustrator',
      completed: 70
    },{
      title: 'Photoshop',
      completed: 100
    }],
    address: {
      country: {
        iso2: 'in',
        name: 'India'
      },
      city: 'Kolkata'
    },
    skills: [],
    summary: faker.lorem.paragraphs(10),
    exhibitions: [],
    reviews: [],
    reviewFields: [{
      title: 'Awesome freelancer',
      score: faker.random.number({ min: 0, max: 5 })
    },{
      title: 'Pretty good',
      score: faker.random.number({ min: 0, max: 5 })
    },{
      title: 'Could`ve been better',
      score: faker.random.number({ min: 0, max: 5 })
    },{
      title: 'Needs improvement',
      score: faker.random.number({ min: 0, max: 5 })
    },{
      title: 'Unsatisfactory',
      score: faker.random.number({ min: 0, max: 5 })
    }],
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
    const skills = [{
      title: 'Augmented Reality (AR)',
      backgroundColor: this.props.theme.palette.action.disabledBackground,
      color: this.props.theme.palette.text.secondary
    },{
      title: 'Virtual Reality (VR)',
      backgroundColor: this.props.theme.palette.action.disabledBackground,
      color: this.props.theme.palette.text.secondary
    },{
      title: 'Unity3D',
      backgroundColor: this.props.theme.palette.action.disabledBackground,
      color: this.props.theme.palette.text.secondary
    }];
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
    this.setState({ skills, exhibitions, reviews });
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
            <Box mt={3} mb={1} display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" component="span">Certificate</Typography>
              <Button variant="outlined">Get Certificate</Button>
            </Box>
          </Box>
          <Divider />
          <Box>
            {this.state.tasks.map(({ title, completed }, index) => (
              <Box key={index}>
                <Typography variant="body2">{title}</Typography>
                <Box display="flex" alignItems="center">
                  <Box flex={1}>
                    <LinearProgress variant="determinate" value={completed} classes={{
                      root: this.props.classes.progress,
                      barColorPrimary: this.props.classes.progressThumb
                    }} />
                  </Box>
                  <Typography variant="body1" className={this.props.classes.progressText}>{completed}%</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Divider />
          <Box my={3}>
            <Box display="flex" alignItems="center">
              <Avatar className={this.props.classes.sideIcon}>
                <Phone />
              </Avatar>
              <Box flex={1} mx={1}>
                <Typography variant="body2">Mobile Verification</Typography>
              </Box>
              <Tooltip title="Verify Mobile">
                <IconButton className={this.props.classes.sideIconButton}>
                  <Add htmlColor={this.props.theme.palette.success.main} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <Avatar className={this.props.classes.sideIcon} style={{ backgroundColor: this.props.theme.palette.success.main }}>
                <Email />
              </Avatar>
              <Box flex={1} ml={1}>
                <Typography variant="body2">Email Verification</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <Avatar className={this.props.classes.sideIcon} style={{ backgroundColor: this.props.theme.palette.success.main }}>
                <Check />
              </Avatar>
              <Box flex={1} ml={1}>
                <Typography variant="body2">KYC Verification</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <Avatar className={this.props.classes.sideIcon}>
                <AttachMoney />
              </Avatar>
              <Box flex={1} mx={1}>
                <Typography variant="body2">Payment Verification</Typography>
              </Box>
              <Tooltip title="Add Payment Method">
                <IconButton className={this.props.classes.sideIconButton}>
                  <Add htmlColor={this.props.theme.palette.success.main} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Divider />
          <Box my={3}>
            <Box display="flex" alignItems="center">
              <Box className={this.props.classes.sideIcon} position="relative">
                <Box
                  className={`flag ${this.state.address.country.iso2} margin`}
                  position="absolute"
                  top={10}
                  left={5}
                  style={{
                    transform: 'scale(1.5)',
                    transformOrigin: 'center left'
                  }}
                />
              </Box>
              <Box flex={1} ml={1}>
                <Typography variant="body2">{this.state.address.city}, {this.state.address.country.name}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <WatchLater className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.primary.main} />
              <Box flex={1} ml={1}>
                <Typography variant="body2">It’s curently 4:25 PM here</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <TurnedIn className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.warning.main} />
              <Box flex={1} ml={1}>
                <Typography variant="body2">Joined, Sep 13, 2013</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <Favorite className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.secondary.main} />
              <Box flex={1} ml={1}>
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
          <Box>
            {(this.props.width === 'xs' || this.props.width === 'sm') && (
              <Box className={this.props.classes.innerPadding} style={{ float: 'left' }}>
                {this.renderAvatar()}
              </Box>
            )}
            <Box mb={0.5} display="flex" justifyContent="space-between">
              <Box display="flex" flexWrap="wrap">
                <Box display="flex" alignItems="center" mr={1}>
                  <Box mr={1} color={this.props.theme.palette.success.main}>
                    <Typography variant="body1" noWrap>Greg Prickril</Typography>
                  </Box>
                  <CheckCircle htmlColor={this.props.theme.palette.success.main} />
                </Box>
                <Box display="flex" alignItems="center">
                  <Star htmlColor={this.props.theme.palette.warning.main} />
                  <Box mx={1} color={this.props.theme.palette.warning.main}>
                    <Typography variant="body2" noWrap>HIGHTEST RATED</Typography>
                  </Box>
                </Box>
              </Box>
              {(this.props.width === 'md' || this.props.width === 'lg' || this.props.width === 'xl') && this.renderHourlyRate()}
            </Box>
            <Box mb={0.5}>
              <Typography
                variant="body1"
                component="span"
                style={{ marginRight: this.props.theme.spacing(1) }}
              >MEAN Stack (Angular | Vue.js | Laravel | Node)</Typography>
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
            <Box display="flex" alignItems="center" my={0.5}>
              {this.renderScore(4.9)}
              <Box ml={1} flex={1}>
                <Typography variant="body2">({pluralize('review', 10, true)})</Typography>
              </Box>
              {(this.props.width === 'md' || this.props.width === 'lg' || this.props.width === 'xl') && this.renderActionButtons()}
            </Box>
            <ChipContainer chips={this.state.skills} buttonTitle="Add Skill" />
          </Box>
          {(this.props.width === 'xs' || this.props.width === 'sm') && (
            <Fragment>
              {this.renderHourlyRate()}
              <Box mt={1} mb={2}>
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
          title={(
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1">Portfolio</Typography>
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
                    <GreenButton variant="text">Edit</GreenButton>
                    <Divider orientation="vertical" flexItem />
                    <Button variant="text" color="secondary">Delete</Button>
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
                    {this.state.reviewFields.map(({ title, score }, index) => (
                      <Box key={index} m={1} display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">{title}</Typography>
                        <Rating name="read-only" value={score} readOnly size="small" />
                      </Box>
                    ))}
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
        <Box my={1}>
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
        <Box my={1}>
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
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1">Experiences</Typography>
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
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1">Educations</Typography>
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
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1">Certifications</Typography>
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
      <Box
        className={this.props.classes.status}
        bgcolor={this.props.theme.palette.success.main}
      />
    </Box>
  )

  renderScore = (value) => (
    <Fragment>
      <span className={this.props.classes.score}>{value}</span>
      <Rating name="read-only" value={value} readOnly size="small" />
    </Fragment>
  )

  renderHourlyRate = () => (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <Box bgcolor={this.props.theme.palette.success.main} display="inline-flex">
        <AttachMoney htmlColor={this.props.theme.palette.common.white} />
      </Box>
      <Box
        mx={1}
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