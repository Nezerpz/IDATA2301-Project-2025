import {useLocation} from 'react-router-dom';
import ProviderSettings from "../components/ProviderSettings.jsx";

//TODO: Link to manage cars. Change the routing so the buttons dont persist to pages it shouldn't
function Settings() {
    const location = useLocation();

  return (
    <div>
      <h2>Settings</h2>
        <ProviderSettings currentPath={location.pathname} />
    </div>
  );
}

export default Settings