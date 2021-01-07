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
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
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
  MoreVert,
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
import { v4 as uuidv4 } from 'uuid';
import { compose } from 'redux';

import ChipContainer from '../../components/ChipContainer';
import CustomTablePagination from '../../components/pagination/CustomTablePagination';
import { CompactCard } from '../../global';

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
  },
  menuItem: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    '&:hover > .MuiListItemIcon-root > .MuiBox-root > svg': {
      color: theme.palette.primary.main
    },
    '&:hover > .MuiListItemText-root > .MuiTypography-root': {
      color: theme.palette.primary.main
    }
  },
  floatLeft: {
    [theme.breakpoints.up('sm')]: {
      float: 'left',
      width: 'calc(100% - 160px)'
    }
  },
  floatRight: {
    [theme.breakpoints.up('sm')]: {
      float: 'right',
      width: 160,
      '& > .MuiTypography-root': {
        display: 'block'
      }
    },
    [theme.breakpoints.down('xs')]: {
      '& > .MuiTypography-root': {
        display: 'inline-block'
      }
    },
    textAlign: 'right'
  },
  floatClear: {
    [theme.breakpoints.up('sm')]: {
      clear: 'both' // Reset above float operation
    }
  }
});

const OddTimelineItem = withStyles({
  missingOppositeContent: {
    '&:before': {
      display: 'none'
    }
  }
})(TimelineItem);

class Payment extends PureComponent {
  state = {
    total: 1000,
    records: [],
    rowsPerPage: 10,
    page: 0,
    roadmap: [],
    moreEl: null,
    moreId: ''
  }

  componentDidMount() {
    const records = [];
    for (let i = 0; i < 4; i++) {
      records.push({
        id: uuidv4(),
        name: faker.name.findName(),
        budget: `$${faker.random.number({ min: 100, max: 1000 })} ${faker.random.boolean() ? 'Hourly' : 'Fixed'}`,
        startedAt: faker.date.past(),
        status: faker.random.arrayElement(['Pending', 'In Progress', 'Rejected', 'Released']),
        details: 'First milestone',
        amount: faker.random.number({ min: 100, max: 1000 })
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
      subtitle: 'End contract from hired list'
    },{
      title: 'Give Feedback',
      subtitle: 'Rate your freelancer'
    }];
    this.setState({ records, roadmap });
  }

  handleChangePage = (e, page) => this.setState({ page })

  handleChangeRowsPerPage = (e) => this.setState({
    rowsPerPage: e.target.value,
    page: 0
  })

  render = () => (
    <Box className={this.props.classes.outerMargin}>
      <Grid container>
        <Grid item md={8} xs={12}>
          <Box className={this.props.classes.innerPadding}>
            <CompactCard>
              <Box className={this.props.classes.innerPadding}>
                <Box className={this.props.classes.floatLeft}>
                  <Typography variant="subtitle1">Financial Payment Management</Typography>
                  <Typography variant="body2">Here all of your payment that you made recently</Typography>
                </Box>
                <Box className={this.props.classes.floatRight}>
                  <Button variant="contained">Create Milestone</Button>
                </Box>
              </Box>
              <Box className={this.props.classes.floatClear}>
                <Divider />
              </Box>
              <CardContent className="noVertPadding">
                <List disablePadding>
                  <ListItem disableGutters divider>
                    <Box className={this.props.classes.outerMargin} flex={1}>
                      <Grid container alignItems="center">
                        <Grid item md={1} xs={2}>
                          <Box className={this.props.classes.innerPadding}>
                            <Typography variant="subtitle2">#</Typography>
                          </Box>
                        </Grid>
                        <Grid item md={3} xs={6}>
                          <Box className={this.props.classes.innerPadding}>
                            <Typography variant="subtitle2">Freelancer</Typography>
                          </Box>
                        </Grid>
                        <Grid item md={2} xs={4}>
                          <Box className={this.props.classes.innerPadding}>
                            <Typography variant="subtitle2">Date</Typography>
                          </Box>
                        </Grid>
                        <Grid item md={3} xs={6}>
                          <Box className={this.props.classes.innerPadding}>
                            <Typography variant="subtitle2">Details</Typography>
                          </Box>
                        </Grid>
                        <Grid item md={3} xs={6}>
                          <Box className={this.props.classes.innerPadding}>
                            <Typography variant="subtitle2">Amount</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </ListItem>
                  {this.state.records.map((record, index) => (
                    <ListItem key={index} disableGutters divider>
                      <Box className={this.props.classes.outerMargin} flex={1}>
                        <Grid container alignItems="center">
                          <Grid item md={1} xs={2}>
                            <Box className={this.props.classes.innerPadding}>
                              <Typography variant="body2">{index + 1}</Typography>
                            </Box>
                          </Grid>
                          <Grid item md={3} xs={6}>
                            <Box className={this.props.classes.innerPadding}>
                              <Typography variant="body2">{record.name}</Typography>
                              <Typography variant="body2" color="textSecondary">{record.budget}</Typography>
                            </Box>
                          </Grid>
                          <Grid item md={2} xs={4}>
                            <Box className={this.props.classes.innerPadding}>
                              <Typography variant="body2">{moment(record.startedAt).format('MM/DD/YYYY')}</Typography>
                              <Typography variant="body2" color="textSecondary">{record.status}</Typography>
                            </Box>
                          </Grid>
                          <Grid item md={3} xs={6}>
                            <Box className={this.props.classes.innerPadding}>
                              <Typography variant="body2">{record.details}</Typography>
                            </Box>
                          </Grid>
                          <Grid item md={2} xs={4}>
                            <Box className={this.props.classes.innerPadding}>
                              <Typography variant="body2">{new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(record.amount)}</Typography>
                              <Typography variant="body2" color="textSecondary">USD</Typography>
                            </Box>
                          </Grid>
                          <Grid item md={1} xs={2}>
                            <Box className={this.props.classes.innerPadding}>
                              <IconButton onClick={(e) => this.onOpenMoreMenu(e, record.id)}>
                                <MoreVert />
                              </IconButton>
                              {this.renderMoreMenu(record.id)}
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <CustomTablePagination
                  count={this.state.total}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </CardContent>
            </CompactCard>
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
              <Divider />
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
            </CompactCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )

  onOpenMoreMenu = (e, id) => this.setState({
    moreEl: e.currentTarget,
    moreId: id
  })

  onCloseMoreMenu = () => this.setState({
    moreEl: null,
    moreId: ''
  })

  renderMoreMenu = (id) => (
    <Menu
      id={`${id}-more-menu`}
      anchorEl={this.state.moreEl}
      keepMounted
      open={this.state.moreId === id}
      onClose={this.onCloseMoreMenu}
      getContentAnchorEl={null} // menu should be display below anchor
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // menu should be display below anchor
      transformOrigin={{ vertical: 'top', horizontal: 'right' }} // menu should be display below anchor
    >
      <MenuItem disableGutters className={this.props.classes.menuItem} onClick={this.onCloseMoreMenu}>
        <ListItemText primary="Delete" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
      <MenuItem disableGutters className={this.props.classes.menuItem} onClick={this.onCloseMoreMenu}>
        <ListItemText primary="Edit" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
      <MenuItem disableGutters className={this.props.classes.menuItem} onClick={this.onCloseMoreMenu}>
        <ListItemText primary="Quote" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
    </Menu>
  )
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(Payment);