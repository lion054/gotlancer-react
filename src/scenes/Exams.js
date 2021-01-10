import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import clsx from 'clsx';
import faker from 'faker';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PlaceholderSelect from '../components/PlaceholderSelect';
import CompactPagination from '../components/CompactPagination';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
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
  toolbar: {
    lineHeight: 4,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },
  toolItem: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 300
    }
  },
  paper: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1)
    },
    borderRadius: theme.spacing(1.5),
    border: `solid 1px ${theme.palette.divider}`,
    padding: 'unset'
  },
  examIcon: {
    width: 24,
    marginRight: 8
  },
  examDescription: {
    height: 40, // 2 lines
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

class Exams extends PureComponent {
  state = {
    recommended: [],
    records: []
  }

  componentDidMount() {
    const recommended = [{
      icon: require('../assets/images/exams/subjects/html.svg'),
      title: 'Knowledge of .Net Framework 4.0 Skills Test',
      level: faker.random.number({ min: 1, max: 10 }),
      description: faker.lorem.sentence(),
      price: faker.random.number({ min: 0, max: 100 })
    },{
      icon: require('../assets/images/exams/subjects/php.svg'),
      title: 'Preferred Freelancer Program SLA',
      level: faker.random.number({ min: 1, max: 10 }),
      description: faker.lorem.sentence(),
      price: faker.random.number({ min: 0, max: 100 })
    },{
      icon: require('../assets/images/exams/subjects/ps.svg'),
      title: 'Adobe Photoshop',
      level: faker.random.number({ min: 1, max: 10 }),
      description: faker.lorem.sentence(),
      price: faker.random.number({ min: 0, max: 100 })
    }];
    const records = [];
    for (let i = 0; i < 4; i++) {
      records.push({
        icon: require('../assets/images/exams/subjects/html.svg'),
        title: 'Knowledge of .Net Framework 4.0 Skills Test',
        level: faker.random.number({ min: 1, max: 10 }),
        description: faker.lorem.sentence(),
        price: faker.random.number({ min: 0, max: 100 })
      },{
        icon: require('../assets/images/exams/subjects/php.svg'),
        title: 'Preferred Freelancer Program SLA',
        level: faker.random.number({ min: 1, max: 10 }),
        description: faker.lorem.sentence(),
        price: faker.random.number({ min: 0, max: 100 })
      },{
        icon: require('../assets/images/exams/subjects/ps.svg'),
        title: 'Adobe Photoshop',
        level: faker.random.number({ min: 1, max: 10 }),
        description: faker.lorem.sentence(),
        price: faker.random.number({ min: 0, max: 100 })
      });
    }
    this.setState({ recommended, records });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box bgcolor={this.props.theme.palette.text.primary} className={this.props.classes.innerPadding} py={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Box className={this.props.classes.innerPadding} color={this.props.theme.palette.background.default}>
                  <Typography variant="h4">Win more work with Exams</Typography>
                  <Box my={1}>
                    <Typography variant="body1">Prove your skills. Pass our Exams. Win more work.</Typography>
                  </Box>
                  <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed </Typography>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <img alt="" src={require('../assets/images/exams/banner.png')} style={{
                    width: '100%'
                  }} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Box className={this.props.classes.innerPadding}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mt={2}>
              <Paper className={this.props.classes.paper}>
                <Box className={clsx(this.props.classes.innerPadding, this.props.classes.toolbar)}>
                  <PlaceholderSelect
                    margin="dense"
                    variant="outlined"
                    placeholder="Select one"
                    className={this.props.classes.toolItem}
                  >
                    <MenuItem value="0">Website, IT &amp; Software</MenuItem>
                    <MenuItem value="1">Mobile Application</MenuItem>
                  </PlaceholderSelect>
                  <OutlinedInput
                    fullWidth
                    margin="dense"
                    placeholder="Search al exams e.g. Photoshop"
                    startAdornment={(
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    )}
                    className={this.props.classes.toolItem}
                  />
                </Box>
                <Grid container>
                  {this.state.records.map(({ icon, title, level, description, price }, index) => (
                    <Grid key={index} item md={4} sm={6} xs={12}>
                      <Box className={this.props.classes.innerPadding}>
                        <Paper className={this.props.classes.paper}>
                          <Box display="flex" justifyContent="space-between" alignItems="center" className={this.props.classes.innerPadding}>
                            <Box display="flex" alignItems="center" flex={1}>
                              <img alt="" src={icon} className={this.props.classes.examIcon} />
                              <Typography variant="body2">{title}</Typography>
                            </Box>
                            <Chip variant="outlined" size="small" label={`Level ${level}`} />
                          </Box>
                          <Divider />
                          <Box className={this.props.classes.innerPadding}>
                            <Typography variant="body2" className={this.props.classes.examDescription}>{description}</Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" alignItems="center" className={this.props.classes.innerPadding}>
                            <Box>
                              <Typography variant="body2">Price</Typography>
                              <Typography variant="subtitle2" style={{ color: this.props.theme.palette.success.main }}>${price}</Typography>
                            </Box>
                            <Button variant="contained" size="small" onClick={() => this.props.history.push('/exam')}>Pay &amp; Start Test</Button>
                          </Box>
                        </Paper>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Box mb={4}>
                  <CompactPagination />
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )
}

export default compose(
  withRouter,
  withStyles(styles),
  withTheme
)(Exams);