import React, { PureComponent } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { Pagination, Rating } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faDollarSign, faHeart, faMapMarkedAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import pluralize from 'pluralize';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  profileCard: {
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    padding: 'unset'
  },
  tab: {
    minWidth: 'unset',
    flex: 1
  },
  progress: {
    height: theme.spacing(1)
  },
  progressSecondaryText: {
    color: theme.palette.secondary.main
  },
  progressSecondaryTrack: {
    backgroundColor: theme.palette.secondary.light
  },
  progressSecondaryThumb: {
    backgroundColor: theme.palette.secondary.dark
  },
  progressErrorText: {
    color: theme.palette.error.main
  },
  progressErrorTrack: {
    backgroundColor: theme.palette.error.light
  },
  progressErrorThumb: {
    backgroundColor: theme.palette.error.dark
  },
  progressWarningText: {
    color: theme.palette.warning.main
  },
  progressWarningTrack: {
    backgroundColor: theme.palette.warning.light
  },
  progressWarningThumb: {
    backgroundColor: theme.palette.warning.dark
  },
  progressInfoText: {
    color: theme.palette.info.main
  },
  progressInfoTrack: {
    backgroundColor: theme.palette.info.light
  },
  progressInfoThumb: {
    backgroundColor: theme.palette.info.dark
  },
  progressSuccessText: {
    color: theme.palette.success.main
  },
  progressSuccessTrack: {
    backgroundColor: theme.palette.success.light
  },
  progressSuccessThumb: {
    backgroundColor: theme.palette.success.dark
  },
  cardActions: {
    borderTop: `solid 1px ${theme.palette.divider}`
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
    borderBottom: `solid 1px ${theme.palette.divider}`
  },
  logo: {
    width: theme.spacing(12)
  },
  jobCard: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    padding: 'unset'
  },
  tagContainer: {
    wordBreak: 'break-word'
  },
  tag: {
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    display: 'inline-block',
    whiteSpace: 'nowrap'
  },
  buyerIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: theme.palette.divider,
    color: theme.palette.action.active
  },
  savedIcon: {
    padding: theme.spacing(1),
    border: `solid 1px ${theme.palette.divider}`
  }
})

class Home extends PureComponent {
  state = {
    activeTab: 0,
    user: {
      avatar: faker.image.image(),
      name: faker.name.findName()
    },
    progress: faker.random.number({ min: 0, max: 100 }),
    jobs: []
  }

