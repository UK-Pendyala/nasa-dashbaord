import { LinearProgress } from '@mui/material';

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
