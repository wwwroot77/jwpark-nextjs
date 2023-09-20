import React from 'react';
import DataGrid from 'devextreme-react/data-grid';

export default function App() {

    const columns = ['id', 'host_name', 'serial_number', 'manager_user_id', 'user', 'cpu_clock'];

    return (
        <DataGrid
        dataSource="http://localhost:3000/api/serverlist3"
        //defaultColumns={All}
        showBorders={true}
        />
    );
}