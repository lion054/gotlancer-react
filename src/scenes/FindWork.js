import React, { Fragment, PureComponent } from 'react';
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Drawer,
  FormControlLabel,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItem,
  MenuItem,
  OutlinedInput,
  Tab,
  Tabs,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClock, faDollarSign, faHeart, faMapMarkedAlt, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import pluralize from 'pluralize';
import moment from 'moment';
import clsx from 'clsx';
import { cloneDeep } from 'lodash';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ChipContainer from '../components/ChipContainer';
import CompactPagination from '../components/CompactPagination';
import { CompactCard } from '../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  outerMargin: {
    margin: theme.spacing(-2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(-1)
    }
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  leftSideBar: {
    [theme.breakpoints.up('md')]: {
      width: 224
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  rightSideBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tab: {
    minWidth: 'unset',
    flex: 1
  },
  progress: {
    height: theme.spacing(1)
  },
  progressText: {
    color: theme.palette.success.main
  },
  progressThumb: {
    backgroundColor: theme.palette.success.main
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
  newJobs: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    },
    borderRadius: theme.spacing(1.5),
    color: theme.palette.common.white,
    fontSize: theme.spacing(1.25),
    textTransform: 'uppercase'
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  search: {
    padding: theme.spacing(2, 0, 2, 2),
    fontSize: theme.spacing(1.5)
  },
  description: {
    height: theme.spacing(5), // 2 lines
    overflow: 'hidden'
  },
  actionIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: theme.palette.divider,
    color: theme.palette.action.active
  },
  saveIcon: {
    padding: theme.spacing(1),
    border: `solid 1px ${theme.palette.divider}`
  }
})

class FindWork extends PureComponent {
  state = {
    activeTab: 0,
    user: {
      avatar: faker.image.image(),
      name: faker.name.findName()
    },
    progress: faker.random.number({ min: 0, max: 100 }),
    newJobs: 32,
    jobs: [],
    drawerOpened: false
  }

