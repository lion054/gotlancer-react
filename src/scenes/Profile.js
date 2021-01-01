import React, { Fragment, PureComponent } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  Typography,
  fade,
  withStyles,
  withTheme
} from '@material-ui/core';
import {
  Add,
  AttachMoney,
  Check,
  CheckCircle,
  Create,
  Email,
  Favorite,
  LocalOffer,
  Phone,
  Room,
  Star,
  WatchLater
} from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import pluralize from 'pluralize';
import moment from 'moment';
import faker from 'faker';
import { compose } from 'redux';

import 'material-ui-phone-number/src/styles.less';
import 'material-ui-phone-number/src/flags.png';

import Header from '../components/Header';
import { GreenButton } from '../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  background: {
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
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    padding: 'unset'
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  pencil: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
    width: 36,
    height: 36,
    borderRadius: 18,
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
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0, 0.5),
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white
  },
  skill: {
    display: 'inline-block',
    marginRight: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled
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
    portfolios: [],
    reviews: []
  }

  componentDidMount() {
    const portfolios = [];
    for (let i = 0; i < 8; i++) {
      portfolios.push(faker.image.image());
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
    this.setState({ portfolios, reviews });
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
                {this.renderSideBar()}
              </Grid>
              <Grid item md={9} xs={12}>
                {this.renderAbout()}
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
    </div>
  )

  renderSideBar = () => (
    <Box className={this.props.classes.innerPadding}>
      <Card elevation={0} className={this.props.classes.card}>
        <CardContent>
          <Box textAlign="center">
            <Box display="inline-block" position="relative">
              <Avatar src={this.state.avatar} className={this.props.classes.avatar} />
              <Tooltip title="Edit Photo">
                <IconButton className={this.props.classes.pencil}>
                  <Create />
                </IconButton>
              </Tooltip>
              <div className={this.props.classes.status} style={{ backgroundColor: this.props.theme.palette.success.main }} />
            </Box>
          </Box>
          <Box mt={4}>
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
              <Typography variant="body2" component="span">Available per week</Typography>
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
              <LocalOffer style={{
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
      </Card>
    </Box>
  )

  renderAbout = () => (
    <Box className={this.props.classes.innerPadding}>
      <Card elevation={0} className={this.props.classes.card}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box mr={2} color={this.props.theme.palette.success.main}>
              <Typography variant="body1">Greg Prickril</Typography>
            </Box>
            <Box ml={1} mr={1}>
              <CheckCircle htmlColor={this.props.theme.palette.success.main} />
            </Box>
            <Box ml={1} mr={1}>
              <Star htmlColor={this.props.theme.palette.warning.main} />
            </Box>
            <Box ml={1} mr={1} color={this.props.theme.palette.warning.main}>
              <Typography variant="body2">HIGHTEST RATED</Typography>
            </Box>
            <Tooltip title="Edit Name">
              <IconButton style={{ border: `solid 1px ${this.props.theme.palette.divider}`, padding: 7 }}>
                <Create />
              </IconButton>
            </Tooltip>
            <div style={{ flex: 1 }} />
            <Box ml={1} mr={1} bgcolor={this.props.theme.palette.success.main}>
              <AttachMoney htmlColor={this.props.theme.palette.common.white} />
            </Box>
            <Box ml={1} mr={1}>
              <Typography variant="subtitle1">$75 USD / hr</Typography>
            </Box>
            <Tooltip title="Edit Hourly Rate">
              <IconButton style={{ border: `solid 1px ${this.props.theme.palette.divider}`, padding: 7 }}>
                <Create />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body1">MEAN Stack (Angular | Vue.js | Laravel | Node)</Typography>
          <Box display="flex" alignItems="center">
            {this.renderScore(4.9)}
            <Box ml={1} flex={1}>
              <Typography variant="body2">({pluralize('review', 10, true)})</Typography>
            </Box>
            <Box mr={1}>
              <GreenButton variant="contained">Hire me</GreenButton>
            </Box>
            <GreenButton variant="outlined">Contact</GreenButton>
          </Box>
          <Box>
            <Box className={this.props.classes.skill}>
              <Typography variant="body2" component="span">Augmented Reality (AR)</Typography>
            </Box>
            <Box className={this.props.classes.skill}>
              <Typography variant="body2" component="span">Virtual Reality (VR)</Typography>
            </Box>
            <Box className={this.props.classes.skill}>
              <Typography variant="body2" component="span">Unity3D</Typography>
            </Box>
            <Tooltip title="Add Skill">
              <IconButton style={{ border: `solid 1px ${this.props.theme.palette.divider}`, padding: 7 }}>
                <Add htmlColor={this.props.theme.palette.success.main} />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )

  renderSummary = () => (
    <Box className={this.props.classes.innerPadding}>
      <Card elevation={0} className={this.props.classes.card}>
        <CardHeader
          className={this.props.classes.background}
          title={(
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">Summary</Typography>
              <IconButton>
                <Create />
              </IconButton>
            </Box>
          )}
        />
        <Divider />
        <CardContent>
          <Typography variant="body2">{this.state.summary}</Typography>
        </CardContent>
      </Card>
    </Box>
  )

  renderPortfolio = () => (
    <Box className={this.props.classes.innerPadding}>
      <Card elevation={0} className={this.props.classes.card}>
        <CardHeader
          className={this.props.classes.background}
          title={(
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Typography variant="subtitle1">Portfolio</Typography>
              </Box>
              <Button variant="contained">Add New</Button>
            </Box>
          )}
        />
        <Divider />
        <CardContent>
          <Box className={this.props.classes.outerMargin}>
            <Grid container>
              {this.state.portfolios.map((url, index) => (
                <Grid key={index} item md={3} sm={6} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    <img alt="" src={url} style={{ borderRadius: 4, width: '100%' }} />
                    <Box display="flex">
                      <Button style={{ color: this.props.theme.palette.success.main }}>Edit</Button>
                      <Divider orientation="vertical" flexItem />
                      <Button color="secondary">Delete</Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )

  renderReviews = () => (
    <Box className={this.props.classes.innerPadding}>
      <Card elevation={0} className={this.props.classes.card}>
        <CardHeader
          className={this.props.classes.background}
          title="Reviews"
          titleTypographyProps={{
            variant: 'subtitle1'
          }}
        />
        <Divider />
        <CardContent>
          <Box className={this.props.classes.outerMargin}>
            <Grid container>
              <Grid item md={4} xs={12}>
                <Box className={this.props.classes.innerPadding} textAlign="center" mt={1}>
                  <Typography variant="body2">Average Rating</Typography>
                  <Typography variant="h3">4.9</Typography>
                  <Rating name="read-only" value={5} readOnly size="medium" />
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
                      <Rating name="read-only" value={5} readOnly size="medium" />
                    </Box>
                    <Box display="flex" alignItems="center" m={1}>
                      <Box flex={1}>
                        <Typography variant="body2">Pretty good</Typography>
                      </Box>
                      <Rating name="read-only" value={4} readOnly size="medium" />
                    </Box>
                    <Box display="flex" alignItems="center" m={1}>
                      <Box flex={1}>
                        <Typography variant="body2">Could've been better</Typography>
                      </Box>
                      <Rating name="read-only" value={3} readOnly size="medium" />
                    </Box>
                    <Box display="flex" alignItems="center" m={1}>
                      <Box flex={1}>
                        <Typography variant="body2">Needs improvement</Typography>
                      </Box>
                      <Rating name="read-only" value={2} readOnly size="medium" />
                    </Box>
                    <Box display="flex" alignItems="center" m={1}>
                      <Box flex={1}>
                        <Typography variant="body2">Unsatisfactory</Typography>
                      </Box>
                      <Rating name="read-only" value={1} readOnly size="medium" />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <List disablePadding>
            {this.state.reviews.map((review, index) => (
              <ListItem key={index} disableGutters divider>
                <ListItemIcon>
                  <Avatar src={review.avatar} style={{ width: 64, height: 64 }} />
                </ListItemIcon>
                <Box ml={2} width="100%">
                  <Typography variant="body1" color="primary">{review.title}</Typography>
                  <Box display="flex" alignItems="center">
                    {this.renderScore(4.9)}
                    <Box ml={1}>
                      <Typography variant="body2">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(review.budget)} USD</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1">&ldquo;{review.comment}&rdquo;</Typography>
                  <Box mt={1}>
                    <Grid container alignItems="center">
                      <Grid item md={4} xs={12}>
                        <Typography variant="body2" color="primary">{review.name}</Typography>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Box display="flex" alignItems="center">
                          <Box mr={1}>
                            <Room />
                          </Box>
                          <Typography variant="body2">{review.location}</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Typography variant="body2">{moment(review.createdAt).fromNow()}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )

  renderExperiences = () => (
    <Box className={this.props.classes.innerPadding}>
      <Card elevation={0} className={this.props.classes.card}>
        <CardHeader
          className={this.props.classes.background}
          title={(
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Typography variant="subtitle1">Experiences</Typography>
              </Box>
              <Button variant="contained">Add New</Button>
            </Box>
          )}
        />
        <Divider />
        <CardContent>
          <Box className={this.props.classes.emptyContent}>
            <Typography variant="body1">No work experience added</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )

  renderEducations = () => (
    <Box className={this.props.classes.innerPadding}>
      <Card elevation={0} className={this.props.classes.card}>
        <CardHeader
          className={this.props.classes.background}
          title={(
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Typography variant="subtitle1">Educations</Typography>
              </Box>
              <Button variant="contained">Add New</Button>
            </Box>
          )}
        />
        <Divider />
        <CardContent>
          <Box className={this.props.classes.emptyContent}>
            <Typography variant="body1">No work experience added</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )

  renderCertifications = () => (
    <Box className={this.props.classes.innerPadding}>
      <Card elevation={0} className={this.props.classes.card}>
        <CardHeader
          className={this.props.classes.background}
          title={(
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Typography variant="subtitle1">Certifications</Typography>
              </Box>
              <Button variant="contained">Add New</Button>
            </Box>
          )}
        />
        <Divider />
        <CardContent>
          <Box className={this.props.classes.emptyContent}>
            <Typography variant="body1">No work experience added</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )

  renderScore = (value) => (
    <Fragment>
      <Box className={this.props.classes.score} mr={1}>
        <Typography variant="body2">{value}</Typography>
      </Box>
      <Rating name="read-only" value={value} readOnly size="medium" />
    </Fragment>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Profile);