import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Tabs,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AiFillPicture, AiOutlinePlus } from 'react-icons/ai';
import moment from 'moment';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChipContainer from '../../components/ChipContainer';
import Details from './Details';
import Entries from './Entries';
import Payment from './Payment';
import Discussion from './Discussion';
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
    [theme.breakpoints.up('md')]: {
      textAlign: 'right'
    }
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  },
  plus: {
    border: `solid 1px ${theme.palette.action.disabled}`,
    padding: theme.spacing(0.5)
  },
  submit: {
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0)
    }
  }
});

class Contest extends PureComponent {
  state = {
    badges: [],
    status: 'Winner Selected',
    budget: faker.random.number({ min: 0, max: 1000 }),
    closedAt: faker.date.future(),
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
      <Box pt={8} px={2} bgcolor={this.props.theme.palette.background.default}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box className={this.props.classes.titleBar}>
              <Box>
                <Typography variant="h5">I need a WordPress Site (5 pages) and a Logo Design</Typography>
                <ChipContainer chips={this.state.badges} readOnly />
              </Box>
              <Box className={this.props.classes.titleRight}>
                <Typography variant="body2" style={{ color: this.props.theme.palette.success.main }}>{this.state.status}</Typography>
                <Box display="flex" alignItems="center">
                  <Box>
                    <Typography variant="body1">${this.state.budget} Prize</Typography>
                    <Typography variant="body2">Ending in <span style={{ color: this.props.theme.palette.success.main }}>{moment(this.state.closedAt).fromNow(true)}</span></Typography>
                  </Box>
                  <Box ml={1}>
                    <IconButton className={this.props.classes.plus}>
                      <AiOutlinePlus />
                    </IconButton>
                  </Box>
                </Box>
                <Box className={this.props.classes.submit}>
                  <Button variant="outlined" startIcon={<AiFillPicture />}>Submit Desgin</Button>
                </Box>
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
              <CompactTab label="Entries (10)" />
              <CompactTab label="Payment (33)" />
              <CompactTab label="Discussion (5)" />
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
              <Details />
            </div>
            <div role="tabpanel" hidden={this.state.activeTab !== 1}>
              <Entries />
            </div>
            <div role="tabpanel" hidden={this.state.activeTab !== 2}>
              <Payment />
            </div>
            <div role="tabpanel" hidden={this.state.activeTab !== 3}>
              <Discussion />
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
)(Contest);