import React, { PureComponent } from 'react';
import {
  Box,
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
import { AiOutlineCheck } from 'react-icons/ai';
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
    roadmap: [{
      title: 'Project Post',
      subtitle: 'Provide your job details',
      checked: true
    },{
      title: 'Hired Freelancer',
      subtitle: 'Hire a talent from all proposals',
      checked: true
    },{
      title: 'Create Milestone',
      subtitle: 'Deposit a fund on your job'
    },{
      title: 'Release Milestone',
      subtitle: 'Sattle all of pending payment'
    },{
      title: 'End Contract',
      subtitle: 'End contract from hired list'
    },{
      title: 'Give Feedback',
      subtitle: 'Rate your freelancer'
    }]
  }

  render = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardHeader
          title="Project Status"
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
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(SideBar);