import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
// importa los demás componentes y estilos necesarios

// eslint-disable-next-line react/prop-types
const ModalComponent = ({ open, onClose, animeState, handleChange, handleClick, loading }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={(e) => handleClick(e)} method="post">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cambie el estado del anime
          </Typography>
          <div className="dropdown">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: '100%' }} required>
              <InputLabel id="demo-simple-select-standard-label">Estado del anime</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={animeState}
                onChange={handleChange}
                label="Estado del anime"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'En emisión'}>En emisión</MenuItem>
                <MenuItem value={'Esperando temporada'}>Esperando temporada</MenuItem>
                <MenuItem value={'Pausadas por mí'}>Pausadas por mí</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="button-div">
            <LoadingButton
              size="small"
              type="submit"
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Cambiar</span>
            </LoadingButton>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalComponent;