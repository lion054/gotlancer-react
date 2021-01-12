import React, { PureComponent } from 'react';
import {
  Box,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { AiOutlineMore } from 'react-icons/ai';
import moment from 'moment';
import pluralize from 'pluralize';
import faker from 'faker';
import { compose } from 'redux';

import SideBar from './SideBar';
import CompactPagination from '../../components/CompactPagination';
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
  }
});

class Payment extends PureComponent {
  state = {
    records: []
  }

  componentDidMount() {
    const records = [];
    for (let i = 0; i < 3; i++) {
      records.push({
        createdAt: faker.date.past(),
        title: faker.lorem.sentence(),
        addon: faker.random.boolean(),
        days: faker.random.number({ min: 0, max: 5 }),
        quantity: 1,
        amount: faker.random.number({ min: 0, max: 100 }),
        status: faker.random.arrayElement(['Pending', 'In Progress', 'Under Dispute', 'Rejected', 'Released'])
      });
    }
    this.setState({ records });
  }

  getStatusColor(value) {
    switch (value) {
      case 'Pending':
        return this.props.theme.palette.primary.main;
      case 'In Progress':
        return this.props.theme.palette.secondary.main;
      case 'Under Dispute':
        return this.props.theme.palette.error.main;
      case 'Rejected':
        return this.props.theme.palette.info.main;
      case 'Released':
        return this.props.theme.palette.success.main;
      default:
        return this.props.theme.palette.warning.main;
    }
  }

  render = () => (
    <Box className={this.props.classes.outerMargin}>
      <Grid container>
        <Grid item md={9} xs={12}>
          <Box className={this.props.classes.innerPadding}>
            <CompactCard>
              <CardHeader
                title={(
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Manage Payment</Typography>
                    <Typography variant="subtitle2">Order Number: #5226545</Typography>
                  </Box>
                )}
              />
              <Divider />
              <CardContent>
                <List disablePadding>
                  <ListItem disableGutters divider>
                    {(this.props.width === 'xs' || this.props.width === 'sm') ? (
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="body1">Date</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">Amount</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1">Details</Typography>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container>
                        <Grid item md={2}>
                          <Typography variant="body1">Date</Typography>
                        </Grid>
                        <Grid item md={8}>
                          <Typography variant="body1">Details</Typography>
                        </Grid>
                        <Grid item md={2}>
                          <Typography variant="body1" align="center">Amount</Typography>
                        </Grid>
                      </Grid>
                    )}
                  </ListItem>
                  {this.state.records.map((record, index) => (
                    <ListItem key={index} disableGutters divider>
                      {(this.props.width === 'xs' || this.props.width === 'sm') ? (
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography variant="body2">{moment(record.createdAt).format('MM/DD/YYYY')}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                              <Box>
                                <Typography variant="subtitle1" align="right">${record.amount}</Typography>
                                <Typography variant="body2" align="right" style={{ color: this.getStatusColor(record.status) }}>{record.status}</Typography>
                              </Box>
                              <IconButton>
                                <AiOutlineMore size={20} />
                              </IconButton>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body1" component="div">
                              <span>{record.title}</span>
                              {record.addon && (
                                <Chip label="Add-on" size="small" color="primary" />
                              )}
                            </Typography>
                            <Typography variant="body2">{pluralize('working day', record.days, true)} - Quantity: {record.quantity}</Typography>
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid container>
                          <Grid item md={2}>
                            <Typography variant="body2">{moment(record.createdAt).format('MM/DD/YYYY')}</Typography>
                          </Grid>
                          <Grid item md={8}>
                            <Typography variant="body1" component="div">
                              <span>{record.title}</span>
                              {record.addon && (
                                <Chip label="Add-on" size="small" color="primary" />
                              )}
                            </Typography>
                            <Typography variant="body2">{pluralize('working day', record.days, true)} - Quantity: {record.quantity}</Typography>
                          </Grid>
                          <Grid item md={2}>
                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                              <Box>
                                <Typography variant="subtitle1" align="right">${record.amount}</Typography>
                                <Typography variant="body2" align="right" style={{ color: this.getStatusColor(record.status) }}>{record.status}</Typography>
                              </Box>
                              <IconButton>
                                <AiOutlineMore size={20} />
                              </IconButton>
                            </Box>
                          </Grid>
                        </Grid>
                      )}
                    </ListItem>
                  ))}
                </List>
                <CompactPagination />
              </CardContent>
            </CompactCard>
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <SideBar />
        </Grid>
      </Grid>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(Payment);