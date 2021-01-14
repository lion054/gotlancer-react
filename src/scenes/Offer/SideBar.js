import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@material-ui/lab';
import {
  AiFillCheckCircle,
  AiOutlineCheck,
  AiOutlineEnvironment
} from 'react-icons/ai';
import faker from 'faker';
import { compose } from 'redux';

import { CompactCard } from '../../global';

const styles = (theme) => ({
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  }
});

const OddTimelineItem = withStyles({
  missingOppositeContent: {
    '&:before': {
      display: 'none'
    }
  }
})(TimelineItem);

class SideBar extends PureComponent {
  state = {
    authorName: faker.name.findName(),
    roadmap: [{
      title: 'Buy Offer',
      subtitle: 'Provide your job details',
      checked: true
    },{
      title: 'File Handover',
      subtitle: 'Hire a talent from all proposals',
      checked: true
    },{
      title: 'Release Payment',
      subtitle: 'Rate your freelancer'
    },{
      title: 'Give SideBar',
      subtitle: 'Rate your freelancer'
    }]
  }

  render = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardContent>
          <Typography variant="subtitle1" align="center">About Seller</Typography>
          <Box textAlign="center" my={1}>
            <img alt="" src={require('../../assets/images/user.png')} className={this.props.classes.authorAvatar} />
          </Box>
          <Box>
            <Typography variant="h6" component="span">{this.state.authorName}</Typography>
            <AiFillCheckCircle color={this.props.theme.palette.success.main} size={24} style={{ position: 'relative', top: 6 }} />
          </Box>
          <Box mb={2}>
            <AiOutlineEnvironment color={this.props.theme.palette.action.active} size={24} style={{ position: 'relative', top: 6 }} />
            <Typography variant="body2" component="span">India, Itd Mon 4:00 pm IST</Typography>
          </Box>
          <Button variant="outlined" fullWidth>View Profile</Button>
        </CardContent>
      </CompactCard>
      <Box mt={2}>
        <CompactCard>
          <CardHeader
            title="Contest Status"
            titleTypographyProps={{
              variant: 'body1'
            }}
          />
          <Divider />
          <Timeline>
            {this.state.roadmap.map((point, index) => (
              <OddTimelineItem key={index}>
                <TimelineSeparator>
                  {!!point.checked ? (
                    <TimelineDot style={{ backgroundColor: this.props.theme.palette.success.main }}>
                      <AiOutlineCheck size={16} />
                    </TimelineDot>
                  ) : (
                    <TimelineDot color="grey" style={{ width: 16, height: 16 }} />
                  )}
                  {index < this.state.roadmap.length - 1 && (
                    <TimelineConnector style={!!point.checked ? {
                      backgroundColor: this.props.theme.palette.success.main
                    } : {}} />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="body1">{point.title}</Typography>
                  <Typography variant="body2">{point.subtitle}</Typography>
                </TimelineContent>
              </OddTimelineItem>
            ))}
          </Timeline>
        </CompactCard>
      </Box>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(SideBar);