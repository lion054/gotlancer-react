import React, { PureComponent } from 'react';
import {
  Box,
  Button,
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

const styles = (theme) => ({
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  }
});

class ReleasePayment extends PureComponent {
  state = {
    records: []
  }

  componentDidMount() {
    const records = [];
    for (let i = 0; i < 2; i++) {
      records.push({
        id: faker.random.number({ min: 10000, max: 100000 }),
        details: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        amount: faker.random.number({ min: 1000, max: 10000 }),
        status: faker.random.arrayElement(['Released', 'Funded'])
      });
    }
    this.setState({ records });
  }

  render = () => (
    <Box className={this.props.classes.innerPadding}>
      <Box my={2} display="flex">
        <Box flex={1}>
          <Typography variant="subtitle1">Here is all of prizes funded</Typography>
          <Typography variant="body2">Release prize funds so that  winner will receive funds</Typography>
        </Box>
        <Button variant="contained" size="large">Pay Tip</Button>
      </Box>
      <Divider />
      <Box>
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
      </Box>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(ReleasePayment);