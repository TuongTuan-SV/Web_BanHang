
import React from 'react'
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";


export default function PaypalButton(total) {
    const CLIENT_ID = "ATHwc2-wtpIDQO16lRSrsKpsEmIFm9CjEZO8OagYGGgepCzBX-CG87ACfeTFq3e8NZvOVSmGMpor6RVn"
    const style =  {
    layout: 'horizontal',
    color:  'blue',
    shape:  'rect',
    label:  'paypal',
    tagline : false
  }
  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <PayPalButtons style={style} 
                disabled={false}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: '123.00',
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                        orderID: data.orderID
                        })
                    });
                    }}
                onApprove={async (data, actions)=> { 
                    
                    // Your code here after capture the order
                    await actions.order.capture()
                        .then(function(detail){
                            console.log(data)
                            console.log(detail)
                        })
                }}
                
            />
    </PayPalScriptProvider>
  )
}

