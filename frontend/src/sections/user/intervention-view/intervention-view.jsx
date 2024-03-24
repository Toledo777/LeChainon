import React, { useState } from 'react'; // Added { useState }
import { Link, Grid, Stack, Select, Button, MenuItem, TextField, InputLabel, Typography, IconButton, FormControl } from '@mui/material'; // Combined imports into a single line
import LoadingButton from '@mui/lab/LoadingButton'; // Added LoadingButton
import InputAdornment from '@mui/material/InputAdornment'; // Corrected InputAdornment import

import { useTheme } from '@mui/material/styles'; // Moved useTheme import to the top
import { useRouter } from 'src/routes/hooks'; // Assuming this import is correct
import Iconify from 'src/components/iconify'; // Assuming this import is correct


// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    router.push('/dashboard');
  };

  const renderForm = (
    <>
      <Stack spacing={4}>
        <TextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                </InputAdornment>
                ),
            }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

//   return (
//     <Box
//       sx={{
//         ...bgGradient({
//           color: alpha(theme.palette.background.default, 0.9),
//           imgUrl: '/assets/background/overlay_4.jpg',
//         }),
//         height: 1,
//       }}
//     >
//       {/* <Logo
//         sx={{
//           position: 'fixed',
//           top: { xs: 16, md: 24 },
//           left: { xs: 16, md: 24 },
//         }}
//       /> */}

//       <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
//         <Card
//           sx={{
//             p: 5,
//             width: 1,
//             maxWidth: 420,
//           }}
//         >
//           <Typography variant="h4">Sign in to Minimal</Typography>

//           <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
//             Don’t have an account?
//             <Link variant="subtitle2" sx={{ ml: 0.5 }}>
//               Get started
//             </Link>
//           </Typography>

//           <Stack direction="row" spacing={2}>
//             <Button
//               fullWidth
//               size="large"
//               color="inherit"
//               variant="outlined"
//               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
//             >
//               <Iconify icon="eva:google-fill" color="#DF3E30" />
//             </Button>

//             <Button
//               fullWidth
//               size="large"
//               color="inherit"
//               variant="outlined"
//               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
//             >
//               <Iconify icon="eva:facebook-fill" color="#1877F2" />
//             </Button>

//             <Button
//               fullWidth
//               size="large"
//               color="inherit"
//               variant="outlined"
//               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
//             >
//               <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
//             </Button>
//           </Stack>

//           <Divider sx={{ my: 3 }}>
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//               OR
//             </Typography>
//           </Divider>

//           {renderForm}
//         </Card>
//       </Stack>
//     </Box>
//   );

return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Create Intervention Plan</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Caregiver Name" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Patient Name" />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth style={{ minWidth: 200 }}>
          <InputLabel>Intervention Type</InputLabel>
          <Select>
            <MenuItem value="medication">Medication</MenuItem>
            <MenuItem value="therapy">Therapy</MenuItem>
            <MenuItem value="exercise">Exercise</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth multiline rows={4} label="Intervention Description" />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Create Plan
        </Button>
      </Grid>
    </Grid>
  );
};