  componentDidMount() {
    const jobs = [];
    for (let i = 0; i < 5; i++) {
      const skills = [];
      for (let j = 0; j < 3; j++) {
        skills.push(faker.lorem.words(2));
      }
      jobs.push({
        title: faker.lorem.sentence(3),
        description: faker.lorem.sentences(5),
        type: faker.random.arrayElement(['HOURLY', 'FIXED']),
        budget: {
          min: faker.random.number({ min: 10, max: 20 }),
          max: faker.random.number({ min: 30, max: 40 })
        },
        categories: faker.random.arrayElements([{
          title: 'NDA',
          backgroundColor: this.props.theme.palette.secondary.main
        },{
          title: 'URGENT',
          backgroundColor: this.props.theme.palette.error.main
        },{
          title: 'FEATURED',
          backgroundColor: this.props.theme.palette.warning.main
        },{
          title: 'TOP PROJECT',
          backgroundColor: this.props.theme.palette.info.main
        },{
          title: 'LONG TERM',
          backgroundColor: this.props.theme.palette.success.main
        }]),
        createdAt: faker.date.past(),
        skills,
        paymentMethod: faker.random.boolean(),
        reviewCount: faker.random.number({ min: 0, max: 10 }),
        reviewAverage: faker.random.number({ min: 0, max: 5 }),
        location: faker.address.country(),
        saved: faker.random.boolean(),
        applied: faker.random.boolean()
      });
    }
    this.setState({ jobs });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  getCompletedStyles() {
    if (this.state.progress <= 20) {
      return this.props.classes.progressSecondaryText;
    } else if (this.state.progress <= 40) {
      return this.props.classes.progressErrorText;
    } else if (this.state.progress <= 60) {
      return this.props.classes.progressWarningText;
    } else if (this.state.progress <= 80) {
      return this.props.classes.progressInfoText;
    } else {
      return this.props.classes.progressSuccessText;
    }
  }

  getProgressStyles() {
    let result = {};
    if (this.state.progress <= 20) {
      result = {
        colorPrimary: this.props.classes.progressSecondaryTrack,
        barColorPrimary: this.props.classes.progressSecondaryThumb
      };
    } else if (this.state.progress <= 40) {
      result = {
        colorPrimary: this.props.classes.progressErrorTrack,
        barColorPrimary: this.props.classes.progressErrorThumb
      };
    } else if (this.state.progress <= 60) {
      result = {
        colorPrimary: this.props.classes.progressWarningTrack,
        barColorPrimary: this.props.classes.progressWarningThumb
      };
    } else if (this.state.progress <= 80) {
      result = {
        colorPrimary: this.props.classes.progressInfoTrack,
        barColorPrimary: this.props.classes.progressInfoThumb
      };
    } else {
      result = {
        colorPrimary: this.props.classes.progressSuccessTrack,
        barColorPrimary: this.props.classes.progressSuccessThumb
      };
    }
    result.root = this.props.classes.progress;
    return result;
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Grid container>
              <Grid item md={2}>
                {this.renderTabsCard()}
                <Box mt={2}>
                  {this.renderMembershipCard()}
                </Box>
                <Box mt={2}>
                  {this.renderBidCredit()}
                </Box>
              </Grid>
              <Grid item md={8}>
                {this.renderJobList()}
              </Grid>
              <Grid item md={2}></Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )

  renderTabPanel = ({ index, body }) => (
    <div role="tabpanel" hidden={this.state.activeTab !== index}>
      {body}
    </div>
  )

  renderTabsCard = () => (
    <Card elevation={0} className={this.props.classes.profileCard}>
      <CardContent style={{ padding: 0 }}>
        <Tabs value={this.state.activeTab} onChange={this.handleTabChange}>
          <Tab className={this.props.classes.tab} label="Profile" />
          <Tab className={this.props.classes.tab} label="Funds" />
        </Tabs>
        {this.renderTabPanel({
          index: 0,
          body: (
            <Box mt={1} mr={2} mb={2} ml={2}>
              <Box display="flex" alignItems="center">
                <Box display="inline" mr={1}>
                  <Avatar src={this.state.user.avatar} />
                </Box>
                <Box display="inline" style={{
                  width: 'calc(100% - 40px - 8px)' // width is needed for ellipsis of  sub element
                }}>
                  <Typography variant="body2" noWrap>{this.state.user.name}</Typography>
                  <Box alignItems="center">
                    <Box mr={1} display="inline">
                      <FontAwesomeIcon icon={faStar} size="1x" />
                    </Box>
                    <Typography variant="body2" noWrap display="inline">TOP RATED</Typography>
                  </Box>
                </Box>
              </Box>
              <Box mt={1}>
                <Typography variant="body2" className={this.getCompletedStyles()}>{this.state.progress}% completed</Typography>
                <LinearProgress variant="determinate" value={this.state.progress} classes={this.getProgressStyles()} />
                <Typography variant="body2">Pass the US English - level 1 (+ 10%)</Typography>
              </Box>
            </Box>
          )
        })}
      </CardContent>
      <CardActions className={this.props.classes.cardActions}>
        <Button>View profile</Button>
      </CardActions>
    </Card>
  )

  renderMembershipCard = () => (
    <Card elevation={0} className={this.props.classes.profileCard}>
      <CardHeader
        title="Membership"
        titleTypographyProps={{
          variant: 'subtitle1'
        }}
        className={this.props.classes.cardHeader}
      />
      <CardContent>
        <Typography variant="body2">Current membership</Typography>
        <Box display="flex" alignItems="center" mt={1} mb={2}>
          <img alt="" className={this.props.classes.logo} src={require('../assets/images/gotlancer-logo-long.svg')} />
          <Box ml={1}>
            <Typography variant="body1">Basic</Typography>
          </Box>
        </Box>
        <Button variant="outlined">Upgrade membership</Button>
      </CardContent>
    </Card>
  )

  renderBidCredit = () => (
    <Card elevation={0} className={this.props.classes.profileCard}>
      <CardHeader
        title="Bid Credit"
        titleTypographyProps={{
          variant: 'subtitle1'
        }}
        className={this.props.classes.cardHeader}
      />
      <CardContent>
        <Typography variant="body2">Available Bids</Typography>
        <Box mt={1} mb={1}>
          <Typography variant="body1">76</Typography>
        </Box>
        <Button variant="outlined">Buy Proposal Credit</Button>
      </CardContent>
    </Card>
  )

  renderJobList = () => (
    <Box ml={2} mr={2}>
      {this.state.jobs.map((job, i) => (
        <Box key={i} mb={1}>
          <Card elevation={0} className={this.props.classes.jobCard}>
            <CardContent>
              <Box display="flex">
                <Box flex={1}>
                  <Typography variant="subtitle1">{job.title}</Typography>
                </Box>
                <Typography variant="h6">${job.budget.min}-${job.budget.max} USD</Typography>
              </Box>
              <Box mt={1} display="flex">
                <Box className={this.props.classes.tagContainer} flex={1}>
                  {job.categories.map((category, j) => (
                    <Typography
                      key={j}
                      component="div"
                      variant="body2"
                      className={this.props.classes.tag}
                      style={{
                        backgroundColor: category.backgroundColor,
                        color: this.props.theme.palette.common.white
                      }}
                    >{category.title}</Typography>
                  ))}
                </Box>
                <Typography variant="body2" color="textSecondary">{job.type}</Typography>
              </Box>
              <Box mt={1.5}>
                <Typography variant="body2">{job.description}</Typography>
              </Box>
              <Box mt={1} mb={2.5} display="flex">
                <Box className={this.props.classes.tagContainer} flex={1} mr={5}>
                  {job.skills.map((skill, j) => (
                    <Typography
                      key={j}
                      component="div"
                      variant="body2"
                      className={this.props.classes.tag}
                      style={{
                        backgroundColor: this.props.theme.palette.action.disabledBackground,
                        color: this.props.theme.palette.text.secondary
                      }}
                    >{skill}</Typography>
                  ))}
                </Box>
                <Typography variant="body2" color="textSecondary">Posted {moment(job.createdAt).fromNow()}</Typography>
              </Box>
              <Divider />
              <Box className={this.props.classes.tagContainer} mt={1.5}>
                {this.renderApplyBefore()}
                {this.renderPaymentMethod(job.paymentMethod)}
                {this.renderReview(job.reviewCount, job.reviewAverage)}
                {this.renderLocation(job.location)}
                <Box display="inline-block">
                  <Box display="flex" alignItems="center">
                    <IconButton
                      className={this.props.classes.savedIcon}
                      onClick={() => {
                        const jobs = cloneDeep(this.state.jobs);
                        jobs[i].saved = !jobs[i].saved;
                        this.setState({ jobs });
                      }}
                    >
                      <FontAwesomeIcon icon={faHeart} style={{
                        color: job.saved ? this.props.theme.palette.secondary.main : this.props.theme.palette.action.disabled
                      }} />
                    </IconButton>
                    <Box ml={1}>
                      <Typography variant="body2" align="right">Saved</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
      <Box mt={2} mb={4} display="flex" justifyContent="center">
        <Pagination count={10} size="large" />
      </Box>
    </Box>
  )

  renderApplyBefore = () => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.buyerIcon}>
          <FontAwesomeIcon icon={faClock} />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>Apply before</Typography>
          <Typography variant="body2" noWrap color="textSecondary">1 day 2 hours</Typography>
        </Box>
      </Box>
    </Box>
  )

  renderPaymentMethod = (value) => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.buyerIcon}>
          <FontAwesomeIcon icon={faDollarSign} />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>Payment method</Typography>
          <Typography variant="body2" noWrap color="textSecondary">{value ? 'Verified' : 'Not verified'}</Typography>
        </Box>
      </Box>
    </Box>
  )

  renderReview = (count, average) => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.buyerIcon}>
          <FontAwesomeIcon icon={faStar} />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>{pluralize('Review', count, true)}</Typography>
          <Rating name="read-only" value={average} readOnly />
        </Box>
      </Box>
    </Box>
  )

  renderLocation = (value) => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.buyerIcon}>
          <FontAwesomeIcon icon={faMapMarkedAlt} />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>Buyer country</Typography>
          <Typography variant="body2" noWrap color="textSecondary" style={{ width: this.props.theme.spacing(11) }}>{value}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Home);