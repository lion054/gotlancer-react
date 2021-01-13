import React, { Fragment, PureComponent } from 'react';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  CardContent,
  CardHeader,
  Checkbox,
  Drawer,
  FormControlLabel,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tabs,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import {
  Apple,
  Attachment,
  Camera,
  Check,
  CheckCircle,
  ChevronLeft,
  OpenInNew,
  Redeem,
  Star
} from '@material-ui/icons';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import pluralize from 'pluralize';
import moment from 'moment';
import clsx from 'clsx';
import { cloneDeep } from 'lodash';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import UserAvatar from '../components/UserAvatar';
import ChipContainer from '../components/ChipContainer';
import CompactPagination from '../components/CompactPagination';
import ScoreReview from '../components/ScoreReview';
import { CompactCard, CompactTab } from '../global';

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
  paper: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1)
    },
    borderRadius: theme.spacing(1.5),
    border: `solid 1px ${theme.palette.divider}`,
    padding: 'unset'
  },
  verifiedIcon: {
    marginLeft: theme.spacing(1),
    width: theme.spacing(2.5),
    height: theme.spacing(2.5)
  },
  rightSideBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
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
    padding: theme.spacing(0.5),
    border: `solid 1px ${theme.palette.divider}`
  },
  buttonLabel: {
    whiteSpace: 'nowrap'
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.default
  },
  drawerBody: {
    width: '70vw',
    [theme.breakpoints.down('sm')]: {
      width: '90vw'
    }
  }
})

class FindFreelancer extends PureComponent {
  state = {
    records: [],
    roadmap: [],
    activeRecord: null,
    drawerActiveTab: 0
  }

  componentDidMount() {
    const records = [];
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
    for (let i = 0; i < 3; i++) {
      const hourlyRate = faker.random.number({ min: 10, max: 100 });
      records.push({
        avatar: faker.image.image(),
        online: faker.random.boolean(),
        name: faker.name.findName(),
        verified: faker.random.boolean(),
        title: 'Product Manager',
        memberSince: faker.date.past(),
        hourlyRate: `$${hourlyRate}/hr`,
        description: faker.lorem.sentences(2),
        skills,
        projectsCompleted: faker.random.number({ min: 0, max: 1000 }),
        reviewCount: faker.random.number({ min: 0, max: 100 }),
        reviewAverage: faker.random.number({ min: 0, max: 5 }),
        successRate: faker.random.number({ min: 0, max: 100 }),
        saved: faker.random.boolean(),
        attachments: ['1.png', '2.png', '3.png']
      });
    }
    this.setState({ records });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Grid container>
        <Grid item lg={2} />
        <Grid item lg={8} xs={12}>
          <Box mt={8}>
            <Grid container>
              <Grid item md={9}>
                <Box className={this.props.classes.innerPadding}>
                  <List disablePadding>
                    {this.state.records.map((record, index) => {
                      switch (this.props.width) {
                        case 'sm':
                        case 'xs':
                          return this.renderMobileCard(record, index);
                        default:
                          return this.renderDesktopCard(record, index);
                      }
                    })}
                  </List>
                  <Box mb={4}>
                    <CompactPagination />
                  </Box>
                </Box>
              </Grid>
              <Grid item md={3}>
                <Box className={clsx(this.props.classes.innerPadding, this.props.classes.rightSideBar)}>
                  {this.renderFilterBar()}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item lg={2} />
      </Grid>
      <Footer />
      {this.renderDrawer()}
    </div>
  )

  renderFilterBar = () => (
    <Fragment>
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
      <Box mt={2}>
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
      <Box mt={2}>
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
    </Fragment>
  )

