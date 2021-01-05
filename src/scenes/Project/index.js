import React, { PureComponent } from 'react';
import {
  Box,
  Grid,
  Tab,
  Tabs,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../../components/Header';
import ChipContainer from '../../components/ChipContainer';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

class Project extends PureComponent {
  state = {
    categories: [],
    activeTab: 0
  }

  componentDidMount() {
    const categories = faker.random.arrayElements([{
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
    }]);
    this.setState({ categories });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box display="flex">
              <Box flex={1}>
                <Typography variant="h5">I need a WordPress Site (5 pages) and a Logo Design</Typography>
                <ChipContainer chips={this.state.categories} />
              </Box>
              <Box>
                <Box color={this.props.theme.palette.success.main}>
                  <Typography variant="body2">In progress</Typography>
                </Box>
                <Typography variant="body2">$10-$30 USD/hr</Typography>
              </Box>
            </Box>
            <Tabs
              value={this.state.activeTab}
              onChange={this.handleTabChange}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Details" />
              <Tab label="Proposals (10)" />
              <Tab label="Hired (2)" />
              <Tab label="Payment (33)" />
              <Tab label="Work Diary" />
              <Tab label="Upgrade" />
              <Tab label="Files" />
              <Tab label="Feedback" />
            </Tabs>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
    </div>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Project);