import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  OutlinedInput,
  Typography,
  withStyles
} from '@material-ui/core';
import faker from 'faker';

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
        <Typography variant="subtitle2">Transfer Copyright</Typography>
      </Box>
      <Divider />
      <Box my={2}>
        <Typography variant="body2">Both parties must sign the IP Transfer Agreement to transfer the ownership of the selected entry. The contest files will be released after both parties have signed the agreement and the payment once the employer has accepted the files.</Typography>
      </Box>
      <Box my={2}>
        <Typography variant="subtitle2">Full Name / Company name</Typography>
      </Box>
      <OutlinedInput fullWidth margin="dense" />
      <Box my={2}>
        <Typography variant="subtitle2">Phone</Typography>
      </Box>
      <OutlinedInput fullWidth margin="dense" />
      <Box my={2}>
        <Typography variant="subtitle2">Address</Typography>
      </Box>
      <OutlinedInput fullWidth margin="dense" />
      <Box my={2}>
        <Typography variant="subtitle2">City / Town</Typography>
      </Box>
      <OutlinedInput fullWidth margin="dense" />
      <Box my={2}>
        <Typography variant="subtitle2">State / Region</Typography>
      </Box>
      <OutlinedInput fullWidth margin="dense" />
      <Box my={2}>
        <Typography variant="subtitle2">Country</Typography>
      </Box>
      <OutlinedInput fullWidth margin="dense" />
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">I agree to sign the <Link href="#">IP Transfer Agreement</Link> for the selected entry.</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Divider />
      <Box display="flex" mt={2}>
        <Button variant="contained" size="large">Sign Agreement and Continue</Button>
      </Box>
    </Box>
  )
}

export default withStyles(styles)(Create);