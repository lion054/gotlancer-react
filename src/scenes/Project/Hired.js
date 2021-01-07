import React, { PureComponent } from 'react';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import {
  Apple,
  Camera,
  Check,
  Favorite,
  FavoriteBorder,
  Redeem,
  Star
} from '@material-ui/icons';
import {
  Rating,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@material-ui/lab';
import { cloneDeep } from 'lodash';
import pluralize from 'pluralize';
import moment from 'moment';
import faker from 'faker';
import { compose } from 'redux';

import ChipContainer from '../../components/ChipContainer';
import CompactPagination from '../../components/CompactPagination';
import { CompactCard, formatCurrency } from '../../global';

const styles = (theme) => ({
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
    width: 96,
    height: 96,
    borderRadius: 48,
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(2)
    }
  },
  verifiedIcon: {
    marginLeft: theme.spacing(1),
    width: theme.spacing(2.5),
    height: theme.spacing(2.5)
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
  progress: {
    height: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(8)
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(16)
    }
  },
  progressThumb: {
    backgroundColor: theme.palette.success.main
  },
  progressText: {
    width: 52,
    textAlign: 'right'
  },
  saveIcon: {
    padding: theme.spacing(1),
    border: `solid 1px ${theme.palette.divider}`
  }
});

const OddTimelineItem = withStyles({
  missingOppositeContent: {
    '&:before': {
      display: 'none'
    }
  }
})(TimelineItem);

class Hired extends PureComponent {
  state = {
    records: [],
    roadmap: []
  }

  componentDidMount() {
    const records = [];
    for (let i = 0; i < 3; i++) {
      const budget = faker.random.number({ min: 100, max: 3000 });
      const skills = [];
      for (let j = 0; j < 3; j++) {
        skills.push({
          title: faker.lorem.words(2),
          backgroundColor: this.props.theme.palette.action.disabledBackground,
          color: this.props.theme.palette.text.secondary
        });
      }
      records.push({
        avatar: faker.image.image(),
        online: faker.random.boolean(),
        name: faker.name.findName(),
        verified: faker.random.boolean(),
        title: 'Product Manager',
        memberSince: faker.date.past(),
        budget: formatCurrency(budget),
        description: faker.lorem.sentences(2),
        skills,
        projectsCompleted: faker.random.number({ min: 0, max: 1000 }),
        reviewCount: faker.random.number({ min: 0, max: 100 }),
        reviewAverage: faker.random.number({ min: 0, max: 5 }),
        successRate: faker.random.number({ min: 0, max: 100 }),
        saved: faker.random.boolean()
      });
    }
    const roadmap = [{
      title: 'Project Post',
      subtitle: 'Provide your job details',
      checked: true
    },{
      title: 'Hired Freelancer',
      subtitle: 'Hire a talent from all proposals',
      checked: true
    },{
      title: 'Create Milestone',
      subtitle: 'Deposit a fund on your job'
    },{
      title: 'Release Milestone',
      subtitle: 'Sattle all of pending payment'
    },{
      title: 'End Contract',
      subtitle: 'End contract from hired  list'
    },{
      title: 'Give Feedback',
      subtitle: 'Rate your freelancer'
    }];
    this.setState({ records, roadmap });
  }

