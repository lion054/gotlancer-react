import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  withStyles
} from '@material-ui/core';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import faker from 'faker';

import { formatCurrency } from '../../../global';

const styles = (theme) => ({
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  }
});

class Create extends PureComponent {
  state = {
    projects: []
  }

  componentDidMount() {
    const projects = [];
    for (let i = 0; i < 5; i++) {
      projects.push({
        id: faker.random.number({ min: 1000000, max: 10000000 }),
        title: faker.lorem.sentence(5)
      });
    }
    this.setState({ projects });
  }

  render = () => (
    <Box className={this.props.classes.innerPadding}>
      <Box my={2}>
        <Typography variant="subtitle2">Create Dispute</Typography>
      </Box>
      <Divider />
      <Box my={2}>
        <Typography variant="subtitle2">Select Project</Typography>
      </Box>
      <Select
        fullWidth
        margin="dense"
        variant="outlined"
      >
        {this.state.projects.map((project, index) => (
          <MenuItem key={index} value={project.id}>{project.title} (Project ID: {project.id})</MenuItem>
        ))}
      </Select>
      <Box my={2}>
        <Typography variant="subtitle2">Select Milestone(s) to Dispute</Typography>
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">All milestone(s) (Amount: {formatCurrency(45)})</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Milestone for logo (Amount: {formatCurrency(20)})</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Milestone for business card (Amount: {formatCurrency(25)})</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box my={2}>
        <Typography variant="subtitle2">Dispute Reason</Typography>
      </Box>
      <OutlinedInput
        fullWidth
        margin="dense"
        multiline
        rows={5}
        placeholder="Tell us more about why you want dispute"
      />
      <Box my={2}>
        <Typography variant="subtitle2">Attach abidance (Optional)</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box mr={2}>
          <Button variant="outlined" startIcon={<AiOutlineCloudUpload />}>Upload</Button>
        </Box>
        <Typography variant="body2">No file selected</Typography>
      </Box>
      <Box mt={1} mb={2}>
        <Typography variant="body2">File format: JPEG, PNG, PDF, DOCX</Typography>
      </Box>
      <Divider />
      <Box display="flex" mt={2}>
        <Button variant="contained" size="large">Create dispute now</Button>
        <Box ml={2}>
          <Button variant="outlined" size="large">No, thanks</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default withStyles(styles)(Create);