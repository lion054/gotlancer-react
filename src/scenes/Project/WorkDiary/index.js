import React, { PureComponent } from 'react';
import {
  Box,
  CardContent,
  Divider,
  Tabs,
  withStyles
} from '@material-ui/core';

import Screenshots from './Screenshots';
import TimeReport from './TimeReport';
import { CompactCard, CompactTab } from '../../../global';

const styles = (theme) => ({
  root: {}
});

class WorkDiary extends PureComponent {
  state = {
    activeTab: 0
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  render = () => (
    <Box>
      <CompactCard>
        <CardContent style={{ paddingTop: 0 }}>
          <Tabs
            value={this.state.activeTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <CompactTab label="Screenshots" />
            <CompactTab label="Time Report" />
          </Tabs>
          <Divider />
          <div role="tabpanel" hidden={this.state.activeTab !== 0}>
            <Screenshots />
          </div>
          <div role="tabpanel" hidden={this.state.activeTab !== 1}>
            <TimeReport />
          </div>
        </CardContent>
      </CompactCard>
    </Box>
  )
}

export default withStyles(styles)(WorkDiary);