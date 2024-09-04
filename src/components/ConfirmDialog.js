import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import { Cancel as CancelIcon, Check as CheckIcon } from '@mui/icons-material';

const buttonStyles = {
  borderRadius: 2,
  textTransform: 'none',
  fontWeight: 'bold',
};

const titleStyles = {
  backgroundColor: '#f44336',
  color: '#fff',
  textAlign: 'center',
  borderBottom: '1px solid #ddd',
};

const dialogContentStyles = {
  padding: '16px 24px',
  textAlign: 'center',
};

const dividerStyles = {
  margin: '16px 0',
};

function ConfirmDialog({ open, onClose, onConfirm, title = "Подтвердите действие", description = "Вы действительно хотите удалить?" }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={titleStyles}>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent sx={dialogContentStyles}>
        <Typography variant="body1">{description}</Typography>
        <Divider sx={dividerStyles} />
      </DialogContent>
      <DialogActions sx={{ padding: 2, justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          color="secondary"
          variant="outlined"
          startIcon={<CancelIcon />}
          sx={buttonStyles}
        >
          Отмена
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          startIcon={<CheckIcon />}
          sx={buttonStyles}
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
