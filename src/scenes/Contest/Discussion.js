import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  OutlinedInput,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AiFillCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
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
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: theme.spacing(2)
  },
  iconButton: {
    padding: theme.spacing(1)
  }
});

class Discussion extends PureComponent {
  state = {
    records: []
  }

  componentDidMount() {
    const records = [];
    for (let i = 0; i < 4; i++) {
      const record = {
        avatar: faker.image.image(),
        isOwner: faker.random.boolean(),
        comment: faker.lorem.sentence(),
        indented: faker.random.boolean()
      };
      if (!record.isOwner) {
        record.name = faker.name.findName();
      }
      records.push(record);
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
                title="Discussion Board"
                titleTypographyProps={{
                  variant: 'subtitle1'
                }}
              />
              <Divider />
              <CardContent>
                <List disablePadding>
                  {this.state.records.map((record, index) => (
                    <ListItem key={index} disableGutters>
                      {record.indented && <div className={this.props.classes.avatar} />}
                      <img alt="" src={record.avatar} className={this.props.classes.avatar} />
                      <Box flex={1}>
                        <Box display="flex" flexWrap="wrap">
                          <Box display="flex" alignItems="center" mr={2}>
                            {record.isOwner ? (
                              <Box
                                border={`solid 1px ${this.props.theme.palette.success.main}`}
                                borderRadius={4}
                                p={this.props.theme.spacing(0.5, 1)}
                                color={this.props.theme.palette.success.main}
                              >
                                <Typography variant="body1">Contest Owner</Typography>
                              </Box>
                            ) : (
                              <Typography variant="body1">{record.name}</Typography>
                            )}
                            <Box ml={1}>
                              <AiFillCheckCircle color={this.props.theme.palette.success.main} size={24} />
                            </Box>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <Box mr={1}>
                              <AiOutlineClockCircle size={24} />
                            </Box>
                            <Typography variant="body2">{moment(record.createdAt).format('LL')}</Typography>
                          </Box>
                        </Box>
                        <Box mt={1} p={1} borderRadius={4} bgcolor={this.props.theme.palette.action.selected}>
                          <Box style={{ float: 'right' }}>
                            <IconButton className={this.props.classes.iconButton}>
                              <FaReply />
                            </IconButton>
                          </Box>
                          <Typography variant="body2" style={{ minHeight: 40 }}>{record.comment}</Typography>
                        </Box>
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <Box display="flex" alignItems="center" mt={1}>
                  <OutlinedInput fullWidth margin="dense" />
                  <Box ml={1}>
                    <Button variant="contained">Post</Button>
                  </Box>
                </Box>
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
)(Discussion);