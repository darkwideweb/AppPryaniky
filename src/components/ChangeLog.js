import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Button, Typography } from '@mui/material';

function ChangeLog({ open, onClose, logs = [] }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">История изменений</Typography>
      </DialogTitle>
      <DialogContent dividers>
        {logs.length > 0 ? (
          <List>
            {logs.map(log => (
              <ListItem key={log.id}>
                <ListItemText
                  primary={`Запись ${log.id}`}
                  secondary={`${log.action} - ${new Date(log.date).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Логов не найдено.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangeLog;
