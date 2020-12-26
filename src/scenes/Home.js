import React, { PureComponent } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  leftCard: {
    borderRadius: theme.spacing(1.5),
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
  }
})

class Home extends PureComponent {
  state = {
    activeTab: 0,
    user: {
      avatar: faker.image.image(),
      name: faker.name.findName()
    },
    progress: faker.random.number({ min: 0, max: 100 })
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
          <Grid item md={2} />
          <Grid item md={8}>
            <Grid container>
              <Grid item md={2}>
                <Card elevation={0} className={this.props.classes.leftCard}>
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
              </Grid>
              <Grid item md={8}></Grid>
              <Grid item md={2}></Grid>
            </Grid>
          </Grid>
          <Grid item md={2} />
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
}

export default compose(
  withStyles(styles),
  withTheme
)(Home);