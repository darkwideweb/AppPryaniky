import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Container, Button, CircularProgress, Snackbar, IconButton, Tooltip, Paper, InputBase, Box, Typography, Chip, Alert, Checkbox } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Print as PrintIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import jsPDF from 'jspdf';
import dataService from '../services/dataService';
import RecordDialog from '../components/RecordDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import ChangeLog from '../components/ChangeLog';
import { motion } from 'framer-motion';

const CustomCheckbox = ({ checked, onChange }) => (
  <Checkbox
    checked={checked}
    onChange={onChange}
    sx={{
      color: checked ? 'primary.main' : 'action.disabled',
      '&.Mui-checked': {
        color: 'primary.main',
      },
    }}
  />
);

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortModel, setSortModel] = useState([{ field: 'companySigDate', sort: 'desc' }]);
  const [changeLogOpen, setChangeLogOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await dataService.fetchData();
      setData(result);
    } catch (err) {
      setError('Не удалось загрузить данные.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddRecord = () => {
    setIsEditing(false);
    setSelectedRecordId(null);
    setOpenDialog(true);
  };

  const handleEditRecord = (id) => {
    setSelectedRecordId(id);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleSaveRecord = async (formData) => {
    setLoading(true);
    try {
      if (isEditing) {
        await dataService.updateRecord(selectedRecordId, formData);
      } else {
        await dataService.addRecord(formData);
      }
      await fetchData();
    } catch {
      setError('Не удалось сохранить запись.');
    } finally {
      setOpenDialog(false);
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await Promise.all(selectedRows.map((id) => dataService.deleteRecord(id)));
      await fetchData();
    } catch {
      setError('Не удалось удалить записи.');
    } finally {
      setConfirmDialogOpen(false);
      setSelectedRows([]);
      setLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Отчет', 10, 10);
    data.forEach((item, index) => {
      doc.text(`${item.documentName}: ${item.documentStatus}`, 10, 20 + index * 10);
    });
    doc.save('report.pdf');
  };

  const filteredData = useMemo(() => {
    return data
      .filter((row) => row.documentName.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        const field = sortModel[0]?.field;
        if (!field) return 0;
        const direction = sortModel[0]?.sort === 'asc' ? 1 : -1;
        return (a[field] > b[field] ? 1 : -1) * direction;
      });
  }, [data, searchTerm, sortModel]);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      renderCell: (params) => (
        <CustomCheckbox
          checked={selectedRows.includes(params.row.id)}
          onChange={(e) => {
            const id = params.row.id;
            setSelectedRows((prev) =>
              e.target.checked
                ? [...prev, id]
                : prev.filter((selectedId) => selectedId !== id)
            );
          }}
        />
      ),
    },
    { field: 'documentName', headerName: 'Название документа', flex: 1 },
    {
      field: 'documentStatus',
      headerName: 'Статус',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Подписано' ? 'success' : 'warning'}
          variant="outlined"
        />
      ),
    },
    { field: 'companySigDate', headerName: 'Дата подписи', width: 150 },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Редактировать">
            <IconButton size="small" color="primary" onClick={() => handleEditRecord(params.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Container
      sx={{
        padding: 4,
        backgroundColor: '#f4f6f8',
        borderRadius: 3,
        boxShadow: 3,
        minHeight: '100vh',
        maxWidth: 'lg',
      }}
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#333' }}>
            Управление документами
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddRecord}
              sx={{ borderRadius: 2, boxShadow: 3 }}
            >
              Добавить 
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setConfirmDialogOpen(true)}
              disabled={selectedRows.length === 0}
              sx={{ borderRadius: 2, boxShadow: 3 }}
            >
              Удалить выбранные
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PrintIcon />}
              onClick={generatePDF}
              sx={{ borderRadius: 2, boxShadow: 3 }}
            >
              Экспорт в PDF
            </Button>
            <Button
              variant="outlined"
              color="info"
              onClick={() => setChangeLogOpen(true)}
              sx={{ borderRadius: 2, boxShadow: 3 }}
            >
              Лента изменений
            </Button>
          </Box>
        </Box>
        <Paper component="form" sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Поиск по названию документа"
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: '10px' }}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
          selectionModel={selectedRows}
          onSortModelChange={(model) => setSortModel(model)}
        />
        {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 3 }} />}
      </motion.div>
      {error && (
        <Snackbar open autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
      <RecordDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveRecord}
        isEditing={isEditing}
        initialData={data.find((record) => record.id === selectedRecordId)}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="Вы уверены, что хотите удалить выбранные записи?"
      />
      <ChangeLog
        open={changeLogOpen}
        onClose={() => setChangeLogOpen(false)}
        logs={data.map((item) => ({
          id: item.id,
          action: item.isEdited ? 'Изменено' : 'Добавлено',
          date: item.companySigDate,
        }))}
      />
    </Container>
  );
};

export default DashboardPage;
