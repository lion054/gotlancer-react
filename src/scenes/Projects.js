import React, { PureComponent } from 'react';
import {
  Box,
  CardContent,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Paper,
  Tab,
  Tabs,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import moment from 'moment';
import faker from 'faker';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompactCard, formatCurrency } from '../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  container: {
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2)
    }
  },
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
  subtotal: {
    padding: theme.spacing(3)
  }
})

class Projects extends PureComponent {
  state = {
    activeTab: 0,
    openJobs: []
  }

  componentDidMount() {
    const openJobs = [];
    for (let i = 0; i < 2; i++) {
      openJobs.push({
        title: faker.lorem.sentence(5),
        type: faker.random.arrayElement(['Fixed', 'Hourly']),
        createdAt: faker.date.past(),
        hiredCount: faker.random.number({ min: 1, max: 5 }),
        status: 'In Progress',
        budget: faker.random.number({ min: 2000, max: 4000 })
      });
    }
    this.setState({ openJobs });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box className={this.props.classes.container}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mt={4}>
              <Grid container>
                <Grid item xs={6} sm={3}>
                  <Box p={2}>
                    {this.renderSummaryCard('Jobs Open', 4)}
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box p={2}>
                    {this.renderSummaryCard('Jobs Completed', 26)}
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box p={2}>
                    {this.renderSummaryCard('Jobs In Progress', formatCurrency(125))}
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box p={2}>
                    {this.renderSummaryCard('Total Earned', formatCurrency(10000))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box mt={8} mb={4}>
              {this.renderOpenJobs()}
            </Box>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )

  renderSummaryCard = (title, subtitle) => (
    <CompactCard>
      <CardContent className={this.props.classes.subtotal}>
        <Typography variant="body2" noWrap>{title}</Typography>
        <Typography variant="subtitle1" color="primary">{subtitle}</Typography>
      </CardContent>
    </CompactCard>
  )

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  renderOpenJobs = () => (
    <Paper elevation={0} className={this.props.classes.card}>
      <Tabs
        value={this.state.activeTab}
        onChange={this.handleTabChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="OPEN (10)" />
        <Tab label="NDER REVIEW (2)" />
        <Tab label="DRAFTS (33)" />
      </Tabs>
      <Divider />
      <List disablePadding>
        {this.state.openJobs.map((job, index) => (
          <ListItem key={index} disableGutters divider>
            <Box className={this.props.classes.outerMargin} width="100%">
              <Grid container>
                <Grid item xl={6} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    <Link href="/project" variant="body1">{job.title}</Link>
                    <Typography variant="body2" color="textSecondary">{job.type} - Posted {moment(job.createdAt).fromNow()}</Typography>
                  </Box>
                </Grid>
                <Grid item xl={2} xs={4}>
                  <Box className={this.props.classes.innerPadding}>
                    <Typography variant="body1">30</Typography>
                    <Typography variant="body2" color="textSecondary">Bid</Typography>
                  </Box>
                </Grid>
                <Grid item xl={2} xs={3}>
                  <Box className={this.props.classes.innerPadding}>
                    <Typography variant="body1">{job.hiredCount}</Typography>
                    <Typography variant="body2" color="textSecondary">Hired</Typography>
                  </Box>
                </Grid>
                <Grid item xl={2} xs={5}>
                  <Box className={this.props.classes.innerPadding}>
                    <Typography variant="body1">{formatCurrency(job.budget)}</Typography>
                    <Typography variant="body2" color="textSecondary">{job.status}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default compose(
  withRouter,
  withStyles(styles),
  withTheme
)(Projects);