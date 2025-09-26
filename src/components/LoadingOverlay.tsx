import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type Props = { open: boolean };

export default function LoadingOverlay({ open }: Props) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }} open={open}>
      <CircularProgress />
    </Backdrop>
  );
}
