import React, { PureComponent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { AiOutlinePaperClip, AiOutlineRight } from 'react-icons/ai';
import moment from 'moment';
import faker from 'faker';
import { compose } from 'redux';

import SideBar from './SideBar';
import ChipContainer from '../../components/ChipContainer';
import SelectBadge from '../../components/SelectBadge';
import { CompactCard, RedButton } from '../../global';

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

class Details extends PureComponent {
  state = {
    id: faker.random.number({ min: 100000, max: 1000000 }),
    details: faker.lorem.paragraphs(3),
    attachments: [],
    skills: []
  }

  componentDidMount() {
    const attachments = [];
    for (let i = 0; i < 3; i++) {
      attachments.push(`File-${moment(new Date()).unix()}.png`);
    }
    const skills = [{
      title: 'HTML',
      backgroundColor: this.props.theme.palette.divide,
      color: this.props.theme.palette.text.primary
    },{
      title: 'CSS',
      backgroundColor: this.props.theme.palette.divide,
      color: this.props.theme.palette.text.primary
    },{
      title: 'PHP',
      backgroundColor: this.props.theme.palette.divide,
      color: this.props.theme.palette.text.primary
    }];
    this.setState({ attachments, skills });
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
                    <Typography variant="subtitle2">Contest Details</Typography>
                    <Button variant="outlined">Edit</Button>
                  </Box>
                )}
              />
              <Divider />
              <CardContent>
                <Typography variant="body2">{this.state.details}</Typography>
                <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Project ID: {this.state.id}</Typography>
                  <RedButton variant="text">Report as spam</RedButton>
                </Box>
              </CardContent>
            </CompactCard>
          </Box>
          <Box className={this.props.classes.innerPadding}>
            <CompactCard>
              <CardHeader
                title={(
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2">Attachments</Typography>
                    <Button variant="outlined">Upload</Button>
                  </Box>
                )}
              />
              <Divider />
              <CardContent>
                <List disablePadding>
                  {this.state.attachments.map((file, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon>
                        <AiOutlinePaperClip size={24} />
                      </ListItemIcon>
                      <ListItemText
                        primary={file}
                        primaryTypographyProps={{
                          variant: 'body2'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </CompactCard>
          </Box>
          <Box className={this.props.classes.innerPadding}>
            <CompactCard>
              <CardHeader
                title="Category and Skills"
                titleTypographyProps={{
                  variant: 'subtitle2'
                }}
              />
              <Divider />
              <CardContent>
                <Typography variant="body1">Category and Sub-Category</Typography>
                <Breadcrumbs aria-label="breadcrumb" separator={<AiOutlineRight />}>
                  <Typography variant="body2">IT and Website</Typography>
                  <Typography variant="body2">Frontend Developer</Typography>
                </Breadcrumbs>
                <Box mt={2} mb={1}>
                  <Typography variant="body1">Skills</Typography>
                </Box>
                <ChipContainer chips={this.state.skills} readOnly />
              </CardContent>
            </CompactCard>
          </Box>
          <Box className={this.props.classes.innerPadding}>
            <SelectBadge />
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
)(Details);