import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, IconButton, Typography } from '@mui/material';
import { Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';

function RecordDialog({ open, onClose, onSave, isEditing, initialData }) {
  const [formData, setFormData] = useState({
    documentName: '',
    documentStatus: '',
    companySigDate: '',
    ...initialData,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({ ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.documentName) tempErrors.documentName = 'Название документа обязательно';
    if (!formData.documentStatus) tempErrors.documentStatus = 'Статус обязателен';
    if (!formData.companySigDate) tempErrors.companySigDate = 'Дата подписи обязательна';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isEditing ? 'Редактировать запись' : 'Добавить новую запись'}
          </Typography>
          <IconButton onClick={onClose} size="small" edge="end">
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              name="documentName"
              label="Название документа"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.documentName}
              onChange={handleChange}
              error={!!errors.documentName}
              helperText={errors.documentName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              name="documentStatus"
              label="Статус"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.documentStatus}
              onChange={handleChange}
              error={!!errors.documentStatus}
              helperText={errors.documentStatus}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              name="companySigDate"
              label="Дата подписи"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formData.companySigDate}
              onChange={handleChange}
              error={!!errors.companySigDate}
              helperText={errors.companySigDate}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Отмена
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary" startIcon={<SaveIcon />}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecordDialog;
