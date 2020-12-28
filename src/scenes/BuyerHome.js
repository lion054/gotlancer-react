import React, { Fragment, PureComponent } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import moment from 'moment';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  container: {
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2)
    }
  },
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    padding: 'unset'
  },
  subtotal: {
    padding: theme.spacing(3)
  },
  panel: {
    height: theme.spacing(50),
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    padding: 'unset'
  }
})

class Home extends PureComponent {
  state = {
    recentPostedJobs: [],
    recentCompletedJobs: []
  }

  componentDidMount() {
    const recentPostedJobs = [];
    for (let i = 0; i < 2; i++) {
      recentPostedJobs.push({
        title: faker.lorem.sentence(5),
        type: faker.random.arrayElement(['Fixed', 'Hourly']),
        createdAt: faker.date.past(),
        hiredCount: faker.random.number({ min: 1, max: 5 }),
        status: 'In Progress',
        budget: faker.random.number({ min: 2000, max: 4000 })
      });
    }
    const recentCompletedJobs = [];
    for (let i = 0; i < 5; i++) {
      const job = {
        title: faker.lorem.sentence(5),
        type: faker.random.arrayElement(['Fixed', 'Hourly']),
        finishedAt: faker.date.past(),
        status: 'Completed',
        budget: faker.random.number({ min: 2000, max: 4000 })
      };
      if (job.type === 'Hourly') {
        job.rate = 20;
      }
      recentCompletedJobs.push(job);
    }
    this.setState({ recentPostedJobs, recentCompletedJobs });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box className={this.props.classes.container}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mt={4}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  {this.renderCard('Work In Progress', '$9000.00')}
                </Grid>
                <Grid item xs={6} sm={3}>
                  {this.renderCard('Projects Completed', '326')}
                </Grid>
                <Grid item xs={6} sm={3}>
                  {this.renderCard('Total Spent', '$50,000.00')}
                </Grid>
                <Grid item xs={6} sm={3}>
                  {this.renderCard('Total Spent', '$50,000.00')}
                </Grid>
              </Grid>
            </Box>
            <Box mt={8}>
              <Grid container spacing={3}>
                <Grid item md={8}>
                  {this.renderRecentProjects()}
                  <Box mt={3}>
                    {this.renderDraftProjects()}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  {this.renderSideBar()}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )

  renderCard = (title, subtitle) => (
    <Card elevation={0} className={this.props.classes.card}>
      <CardContent className={this.props.classes.subtotal}>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="subtitle1" color="primary">{subtitle}</Typography>
      </CardContent>
    </Card>
  )

  renderRecentProjects = () => (
    <Paper elevation={0} className={this.props.classes.panel}>
      <Toolbar>
        <Typography variant="subtitle1" style={{ flex: 1 }}>Recent Projects</Typography>
        <Typography variant="body2">3 projects found</Typography>
      </Toolbar>
      <Divider />
      <TableContainer>
        <Table>
          <TableBody>
            {this.state.recentPostedJobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography color="textPrimary">{job.title}</Typography>
                  <Typography color="textSecondary">{job.type} - Posted {moment(job.createdAt).fromNow()}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textPrimary">30</Typography>
                  <Typography color="textSecondary">Proposal</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textPrimary">{job.hiredCount}</Typography>
                  <Typography color="textSecondary">Hired</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textPrimary">${job.budget} USD</Typography>
                  <Typography color="textSecondary">{job.status}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )

  renderDraftProjects = () => (
    <Paper elevation={0} className={this.props.classes.panel} style={{ display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Typography variant="subtitle1" style={{ flex: 1 }}>Recent Projects</Typography>
        <Typography variant="body2">3 projects found</Typography>
      </Toolbar>
      <Divider />
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <Box textAlign="center">
          <img alt="" src={require('../assets/images/freelancers.svg')} style={{ width: this.props.theme.spacing(8) }} />
          <Typography variant="h6">No draft project Found</Typography>
          <Typography variant="body2">You did not save any project as draft</Typography>
        </Box>
      </Box>
    </Paper>
  )

  renderSideBar = () => (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button fullWidth variant="contained">Post a Project</Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined">Repeat Hire</Button>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Card elevation={0} className={this.props.classes.card}>
          <CardHeader
            title="COVID-19"
            titleTypographyProps={{
              variant: 'h6'
            }}
          />
          <Divider />
          <CardContent>
            <Typography variant="body2">See how other businesses are connecting with experts to adjust in these uncertain times. Choose a job template to quickly fill projects you need now.</Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2}>
        <Card elevation={0} className={this.props.classes.card}>
          <CardHeader
            title="Recent Completed"
            titleTypographyProps={{
              variant: 'h6'
            }}
          />
          <Divider />
          <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
            <List>
              {this.state.recentCompletedJobs.map((job, index) => {
                const terms = [job.type];
                terms.push(moment(job.finishedAt).fromNow());
                if (job.type === 'Hourly') {
                  terms.push(`$${job.rate}/hour`);
                }
                terms.push(job.status);
                return (
                  <Fragment key={index}>
                    <ListItem button>
                      <Box>
                        <Typography variant="body2">{job.title}</Typography>
                        <Typography variant="body2">{terms.join(' - ')}</Typography>
                        <Typography variant="body2" style={{ color: this.props.theme.palette.success.main }}>${job.budget} USD</Typography>
                      </Box>
                    </ListItem>
                    {index !== this.state.recentCompletedJobs.length - 1 && (
                      <Divider />
                    )}
                  </Fragment>
                );
              })}
            </List>
          </CardContent>
          <Divider />
          <CardActions>
            <Button variant="outlined" fullWidth>View all projects</Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Home);