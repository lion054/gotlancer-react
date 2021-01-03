import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  OutlinedInput,
  Typography,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';

import PlaceholderSelect from '../../components/PlaceholderSelect';

const styles = (theme) => ({
  label: {
    margin: theme.spacing(2, 0, 1, 0),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(1, 0, 0.5, 0)
    }
  },
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

class AddEducation extends PureComponent {
  state = {
    from: '',
    to: '',
    years: [],
    degree: '',
    degrees: ['Bachelor', 'Master']
  }

  componentDidMount() {
    const years = [];
    for (let i = 1970; i < 1980; i++) {
      years.push(i.toString());
    }
    this.setState({ years });
  }

  handleCancel = () => {
    this.setState({ from: '', to: '', degree: '' });
    this.props.onClose();
  }

  handleSave = () => {}

  render = () => (
    <Dialog fullWidth open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Add education</DialogTitle>
      <Divider />
      <DialogContent>
        <Box>
          <Typography variant="subtitle2" className={this.props.classes.label}>School</Typography>
          <OutlinedInput
            margin="dense"
            fullWidth
            placeholder="Ex: Northwestern University"
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" className={this.props.classes.label}>Dates Attended (Optional)</Typography>
          <Box className={this.props.classes.outerMargin}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <PlaceholderSelect
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    placeholder="From"
                    value={this.state.from}
                    onChange={(e) => this.setState({ from: e.target.value })}
                  >
                    {this.state.years.map((year, index) => (
                      <MenuItem key={index} value={year}>{year}</MenuItem>
                    ))}
                  </PlaceholderSelect>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <PlaceholderSelect
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    placeholder="To (or expected graduation)"
                    value={this.state.to}
                    onChange={(e) => this.setState({ to: e.target.value })}
                  >
                    {this.state.years.map((year, index) => (
                      <MenuItem key={index} value={year}>{year}</MenuItem>
                    ))}
                  </PlaceholderSelect>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle2" className={this.props.classes.label}>Degree (Optional)</Typography>
          <PlaceholderSelect
            fullWidth
            margin="dense"
            variant="outlined"
            placeholder="Ex: Bachelor`s degree"
            value={this.state.degree}
            onChange={(e) => this.setState({ degree: e.target.value })}
          >
            {this.state.degrees.map((degree, index) => (
              <MenuItem key={index} value={degree}>{degree}`s degree</MenuItem>
            ))}
          </PlaceholderSelect>
        </Box>
        <Box>
          <Typography variant="subtitle2" className={this.props.classes.label}>Area of Study (Optional)</Typography>
          <OutlinedInput
            margin="dense"
            fullWidth
            placeholder="Ex: Computer Science"
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" className={this.props.classes.label}>Description (Optional)</Typography>
          <OutlinedInput
            margin="dense"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={this.handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

AddEducation.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(AddEducation);