import Cabecalho from './ui/Cabecalho';
import {Route, Link, Switch, BrowserRouter} from 'react-router-dom';
import FrmClientes from './routed/FrmClientes';
import ListaClientes from './routed/ListaClientes';

function App() {
  return (
      <BrowserRouter>
  <Cabecalho/>
  <switch>
  <div className="row">
<div className="col-md-2">
 

   </div> 
   <Route path="/new">
        <FrmClientes/>
   </Route>
   <Route path="/lista">
   <ListaClientes/>

</Route>
<Route path="/edit/:id">
<FrmClientes/>


</Route>
</div>
  </switch>
  
     </BrowserRouter>
  );
 
 }
 
 export default App;

