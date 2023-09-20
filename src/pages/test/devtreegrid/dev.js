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

//import { agents } from './data.js';
import "devextreme/dist/css/dx.material.blue.dark.css";
//import 'devextreme/dist/css/dx.light.css';

const agents = {
    load(loadOptions) {
      const parentIdsParam = loadOptions.parentIds;
      const url = new URL('http://localhost:3000/api/serverlist2');
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
          keyExpr="code_id"
          parentIdExpr="parent_id"
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
            dataField="title"
            caption="사이트/라인/호스트"
            //fixed={true}
            //width={400} 
          />            
          <Column
            dataField="ip_address" 
            caption="IP Address/Port" />   

          <Column
            dataField="agent_version" 
            caption="agent_version" />   
        </TreeList>
      </div>  
      
    );
}


