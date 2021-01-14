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
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { CompactCard } from '../../../global';

const styles = (theme) => ({
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  },
  creditRow: {
    display: 'flex',
    margin: theme.spacing(-1, -2),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(-0.5, -1)
    }
  },
  creditField: {
    flex: 1,
    margin: theme.spacing(1, 2),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(0.5, 1)
    }
  },
  creditAvatar: {
    width: '100%',
    borderRadius: 8
  }
});

class SideBar extends PureComponent {
  render = () => this.props.activeTab === 0 ? (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardHeader
          title="Dispute Note"
          titleTypographyProps={{
            variant: 'h6'
          }}
        />
        <Divider />
        <CardContent>
          <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</Typography>
        </CardContent>
      </CompactCard>
    </Box>
  ) : (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardHeader
          title="Dispute Details"
          titleTypographyProps={{
            variant: 'h6'
          }}
        />
        <Divider />
        <CardContent>
          <Typography variant="body2">Project ID: 32546545</Typography>
          <Typography variant="body2">Dispute amount: $300.00 USD</Typography>
          <Typography variant="body2">Created at: 26 May 2020, 02:45 AM</Typography>
          {this.props.activeTab === 3 ? (
            <Typography variant="body2">Status: <span style={{ color: this.props.theme.palette.error.main }}>Closed</span></Typography>
          ) : (
            <Typography variant="body2">Status: <span style={{ color: this.props.theme.palette.success.main }}>Active</span></Typography>
          )}
          {this.props.activeTab === 3 ? (
            <Typography variant="body2">Closed at: 26 May 2020, 02:45 AM</Typography>
          ) : (
            <Typography variant="body2">Reply before: <span style={{ color: this.props.theme.palette.success.main }}>21 hours 26min  33 sec</span></Typography>
          )}
        </CardContent>
      </CompactCard>
      <Box mt={2}>
        <CompactCard>
          <CardHeader
            title="Dispute Credits"
            titleTypographyProps={{
              variant: 'h6'
            }}
          />
          <Divider />
          <CardContent>
            <Box mb={1}>
              <Typography variant="body2" align="center">VS</Typography>
            </Box>
            <Box className={this.props.classes.creditRow}>
              <Box
                className={this.props.classes.creditField}
                bgcolor={this.props.theme.palette.primary.main}
                color={this.props.theme.palette.common.white}
                borderRadius={26}
              >
                <Typography variant="body2" align="center">Dispute creator</Typography>
              </Box>
              <Box className={this.props.classes.creditField}></Box>
            </Box>
            <Box className={this.props.classes.creditRow}>
              <Box className={this.props.classes.creditField}>
                <img alt="" src={this.props.creator.avatar} className={this.props.classes.creditAvatar} />
              </Box>
              <Box className={this.props.classes.creditField}>
                <img alt="" src={this.props.accused.avatar} className={this.props.classes.creditAvatar} />
              </Box>
            </Box>
            <Box className={this.props.classes.creditRow}>
              <Box className={this.props.classes.creditField}>
                <Typography variant="body2" align="center">Project owner</Typography>
              </Box>
              <Box className={this.props.classes.creditField}>
                <Typography variant="body2" align="center">Freelancer</Typography>
              </Box>
            </Box>
            <Box className={this.props.classes.creditRow}>
              <Box className={this.props.classes.creditField}>
                <Typography variant="body2">{this.props.activeTab === 3 ? 'Received' : 'Want to receive'}</Typography>
              </Box>
              <Box className={this.props.classes.creditField}>
                <Typography variant="body2">{this.props.activeTab === 3 ? 'Received' : 'Want to receive'}</Typography>
              </Box>
            </Box>
            <Box className={this.props.classes.creditRow}>
              <Box className={this.props.classes.creditField}>
                <Typography variant="body2">$300.00</Typography>
              </Box>
              <Box className={this.props.classes.creditField}>
                <Typography variant="body2">$300.00</Typography>
              </Box>
            </Box>
            {this.props.activeTab !== 3 && (
              <Box className={this.props.classes.creditRow}>
                <Box className={this.props.classes.creditField}>
                  <Button fullWidth variant="contained">Cancel dispute</Button>
                </Box>
                <Box className={this.props.classes.creditField}>
                  <Button fullWidth variant="outlined">New offer</Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </CompactCard>
      </Box>
    </Box>
  )
}

SideBar.propTypes = {
  activeTab: PropTypes.number,
  creator: PropTypes.object,
  accused: PropTypes.object
};

export default compose(
  withStyles(styles),
  withTheme
)(SideBar);