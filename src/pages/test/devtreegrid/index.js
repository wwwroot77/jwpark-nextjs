import React, { useCallback, useState } from 'react';
//import { TreeList, Column } from 'devextreme-react/tree-list';
import {
  TreeList,
  Column,
  FilterRow,
  SearchPanel,
  Selection,
  Editing,
  Form,
  Popup,
} from 'devextreme-react/tree-list';

import { agents } from './data.js';
import "devextreme/dist/css/dx.material.blue.dark.css";
//import 'devextreme/dist/css/dx.light.css';

const dataSource = {
    load(loadOptions) {
      const parentIdsParam = loadOptions.parentIds;
      const url = new URL( process.env.NEXT_PUBLIC_HOME_URL + '/api/agentlist' );
      if (parentIdsParam) {
        parentIdsParam.forEach((id) => {
          url.searchParams.append('parentIds', id);
        });
      }
  
      return fetch(url)
        .then((response) => response.json())
        .catch(() => { throw new Error('Data Loading Error'); });
    },
  };


const expandedRowKeys = [1];

export default function AgentInfo() {  

    return (
      
      <div class="agent-info">        
        <TreeList        
          id="agents"
          dataSource={agents}
          rootValue={-1}
          defaultExpandedRowKeys={expandedRowKeys}
          showRowLines={true}
          showBorders={true}
          columnAutoWidth={true}
          keyExpr="ID"
          parentIdExpr="Head_ID"
          width="40%"
          height="100%"          
          scrolling={true}                    
          autoExpandAll={true} // Tree list 모두 펼쳐 보이기
          allowColumnReordering={true}          
        >
          <Selection
                   mode="multiple"
                   recursive={true}
          />          
          <FilterRow visible={true} />
          <SearchPanel visible={true} />        
          <Column
            dataField="Title"
            caption="사이트/라인/호스트/AGENT명"
            //fixed={true}
            //width={400} 
          />            
          <Column
            dataField="IP_PORT" 
            caption="IP Address/Port" />
          <Column
            dataField="Active" />
          <Column
            dataField="User" />
          <Column
            dataField="Update_Date"
            dataType="date" />  
                <Editing
                    allowUpdating={true}
                    mode="popup">
                      
                    <Form
                        labelLocation="top"                        
                    />
                    
                    <Popup
                        showTitle={true}
                        title="상세 보기"
                    />
                </Editing>        
        </TreeList>
      </div>  
      
    );
}


