import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  colors,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AiFillCheckCircle } from 'react-icons/ai';
import faker from 'faker';
import { compose } from 'redux';

import FileUpload from '../../../components/FileUpload';

const styles = (theme) => ({
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

class FileTransfer extends PureComponent {
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
    <Box className={this.props.classes.innerPadding}>
      <Box my={2}>
        <Typography variant="subtitle2">File Transfer</Typography>
      </Box>
      <Divider />
      <Box
        my={2}
        className={this.props.classes.innerPadding}
        display="flex"
        alignItems="center"
        border={`solid 1px ${colors.green[700]}`}
        bgcolor={colors.green[50]}
        color={colors.green[700]}
        borderRadius={8}
      >
        <AiFillCheckCircle size={24} />
        <Box flex={1} ml={1}>
          <Typography variant="body1">Upload Successful!</Typography>
          <Typography variant="body2">The files are now under review by [Client ID]. The price will be automatically released in 6 days 23hours or immediately once files have been accepted.</Typography>
        </Box>
      </Box>
      <List disablePadding>
        <ListItem disableGutters divider>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body2">File</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Actions</Typography>
            </Grid>
          </Grid>
        </ListItem>
        {this.state.records.map((record, index) => (
          <ListItem key={index} disableGutters divider>
            <Grid container>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" flexWrap="wrap">
                  <img alt="" src={require('../../../assets/images/exams/subjects/php.svg')} className={this.props.classes.file} />
                  <Typography variant="body2">{record.fileName}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" component="div">{this.renderStatus(record.status)}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Box my={2}>
        <Typography variant="body2">Upload source file here</Typography>
      </Box>
      <FileUpload />
      <Divider />
      <Box display="flex" mt={2}>
        <Button variant="contained" size="large">Upload Now</Button>
      </Box>
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

export default compose(
  withStyles(styles),
  withTheme
)(FileTransfer);