  componentDidMount() {
    const jobs = [];
    for (let i = 0; i < 5; i++) {
      const skills = [];
      for (let j = 0; j < 3; j++) {
        skills.push({
          title: faker.lorem.words(2),
          backgroundColor: this.props.theme.palette.action.disabledBackground,
          color: this.props.theme.palette.text.secondary
        });
      }
      jobs.push({
        title: faker.lorem.sentence(3),
        description: faker.lorem.sentences(10),
        type: faker.random.arrayElement(['HOURLY', 'FIXED']),
        budget: {
          min: faker.random.number({ min: 10, max: 20 }),
          max: faker.random.number({ min: 30, max: 40 })
        },
        badges: faker.random.arrayElements([{
          title: 'TOP PROJECT',
          backgroundColor: this.props.theme.palette.primary.main,
          color: this.props.theme.palette.common.white
        },{
          title: 'NDA',
          backgroundColor: this.props.theme.palette.secondary.main,
          color: this.props.theme.palette.common.white
        },{
          title: 'URGENT',
          backgroundColor: this.props.theme.palette.error.main,
          color: this.props.theme.palette.common.white
        },{
          title: 'FEATURED',
          backgroundColor: this.props.theme.palette.warning.main,
          color: this.props.theme.palette.common.white
        },{
          title: 'LONG TERM',
          backgroundColor: this.props.theme.palette.success.main,
          color: this.props.theme.palette.common.white
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

  handleDrawer = () => this.setState({ drawerOpened: !this.state.drawerOpened })

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box className={this.props.classes.innerPadding}>
        <Box height={this.props.theme.spacing(8)} display="flex" justifyContent="center" alignItems="center">
          {!!this.state.newJobs && (
            <MenuItem
              className={this.props.classes.newJobs}
              onClick={() => this.setState({ newJobs: 0 })}
            >View {pluralize('new job', this.state.newJobs, true)}</MenuItem>
          )}
        </Box>
      </Box>
      <Grid container>
        <Grid item lg={2} />
        <Grid item lg={8} xs={12} style={{ display: 'flex' }}>
          <Box className={clsx(this.props.classes.innerPadding, this.props.classes.leftSideBar)}>
            {this.renderTabsCard()}
            <Box mt={2}>
              {this.renderMembershipCard()}
            </Box>
            <Box mt={2}>
              {this.renderBidCredit()}
            </Box>
          </Box>
          <Grid container style={{ flex: 1 }}>
            <Grid item md={9}>
              {this.renderJobList()}
            </Grid>
            <Grid item md={3}>
              <Box className={clsx(this.props.classes.innerPadding, this.props.classes.rightSideBar)}>
                {this.renderConditionBar()}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={2} />
      </Grid>
      <Footer />
      <Drawer
        anchor="left"
        open={this.state.drawerOpened}
        onClose={this.handleDrawer}
      >
        <Box m={2}>
          {this.renderConditionBar()}
        </Box>
      </Drawer>
    </div>
  )

  renderTabPanel = ({ index, body }) => (
    <div role="tabpanel" hidden={this.state.activeTab !== index}>
      {body}
    </div>
  )

  renderTabsCard = () => (
    <CompactCard>
      <CardContent style={{ padding: 0 }}>
        <Tabs
          value={this.state.activeTab}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab className={this.props.classes.tab} label="Profile" />
          <Tab className={this.props.classes.tab} label="Funds" />
        </Tabs>
        {this.renderTabPanel({
          index: 0,
          body: (
            <Box m={2}>
              <Box display="flex" alignItems="center">
                <Box display="inline" mr={1}>
                  <Avatar src={this.state.user.avatar} />
                </Box>
                <Box display="inline" style={{
                  width: 'calc(100% - 40px - 8px)' // width is needed for ellipsis of  sub element
                }}>
                  <Typography variant="body2" noWrap style={{ overflow: 'hidden' }}>{this.state.user.name}</Typography>
                  <Typography variant="body2" noWrap style={{ overflow: 'hidden' }}>
                    <FontAwesomeIcon icon={faStar} size="1x" />  TOP RATED
                  </Typography>
                </Box>
              </Box>
              <Box mt={1}>
                <Typography variant="body2" className={this.props.classes.progressText}>{this.state.progress}% completed</Typography>
                <LinearProgress variant="determinate" value={this.state.progress} classes={{
                  root: this.props.classes.progress,
                  barColorPrimary: this.props.classes.progressThumb
                }} />
                <Typography variant="body2">Pass the US English - level 1 (+ 10%)</Typography>
              </Box>
            </Box>
          )
        })}
      </CardContent>
      <CardActions className={this.props.classes.cardActions}>
        <Button fullWidth>View profile</Button>
      </CardActions>
    </CompactCard>
  )

  renderMembershipCard = () => (
    <CompactCard>
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
        <Button variant="outlined" fullWidth>Upgrade membership</Button>
      </CardContent>
    </CompactCard>
  )

  renderBidCredit = () => (
    <CompactCard>
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
        <Button variant="outlined" fullWidth>Buy Bid Credit</Button>
      </CardContent>
    </CompactCard>
  )

  renderJobList = () => (
    <Box className={this.props.classes.innerPadding}>
      <Box display="flex" flexDirection="row">
        <Box className={this.props.classes.menuButton}>
          <IconButton onClick={() => this.setState({ drawerOpened: true })}>
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </Box>
        <Box flex={1}>
          <OutlinedInput
            fullWidth
            placeholder="Search for project"
            inputProps={{
              className: this.props.classes.search
            }}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton>
                  <FontAwesomeIcon icon={faSearch} style={{ fontSize: '0.8em' }} />
                </IconButton>
              </InputAdornment>
            )}
            style={{
              backgroundColor: this.props.theme.palette.background.paper,
              paddingRight: this.props.theme.spacing(0.5)
            }}
          />
        </Box>
      </Box>
      <Box mt={2} mb={2}>
        <Typography variant="body2">{pluralize('job', 4500, true)} found</Typography>
      </Box>
      <List disablePadding>
        {this.state.jobs.map((job, index) => {
          switch (this.props.width) {
            case 'sm':
            case 'xs':
              return (
                <ListItem key={index} disableGutters>
                  {this.renderMobileJobCard(job, index)}
                </ListItem>
              );
            default:
              return (
                <ListItem key={index} disableGutters>
                  {this.renderDesktopJobCard(job, index)}
                </ListItem>
              );
          }
        })}
      </List>
      <Box mb={4}>
        <CompactPagination />
      </Box>
    </Box>
  )

  renderDesktopJobCard = (job, index) => (
    <Box key={index} mb={1}>
      <CompactCard>
        <CardContent>
          <Box display="flex">
            <Box flex={1}>
              <Typography variant="subtitle1">{job.title}</Typography>
            </Box>
            <Typography variant="h6">${job.budget.min}-${job.budget.max} USD</Typography>
          </Box>
          <Box mt={1} display="flex">
            <Box flex={1}>
              <ChipContainer chips={job.badges} />
            </Box>
            <Box ml={5}>
              <Typography variant="body2" color="textSecondary">{job.type}</Typography>
            </Box>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2" className={this.props.classes.description}>{job.description}</Typography>
          </Box>
          <Box mt={1} mb={1.5} display="flex">
            <Box flex={1}>
              <ChipContainer chips={job.skills} />
            </Box>
            <Box ml={5}>
              <Typography variant="body2" color="textSecondary">Posted {moment(job.createdAt).fromNow()}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box mt={1.5} style={{ whiteSpace: 'break-spaces', lineHeight: 3 }}>
            {this.renderApplyBefore()}
            {this.renderPaymentMethod(job.paymentMethod)}
            {this.renderReview(job.reviewCount, job.reviewAverage)}
            {this.renderLocation(job.location)}
            <Box display="inline-block">
              <Box display="flex" alignItems="center">
                <IconButton
                  className={this.props.classes.saveIcon}
                  onClick={() => {
                    const jobs = cloneDeep(this.state.jobs);
                    jobs[index].saved = !jobs[index].saved;
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
      </CompactCard>
    </Box>
  )

  renderMobileJobCard = (job, index) => (
    <CompactCard key={index}>
      <CardContent>
        <Typography variant="subtitle1">{job.title}</Typography>
        <Box mt={1}>
          <ChipContainer chips={job.badges} />
        </Box>
        <Box mt={1.5}>
          <Typography variant="body2" className={this.props.classes.description}>{job.description}</Typography>
        </Box>
        <Box mt={1.5} display="flex" alignItems="center">
          <Box flex={1}>
            <Typography variant="h6">${job.budget.min}-${job.budget.max} USD</Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">Posted {moment(job.createdAt).fromNow()}</Typography>
        </Box>
        <Box mt={1.5}>
          <Typography variant="body2" color="textSecondary">{job.type}</Typography>
        </Box>
        <Box mt={1} mb={1.5}>
          <ChipContainer chips={job.skills} />
        </Box>
        <Divider />
        <Box mt={1.5} style={{ whiteSpace: 'break-spaces', lineHeight: 3 }}>
          {this.renderApplyBefore()}
          {this.renderPaymentMethod(job.paymentMethod)}
          {this.renderReview(job.reviewCount, job.reviewAverage)}
          {this.renderLocation(job.location)}
          <Box display="inline-block">
            <Box display="flex" alignItems="center">
              <IconButton
                className={this.props.classes.saveIcon}
                onClick={() => {
                  const jobs = cloneDeep(this.state.jobs);
                  jobs[index].saved = !jobs[index].saved;
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
    </CompactCard>
  )

  renderApplyBefore = () => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.actionIcon}>
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
        <Avatar className={this.props.classes.actionIcon}>
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
        <Avatar className={this.props.classes.actionIcon}>
          <FontAwesomeIcon icon={faStar} />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>{pluralize('Review', count, true)}</Typography>
          <Box style={{ lineHeight: 1 }}>
            <Rating name="read-only" value={average} readOnly size="small" />
          </Box>
        </Box>
      </Box>
    </Box>
  )

  renderLocation = (value) => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.actionIcon}>
          <FontAwesomeIcon icon={faMapMarkedAlt} />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>Buyer country</Typography>
          <Typography variant="body2" noWrap color="textSecondary" style={{ width: this.props.theme.spacing(11) }}>{value}</Typography>
        </Box>
      </Box>
    </Box>
  )

  renderConditionBar = () => (
    <Fragment>
      {this.renderCategoryPicker()}
      <Box mt={2}>
        {this.renderSubcategoryPicker()}
      </Box>
      <Box mt={2}>
        {this.renderTypePicker()}
      </Box>
    </Fragment>
  )

  renderCategoryPicker = () => (
    <Box>
      <Typography variant="subtitle2">Select category</Typography>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">All</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Website Development</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Graphic Design</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Digital Marketing</Typography>}
          onClick={() => {}}
        />
      </Box>
    </Box>
  )

  renderSubcategoryPicker = () => (
    <Box>
      <Typography variant="subtitle2">Select sub-category</Typography>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">All</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Website Development</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Graphic Design</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Digital Marketing</Typography>}
          onClick={() => {}}
        />
      </Box>
    </Box>
  )

  renderTypePicker = () => (
    <Box>
      <Typography variant="subtitle2">Project type</Typography>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">All</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Fixed price</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Hourly</Typography>}
          onClick={() => {}}
        />
      </Box>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(FindWork);