import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link'; // Import Link component
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

export default function PostCard({ post, index }) {
  const { title, description, type, link, issues } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        textDecoration: 'none', // Remove underlines
        ...(latestPostLarge && { typography: 'h5', height: 60 }),
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
      }}
      href={link} // Link URL
    >
      {title}
    </Link>
  );

  const renderDescription = description && (
    <Typography variant="body2" color="textSecondary">
      {description}
    </Typography>
  );

  const renderType = type && (
    <Typography variant="caption" color="textSecondary">
      Type: {type}
    </Typography>
  );

  const renderIssues = issues && (
    <Box mt={1}>
      <Typography variant="caption" color="error">
        Issues: {issues}
      </Typography>
    </Box>
  );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: 'absolute',
        color: 'background.paper',
        ...((latestPostLarge || latestPost) && { display: 'none' }),
      }}
    />
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Link href={link} underline="none">
        {' '}
        {/* Update to remove underline */}
        {/* Render Link component */}
        <Card>
          <Box
            sx={{
              position: 'relative',
              pt: 'calc(100% * 3 / 4)',
              ...((latestPostLarge || latestPost) && {
                pt: 'calc(100% * 4 / 3)',
                '&:after': {
                  top: 0,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                },
              }),
              ...(latestPostLarge && {
                pt: {
                  xs: 'calc(100% * 4 / 3)',
                  sm: 'calc(100% * 3 / 4.66)',
                },
              }),
            }}
          >
            {renderShape}
          </Box>

          <Box
            sx={{
              p: (theme) => theme.spacing(4, 3, 3, 3),
              ...((latestPostLarge || latestPost) && {
                width: 1,
                bottom: 0,
                position: 'absolute',
              }),
            }}
          >
            {renderTitle}
            {renderDescription}
            {renderType}
            {renderIssues}
          </Box>
        </Card>
      </Link>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};
