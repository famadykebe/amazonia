import React,{useEffect} from 'react'
import {connect} from 'react-redux';
import ChildrenProduct from '../components/ChildrenProduct';
import {getDataProducts} from '../store/action';
import Loading from '../tools/Loading'

const  HomeScreen = (props) => {  

   useEffect(() => {
     props.propsGetDataProducts();

   },[])

    return (
      <>
     { props.loading ? (
       
       <Loading />
       
     ) : (
        <section className="content">

        {
          props.products && props.products.length > 0 && props.products.map(product => {
            return (
              <ChildrenProduct key={product._id} product={product}/>
            )
          
          })
        }
    
      </section>
     )
}
      </>
    )
}


const mapStateToprops = (state) => {

    return {
      loading: state.ProducstList.loadingProducts,
      products:state.ProducstList.products
    }
  
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        propsGetDataProducts: () => dispatch(getDataProducts())
    }
  }

export default connect(mapStateToprops,mapDispatchToProps)(HomeScreen)