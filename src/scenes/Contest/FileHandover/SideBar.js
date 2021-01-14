import React, { PureComponent } from 'react';
import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { AiOutlineTrophy } from 'react-icons/ai';
import { FiThumbsUp } from 'react-icons/fi';
import faker from 'faker';
import { compose } from 'redux';

import { CompactCard } from '../../../global';

const styles = (theme) => ({
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  },
  tag: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1),
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white
  }
});

class SideBar extends PureComponent {
  state = {
    thumb: faker.image.image(),
    authorAvatar: faker.image.image(),
    authorName: faker.name.findName(),
    address: {
      country: {
        iso2: 'in',
        name: 'India'
      },
      city: 'Kolkata'
    },
    ticketNum: faker.random.number({ min: 100, max: 1000 }),
    score: faker.random.number({ min: 0, max: 5 }),
    liked: faker.random.boolean(),
    likes: faker.random.number({ min: 100, max: 1000 })
  }

  handleScore = (e, newValue) => this.setState({ score: newValue })

  handleLike = () => {
    if (!this.state.liked) {
      this.setState({
        liked: true,
        likes: this.state.likes + 1
      });
    } else {
      this.setState({
        liked: false,
        likes: this.state.likes - 1
      });
    }
  }

  render = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardHeader
          title="Winning Entry"
          titleTypographyProps={{
            variant: 'h6'
          }}
        />
        <Divider />
        <CardContent>
          <Box position="relative">
            <img alt="" src={this.state.thumb} style={{ width: '100%', height: 192, borderRadius: 4 }} />
            <Box className={this.props.classes.tag}>
              <AiOutlineTrophy style={{ marginRight: 4 }} />
              <Typography variant="body2">WINNER</Typography>
            </Box>
          </Box>
          <Box mt={0.5}>
            <img alt="" src={this.state.authorAvatar} style={{ width: 48, height: 48, borderRadius: 24, marginRight: 8, float: 'left' }} />
            <Typography variant="body2">{this.state.authorName}</Typography>
            <Box display="flex" alignItems="center">
              <Box position="relative" width={32} height={32} mr={1}>
                <Box
                  className={`flag ${this.state.address.country.iso2} margin`}
                  position="absolute"
                  top={10}
                  left={5}
                  style={{
                    transform: 'scale(1.5)',
                    transformOrigin: 'center left'
                  }}
                />
              </Box>
              <Typography variant="body2">{this.state.address.city}, {this.state.address.country.name}</Typography>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Box display="flex" justifyContent="space-between" alignItems="center" flex={1}>
            <Rating name="review-score" value={this.state.score} size="small" onChange={this.handleScore} />
            <Box display="flex" alignItems="center">
              <IconButton className={this.props.classes.iconButton} onClick={this.handleLike}>
                <FiThumbsUp size={20} color={this.state.liked ? this.props.theme.palette.success.main : this.props.theme.palette.action.active} />
              </IconButton>
              <Typography variant="body2">{this.state.likes}</Typography>
            </Box>
          </Box>
        </CardActions>
      </CompactCard>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(SideBar);