  renderDesktopCard = (record, index) => (
    <Paper key={index} className={this.props.classes.paper}>
      <ListItem button onClick={() => this.setState({ activeRecord: record })}>
        <Box flex={1}>
          <Box display="flex" alignItems="center">
            <UserAvatar
              url={record.avatar}
              online={record.online}
              size={this.props.theme.spacing(12)}
              sizeSM={this.props.theme.spacing(8)}
              marginRight={this.props.theme.spacing(2)}
              marginRightSM={this.props.theme.spacing(1)}
            />
            <Box flex={1}>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1">{record.name}</Typography>
                    <Avatar className={this.props.classes.verifiedIcon} style={record.verified ? {
                      backgroundColor: this.props.theme.palette.success.main
                    } : {}}>
                      <Check style={{ fontSize: '1rem' }} />
                    </Avatar>
                  </Box>
                  <Breadcrumbs aria-label="breadcrumb" separator="|">
                    <Typography variant="body2">{record.title}</Typography>
                    <Typography variant="body2">Member since {moment(record.memberSince).format('LL')}</Typography>
                  </Breadcrumbs>
                </Box>
                <Box>
                  <Typography variant="subtitle1">{record.hourlyRate}</Typography>
                  <Typography variant="body2">Hourly Rate</Typography>
                </Box>
              </Box>
              <Box mt={0.5}>
                <Link href="#">Cover Letter</Link>
              </Box>
              <Box mt={1.5} display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" className={this.props.classes.description}>{record.description}</Typography>
                  <Box mt={0.5} mb={1.5}>
                    <ChipContainer chips={record.skills} readOnly />
                  </Box>
                </Box>
                <Box>
                  <Button
                    fullWidth
                    variant="contained"
                    classes={{
                      label: this.props.classes.buttonLabel
                    }}
                  >Hire me</Button>
                  <Box mt={1}>
                    <Button fullWidth variant="outlined">Contact</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box mt={1.5} whiteSpace="break-spaces" lineHeight={3}>
            {this.renderProjectsCompleted(record.projectsCompleted)}
            {this.renderReview(record.reviewCount, record.reviewAverage)}
            {this.renderCertificates()}
            {this.renderSuccessRate(record.successRate)}
            <Box display="inline-block">
              <Box display="flex" alignItems="center">
                <IconButton
                  className={this.props.classes.saveIcon}
                  onClick={(e) => {
                    const records = cloneDeep(this.state.records);
                    records[index].saved = !records[index].saved;
                    this.setState({ records });
                    e.stopPropagation();
                  }}
                >
                  {record.saved ? (
                    <AiFillHeart color={this.props.theme.palette.secondary.main} />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </IconButton>
                <Box ml={1}>
                  <Typography variant="body2" align="right">Saved</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </ListItem>
    </Paper>
  )

  renderMobileCard = (record, index) => (
    <Paper key={index} className={this.props.classes.paper}>
      <ListItem button onClick={() => this.setState({ activeRecord: record })}>
        <Box flex={1}>
          <UserAvatar
            url={record.avatar}
            online={record.online}
            size={this.props.theme.spacing(12)}
            sizeSM={this.props.theme.spacing(8)}
            marginRight={this.props.theme.spacing(2)}
            marginRightSM={this.props.theme.spacing(1)}
          />
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1">{record.name}</Typography>
            <Avatar className={this.props.classes.verifiedIcon} style={record.verified ? {
              backgroundColor: this.props.theme.palette.success.main
            } : {}}>
              <Check style={{ fontSize: '1rem' }} />
            </Avatar>
          </Box>
          <Box mb={1}>
            <Breadcrumbs aria-label="breadcrumb" separator="|">
              <Typography variant="body2">{record.title}</Typography>
              <Typography variant="body2">Member since {moment(record.memberSince).format('LL')}</Typography>
            </Breadcrumbs>
          </Box>
          <Box>
            <Typography variant="body2" component="span">Hourly Rate&nbsp;</Typography>
            <Typography variant="subtitle1" component="span">{record.hourlyRate}</Typography>
          </Box>
          <Link href="#">Cover Letter</Link>
          <Box mt={0.5}>
            <Typography variant="body2" className={this.props.classes.description}>{record.description}</Typography>
          </Box>
          <Box my={0.5}>
            <ChipContainer chips={record.skills} readOnly />
          </Box>
          <Box display="flex" my={1.5}>
            <Box flex={1} mr={1}>
              <Button fullWidth variant="contained">Hire me</Button>
            </Box>
            <Box flex={1} ml={1}>
              <Button fullWidth variant="outlined">Contact</Button>
            </Box>
          </Box>
          <Divider />
          <Box mt={1.5} whiteSpace="break-spaces" lineHeight={3}>
            {this.renderProjectsCompleted(record.projectsCompleted)}
            {this.renderReview(record.reviewCount, record.reviewAverage)}
            {this.renderCertificates()}
            {this.renderSuccessRate(record.successRate)}
            <Box display="inline-block">
              <Box display="flex" alignItems="center">
                <IconButton
                  className={this.props.classes.saveIcon}
                  onClick={(e) => {
                    const records = cloneDeep(this.state.records);
                    records[index].saved = !records[index].saved;
                    this.setState({ records });
                    e.stopPropagation();
                  }}
                >
                  {record.saved ? (
                    <AiFillHeart color={this.props.theme.palette.secondary.main} />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </IconButton>
                <Box ml={1}>
                  <Typography variant="body2" align="right">Saved</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </ListItem>
    </Paper>
  )

  renderProjectsCompleted = (value) => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.actionIcon}>
          <Camera />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>Projects completed</Typography>
          <Typography variant="body2" noWrap color="textSecondary">{value}</Typography>
        </Box>
      </Box>
    </Box>
  )

  renderCertificates = () => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.actionIcon}>
          <Redeem />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>Certificated</Typography>
          <Box display="flex">
            <Apple color="primary" />
            <Apple color="primary" />
            <Apple color="primary" />
            <Apple color="primary" />
          </Box>
        </Box>
      </Box>
    </Box>
  )

