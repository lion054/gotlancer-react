import React, { PureComponent } from 'react';
import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AiOutlineMore } from 'react-icons/ai';
import moment from 'moment';
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
        id: faker.random.number({ min: 100000, max: 1000000 }),
        details: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        amount: faker.random.number({ min: 1000, max: 10000 }),
        status: 'Funded'
      });
    }
    this.setState({ records });
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
                    <Typography variant="subtitle2">Financial Payment  Management</Typography>
                    <Typography variant="subtitle2">Here all of your payment that you made recently</Typography>
                  </Box>
                )}
              />
              <Divider />
              <CardContent>
                <List disablePadding>
                  <ListItem disableGutters divider>
                    <Grid container>
                      <Grid item xs={8}>
                        <Typography variant="body1">Details</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body1" align="center">Amount</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  {this.state.records.map((record, index) => (
                    <ListItem key={index} disableGutters divider>
                      <Grid container>
                        <Grid item xs={8}>
                          <Typography variant="body1">{record.details}</Typography>
                          <Typography variant="body2" color="textSecondary">{moment(record.createdAt).format('MM/DD/YYYY')}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Box display="flex" justifyContent="flex-end" alignItems="center">
                            <Box>
                              <Typography variant="subtitle1" align="right">${record.amount}</Typography>
                              <Typography variant="body2" color="textSecondary" align="right">{record.status}</Typography>
                            </Box>
                            <IconButton>
                              <AiOutlineMore size={20} />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
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
  withTheme
)(Payment);