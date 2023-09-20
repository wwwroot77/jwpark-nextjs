import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MultiColumnDropdownTextField from '../../../components/muidropdown';

export default function EditableGrid() {
  const [rows, setRows] = useState([]);
  useEffect(() => {

    // API에서 데이터를 가져옵니다.
    fetch('http://localhost:3000/api/serverlist')
      .then(response => response.json())
      .then(data => {
        // 가져온 데이터를 상태에 설정합니다.
        setRows(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);  

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [selectedNames, setSelectedNames] = useState(""); // 선택된 이름 상태

  const handleCellClick = (params, event) => {
    setCurrentRowId(params.id);
    // 값이 없을 경우 null로 설정
    setSelectedNames(params.value ? params.value.toString() : "");
    setAnchorEl(event.currentTarget);
  };

  const handleUserSelect = (data) => {
    const updatedRows = rows.map(row => {
        if (row.id === currentRowId) {
            // 현재 행의 manager_user_id 값을 배열로 변환합니다.
            const currentIds = row.manager_user_id ? row.manager_user_id.split(', ') : [];
            
            // 새로 선택한 ID들을 가져옵니다.
            const selectedIds = data.ids.split(', ');

            // 현재 ID들과 새로 선택한 ID들을 합칩니다.
            const mergedIds = [...currentIds, ...selectedIds];

            // 중복된 ID를 제거합니다.
            const uniqueIds = [...new Set(mergedIds)];

            // 현재 ID 리스트에서 전달받은 ID들만 남기고 나머지는 제거합니다.
            const finalIds = uniqueIds.filter(id => selectedIds.includes(id));

            return { 
                ...row, 
                user: data.names, 
                manager_user_id: finalIds.join(', ') 
            };
        }
        return row;
    });
    setRows(updatedRows);
};


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'host_name', headerName: 'host_name', width: 150 },
    { field: 'serial_number', headerName: 'serial_number', width: 150 },
    { field: 'manager_user_id', headerName: 'manager_user_id', width: 350 },
    { 
      field: 'user', 
      headerName: 'user', 
      width: 350, 
      editable: true,
      renderCell: (params) => (
        <div 
          style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }} 
          onClick={(e) => handleCellClick(params, e)}
        >
          {params.value || ''}
        </div>
      )
    },
    { field: 'cpu_clock', headerName: 'cpu_clock', width: 110, editable: true },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
<MultiColumnDropdownTextField 
  key={currentRowId} // 이 부분 추가
  anchorEl={anchorEl}
  onClose={() => setAnchorEl(null)}
  onChange={handleUserSelect}
  initialValues={selectedNames}
/>
    </div>
  );
}