  renderReview = (count, average) => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.actionIcon}>
          <Star />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>{pluralize('review', count, true)}</Typography>
          <Box style={{ lineHeight: 1 }}>
            <Rating name="read-only" value={average} readOnly size="small" />
          </Box>
        </Box>
      </Box>
    </Box>
  )

  renderSuccessRate = (value) => (
    <Box mr={2} display="inline-block">
      <Typography variant="body2">Success Rate</Typography>
      <Box display="flex" alignItems="center">
        <Box flex={1}>
          <LinearProgress variant="determinate" value={value} classes={{
            root: this.props.classes.progress,
            barColorPrimary: this.props.classes.progressThumb
          }} />
        </Box>
        <Typography variant="body1" className={this.props.classes.progressText}>{value}%</Typography>
      </Box>
    </Box>
  )

  renderDrawer = () => (
    <Drawer
      anchor="right"
      open={!!this.state.activeRecord}
      onClose={() => this.setState({ activeRecord: null })}
      classes={{
        paper: this.props.classes.drawerPaper
      }}
    >
      <Box className={this.props.classes.drawerBody}>
        <Box
          display="flex"
          justifyContent="space-between"
          className={this.props.classes.innerPadding}
          bgcolor={this.props.theme.palette.background.paper}
        >
          {this.props.width === 'xs' ? (
            <IconButton onClick={() => this.setState({ activeRecord: null })}>
              <ChevronLeft htmlColor={this.props.theme.palette.success.main} />
            </IconButton>
          ) : (
            <Button
              variant="text"
              startIcon={<ChevronLeft htmlColor={this.props.theme.palette.success.main} />}
              onClick={() => this.setState({ activeRecord: null })}
            >Back to all proposals</Button>
          )}
          {this.props.width === 'xs' ? (
            <IconButton>
              <OpenInNew htmlColor={this.props.theme.palette.success.main} />
            </IconButton>
          ) : (
            <Button
              variant="text"
              endIcon={<OpenInNew htmlColor={this.props.theme.palette.success.main} />}
            >View profile in new window</Button>
          )}
        </Box>
        <Divider />
        <Box className={this.props.classes.innerPadding}>
          <CompactCard>
            <CardContent>
              <UserAvatar
                style={{ float: 'left' }}
                url={this.state.activeRecord && this.state.activeRecord.avatar}
                online={this.state.activeRecord && this.state.activeRecord.online}
                size={this.props.theme.spacing(12)}
                sizeSM={this.props.theme.spacing(8)}
                marginRight={this.props.theme.spacing(2)}
                marginRightSM={this.props.theme.spacing(1)}
              />
              <Box display="flex" flexWrap="wrap">
                <Box display="flex" alignItems="center" mr={1}>
                  <Box mr={1} color={this.props.theme.palette.success.main}>
                    <Typography variant="body1">{this.state.activeRecord && this.state.activeRecord.name}</Typography>
                  </Box>
                  <CheckCircle htmlColor={this.props.theme.palette.success.main} />
                </Box>
                <Box display="flex" alignItems="center">
                  <Star htmlColor={this.props.theme.palette.warning.main} />
                  <Box mx={1} color={this.props.theme.palette.warning.main}>
                    <Typography variant="body2">HIGHTEST RATED</Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="body1">MEAN Stack (Angular | Vue.js | Laravel | Node)</Typography>
              <Box display="flex" alignItems="center" my={0.5}>
                <ScoreReview value={4.9} />
                <Typography variant="body2">({pluralize('review', 10, true)})</Typography>
              </Box>
              {this.state.activeRecord && (
                <ChipContainer chips={this.state.activeRecord.skills} readOnly />
              )}
            </CardContent>
          </CompactCard>
          <Box mt={1} style={{ clear: 'both' }}>
            <CompactCard>
              <CardHeader
                title={(
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">Cover letter</Typography>
                    <Typography variant="body1">$500 in 3 days</Typography>
                  </Box>
                )}
              />
              <Divider />
              <CardContent>
                <Typography variant="body2">{this.state.activeRecord && this.state.activeRecord.description}</Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <Typography variant="subtitle2">Attachments</Typography>
                <List disablePadding>
                  {this.state.activeRecord && this.state.activeRecord.attachments.map((file, index) => (
                    <ListItem key={index} disableGutters button>
                      <ListItemIcon>
                        <Attachment />
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
          <Box mt={1}>
            <CompactCard>
              <CardHeader
                title={(
                  <Tabs
                    value={this.state.drawerActiveTab}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <CompactTab label="About me" />
                    <CompactTab label="Portfolio" />
                    <CompactTab label="Reviews" />
                  </Tabs>
                )}
                style={{ padding: 0 }}
              />
              <Divider />
              <CardContent>
                <Typography variant="body2">{this.state.activeRecord && this.state.activeRecord.description}</Typography>
              </CardContent>
            </CompactCard>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )

  handleTabChange = (event, newValue) => {
    this.setState({ drawerActiveTab: newValue });
  }
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(FindFreelancer);