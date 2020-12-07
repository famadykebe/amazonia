import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux'
import {Button,Grid,InputLabel,Select,TextField,FormControl,Typography,IconButton,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Table} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {PlusOne} from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {getDataProducts,updateItemProduct} from '../store/action';
import Modal from '../components/Modal';
import Fade from '@material-ui/core/Fade';
import {withRouter} from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#444',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      cursor:'pointer',
     '&:hover':{
         color:'#fff'
     }
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
 
    },
   
  }))(TableRow);


  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },

    StyledTableRow:{
        "&:hover": {
       
        cursor:'pointer',
        
        }
    },


    paper: {
        backgroundColor: '#fafafa',
        borderStyle: 'none!important',
        borderColor:'white',
        boxShadow: "0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)",
        padding: 24,
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start'

      },

      paper2:{
          width:'60%!important'
      },

      formControl:{
          width:'100%'
      }


  });


const Product = (props) => {
    const {products,getDataProductsProps,updateItemProductProps,resultDeleteItem,usersInfos,history} = props;
    const classes = useStyles();

    useEffect(() => {
     
            if(!usersInfos){
                history.push("/signin")
            }
       
            getDataProductsProps();
        
    },[products])

    const [open, setOpen] = useState(false);
    const [idProduct,setidProduct] = useState('');
    const [openAddProduct,setopenAddProduct] = useState(false);
    const [category,setcategory] = useState('')

    const handleOpen = (id) => {
        setOpen(true);
        setidProduct(id)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteProduct = () => {
        updateItemProductProps(idProduct);
        setOpen(!open)
    }

    const hadleOpenAddProduct = () => {
        setopenAddProduct(true)   
    }

    const handleCloseAddProduct = () => {
        setopenAddProduct(false)
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setcategory(value)
      
      };


    return (
        <div className="conenu-product">
           <div className="header-product">
           <Button onClick={() => hadleOpenAddProduct()} variant="contained" color="primary" ><PlusOne color="#fff"/> add product</Button>
           </div>
           {resultDeleteItem && 
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    {resultDeleteItem}
                </Alert>
            }
            <br />
           <div className="content-product">
            <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Nom</StyledTableCell>
                                <StyledTableCell align="center">Prix</StyledTableCell>
                                <StyledTableCell align="center">Mark</StyledTableCell>
                                <StyledTableCell align="center">Categorie</StyledTableCell>
                                <StyledTableCell align="center">Nombre d'article en stock</StyledTableCell>
                                <StyledTableCell align="center">Gestion</StyledTableCell>
                                {/* <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        
                            {
                                products && products.length === 0 ? (
                                    <div className="productEmpty">Auncun article en stock</div>
                                ) : (
                                   <TableBody>
                                    {products.map((row) => (
                                        <StyledTableRow className={classes.StyledTableRow} hover key={row.name}>
                                            <TableCell hover component="th" scope="row">{row.name}</TableCell>
                                            <TableCell align="center">{row.price}</TableCell>
                                            <TableCell align="center">{row.brand}</TableCell>
                                            <TableCell align="center">{row.category}</TableCell>
                                            <TableCell align="center">{row.countInStock}</TableCell>
                        
                                            <TableCell align="center">
                                                <IconButton><EditIcon color="#444" /></IconButton>
                                                <IconButton onClick={() => handleOpen(row._id)}><DeleteIcon color="#444" /></IconButton>
                                            </TableCell>
                                        </StyledTableRow>
                                    ))}
                                   </TableBody>
                                )
                            }

                    </Table>
                </TableContainer>
           </div>

           <Modal open={open} handleClose={handleClose}>
                <Fade in={open} >
                        <div className={classes.paper} >
                            <p id="spring-modal-description">êtes vous sur de vouloir supprimer</p>

                            <div className="btn-cof-modal">
                                <Button variant="contained" color="" onClick={() => handleClose()}>Annuler</Button>
                                <Button variant="contained" color="primary" onClick={() => deleteProduct()}>Confirmer</Button>
                            </div>
                        </div>
                </Fade>
           </Modal>

           <Modal open={openAddProduct} handleClose={handleCloseAddProduct}>

            <Fade in={openAddProduct}>
                        <div className={`${classes.paper} ${classes.paper2}`}>
                            <Typography variant="h5">Add to Product</Typography>
                            <br />
                            <br />
                            
                                <form>
                                    <Grid container spacing={2}>
                                        <Grid item xs="6">
                                            <TextField className={classes.formControl} id="outlined-basic" label="name" variant="outlined" />
                                        </Grid>

                                        <Grid item xs="6">
                                            <FormControl className={classes.formControl} variant="outlined" >
                                                <InputLabel htmlFor="cat">Category</InputLabel>
                                                <Select native value={'naruto'} label="category" value={category} onChange={handleChange}>
                                                    <option value={'slim Shirt'}>Slim Shirt</option>
                                                    <option value={'pants'}>Pants</option>
                                                    <option value={'shirts'}>Shirts</option>

                                                 </Select>

                                               

                                            </FormControl>
                                        </Grid>
                                        <Grid item xs="6">
                                            <TextField className={classes.formControl} id="outlined-basic" label="Outlined" variant="outlined" />
                                        </Grid>
                                    </Grid>
                                </form>

                        </div>
                </Fade>

           </Modal>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products:state.productListGestion.products,
        resultDeleteItem:state.productListGestion.resultDeleteItem,
        usersInfos:state.userSignin.usersInfos
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        getDataProductsProps: () => dispatch(getDataProducts('DATA_PRODUCTS_ADMIN','PRODUCT_ITEM_GESTION_FAIL')),
        updateItemProductProps: (idProduct) => dispatch(updateItemProduct(idProduct))
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(withRouter(Product))
