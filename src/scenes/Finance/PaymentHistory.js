import React, { PureComponent } from 'react';
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { Cached, Check, PanTool, Warning } from '@material-ui/icons';
import moment from 'moment';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CustomTablePagination from '../../components/pagination/CustomTablePagination';
import { GreenCheckbox } from '../../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  background: {
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
  status: {
    fontSize: 16
  },
  icon: {
    [theme.breakpoints.only('xs')]: {
      minWidth: 'unset'
    }
  }
})

class PaymentHistory extends PureComponent {
  state = {
    total: 1000,
    records: [],
    rowsPerPage: 10,
    page: 0
  }

  componentDidMount() {
    const records = [];
    for (let i = 0; i < 6; i++) {
      records.push({
        date: faker.date.past(),
        details: faker.lorem.sentence(),
        paymentMethod: faker.random.arrayElement(['PayPal', 'Credit card']),
        status: faker.random.arrayElement(['Completed', 'Pending', 'Rejected', 'On Hold']),
        amount: faker.random.number({ min: 100, max: 5000 })
      });
    }
    this.setState({  records });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mb={2}>
              <Typography variant="h5">Payment history</Typography>
            </Box>
            <Divider />
            <List disablePadding>
              <ListItem disableGutters divider className={this.props.classes.background}>
                <ListItemIcon className={this.props.classes.icon}>
                  <GreenCheckbox />
                </ListItemIcon>
                <Box className={this.props.classes.outerMargin} flex={1}>
                  <Grid container alignItems="center">
                    <Grid item md={2} xs={4}>
                      <Box className={this.props.classes.innerPadding}>
                        <Typography variant="subtitle2">Date</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={4} xs={8}>
                      <Box className={this.props.classes.innerPadding}>
                        <Typography variant="subtitle2">Details</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={2} xs={4}>
                      <Box className={this.props.classes.innerPadding}>
                        <Typography variant="subtitle2">Payment method</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={2} xs={4}>
                      <Box className={this.props.classes.innerPadding}>
                        <Typography variant="subtitle2">Status</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={2} xs={4}>
                      <Box className={this.props.classes.innerPadding}>
                        <Typography variant="subtitle2">Amount</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </ListItem>
              {this.state.records.map((record, index) => (
                <ListItem key={index} disableGutters divider>
                  <ListItemIcon className={this.props.classes.icon}>
                    <GreenCheckbox />
                  </ListItemIcon>
                  <Box className={this.props.classes.outerMargin} flex={1}>
                    <Grid container alignItems="center">
                      <Grid item md={2} xs={4}>
                        <Box className={this.props.classes.innerPadding}>
                          <Typography variant="body2">{moment(record.date).format('MM/DD/YYYY')}</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={4} xs={8}>
                        <Box className={this.props.classes.innerPadding}>
                          <Typography variant="body2">{record.details}</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={2} xs={4}>
                        <Box className={this.props.classes.innerPadding}>
                          <Typography variant="body2">{record.paymentMethod}</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={2} xs={4}>
                        <Box className={this.props.classes.innerPadding} display="inline-block">
                          {this.renderStatus(record.status)}
                        </Box>
                      </Grid>
                      <Grid item md={2} xs={4}>
                        <Box className={this.props.classes.innerPadding}>
                          <Typography variant="body2">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(record.amount)} USD</Typography>
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
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )

  handleChangePage = (e, page) => this.setState({ page })

  handleChangeRowsPerPage = (e) => this.setState({
    rowsPerPage: e.target.value,
    page: 0
  })

  renderStatus = (status) => {
    let color = this.props.theme.palette.text.primary;
    if (status === 'Completed') {
      color = this.props.theme.palette.success.main;
    } else if (status === 'Pending') {
      color = this.props.theme.palette.warning.main;
    } else if (status === 'Rejected') {
      color = this.props.theme.palette.secondary.main;
    } else if (status === 'On Hold') {
      color = this.props.theme.palette.primary.main;
    }
    return (
      <Box
        border={`solid 1px ${color}`}
        borderRadius={16}
        display="flex"
        alignItems="center"
        pt={0.5}
        pr={1}
        pb={0.5}
        pl={1}
      >
        {status === 'Completed' && <Check className={this.props.classes.status} style={{ color }} />}
        {status === 'Pending' && <Cached className={this.props.classes.status} style={{ color }} />}
        {status === 'Rejected' && <Warning className={this.props.classes.status} style={{ color }} />}
        {status === 'On Hold' && <PanTool className={this.props.classes.status} style={{ color }} />}
        <Box ml={0.5} color={color}>
          <Typography component="span" noWrap style={{ fontSize: 12 }}>{status}</Typography>
        </Box>
      </Box>
    );
  }
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(PaymentHistory);