import React from 'react';
import {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams} from 'react-router-dom';
import { useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';


import axios from 'axios';

const useStyles = makeStyles(
  theme => ({

    btnEsp: {
      margin: '30px'
    },

    flutuante: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'darkGray'

    
    },

    ph: {visibility: 'hidden'},
    form: {
      display:'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      maxWidth: '80%',

      margin: '0 auto',
      '& .MuiFormControl-root' :{
        minWidth: '150px',
        maxWidth: '400px',
        margin: '0 24px 24px 0'
      }
    }
  }))

export default function  FrmClientes(){

  const classes = useStyles()

    const [cliente, setCliente] =  useState({

    });

    const [title, setTitle] = useState('Cadastrar Novo Cliente')

    const [sendStatus, setSendStatus] = useState(
      {
        disabled:false,
        text: "enviar"
      }
    );

    const estados = ['RO','AC','AM','RR','PA','AP','TO','MA','PI','CE','RN','PB','PE','AL',
	'SE',
	'BA',
	'MG',
	'ES',
	'RJ',
'SP',
	'PR',
	'SC',
	'RS',
	'MS',
	'MT',
	'GO',
	'DF'];

  const history = useHistory()
  const params = useParams()

  useEffect(() => {
    if(params.id){
      getData(params.id)
      setTitle("Atualizar Cliente")
    }
  }, [])

  async function getData(id){
    
    try{
      let response = await axios.get(`https://api.faustocintra.com.br/clientes/${id}`)
      setCliente(response.data)
    }
    catch(error){
      setSbStatus(
        {
          open: true,
          severity: 'error',
          message: 'Não foi possível carregar os dados para edição'
        }
      )
    }

  }

  const [id, setId] = useState();
  const [sbStatus, setSbStatus] = useState();

    const [error, setError] = useState({
      nome: '',
      cpf: '',
      rg: '',
      logradouro: '',
      num_imovel: '',
      complemento: '',
      bairo: '',
      municipio: '',
      telefone: '',
      email: '',

    })



    function handleInputChange(event, property){
        setId(event.target.id)
        if(event.target.id) property = event.target.id

        setCliente({...cliente, [property]: event.target.value})
    }

    async function saveData(){
        try{
            setSendStatus({
              disabled:true,
              text:'enviando...'

            });
            if(params.id){
              await axios.put(`https://api.faustocintra.com.br/clientes/${params.id}`, cliente);
         
          
          }else{
            await axios.post("https://api.faustocintra.com.br/clientes", cliente);

          }
                 history.push('/lista');
          
        }
        catch(error){
          setSendStatus({
            disabled:false,
            text:'enviar'
          });
        }
    }

    function validate(){
      let valid  = true
      if(cliente.nome.trim() === ''){
       setError({...error, nome: 'nome obrigatório'})
        valid = false
      }else{
        setError({...error, nome: ''})

      }
    }

    function handleSubmit(event){



      Object.keys( cliente).forEach( e => {
        if(cliente[e] == '' ){
          alert("todos os campos devem ser preenchidos");
          return;
        }
      });
    
      

        event.preventDefault();
        saveData() 

    }

    return (
        <>
    <h1>{title}</h1>
    <div>  <Button style={{margin:'20px'}} onClick={ () => {history.push('/lista') }} variant="contained" color="primary">Lista de Clientes</Button> </div>

    <form className={classes.form}>
  <TextField
    id="nome"
    label="nome"
    variant="filled"
    onChange={(event) => handleInputChange(event, "nome")}
    error={error.nome !== ''}
    helperText={error.nome}
    value={cliente.nome}
    color="secondary"
    fullWidth
  />
    <TextField
    id="rg"
    label="rg"
    variant="filled"
    value={cliente.rg}

    onChange={(event) => handleInputChange(event, "rg")}
    color="secondary"
    fullWidth
  />
    <TextField
    id="logradouro"
    label="logradouro"
    variant="filled"
    value={cliente.logradouro}

    error={error.logradouro !== ''}
    helperText={error.marca}
    onChange={(event) => handleInputChange(event, "logradouro")}
    color="secondary"
    fullWidth
  />
    <TextField
    id="cpf"
    label="cpf"
    value={cliente.cpf}

    variant="filled"
    onChange={(event) => handleInputChange(event, "cpf")}
    fullWidth

    color="secondary"
  />
    <TextField
    id="num_imovel"
    label="número do imóvel"
    variant="filled"
    value={cliente.num_imovel}

    required
    onChange={(event) => handleInputChange(event, "num_imovel")}
    color="secondary"
    fullWidth
  />
    <TextField
    id="complemento"
    label="complemento"
    value={cliente.complemento}

    variant="filled"
    onChange={(event) => handleInputChange(event, "complemento")}
    color="secondary"
    fullWidth
  />
    <TextField
    id="bairro"
    label="bairro"
    variant="filled"
    value={cliente.bairro}

    onChange={(event) => handleInputChange(event, "bairro")}
    color="secondary"
    fullWidth
  />
    <TextField
    id="municipio"
    label="município"
    value={cliente.municipio}

    variant="filled"
    onChange={(event) => handleInputChange(event, "municipio")}
    color="secondary"
    fullWidth
  />
     <TextField
    id="uf"
    label="uf"
    variant="filled"
  
    value={cliente.uf}

    onChange={(event) => handleInputChange(event, "uf")}
    color="secondary"
    fullWidth
    select
  >
{ estados.map(estado => <MenuItem value={estado}>{estado}</MenuItem>) }
  </TextField>
    <TextField
    id="telefone"
    label="telefone"
    value={cliente.telefone}

    variant="filled"
    onChange={(event) => handleInputChange(event, "telefone")}
    color="secondary"
    fullWidth
  />
    <TextField
    id="email"
    label="email"
    value={cliente.email}
    variant="filled"
    onChange={(event) => handleInputChange(event, "email")}
    color="secondary"
    fullWidth
  />
     <TextField
    id="placeholder"
    label="place"
   
     className={classes.ph}
    variant="filled"
   
    color="secondary"
    fullWidth
  />
    </form>
    <div className={classes.flutuante} >
    <Button className={classes.btnEsp} variant="contained"  type="submit" disabled={sendStatus.disabled} onClick={handleSubmit} color="primary">{sendStatus.text}</Button>
    


    <Button className={classes.btnEsp} variant="primary" type="submit" onClick={() => {history.push('/lista')}} color="primary">cancelar</Button>
</div>
    </>
    );


}