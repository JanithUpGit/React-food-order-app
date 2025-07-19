
import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'

export default function Header(){
     const cartCtx = useContext(CartContext)
    const totalCartItems = cartCtx.items.reduce((totlaNumberOfItems,item)=>{
        return totlaNumberOfItems + item.quantity;
    },0);

    return <header id='main-header'>
        <div id="title">
            <img src={logoImg} alt='A resturent'/>
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly >Cart {totalCartItems}</Button>
        </nav>
    </header>
}