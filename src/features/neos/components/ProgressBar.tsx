import { LinearProgress } from '@mui/material';

/**
 * ProgressBar
 * A component that renders a Material-UI LinearProgress bar.
 *
 * This progress bar is styled to appear at the top of the screen with absolute positioning
 * and a z-index that matches the app bar's z-index from the theme.
 */
export default function ProgressBar() {
  return (
    <LinearProgress
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: (t: { zIndex: { appBar: number } }) => t.zIndex.appBar,
      }}
    />
  );
}
