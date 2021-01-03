import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import SelectCountry from '../../components/SelectCountry';
import PlaceholderSelect from '../../components/PlaceholderSelect';

const styles = (theme) => ({
  content: {
    [theme.breakpoints.up('md')]: {
      width: 500
    }
  },
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

class AddEmployment extends PureComponent {
  state = {
    country: 'in',
    fromMonth: '',
    fromYear: '',
    toMonth: '',
    toYear: '',
    months: moment.months(),
    years: []
  }

  componentDidMount() {
    const years = [];
    for (let i = 1970; i < 1980; i++) {
      years.push(i.toString());
    }
    this.setState({ years });
  }

  handleCancel = () => {
    this.setState({ fromMonth: '', fromYear: '', toMonth: '', toYear: '' });
    this.props.onClose();
  }

  handleSave = () => {}

  render = () => (
    <Dialog open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Add employment</DialogTitle>
      <Divider />
      <DialogContent className={this.props.classes.content}>
        <Box>
          <Typography variant="subtitle2" className={this.props.classes.label}>Company</Typography>
          <OutlinedInput
            margin="dense"
            fullWidth
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" className={this.props.classes.label}>Location</Typography>
          <Box className={this.props.classes.outerMargin}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <OutlinedInput
                    margin="dense"
                    fullWidth
                    placeholder="City"
                  />
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <SelectCountry
                    fullWidth
                    margin="dense"
                    autoHighlight
                    label="Choose a country"
                    onChange={(e, item) => this.setState({ country: item.iso2 })}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle2" className={this.props.classes.label}>Title</Typography>
          <OutlinedInput
            margin="dense"
            fullWidth
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" className={this.props.classes.label}>Period</Typography>
          <Box className={this.props.classes.outerMargin}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <PlaceholderSelect
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    placeholder="Month"
                    value={this.state.fromMonth}
                    onChange={(e) => this.setState({ fromMonth: e.target.value })}
                  >
                    {this.state.months.map((month, index) => (
                      <MenuItem key={index} value={month}>{month}</MenuItem>
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
                    placeholder="Year"
                    value={this.state.fromYear}
                    onChange={(e) => this.setState({ fromYear: e.target.value })}
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
          <Typography variant="subtitle2" className={this.props.classes.label} style={{ color: this.props.theme.palette.text.secondary }}>through</Typography>
          <Box className={this.props.classes.outerMargin}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <PlaceholderSelect
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    placeholder="Month"
                    value={this.state.toMonth}
                    onChange={(e) => this.setState({ toMonth: e.target.value })}
                  >
                    {this.state.months.map((month, index) => (
                      <MenuItem key={index} value={month}>{month}</MenuItem>
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
                    placeholder="Year"
                    value={this.state.toYear}
                    onChange={(e) => this.setState({ toYear: e.target.value })}
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
        <Box mt={2}>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">I currently work there</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" className={this.props.classes.label}>Description (Optional)</Typography>
          <OutlinedInput
            margin="dense"
            fullWidth
            multiline
            rows={4}
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

AddEmployment.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default compose(
  withStyles(styles),
  withTheme
)(AddEmployment);