  render = () => (
    <Box className={this.props.classes.outerMargin}>
      <Grid container>
        <Grid item md={8} xs={12}>
          <Box className={this.props.classes.innerPadding}>
            {this.state.records.map((record, index) => {
              switch (this.props.width) {
                case 'sm':
                case 'xs':
                  return this.renderMobileCard(record, index);
                default:
                  return this.renderDesktopCard(record, index);
              }
            })}
            <Box mb={4}>
              <CompactPagination />
            </Box>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box className={this.props.classes.innerPadding}>
            <CompactCard>
              <CardHeader
                title="Project Status"
                titleTypographyProps={{
                  variant: 'body1'
                }}
              />
              <CardContent>
                <Timeline>
                  {this.state.roadmap.map((point, index) => (
                    <OddTimelineItem key={index}>
                      <TimelineSeparator>
                        {!!point.checked ? (
                          <TimelineDot style={{ backgroundColor: this.props.theme.palette.success.main }}>
                            <Check fontSize="small" />
                          </TimelineDot>
                        ) : (
                          <TimelineDot color="grey" style={{ width: 20, height: 20 }} />
                        )}
                        {index < this.state.roadmap.length - 1 && (
                          <TimelineConnector style={!!point.checked ? {
                            backgroundColor: this.props.theme.palette.success.main
                          } : {}} />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body1">{point.title}</Typography>
                        <Typography variant="body2">{point.subtitle}</Typography>
                      </TimelineContent>
                    </OddTimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </CompactCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )

  renderDesktopCard = (record, index) => (
    <Box key={index} mb={1}>
      <CompactCard>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box position="relative">
              <img alt="" src={record.avatar} className={this.props.classes.avatar} />
              <Box
                width={20}
                height={20}
                borderRadius={10}
                bgcolor={this.props.theme.palette.common.white}
                position="absolute"
                top={76}
                left={76}
              />
              <Box
                width={16}
                height={16}
                borderRadius={8}
                bgcolor={record.online ? this.props.theme.palette.success.main : this.props.theme.palette.action.disabled}
                position="absolute"
                top={78}
                left={78}
              />
            </Box>
            <Box flex={1}>
              <Box display="flex">
                <Box flex={1}>
                  <Box flex={1} display="flex" alignItems="center">
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
                  <Typography variant="body2">My Bid</Typography>
                  <Typography variant="subtitle1">{record.budget}</Typography>
                </Box>
              </Box>
              <Box mt={0.5}>
                <Link href="#">Cover Letter</Link>
              </Box>
              <Box mt={1.5} display="flex">
                <Box flex={1}>
                  <Typography variant="body2" className={this.props.classes.description}>{record.description}</Typography>
                  <Box mt={0.5} mb={1.5}>
                    <ChipContainer chips={record.skills} />
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Button fullWidth variant="contained" color="secondary">End Contract</Button>
                  </Box>
                  <Box mt={1}>
                    <Button fullWidth variant="outlined">Contact</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box mt={1.5} style={{ whiteSpace: 'break-spaces', lineHeight: 3 }}>
            {this.renderProjectsCompleted(record.projectsCompleted)}
            {this.renderReview(record.reviewCount, record.reviewAverage)}
            {this.renderCertificates()}
            {this.renderSuccessRate(record.successRate)}
            <Box display="inline-block">
              <Box display="flex" alignItems="center">
                <IconButton
                  className={this.props.classes.saveIcon}
                  onClick={() => {
                    const records = cloneDeep(this.state.records);
                    records[index].saved = !records[index].saved;
                    this.setState({ records });
                  }}
                >
                  {record.saved ? (
                    <Favorite color="secondary" />
                  ) : (
                    <FavoriteBorder color="disabled" />
                  )}
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

  renderMobileCard = (record, index) => (
    <Box key={index} mb={1}>
      <CompactCard>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box position="relative">
              <img alt="" src={record.avatar} className={this.props.classes.avatar} />
              <Box
                width={20}
                height={20}
                borderRadius={10}
                bgcolor={this.props.theme.palette.common.white}
                position="absolute"
                top={76}
                left={76}
              />
              <Box
                width={16}
                height={16}
                borderRadius={8}
                bgcolor={record.online ? this.props.theme.palette.success.main : this.props.theme.palette.action.disabled}
                position="absolute"
                top={78}
                left={78}
              />
            </Box>
            <Box flex={1}>
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
          </Box>
          <Box>
            <Typography variant="body2" component="span">My Bid&nbsp;</Typography>
            <Typography variant="subtitle1" component="span">{record.budget}</Typography>
          </Box>
          <Box mt={0.5}>
            <Link href="#">Cover Letter</Link>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2" className={this.props.classes.description}>{record.description}</Typography>
          </Box>
          <Box mt={0.5} mb={1.5}>
            <ChipContainer chips={record.skills} />
          </Box>
          <Box display="flex">
            <Box flex={1} mr={1}>
              <Button fullWidth variant="contained" color="secondary">End Contract</Button>
            </Box>
            <Box flex={1} ml={1}>
              <Button fullWidth variant="outlined">Contact</Button>
            </Box>
          </Box>
          <Divider />
          <Box mt={1.5} style={{ whiteSpace: 'break-spaces', lineHeight: 3 }}>
            {this.renderProjectsCompleted(record.projectsCompleted)}
            {this.renderReview(record.reviewCount, record.reviewAverage)}
            {this.renderCertificates()}
            {this.renderSuccessRate(record.successRate)}
            <Box display="inline-block">
              <Box display="flex" alignItems="center">
                <IconButton
                  className={this.props.classes.saveIcon}
                  onClick={() => {
                    const records = cloneDeep(this.state.records);
                    records[index].saved = !records[index].saved;
                    this.setState({ records });
                  }}
                >
                  {record.saved ? (
                    <Favorite color="secondary" />
                  ) : (
                    <FavoriteBorder color="disabled" />
                  )}
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
          <Typography variant="body2" noWrap>{pluralize('Review', count, true)}</Typography>
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
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(Hired);