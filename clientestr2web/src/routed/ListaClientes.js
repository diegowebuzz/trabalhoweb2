import React from 'react';
import  {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import ConfirmDialog from '../ui/ConfirmDialog'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
export default function ListaClientes(){

    const history = useHistory();
    const [deletable, setDeletable] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
     const [sbOpen, setSbOpen] = useState(false);
     const [sbSeverity, setSbSeverity] = useState('success')
     const [sbMessage, setSbMessage] = useState('Exclusão realizada com sucesso.')
    const renderDetailsButton = (params) => {
        return (
            <strong>
                <button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                      
                         history.push(`/edit/${params.row.id}`)

                    }}
                >
                    atualizar
                </button>
            </strong>
        )
    }

    const renderDeleteButton = (params) => {
        return (
            <strong>
                <button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                      

                        handleDelete(params.row.id)

                    }}
                >
                    deletar
                </button>
            </strong>
        )
    }

    const columns = [
        {field: "id", headerName: "Cód.", flex: true },
        {field: "nome", headerName: "Nome",flex: true },
        {field: "cpf", headerName: "cpf", flex: true },
        {field: "rg", headerName: "rg", flex: true },
        {field: "logradouro", headerName: "logradouro",flex: true },
        {field: "num_imovel", headerName: "número", flex: true },
        {field: "complemento", headerName: "complemento", flex: true },
        {field: "bairro", headerName: "bairro", flex: true },
        {field: "municipio", headerName: "municipio", flex: true },
        {field: "uf", headerName: "uf", flex: true },
        {field: "telefone", headerName: "telefone", flex: true },
        {field: "email", headerName: "email", flex: true },
        {field: "atualizar", headerName: "_", flex: true,
        renderCell: renderDetailsButton,
        disableClickEventBubbling: true
     
          
     },
     
     {field: "deletar", headerName: "___", flex: true,
        renderCell: renderDeleteButton,
        disableClickEventBubbling: true
     
          
     }
     ]
     
     
    

    const [clientes, setClientes] = useState([]);;

    useEffect(() => {
        async function getData(){
            try{
                let response = await axios.get("https://api.faustocintra.com.br/clientes")
                setClientes(response.data)

            }catch(error){
                console.error(error)
            }
    
        }
        getData()
    }, []);

    async function deleteItem(){
        try{
       
            await axios.delete(`https://api.faustocintra.com.br/clientes/${deletable}`);
        setSbMessage('Eclusão efetuada com sucesso')
                   
    }catch(error){
          setSbSeverity('error')
          setSbMessage('Erro' + error.message)
    }
    setSbOpen(true);
    }

    function handleSbClose(){
        setSbOpen(false)
    }

     function handleDialogClose(result){
         setDialogOpen(false)
       

         if(result) deleteItem()
            
         

         setDeletable(undefined)
     }

     function handleDelete(id){
         setDeletable(id)
         setDialogOpen(true)
    
     }


    return (
        <>

<ConfirmDialog isOpen={dialogOpen}
onClose={handleDialogClose}
>
Deseja excluir este cliente?

</ConfirmDialog>

<Snackbar open={sbOpen}  autoHideDuration={6000} onClose={handleSbClose}>
  <MuiAlert elevation={6} variant="filled" onClose={handleSbClose} severity={sbSeverity} >
        {sbMessage}
        </MuiAlert>
      </Snackbar>

    <h1>Listagem de Clientes</h1>
    <div>  <Button style={{margin:'20px'}} onClick={ () => {history.push('/new') }} variant="contained" color="primary">Adicionar Cliente</Button> </div>
     <div style={{ height:400, width:'100%' }}>
      <DataGrid rows={clientes} 
      columns={columns}
      pageSize="15" />
     </div>
     </>
    );

}