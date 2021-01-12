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
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OrderDetails from './OrderDetails';
import Payment from './Payment';
import FileHandover from './FileHandover';
import Feedback from './Feedback';
import { CompactTab } from '../../global';

const styles = (theme) => ({
  titleBar: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  titleRight: {
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      '& > .MuiTypography-root': {
        display: 'inline-block'
      }
    }
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  }
});

const GreenText = withStyles((theme) => ({
  root: {
    color: theme.palette.success.main
  }
}))(Typography);

class Project extends PureComponent {
  state = {
    badges: [],
    activeTab: 0
  }

  componentDidMount() {
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box pt={8} px={2} bgcolor={this.props.theme.palette.background.default}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box className={this.props.classes.titleBar}>
              <Box>
                <Typography variant="h5">I need a WordPress Site (5 pages) and a Logo Design</Typography>
              </Box>
              <Box className={this.props.classes.titleRight}>
                <GreenText variant="body2">In progress</GreenText>
                <Typography variant="body2">&nbsp;$10-$30 USD/hr</Typography>
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
              <CompactTab label="Order Details" />
              <CompactTab label="Payment" />
              <CompactTab label="File Handover" />
              <CompactTab label="Feedback" />
            </Tabs>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Divider />
      <Box className={this.props.classes.innerPadding} bgcolor={this.props.theme.palette.background.paper}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <div role="tabpanel" hidden={this.state.activeTab !== 0}>
              <OrderDetails />
            </div>
            <div role="tabpanel" hidden={this.state.activeTab !== 1}>
              <Payment />
            </div>
            <div role="tabpanel" hidden={this.state.activeTab !== 2}>
              <FileHandover />
            </div>
            <div role="tabpanel" hidden={this.state.activeTab !== 3}>
              <Feedback />
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