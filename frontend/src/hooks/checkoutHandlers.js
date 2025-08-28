import axios from "axios";
export  const checkoutHandler = async (amount) => {
        try {
            const { data: { key } } = await axios.get("http://localhost:5000/api/getkey");

            const { data: { order } } = await axios.post("http://localhost:5000/api/checkout", {
                amount
            });
            console.log(order);
            

            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Parv Srivastava",
                description: "RazorPay Integration",
                image: "https://avatars.githubusercontent.com/u/25058652?v=4",
                order_id: order.id,
                callback_url: "http://localhost:5000/api/paymentverification",   ///replace with backend url
                prefill: {
                    name: "Gaurav Kumar",           //replace with the user name paying
                    email: "gaurav.kumar@example.com",  //replace with the user email
                    contact: "9999999999"               //replace with the user contact number
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#121212"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Error during checkout: ", error);
        }
    };