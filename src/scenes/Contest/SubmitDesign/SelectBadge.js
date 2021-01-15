import React, { PureComponent } from 'react';
import {
  Box,
  Chip,
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
import { compose } from 'redux';

import { formatCurrency } from '../../../global';

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
      color: this.props.theme.palette.warning.main,
      title: 'Highlight',
      description: 'Highlight your entry to make it visually  stand out from the rest'
    },{
      color: this.props.theme.palette.success.main,
      title: 'Sealed',
      description: 'Seal your entry to ensure your idea is unique. Only you and the contest holder will be able to view your sealed entry.'
    }];
    this.setState({ badges });
  }

  handleItemClick = (index) => (e) => {
    const badges = cloneDeep(this.state.badges);
    badges[index].checked = !badges[index].checked;
    this.setState({ badges });
  }

  render = () => (
    <Box>
      <Box mt={3}>
        <Typography variant="subtitle2">Promote my entry (Optional)</Typography>
      </Box>
      <Box my={1}>
        <Typography variant="body2">Promote your entry and get more chances to win.</Typography>
      </Box>
      {this.renderList()}
    </Box>
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
              <Grid item sm={3} xs={4}>
                <Chip label={badge.title} style={{
                  backgroundColor: badge.color,
                  color: this.props.theme.palette.common.white,
                  textTransform: 'uppercase'
                }} />
              </Grid>
              <Grid item sm={9} xs={8}>
                <Typography variant="body2">{badge.description}</Typography>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(SelectBadge);