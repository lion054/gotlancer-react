import React, { PureComponent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  colors,
  fade,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AttachFile, Check, ChevronRight, Delete } from '@material-ui/icons';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@material-ui/lab';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import faker from 'faker';
import { compose } from 'redux';

import AddFile from './AddFile';
import ChipContainer from '../../components/ChipContainer';
import { formatCurrency } from '../../global';

const styles = (theme) => ({
  outerMargin: {
    padding: theme.spacing(-2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(-1)
    }
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  },
  badge: {
    display: 'inline-block',
    padding: theme.spacing(0, 1),
    borderRadius: 12,
    color: theme.palette.common.white
  },
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    padding: 'unset'
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

const OddTimelineItem = withStyles({
  missingOppositeContent: {
    '&:before': {
      display: 'none'
    }
  }
})(TimelineItem);

class Details extends PureComponent {
  state = {
    id: faker.random.number({ min: 100000, max: 1000000 }),
    details: faker.lorem.paragraphs(3),
    attachments: [],
    addingFile: false,
    skills: [],
    badges: [],
    roadmap: []
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
    const badges = [{
      color: this.props.theme.palette.success.main,
      title: 'Standard',
      description: 'Free to post, your project will go live instantly and start receiving bids within seconds.',
      price: 0
    },{
      color: this.props.theme.palette.action.disabled,
      title: 'NDA',
      description: 'Freelancers must sign a Non- disclosure Agreement to Apply on your project. Freelancers agree to keep details discussed through private messages and files confidential.',
      price: 5
    },{
      color: this.props.theme.palette.info.main,
      title: 'Featured',
      description: 'Featured projects attract higher-quality bids and are displayed prominently in the `Featured Jobs and Contests` page.',
      price: 5
    },{
      color: this.props.theme.palette.error.main,
      title: 'Urgent',
      description: 'Make your project stand out and let freelancers know that your job is time sensitive.',
      price: 5
    },{
      color: this.props.theme.palette.primary.main,
      title: 'Private',
      description: 'Featured projects attract higher-quality bids and are displayed prominently in the `Featured Jobs and Contests` page.',
      price: 5
    },{
      color: this.props.theme.palette.warning.main,
      title: 'Premium',
      description: 'Make your project stand out and let freelancers know that your job is time sensitive.',
      price: 5
    }];
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
      subtitle: 'Deposit a fund on your Job'
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
    this.setState({ attachments, skills, badges, roadmap });
  }

  render = () => (
    <Box className={this.props.classes.outerMargin}>
      <Grid container>
        <Grid item md={8} xs={12}>
          <Box className={this.props.classes.innerPadding}>
            <Card elevation={0} className={this.props.classes.card}>
              <CardHeader
                title="Project Details"
                titleTypographyProps={{
                  variant: 'subtitle2'
                }}
                action={(
                  <Box mt={1}>
                    <Button variant="outlined">Edit</Button>
                  </Box>
                )}
              />
              <Divider />
              <CardContent>
                <Typography variant="body2">{this.state.details}</Typography>
                <Box mt={1} display="flex" alignItems="center">
                  <Box flex={1}>
                    <Typography variant="body2">Project ID: {this.state.id}</Typography>
                  </Box>
                  <RedButton variant="text">Report as spam</RedButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box className={this.props.classes.innerPadding}>
            <Card elevation={0} className={this.props.classes.card}>
              <CardHeader
                title="Attachments"
                titleTypographyProps={{
                  variant: 'subtitle2'
                }}
                action={(
                  <Box mt={1}>
                    <Button variant="outlined" onClick={() => this.setState({ addingFile: true })}>Upload</Button>
                  </Box>
                )}
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
                      <ListItemSecondaryAction>
                        <IconButton>
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
          <Box className={this.props.classes.innerPadding}>
            <Card elevation={0} className={this.props.classes.card}>
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
                  <Typography color="textSecondary">Frontend Developer</Typography>
                </Breadcrumbs>
                <Box mt={2} mb={1}>
                  <Typography variant="body1">Skills</Typography>
                </Box>
                <ChipContainer chips={this.state.skills} />
              </CardContent>
            </Card>
          </Box>
          <Box mt={3}>
            <Typography variant="subtitle2">Select your listing</Typography>
          </Box>
          <Box mt={1} mb={1}>
            <Typography variant="body2">Upgrade your listing from below and get dozens of skilled freelancers for your project instantly.</Typography>
          </Box>
          {this.renderBadgeList()}
        </Grid>
        <Grid item md={4} xs={12}>
          <Box className={this.props.classes.innerPadding}>
            <Card elevation={0} className={this.props.classes.card}>
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
            </Card>
          </Box>
        </Grid>
      </Grid>
      <AddFile
        open={this.state.addingFile}
        onClose={() => this.setState({ addingFile: false })}
      />
    </Box>
  )

  handleBadge = (index) => (e) => {
    const badges = cloneDeep(this.state.badges);
    badges[index].checked = !badges[index].checked;
    this.setState({ badges });
  }

  renderBadgeList = () => (
    <List disablePadding>
      {this.state.badges.map((badge, index) => (
        <ListItem key={index} disableGutters button onClick={this.handleBadge(index)}>
          <Box width="100%" display="flex" alignItems="center">
            <Checkbox checked={!!badge.checked} onClick={this.handleBadge(index)} />
            <Box
              flex={1}
              className={this.props.classes.innerPadding}
              borderRadius={4}
              border={`solid 1px ${badge.checked ? this.props.theme.palette.secondary.main : this.props.theme.palette.divider}`}
              bgcolor={this.props.theme.palette.background.paper}
            >
              <Grid container alignItems="center">
                <Grid item sm={2} xs={3}>
                  <Box className={this.props.classes.badge} bgcolor={badge.color}>
                    <Typography variant="body1">{badge.title}</Typography>
                  </Box>
                </Grid>
                <Grid item sm={8} xs={7}>
                  <Typography variant="body2">{badge.description}</Typography>
                </Grid>
                <Grid item sm={2} xs={2}>
                  <Typography variant="body2" align="right">{formatCurrency(badge.price)}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Details);