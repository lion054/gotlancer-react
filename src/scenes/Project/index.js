import React, { PureComponent } from 'react';
import {
  Box,
  Divider,
  Grid,
  Tabs,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChipContainer from '../../components/ChipContainer';
import Details from './Details';
import { CompactTab } from '../../global';

const styles = (theme) => ({
  root: {}
});

class Project extends PureComponent {
  state = {
    badges: [],
    activeTab: 0
  }

  componentDidMount() {
    const badges = faker.random.arrayElements([{
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
    this.setState({ badges });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box pt={8} pl={2} pr={2} bgcolor={this.props.theme.palette.background.default}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box display="flex">
              <Box flex={1}>
                <Typography variant="h5">I need a WordPress Site (5 pages) and a Logo Design</Typography>
                <ChipContainer chips={this.state.badges} />
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
              <CompactTab label="Details" />
              <CompactTab label="Proposals (10)" />
              <CompactTab label="Hired (2)" />
              <CompactTab label="Payment (33)" />
              <CompactTab label="Work Diary" />
              <CompactTab label="Files" />
            </Tabs>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Divider />
      <Box pb={8} pl={2} pr={2} bgcolor={this.props.theme.palette.background.paper}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <div role="tabpanel" hidden={this.state.activeTab !== 0}>
              <Details />
            </div>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Project);