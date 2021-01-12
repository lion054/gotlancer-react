import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
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
import { AiFillCheckSquare, AiOutlineBorder } from 'react-icons/ai';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import pluralize from 'pluralize';
import faker from 'faker';
import { compose } from 'redux';

import SideBar from './SideBar';
import CompactPagination from '../../components/CompactPagination';
import { CompactCard, formatCurrency } from '../../global';

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

class OrderDetails extends PureComponent {
  state = {
    records: [],
    addons: [{
      title: 'I can design your A4 letterhead',
      subtitle: 'Additional 1 working day',
      price: faker.random.number({ min: 0, max: 100 })
    },{
      title: 'I can design your business cards & compliment slips',
      subtitle: 'Additional 1 working day',
      price: faker.random.number({ min: 0, max: 100 })
    },{
      title: 'I can design your second logo',
      subtitle: 'Additional 1 working day',
      price: faker.random.number({ min: 0, max: 100 })
    },{
      title: 'I can design your business card',
      subtitle: 'Additional 1 working day',
      price: faker.random.number({ min: 0, max: 100 })
    },{
      title: 'I can design your A4 letterhead & business cards',
      subtitle: 'Additional 1 working day',
      price: faker.random.number({ min: 0, max: 100 })
    },{
      icon: require('../../assets/images/payment-method/paypal.png'),
      title: 'I can deliver all work in 1 working day',
      subtitle: 'Additional 1 working day',
      price: faker.random.number({ min: 0, max: 100 })
    }]
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
        amount: faker.random.number({ min: 0, max: 100 })
      });
    }
    this.setState({ records });
  }

  handleAddonClick = (index) => () => {
    const addons = cloneDeep(this.state.addons);
    addons[index].checked = !addons[index].checked;
    this.setState({ addons });
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
                    <Typography variant="subtitle2">Order List</Typography>
                    <Typography variant="subtitle2">Order Number: #5226545</Typography>
                  </Box>
                )}
              />
              <Divider />
              <CardContent>
                <List disablePadding>
                  {this.state.records.map((record, index) => (
                    <ListItem key={index} disableGutters divider>
                      {(this.props.width === 'xs' || this.props.width === 'sm') ? (
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography variant="body2">{moment(record.createdAt).format('MM/DD/YYYY')}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1" align="right">${record.amount}</Typography>
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
                            <Typography variant="subtitle1" align="right">${record.amount}</Typography>
                          </Grid>
                        </Grid>
                      )}
                    </ListItem>
                  ))}
                </List>
                <CompactPagination />
              </CardContent>
            </CompactCard>
            <Box mt={2}>
              <CompactCard>
                <CardHeader
                  title="Get more with Offer Add-ons"
                  titleTypographyProps={{
                    variant: 'subtitle2'
                  }}
                />
                <Divider />
                <CardContent>
                  <List disablePadding>
                    {this.state.addons.map((addon, index) => (
                      <ListItem key={index} disableGutters button onClick={this.handleAddonClick(index)}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                          {!addon.checked ? (
                            <AiOutlineBorder size={24} />
                          ) : (
                            <AiFillCheckSquare color={this.props.theme.palette.secondary.main} size={24} />
                          )}
                        </ListItemIcon>
                        <Box
                          flex={1}
                          borderRadius={4}
                          border={`solid 1px ${addon.checked ? this.props.theme.palette.success.main : this.props.theme.palette.divider}`}
                          className={this.props.classes.innerPadding}
                          display="flex"
                          alignItems="center"
                        >
                          <Box flex={1}>
                            <Typography variant="body1">
                              {!!addon.icon && (
                                <img alt="" src={addon.icon} style={{ height: 24, marginRight: 8 }} />
                              )}
                              <Box component="span">{addon.title}</Box>
                            </Typography>
                            <Typography variant="body2">{addon.subtitle}</Typography>
                          </Box>
                          <Typography variant="body1" style={{ color: this.props.theme.palette.success.main }}>+${addon.price}</Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions>
                  <Box flex={1} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">Total: {formatCurrency(0)}</Typography>
                    <Button variant="contained">Buy Now</Button>
                  </Box>
                </CardActions>
              </CompactCard>
            </Box>
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
)(OrderDetails);