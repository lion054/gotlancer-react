import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Typography,
  withStyles
} from '@material-ui/core';
import { EmojiObjects } from '@material-ui/icons';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  outerMargin: {
    margin: theme.spacing(2, -2),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(1, -1)
    }
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  }
});

const Lamp = withStyles({
  root: {
    transform: 'translateY(6px)'
  }
})(EmojiObjects);

class ChangeAvailability extends PureComponent {
  state = {
    available: true,
    availableHours: 'more-than-30'
  }

  handleCancel = () => {
    this.props.onClose();
  }

  handleSave = () => {}

  render = () => (
    <Dialog fullWidth open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Change availability</DialogTitle>
      <Divider />
      <DialogContent>
        <Box className={this.props.classes.outerMargin}>
          <Grid container>
            <Grid item md={5} xs={12}>
              <Box className={this.props.classes.innerPadding}>
                <Typography variant="body2">Are you available to take on new work? Knowing when you are available helps Gotlancer find the right jobs for you.</Typography>
                <Link href="#"><Lamp /> How we use this info</Link>
              </Box>
            </Grid>
            <Grid item md={7} xs={12}>
              <Box className={this.props.classes.innerPadding}>
                <Typography variant="subtitle2">I am currently</Typography>
                <Box mt={1}>
                  <Grid container>
                    <Grid item sm={6} xs={12}>
                      <Button
                        variant={this.state.available ? 'contained' : 'outlined'}
                        fullWidth
                        onClick={() => this.setState({ available: true })}
                      >Available</Button>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Button
                        variant={this.state.available ? 'outlined' : 'contained'}
                        fullWidth
                        onClick={() => this.setState({ available: false })}
                      >Not Available</Button>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={2}>
                  <RadioGroup value={this.state.availableHours} onChange={(e) => this.setState({ availableHours: e.target.value })}>
                    <Box>
                      <FormControlLabel
                        value="more-than-30"
                        control={(
                          <Radio checked={this.state.availableHours === 'more-than-30'} onClick={(e) => e.stopPropagation()} />
                        )}
                        label={<Typography variant="body2" component="span">More than 30 hrs/week</Typography>}
                        onClick={() => this.setState({ paymentMethod: 'more-than-30' })}
                      />
                    </Box>
                    <Box>
                      <FormControlLabel
                        value="less-than-30"
                        control={(
                          <Radio checked={this.state.availableHours === 'less-than-30'} onClick={(e) => e.stopPropagation()} />
                        )}
                        label={<Typography variant="body2" component="span">Less than 30 hrs/week</Typography>}
                        onClick={() => this.setState({ paymentMethod: 'less-than-30' })}
                      />
                    </Box>
                    <Box>
                      <FormControlLabel
                        value="as-needed"
                        control={(
                          <Radio checked={this.state.availableHours === 'as-needed'} onClick={(e) => e.stopPropagation()} />
                        )}
                        label={<Typography variant="body2" component="span">As needed - open to offers</Typography>}
                        onClick={() => this.setState({ paymentMethod: 'as-needed' })}
                      />
                    </Box>
                  </RadioGroup>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={this.handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

ChangeAvailability.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(ChangeAvailability);