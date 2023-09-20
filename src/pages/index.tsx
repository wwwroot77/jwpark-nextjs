import { Url } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  const buttons = [
    { label: "Login", path: "login" },
    { label: "Text DropDown", path: "test/textdropdown" },
    { label: "MUI Grid with Dropdown", path: "test/datagrid" },
    { label: "DevExtreme Grid Simple", path: "test/datagrid/dev" },
    { label: "DevExtreme Grid with DropDownBox", path: "test/devgriddropdownbox" },
    { label: "DevExtreme TreeGrid", path: "test/devtreegrid" }    
  ];
  
  
  const handleButtonClick = (path: Url) => {
    router.push(path);
  }

  return (
    <div>
      {buttons.map((button, index) => (
        <button 
          key={index}
          onClick={() => handleButtonClick(button.path)}
          style={{ width: '300px', height: '30px', display: 'block', marginBottom: '10px' }}>
          {button.label}
        </button>
      ))}
    </div>
  );
}