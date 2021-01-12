import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  withStyles
} from '@material-ui/core';
import moment from 'moment';
import faker from 'faker';

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
  file: {
    width: 24,
    height: 24,
    marginRight: 4
  }
});

class FileHandover extends PureComponent {
  state = {
    records: []
  }

  componentDidMount() {
    const records = [];
    for (let i = 0; i < 3; i++) {
      records.push({
        createdAt: faker.date.past(),
        title: faker.lorem.sentence(3),
        fileName: 'Source file.zip',
        status: faker.random.arrayElement(['', 'Accepted', 'Rejected'])
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
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2">File Handover</Typography>
                    <Button variant="contained">Upload File</Button>
                  </Box>
                )}
              />
              <Divider />
              <CardContent>
                <List disablePadding>
                  <ListItem disableGutters divider>
                    <Grid container>
                      <Grid item md={2} xs={4}>
                        <Typography variant="body2">Date</Typography>
                      </Grid>
                      <Grid item md={4} xs={8}>
                        <Typography variant="body2">Details</Typography>
                      </Grid>
                      <Grid item md={3} xs={6}>
                        <Typography variant="body2">File</Typography>
                      </Grid>
                      <Grid item md={3} xs={6}>
                        <Typography variant="body2">Actions</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  {this.state.records.map((record, index) => (
                    <ListItem key={index} disableGutters divider>
                      <Grid container>
                        <Grid item md={2} xs={4}>
                          <Typography variant="body2">{moment(record.createdAt).format('MM/DD/YYYY')}</Typography>
                        </Grid>
                        <Grid item md={4} xs={8}>
                          <Typography variant="body2">{record.title}</Typography>
                        </Grid>
                        <Grid item md={3} xs={6}>
                          <Box display="flex" alignItems="center" flexWrap="wrap">
                            <img alt="" src={require('../../assets/images/exams/subjects/php.svg')} className={this.props.classes.file} />
                            <Typography variant="body2">{record.fileName}</Typography>
                          </Box>
                        </Grid>
                        <Grid item md={3} xs={6}>
                          <Typography variant="body2" component="div">{this.renderStatus(record.status)}</Typography>
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

  renderStatus = (value) => {
    if (!value) {
      return (
        <Box display="flex">
          <Button variant="text" color="primary">Accept</Button>
          <Button variant="text" color="secondary">Reject</Button>
        </Box>
      );
    } else if (value === 'Accepted') {
      return (
        <Button variant="text" color="primary">Accepted</Button>
      );
    } else if (value === 'Rejected') {
      return (
        <Button variant="text" color="secondary">Rejected</Button>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(FileHandover);