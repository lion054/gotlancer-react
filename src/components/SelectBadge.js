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
  withTheme
} from '@material-ui/core';
import { AiFillCheckSquare, AiOutlineBorder } from 'react-icons/ai';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { CompactCard, formatCurrency } from '../global';

const styles = (theme) => ({
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  }
});

class SelectBadge extends PureComponent {
  state = {
    badges: []
  }

  componentDidMount() {
    const badges = [{
      color: this.props.theme.palette.success.main,
      title: 'Standard',
      description: 'Free to post, your project will go live instantly and start receiving bids within seconds.',
      price: 0
    },{
      color: this.props.theme.palette.action.disabled,
      title: 'NDA',
      description: 'Freelancers must sign a Non- disclosure Agreement to Apply on your project. Freelancers agree to keep details discussed through private messages and files confidential.',
      price: 5
    },{
      color: this.props.theme.palette.info.main,
      title: 'Featured',
      description: 'Featured projects attract higher-quality bids and are displayed prominently in the `Featured Jobs and Contests` page.',
      price: 5
    },{
      color: this.props.theme.palette.error.main,
      title: 'Urgent',
      description: 'Make your project stand out and let freelancers know that your job is time sensitive.',
      price: 5
    },{
      color: this.props.theme.palette.primary.main,
      title: 'Private',
      description: 'Featured projects attract higher-quality bids and are displayed prominently in the `Featured Jobs and Contests` page.',
      price: 5
    },{
      color: this.props.theme.palette.warning.main,
      title: 'Premium',
      description: 'Make your project stand out and let freelancers know that your job is time sensitive.',
      price: 5
    }];
    this.setState({ badges });
  }

  handleItemClick = (index) => (e) => {
    const badges = cloneDeep(this.state.badges);
    badges[index].checked = !badges[index].checked;
    this.setState({ badges });
  }

  render = () => this.props.noCard ? (
    <Box>
      <Box mt={3}>
        <Typography variant="subtitle2">Select your listing</Typography>
      </Box>
      <Box my={1}>
        <Typography variant="body2">Upgrade your listing from below and get dozens of skilled freelancers for your project instantly.</Typography>
      </Box>
      {this.renderList()}
      <Box mt={1} mb={3}>
        <Divider />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">Total: {formatCurrency(0)}</Typography>
        {!this.props.noSubmit && (
          <Button variant="contained">Pay and Upgrade</Button>
        )}
      </Box>
      <Box my={3}>
        <Divider />
      </Box>
    </Box>
  ) : (
    <CompactCard>
      <CardHeader
        title="Select your listing type"
        titleTypographyProps={{
          variant: 'subtitle2'
        }}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2">Upgrade your listing from below and get dozens of skilled freelancers for your project instantly.</Typography>
        {this.renderList()}
      </CardContent>
      <Divider />
      <CardActions>
        <Box display="flex" justifyContent="space-between" alignItems="center" flex={1}>
          <Typography variant="body1">Total: {formatCurrency(0)}</Typography>
          {!this.props.noSubmit && (
            <Button variant="contained">Pay and Upgrade</Button>
          )}
        </Box>
      </CardActions>
    </CompactCard>
  )

  renderList = () => (
    <List disablePadding>
      {this.state.badges.map((badge, index) => (
        <ListItem key={index} disableGutters button onClick={this.handleItemClick(index)}>
          <ListItemIcon style={{ minWidth: 32 }}>
            {!badge.checked ? (
              <AiOutlineBorder size={24} />
            ) : (
              <AiFillCheckSquare color={this.props.theme.palette.secondary.main} size={24} />
            )}
          </ListItemIcon>
          <Box
            flex={1}
            className={this.props.classes.innerPadding}
            borderRadius={4}
            border={`solid 1px ${badge.checked ? this.props.theme.palette.secondary.main : this.props.theme.palette.divider}`}
          >
            <Grid container alignItems="center">
              <Grid item sm={2} xs={3}>
                <Chip label={badge.title} style={{
                  backgroundColor: badge.color,
                  color: this.props.theme.palette.common.white
                }} />
              </Grid>
              <Grid item sm={8} xs={7}>
                <Typography variant="body2">{badge.description}</Typography>
              </Grid>
              <Grid item sm={2} xs={2}>
                <Typography variant="body2" align="right">{formatCurrency(badge.price)}</Typography>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

SelectBadge.propTypes = {
  noCard: PropTypes.bool,
  noSubmit: PropTypes.bool
}

export default compose(
  withStyles(styles),
  withTheme
)(SelectBadge);