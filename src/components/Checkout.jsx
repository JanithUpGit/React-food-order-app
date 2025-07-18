import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";


export default function Checkout(){

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((price,item)=> {
        return price + (item.price * item.quantity);
    },0)

    function handleClose(){
        userProgressCtx.hideCheckout();
    }
async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    const response = await fetch("http://localhost:3000/orders", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        })
    });

    if (!response.ok) {
        // Optionally show error message
        console.error("Failed to submit order.");
        return;
    }else{
        console.log("Submission completed!!!!");
    }

    // cartCtx.clearCart(); // if you have this function
    // userProgressCtx.hideCheckout();
}


    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>

        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Totlal Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" type="text" id="name"/>
            <Input label="E-mail Address" id="email" type="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city" />

            </div>

            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button>submit Order</Button>
            </p>
        </form>
    </Modal>
}